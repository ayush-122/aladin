// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const StateUtils = require("../../utils/StateUtils");

const { createReelRandomMap, createReelMap } = require("../../configuration/MainGameReelConfig"); //getting params from main game reel config
const { createBuyReelRandomMap, createBuyReelMap } = require("../../configuration/BuyGameReelConfig"); //getting params from main game reel config
const { waysPayout } = require("../../payouts/WaysWinning");
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");

const { randomPools } = require("../../utils/PoolUtils");
const { Scatter } = require("../../utils/Scatter");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { baseGameFixedData } = require("./StateFixedData");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return "BASE_GAME";
  }

  async init(request) {
    // debugger;
    const response = new ResponseGenerator().createNew();
    const isBuyFeature = request.isBuyFeature;
    const responseMap = new Map();

    //Set Credit and Bet Multiplier
    responseMap.set(ResponseConstants.CREDIT_VALUE, request.credits);

    baseGameFixedData(request, isBuyFeature, response);
    const reelSymbols = isBuyFeature ? createBuyReelMap(GameConstant.RtpLevel) : createReelMap(GameConstant.RtpLevel);
    const pools = await new randomPools().createNew(request);

   // console.log(pools);

    // pools.reel1_at_0_62 = 78;
    // pools.reel2_at_0_62 = 75;
    // pools.reel3_at_0_62 = 29;
    // pools.reel4_at_0_62 = 63;
    // pools.reel5_at_0_62 = 69;
    // pools.featureRandomStop = 4;

    const reelStops = isBuyFeature
      ? createBuyReelRandomMap(GameConstant.RtpLevel, pools)
      : createReelRandomMap(GameConstant.RtpLevel, pools);

    // const starReelStops = isBuyFeature
    // ? createBuyReelRandomMap(GameConstant.RtpLevel, pools)
    // : createReelRandomMap(GameConstant.RtpLevel, pools);
    responseMap.set(ResponseConstants.REEL_STOPS, reelStops);
    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    ); // add here the buy feature
    const symbolMatrix = symbolGrid.matrixCreation();
    // symbolMatrix[0] = ["H1", "WC", "H1"];
    // symbolMatrix[4] = ["SC", "SC", "SC"];
    
    // symbolMatrix[0] = ["AA", "AA", "AA","AA"];
    // symbolMatrix[1] = ["AA", "AA", "AA","AA"];
    // symbolMatrix[2] = ["AA", "AA", "AA","AA"];
    // symbolMatrix[3] = ["AA", "AA", "AA","AA"];
    // symbolMatrix[4] = ["BO", "BO", "BO","BO"];
    
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);

    let totalwin = 0;
    let returnPaylineData = waysPayout(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    totalwin += parseFloat(returnPaylineData.totalWin * request.credits);

    let countScatter = new Scatter(symbolMatrix, GameConstant.SCATTER_SYMBOL).scatterCount();
    let countBonus = new Scatter(symbolMatrix, GameConstant.BONUS_SYMBOL).scatterCount(); // ! Counting Bonus

    responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, false);

    //Check For Pick Bonus
    if (countBonus.count >= 3) {
      responseMap.set(ResponseConstants.BONUS_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.BONUS_COUNT, countBonus.count);
      responseMap.set(ResponseConstants.BONUS_POSITION, countBonus.position);
      responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.PICK_BONUS_REQUEST);
      responseMap.set(ResponseConstants.NEXT, GameConstant.PICK_BONUS_REQUEST);
    }
    // Check For Free Spin
    // if scatter Count greater than 3 then bonus wheel will trigger and then free game will trigger
    else if (countScatter.count >= 3) {
      responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.SCATTER_COUNT, countScatter.count);
      responseMap.set(ResponseConstants.SCATTER_POSITION, countScatter.position);
      responseMap.set(ResponseConstants.BONUS_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.BONUS_COUNT, countBonus.count);
      responseMap.set(ResponseConstants.BONUS_POSITION, countBonus.position);

      let rewardFreeGame = StateUtils.freeGameCalculation(countScatter.count);
      responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, false);

      if (rewardFreeGame.reward === "FG") {
        responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
        responseMap.set(ResponseConstants.SCATTER_FREE_GAME_TRIGGER, true);
        responseMap.set(ResponseConstants.SCATTER_FREE_SPIN_WON, rewardFreeGame.amount);
        responseMap.set(ResponseConstants.FREE_GAME_TOTAL_FREE_SPIN, rewardFreeGame.totalFreeSpin);
        responseMap.set(ResponseConstants.FREE_GAME_CURRENT_FREE_SPIN, 0);

        if (isBuyFeature) responseMap.set(ResponseConstants.STATE_CURRENT, "BUYFEATURE");
        else responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");

        responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.WHEEL_BONUS_REQUEST);
        responseMap.set(ResponseConstants.NEXT, GameConstant.WHEEL_BONUS_REQUEST);
      }
    }

    //Mark State as Completed
    else {
      responseMap.set(ResponseConstants.STATE_NEXT, "COMPLETED");
      responseMap.set(ResponseConstants.NEXT, "COMPLETED");
    }

    // FIX NO CHANGE
    responseMap.set(ResponseConstants.FINAL_WINNINGS_TOTAL_WON, totalwin);

    // Check for Buy Feature
    if (!isBuyFeature) {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (totalwin - request.credits * GameConstant.BASE_CREDITS_BET ).toFixed(3)
      );
    } else {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (totalwin - request.credits * GameConstant.BUY_FEATURE_BET ).toFixed(3)
      );
    }

    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalwin);
    responseMap.set(ResponseConstants.TOTAL_CREDITS_WON, totalwin);
    responseMap.set(ResponseConstants.CREDITS_WAGERED, request.credits * GameConstant.BASE_CREDITS_BET);

    changeSymbolCode(symbolMatrix);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }
}
module.exports = BaseGameState;
