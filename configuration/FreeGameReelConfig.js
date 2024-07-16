const { GameRTPLevel } = require("./GameRtpLevel");
const {WC,AA,BB,CC,DD,EE,FF,GG,HH,JJ,KK,LL,} = require("./GameReelSymbol").GameReelSymbol.symbols;


const freeGameReels = new Map();

freeGameReels.set(GameRTPLevel.RTP_60, new Map());
freeGameReels.get(GameRTPLevel.RTP_60).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_70, new Map());
freeGameReels.get(GameRTPLevel.RTP_70).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_80, new Map());
freeGameReels.get(GameRTPLevel.RTP_80).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_90, new Map());
freeGameReels.get(GameRTPLevel.RTP_90).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_95, new Map());
freeGameReels.get(GameRTPLevel.RTP_95).set(1, [BB,BB,BB,LL,LL,LL,AA,AA,AA,JJ,JJ,JJ,FF,FF,FF,CC,CC,CC,KK,KK,KK,DD,DD,DD,GG,GG,GG,HH,HH,HH,JJ,JJ,JJ,EE,EE,EE,GG,GG,GG,LL,LL,LL,FF,FF,FF,HH,HH,HH]), 
freeGameReels.get(GameRTPLevel.RTP_95).set(2, [FF,FF, FF,AA,AA,AA,JJ,JJ,JJ,FF,FF,FF,WC,WC,WC,GG,GG,GG,HH,HH,HH,LL,LL,LL,BB,BB,BB,DD,DD,DD,FF,FF,FF,KK,KK,KK,CC,CC,CC,EE,EE,EE,WC,WC,WC,GG,GG,GG,LL,LL,LL,JJ,JJ,JJ]);
freeGameReels.get(GameRTPLevel.RTP_95).set(3, [DD,DD,DD,AA,AA,AA,FF,FF,FF,WC,WC,WC,EE,EE,EE,FF,FF,FF,LL,LL,LL,CC,CC,CC,JJ,JJ,JJ,GG,GG,GG,DD,DD,DD,CC,CC,CC,HH,HH,HH,KK,KK,KK,LL,LL,LL,BB,BB,BB,KK,KK,KK]);
freeGameReels.get(GameRTPLevel.RTP_95).set(4, [FF,FF,FF,EE,EE,EE,DD,DD,DD,CC,CC,CC,HH,HH,HH,AA,AA,AA,BB,BB,BB,CC,CC,CC,JJ,JJ,JJ,FF,FF,FF,WC,WC,WC,LL,LL,LL,KK,KK,KK,CC,CC,CC,GG,GG,GG,HH,HH,HH]);
freeGameReels.get(GameRTPLevel.RTP_95).set(5, [DD,DD,DD,JJ,JJ,JJ,EE,EE,EE,KK,KK,KK,GG,GG,GG,FF,FF,FF,BB,BB,BB,AA,AA,AA,JJ,JJ,JJ,KK,KK,KK,LL,LL,LL,HH,HH,HH,EE,EE,EE,GG,GG,GG,HH,HH,HH,CC,CC,CC]);

// Generic Random Reel Map function
function createFreeReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createFreeReelRandomMap60(randomPools);
    case 2:
      return createFreeReelRandomMap70(randomPools);
    case 3:
      return createFreeReelRandomMap80(randomPools);
    case 4:
      return createFreeReelRandomMap90(randomPools);
    case 5:
      return createFreeReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}


function createReelMap(rtpLevel) {
  
  switch (rtpLevel) {
    case 1:
      return freeGameReels.get(GameRTPLevel.RTP_60);
    case 2:
      return freeGameReels.get(GameRTPLevel.RTP_70);
    case 3:
      return freeGameReels.get(GameRTPLevel.RTP_80)
    case 4:
      return freeGameReels.get(GameRTPLevel.RTP_90)
    case 5:
      return freeGameReels.get(GameRTPLevel.RTP_95)
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createFreeReelRandomMap60(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap70(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap80(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap90(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap95(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

module.exports = {
  freeGameReels,
  createFreeReelRandomMap,
  createReelMap
};