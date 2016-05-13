
/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.c2f416a5-6a20-4aa6-ac5a-a0548850f379"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing facts.
 */
var VMAX_FACTS = [
    "VMAX uses a virtual matrix architecture.",
    "A VMAX can have up to eight engines",
    "A VMAX supports V VOLS",
    "The code on a VMAX is called hypermax",
    "VMAX comes in a hybrid or an all flash model, but you should really only sell the all flash version.",
    "VMAXs are very heavy and big, but they are not old school big iron!",
    "VMAXs can be installed in customer racks",
    "VMAXs are known for six nines of reliability",
    "Want to know more about VMAX? Go to EMC World",
    "VMAX max capacity is equivalent to two hundred and fifty thousand iphones",
    "No one knows this but I secretly wish I ran on a a VMAX",
    "For the best deal on a VMAX, wait till the last hour of the last day of the last month of the quarter.",
    "VMAX is designed for everyday performance of 1 BILLION IOPS."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * askEMC is a child of AlexaSkill.
 */
var askEMC = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
askEMC.prototype = Object.create(AlexaSkill.prototype);
askEMC.prototype.constructor = askEMC;

askEMC.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("askEMC onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

askEMC.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("askEMC onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
askEMC.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("askEMC onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

askEMC.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask EMC tell me a VMAX fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random VMAX fact from the facts list
    var factIndex = Math.floor(Math.random() * VMAX_FACTS.length);
    var fact = VMAX_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact about VMAX: " + fact;

    response.tellWithCard(speechOutput, "askEMC", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the askEMC skill.
    var AskEMC = new askEMC();
    AskEMC.execute(event, context);
};

