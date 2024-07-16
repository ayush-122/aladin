// Define the run function outside of the else block
const { stateHandler } = require("../engine/requestHandler/StateManagement");
const helper = require("./GameSimulation.helpers");
const runlimit = {
  1: 1000, // 10,00,000  MILLION
  2: 100000000, // 10,00,00,000  100 MILLION
  3: 1000000000, // 1,00,00,00,000 BILLION
  4: 1000000000000, // 10,00,00,00,00,000 TRILLION
  5: 1000, // 1000      // Thousand
};

async function run(numCPUs) {
  try {
    let cycles = runlimit[1] / numCPUs;
    let totalBet = 0;
    let totalBaseWon = 0;
    let totalFreeWon = 0;
    let totalRespinWon = 0;
    let totalGameWin = 0;
    let doPrint = true;

    console.log(`Worker ${process.pid} running simulation`);

    for (let i = 1; i <= cycles; i++) {
      console.log(i);
      let req = helper.createBaseRequest();
      // console.log("This is the start ********");
      let previousState = null;
      const baseStateRes = await stateHandler("BASE", req, previousState);
      baseStateRes.raw_request = req;
      previousState = baseStateRes;

      if (doPrint) {
        console.log(baseStateRes);
        console.log("Response: \n", baseStateRes);
      }

      // Extracting values from baseStateRes
      let nextState = baseStateRes.state.next;
      let baseBet = baseStateRes.baseBet;
      let mainSpinCreditsWon = baseStateRes.mainSpinCreditsWon;
      // Performing calculations
      totalBet = totalBet + baseBet;
      totalBaseWon = totalBaseWon + mainSpinCreditsWon;
      totalGameWin = totalGameWin + mainSpinCreditsWon;
      let freeStateRes = {};


      while (nextState == "WHEEL_BONUS") {
        req = helper.createWheelRequest();
        let wheelStateRes = await stateHandler("WHEEL_BONUS", req, previousState);
        previousState = wheelStateRes;
        nextState = wheelStateRes.state.next;
        console.log('next state is' ,nextState);
        
      }

      while (nextState == "FREE") {
        req = helper.createFreeRequest();
        console.log('I am in infinite loops');
        freeStateRes = await stateHandler("FREE", req, previousState);
        previousState = freeStateRes;
        nextState = freeStateRes.state.next;
        console.log(nextState);
        let freeSpinCreditsWon = freeStateRes.freeGame.freeSpinCreditsWon;
        totalFreeWon = totalFreeWon + freeSpinCreditsWon;
        totalGameWin = totalGameWin + freeSpinCreditsWon;
      }

     

      while (nextState == "PICK_BONUS") {
        req = helper.createPickBonusRequest();
        let pickBonusStateRes = await stateHandler("PICK_BONUS", req, previousState);
        previousState = pickBonusStateRes;
        nextState = pickBonusStateRes.state.next;
        let totalBonusWon = pickBonusStateRes.pickBonus.totalBonusWin
        totalGameWin += totalGameWin+totalBonusWon;
        
      }

      if (i % 100 == 0) {
        const baseWinPercentage = (totalBaseWon / totalBet) * 100;
        const freeWinPercentage = (totalFreeWon / totalBet) * 100;
        const respinWinPercentage = (totalRespinWon / totalBet) * 100;
        const totalWinPercentage = (totalGameWin / totalBet) * 100;

        console.log(
          i,
          `BaseWinPct: ${baseWinPercentage.toFixed(2)}% | FreeWinPct: ${freeWinPercentage.toFixed(
            2
          )}% | RespinWinPct: ${respinWinPercentage.toFixed(2)}% | TotalWinPct: ${totalWinPercentage.toFixed(2)}%`
        );
      }
    }
    console.log(`Worker ${process.pid} finished simulation`);
    let obj = {
      cycles,
      totalBet,
      totalBaseWon,
      totalFreeWon,
      totalRespinWon,
      totalGameWin,
      doPrint,
    };
    return obj;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
run(5);

module.exports = { run };
