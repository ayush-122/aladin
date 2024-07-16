// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const { randomPools } = require("../../utils/PoolUtils");
const StateUtils = require("../../utils/StateUtils");
const { ResponseGenerator } = require("../responseGenerator/Response");
const ResponseConstants = require("../responseGenerator/ResponseConstants");

class WheelBonusState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return GameConstant.WHEEL_BONUS_REQUEST;
  }

  async init(jsonRequestData,previousState) {
    let multiplier=1;
    const responseMap = new Map();
    const response = new ResponseGenerator().createWheelNew();

    // ! *****************Data Till Here**************
    const pools = await new randomPools().createNew(jsonRequestData);
  
    // ! *****************Data Till Here**************

    let wheelBonusData = StateUtils.wheelBonus(pools);

    if(wheelBonusData.reward=="FG")
    {
      previousState.FREE_GAME_TOTAL_FREE_SPIN += wheelBonusData.freeGameCount;
    }
    else if(wheelBonusData.reward=="MULTIPLIER")
       {
         multiplier=wheelBonusData.multiplier
       }

       //baseGame data
       responseMap.set(ResponseConstants.CREDIT_VALUE, jsonRequestData.credits);
       responseMap.set(ResponseConstants.BET_MULTIPLIER, jsonRequestData.betMultiplier);
       responseMap.set(ResponseConstants.BASE_GAME_WON, previousState.mainSpinCreditsWon);
    
    
   // responseMap.set("wheelSpinData", wheelBonusData);
    responseMap.set(ResponseConstants.STATE_CURRENT, GameConstant.WHEEL_BONUS_REQUEST);
    responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.FREE_GAME_REQUEST);
    responseMap.set(ResponseConstants.NEXT, GameConstant.FREE_GAME_REQUEST);
    responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
    responseMap.set(ResponseConstants.REWARD_TYPE ,wheelBonusData.reward);
    responseMap.set(ResponseConstants.FREE_GAME_TOTAL_FREE_SPIN, previousState.freeGame.totalFreeSpin);
    responseMap.set(ResponseConstants.FREE_GAME_CURRENT_FREE_SPIN, 0);
    responseMap.set(ResponseConstants.MULTIPLIER,multiplier);
    responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
    responseMap.set(ResponseConstants.FREE_GAME_WIN_IN_WHEEL_SPIN, wheelBonusData.freeGameCount);
    responseMap.set(ResponseConstants.FREE_GAME_TOTAL_FREE_SPIN, previousState.freeGame.totalFreeSpin+wheelBonusData.freeGameCount);


    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, previousState.mainSpinCreditsWon);
    responseMap.set(ResponseConstants.TOTAL_CREDITS_WON, previousState.totalCreditsWon);
    responseMap.set(ResponseConstants.CREDITS_WAGERED, previousState.creditsWagered);
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON,previousState.mainSpinCreditsWon);
    responseMap.set(ResponseConstants.FINAL_WINNINGS_TOTAL_WON, previousState.finalWinnings.TotalWon);
    responseMap.set(ResponseConstants.FINAL_WINNINGS_NET, previousState.finalWinnings.net);
    
    
    return new ResponseGenerator().createWheelResponse(responseMap, response);
  }
}

module.exports = WheelBonusState;
