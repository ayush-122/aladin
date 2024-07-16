function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 25,
    type: "BASE",
    playerId: "1",
    gameId: "1006",
  };
  return baseRequest;
}

function createFreeRequest() {
  let freeRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 25,
    type: "FREE",
    playerId: "1",
    gameId: "1006",
  };
  return freeRequest;
}

function createWheelRequest(baseRawRequest) {
  let wheelRequest = {
    credits: 1,
    noOfPaylineData: 25,
    betMultiplier: 1,
    isBuyFeature: false,
    playerId: 3,
    gameId: "1006",
    type: "WHEEL_BONUS",
    raw_request: baseRawRequest,
  };
  return wheelRequest;
}

function createPickBonusRequest(baseRawRequest) {
  let wheelRequest = {
    credits: 1,
    noOfPaylineData: 25,
    betMultiplier: 1,
    isBuyFeature: false,
    playerId: 3,
    gameId: "1006",
    type: "PICK_BONUS",
    raw_request: baseRawRequest,
  };
  return wheelRequest;
}

module.exports = { createBaseRequest, createFreeRequest, createWheelRequest ,createPickBonusRequest };
