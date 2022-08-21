const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

app.use(express.json());
app.use("/.netlify/functions/api", router);

require("./dialogFlowRoutes")(router);

module.exports.handler = serverless(app);
