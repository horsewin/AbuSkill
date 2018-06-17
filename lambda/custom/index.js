'use strict';
const Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build

const STATE = require("./state");
const MESSAGE = require("./message");
const appId = require("../../.ask/config").deploy_settings.default.skill_id;

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, ' ', 4));

    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(
        handlers,
        ActionHandler,
        CountHandler,
        CheerHandler,
        ChallengeHandler,
        BuaCountHandler
        );
    alexa.appId = appId;
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('MuscleIntent');
    },
    'MuscleIntent': function () {
        this.handler.state = STATE.LOGIN;
        this.response.speak(MESSAGE.login.speak)
            .listen(MESSAGE.login.reprompt);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak(MESSAGE.exit.speak);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak(MESSAGE.help.speak)
            .listen(MESSAGE.help.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled' : function() {
        this.response.speak(MESSAGE.error.speak)
            .listen(MESSAGE.error.reprompt);
    }
};

const ActionHandler = Alexa.CreateStateHandler(STATE.LOGIN, {
    'MuscleIntent': function() {
        this.emitWithState('AMAZON.YesIntent');
    },
    'AMAZON.YesIntent': function () {
            this.handler.state = STATE.COUNT;
        this.response.speak(MESSAGE.count.speak)
            .listen(MESSAGE.count.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        this.handler.state = STATE.CHALLENGE;
        this.response.speak(MESSAGE.challenge.speak)
            .listen(MESSAGE.challenge.reprompt);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak(MESSAGE.exit.speak);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak(MESSAGE.help.speak)
            .listen(MESSAGE.help.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled' : function() {
        this.response.speak(MESSAGE.error.speak)
            .listen(MESSAGE.error.reprompt);
    }
});

const CountHandler = Alexa.CreateStateHandler(STATE.COUNT, {
    'MuscleIntent': function () {
        this.handler.state = STATE.BUA_COUNT;
        this.response.speak(MESSAGE.bua_count.speak)
            .listen(MESSAGE.bua_count.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function () {
        this.emitWithState('MuscleIntent');
    },
    'AMAZON.NoIntent': function () {
        this.handler.state = STATE.CHEER;
        this.response.speak(MESSAGE.cheer.speak)
            .listen(MESSAGE.cheer.reprompt);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak(MESSAGE.exit.speak);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak(MESSAGE.help.speak)
            .listen(MESSAGE.help.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled' : function() {
        this.response.speak(MESSAGE.error.speak)
            .listen(MESSAGE.error.reprompt);
    }
});


const CheerHandler = Alexa.CreateStateHandler(STATE.CHEER, {
    'AMAZON.YesIntent': function () {
        this.handler.state = STATE.BUA_COUNT;
        this.response.speak(MESSAGE.bua_count.speak)
            .listen(MESSAGE.bua_count.reprompt);
        this.emit(':responseReady');
        },
    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak(MESSAGE.exit.speak);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak(MESSAGE.help.speak)
            .listen(MESSAGE.help.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled' : function() {
        this.response.speak(MESSAGE.error.speak)
            .listen(MESSAGE.error.reprompt);
    }
});

const ChallengeHandler = Alexa.CreateStateHandler(STATE.CHALLENGE, {
    'MuscleIntent': function () {
      this.emitWithState('AMAZON.YesIntent');
    },
    'AMAZON.YesIntent': function () {
        this.handler.state = STATE.COUNT;
        this.response.speak(MESSAGE.count.speak)
            .listen(MESSAGE.count.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak(MESSAGE.exit.speak);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled' : function() {
        this.response.speak(MESSAGE.error.speak)
            .listen(MESSAGE.error.reprompt);
    }
});

const BuaCountHandler = Alexa.CreateStateHandler(STATE.BUA_COUNT, {
    'MuscleIntent': function () {
        this.emitWithState('AMAZON.YesIntent');
    },
    'AMAZON.YesIntent': function () {
        this.handler.state = STATE.COUNT;
        this.response.speak(MESSAGE.count.speak)
            .listen(MESSAGE.count.reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak(MESSAGE.exit.speak);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled' : function() {
        this.response.speak(MESSAGE.error.speak)
            .listen(MESSAGE.error.reprompt);
    }
});
