"use strict";

const dialogFlow = require("dialogflow");
const config = require("../config/keys");
const { struct } = require("pb-util");

const projectID = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogFlow.SessionsClient({
  projectID,
  credentials,
});
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

module.exports = {
  textQuery: async (text, parameters = {}) => {
    const self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };
    const responses = await sessionClient
      .detectIntent(request)
      .then(self.handleAction);
    return responses;
  },
  eventQuery: async (event, parameters = {}) => {
    const self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          parameters: struct.encode(parameters),
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };
    const responses = await sessionClient
      .detectIntent(request)
      .then(self.handleAction);
    return responses;
  },
  handleAction: (responses) => {
    return responses;
  },
};
