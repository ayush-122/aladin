const GameConstant = require("../configuration/GameConstant");

function wheelBonus(pools) {
  let reward = "";
  let rand = pools.wheelTrigger1_at_0_62;
  let freeGameCount=0;
  let multiplier=1;
  if (rand < 250) {
    reward = "FG";
    freeGameCount=1;

  } else if (rand < 450) {
    reward = "FG";
    freeGameCount=2;
  } else if (rand < 630) {
    reward = "FG";
    freeGameCount=3;
  } else if (rand < 730) {
    reward = "MULTIPLIER";
    multiplier=1;
  } else if (rand < 810) {
    reward = "MULTIPLIER";
    multiplier=2;
  } else if (rand < 860) {
    reward = "MULTIPLIER";
    multiplier=3
  } else {
    throw "invalid wheel option";
  }
  if(reward=="FG")
  return { reward, freeGameCount };
   else
   return {reward,multiplier}
}

function pickBonus(pools) {
  let revealAmount = [];
  let creditWon = 0;
   //console.log("pool: ", pools);
  for (let index = 0; index < 8; index++) {
    let num = pools[index];
    if (index == 0) {
      if (num < 170) revealAmount[index] = 300;
      else if (num < 420) revealAmount[index] = 2000;
      else if (num < 620) revealAmount[index] = 500;
      else if (num < 680) revealAmount[index] = 240;
      else if (num < 690) revealAmount[index] = 9000;
      else if (num < 697) revealAmount[index] = 1000;
      else if (num < 700) revealAmount[index] = 5000;
    } else {
      if (num < 170) revealAmount[index] = 300;
      else if (num < 420) revealAmount[index] = 2000;
      else if (num < 620) revealAmount[index] = 500;
      else if (num < 920) break;
      else if (num < 980) revealAmount[index] = 240;
      else if (num < 990) revealAmount[index] = 9000;
      else if (num < 997) revealAmount[index] = 1000;
      else if (num < 1000) revealAmount[index]=5000;
    }

    creditWon += revealAmount[index];
  }
  let count = revealAmount.length;
  revealAmount.push(0);
  return { revealAmount, creditWon, count };
}

function freeGameCalculation(scatterCount) {
  let reward = "FG";
  let totalFreeSpin = 0;
  if (scatterCount == 3) {
    totalFreeSpin = 3;
  } else if (scatterCount == 4) {
    totalFreeSpin = 5;
  } else if (scatterCount == 5) {
    totalFreeSpin = 8;
  }
return { reward, totalFreeSpin };
}
function freeGameRetriggerCalculation(scatterCount) {
  let reward = "FGR";
  let totalFreeSpin = 0;
  if (scatterCount == 3) {
    totalFreeSpin = 1;
  } else if (scatterCount == 4) {
    totalFreeSpin = 2;
  } else if (scatterCount == 5) {
    totalFreeSpin = 3;
  }

  return { reward, totalFreeSpin };
}

//expanding reel function
function symbolGridExpandingReels(matrix, expandingReel) {
  const matrixData = matrix.map((row) => row.slice());
  for (let i = 0; i < matrix.length; i++) {
    if (expandingReel[i] == 1) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrixData[i][j] = GameConstant.WILD_SYMBOL;
      }
    }
  }

  return matrixData;
}

module.exports = { freeGameCalculation, freeGameRetriggerCalculation, symbolGridExpandingReels, wheelBonus, pickBonus };
