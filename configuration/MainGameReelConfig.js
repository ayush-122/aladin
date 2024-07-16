const { GameRTPLevel } = require("./GameRtpLevel");
const {WC,AA,BB,CC,DD,EE,FF,GG,HH,JJ,KK,LL,BG,BO} = require("./GameReelSymbol").GameReelSymbol.symbols;

let baseGameReels = new Map();

baseGameReels.set(GameRTPLevel.RTP_60,  new Map());
baseGameReels.get(GameRTPLevel.RTP_60).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_60).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_70,  new Map());
baseGameReels.get(GameRTPLevel.RTP_70).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_70).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_80,  new Map());
baseGameReels.get(GameRTPLevel.RTP_80).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_80).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_90,  new Map());
baseGameReels.get(GameRTPLevel.RTP_90).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_90).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_95,  new Map());
baseGameReels.get(GameRTPLevel.RTP_95).set(1, [AA,EE,FF,GG,DD,LL,JJ,FF,LL,EE,GG,LL,KK,JJ,BG,JJ,KK,GG,HH,CC,HH,LL,GG,EE,HH,BB,GG,KK,HH,EE,FF,KK,LL,EE,GG,LL,LL,EE,EE,LL,EE,FF,GG,FF,EE,EE,GG,LL,GG,EE,EE]), 
baseGameReels.get(GameRTPLevel.RTP_95).set(2, [FF,FF,KK,GG,HH,LL,JJ,KK,DD,BB,FF,JJ,GG,WC,GG,LL,JJ,BO,HH,KK,KK,KK,BB,BG,KK,KK,BB,AA,JJ,FF,BB,DD,JJ,DD,CC,HH,KK,EE,JJ,JJ,KK,FF,GG,HH,KK,JJ,KK]);
baseGameReels.get(GameRTPLevel.RTP_95).set(3, [DD,LL,KK,WC,BB,LL,DD,EE,CC,LL,DD,KK,GG,GG,BG,FF,CC,CC,CC,LL,CC,LL,KK,CC,LL,KK,LL,CC,EE,AA,JJ,JJ,CC,CC,LL,AA,HH,HH,LL,KK,LL,KK,JJ,LL,KK]);
baseGameReels.get(GameRTPLevel.RTP_95).set(4, [FF,FF,EE,BG,GG,CC,DD,AA,JJ,JJ,CC,AA,JJ,DD,DD,EE,BG,FF,BB,BB,HH,HH,LL,BG,HH,HH,LL,FF,BO,DD,DD,HH,HH,KK,AA,LL,DD,DD,WC,KK,CC,CC,FF]);
baseGameReels.get(GameRTPLevel.RTP_95).set(5, [DD,DD,JJ,BB,BB,EE,GG,LL,DD,CC,LL,GG,CC,CC,DD,BB,FF,BO,BB,BB,BB,HH,BO,DD,BB,HH,HH,BB,WC,DD,KK,KK,AA,CC,HH,HH,EE,EE,AA,GG,GG,DD,DD,HH,KK,BG,BB,GG,HH,CC]);

function createReelRandomMap60(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap70(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap80(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap90(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap95(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createReelRandomMap60(randomPools);
    case 2:
      return createReelRandomMap70(randomPools);
    case 3:
      return createReelRandomMap80(randomPools);
    case 4:
      return createReelRandomMap90(randomPools);
    case 5:
      return createReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createReelMap(rtpLevel) {
  
  switch (rtpLevel) {
    case 1:
      return baseGameReels.get(GameRTPLevel.RTP_60);
    case 2:
      return baseGameReels.get(GameRTPLevel.RTP_70);
    case 3:
      return baseGameReels.get(GameRTPLevel.RTP_80)
    case 4:
      return baseGameReels.get(GameRTPLevel.RTP_90)
    case 5:
      return baseGameReels.get(GameRTPLevel.RTP_95)
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}



// function getBonusEndPoints(rtpLevel){
//   const output = ()=>{
//     console.log(rtp : , rtpLevel)
//     let map = baseGameReels.get(GameRTPLevel.RTP_60);
//     let bonusFirstsList = [];
//     let count = 0 ;
//     map.forEach(list => {
//       const firstOccurrenceIndex = list.findIndex(element => element === BO);
//       if (firstOccurrenceIndex !== -1) {
//         // If 'BN' is found in the list,  add it to the firstOccurrencesList
//         bonusFirstsList.push({
//           index  : count ++, 
//           firstOccurrenceIndex: firstOccurrenceIndex, 
//         });
//       }
//     });
//     console.log(bonus reel endpoints : , bonusFirstsList); //20 64 57 21 0
//   } 
//   output();

//  }

// getBonusEndPoints(GameRTPLevel.RTP_60);
 
module.exports = {
  baseGameReels, 
  createReelRandomMap, 
  createReelMap
};