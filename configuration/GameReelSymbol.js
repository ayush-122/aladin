const GameReelSymbol = {
  // Define the enumeration
  symbols: {
     WC:"WC",
     AA:"AA", 
     BB:"BB",  
     CC:"CC",  
     DD:"DD",  
     EE:"EE",  
     FF:"FF",  
     GG:"GG",  
     HH:"HH",  
     JJ:"JJ",  
     KK:"KK",  
     LL:"LL",
     BG:"BG",
     BO:"BO",
  },
  symbolIds: {
    WC: { id: 0, symbol: "WC", symbolWon: true, matchCount: 3 },
    AA: { id: 1, symbol: "AA", symbolWon: true, matchCount: 3 },
    BB: { id: 2, symbol: "BB", symbolWon: true, matchCount: 3 },
    CC: { id: 3, symbol: "CC", symbolWon: true, matchCount: 3 },
    DD: { id: 4, symbol: "DD", symbolWon: true, matchCount: 3 },
    EE: { id: 5, symbol: "EE", symbolWon: true, matchCount: 3 },
    FF: { id: 6, symbol: "FF", symbolWon: true, matchCount: 3 },
    GG: { id: 7, symbol: "GG", symbolWon: true, matchCount: 3 },
    HH: { id: 8, symbol: "HH", symbolWon: true, matchCount: 3 },
    JJ: { id: 9, symbol: "JJ", symbolWon: true, matchCount: 3 },
    KK: { id: 10, symbol: "KK", symbolWon: true, matchCount: 3 },
    LL: { id: 11, symbol: "LL", symbolWon: true, matchCount: 3 },
    BG: { id: 12, symbol: "BG", symbolWon: true, matchCount: 3 },
    BO: { id: 13, symbol: "BO", symbolWon: true, matchCount: 3 },
  },


  // Private method to get the symbol by id
  getSymbolById: (id) => {
    try {
      for (const key in this.symbols) {
        if (Object.prototype.hasOwnProperty.call(this.symbols, key) && this.symbols[key].id === id) {
          return key;
        }
      }
      throw new Error("Symbol not found");
    } catch (error) {
      console.error("Error in get method:", error.message);
      return null;
    }
  },

  // Private method to get the symbol map
  getSymbolMap: () => {
    try {
      const symbolMap = new Map();
      for (const key in this.symbols) {
        if (Object.prototype.hasOwnProperty.call(this.symbols, key)) {
          symbolMap.set(key, this.symbols[key]);
        }
      }
      return symbolMap;
    } catch (error) {
      console.error("Error in getSymbolMap method:", error.message);
      return null;
    }
  },
};

module.exports = { GameReelSymbol };
