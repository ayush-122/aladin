const { validateBet } = require("../validator/BetValidator");
const validate = require("../../../../validations/slotGame.validation");
const valueParser = require("../../../../helpers/request/valueParser");

async function gamePlayMiddlewareAladdin(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso

    //Parse values
    req.body.credits = parseFloat(req.body.credits);
    req.body.bet = parseInt(req.body.bet);
    req.body.isBuyFeature = valueParser.parseBool(req.body.isBuyFeature);

    req.body.gameId = "1006"; //NOTE - Hardcoded GameId
    const isValidBet = validateBet(req.body);

    if (error || !isValidBet.status) {
      return res.status(400).json({
        status: false,
        message: isValidBet.message || error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
async function gameContinueMiddlewareAladdin(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGameContinueValidation.validate(req.body);
    req.body.gameId = "1006"; //NOTE - Hardcoded GameId

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function gameDoneMiddlewareAladdin(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameDoneValidation.validate(req.body);
    req.body.gameId = "1006"; //NOTE - Hardcoded GameId

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function gameResumeMiddlewareAladdin(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameResumeValidation.validate(req.body);
    req.body.gameId = "1006"; //NOTE - Hardcoded GameId

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  gamePlayMiddlewareAladdin,
  gameContinueMiddlewareAladdin,
  gameDoneMiddlewareAladdin,
  gameResumeMiddlewareAladdin,
};
