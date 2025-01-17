const aladdin = require("../engine/requestHandler/StateManagement");
const GameConstant = require("../configuration/GameConstant");
const gamePlay = require("../../../../services/gamePlay/gamePlay.service");
const asyncErrorHandler = require("../../../../helpers/asyncErrorHandler");

//  **************** BASE GAME PLAY ******************
async function postGamePlayAladdin(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);
    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await aladdin.stateHandler(nextState, obj.payload);

    const credit_amount = newState.mainSpinCreditsWon;

    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);

    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueAladdin(req, res) {
  try {
    if (req.body.state == "FREE") {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = "FREE";
      const newState = await aladdin.stateHandler(nextState, obj.payload, obj.lastState.raw_response);
      //Calculating Win
      const credit_amount = newState.freeGame.freeSpinCreditsWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    }
    //******************** Wheel Bonus ****************** */
    else if (req.body.state === "WHEEL_BONUS") {
      const obj = await gamePlay.processWheelBonusRequest(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = GameConstant.WHEEL_BONUS_REQUEST;
      // if (value.isBuyFeature) nextState = "BUYFEATURE";

      const newState = await aladdin.stateHandler(nextState, obj.payload, obj.lastState.raw_response);
      //Calculating Win
      //const credit_amount = newState.wheelSpin.totalBonusWin;
      const credit_amount =0;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    }
    // *************** Bonus ****************
    else if (req.body.state === GameConstant.PICK_BONUS_REQUEST) {
      const obj = await gamePlay.processPickBonusRequest(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = GameConstant.PICK_BONUS_REQUEST;

      const newState = await aladdin.stateHandler(nextState, obj.payload, obj.lastState);
      //Calculating Win
      const credit_amount = newState.pickBonus.totalBonusWin;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    } else return res.status(400).json({ status: false, message: "Invalid Request" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

// ? **************** DONE REQUEST ******************
async function postGameDoneAladdin(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeAladdin(req, res) {
  await gamePlay.postResume(req, res);
}

module.exports = {
  postGamePlayAladdin: asyncErrorHandler(postGamePlayAladdin),
  postGameContinueAladdin : asyncErrorHandler(postGameContinueAladdin),
  postGameDoneAladdin :asyncErrorHandler(postGameDoneAladdin),
  postGameResumeAladdin : asyncErrorHandler(postGameResumeAladdin),
};
