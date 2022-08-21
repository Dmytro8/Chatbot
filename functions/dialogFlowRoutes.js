const chatbot = require("../chatbot/chatbot");

module.exports = (router) => {
  router.get("/", (req, res) => {
    res.json({
      message: "Hi! I'm GET Route",
    });
  });

  router.post("/df_text_query", async (req, res) => {
    const responses = await chatbot.textQuery(
      req.body.text,
      req.body.parameters
    );

    res.send(responses[0].queryResult);
  });

  router.post("/df_event_query", async (req, res) => {
    const responses = await chatbot.eventQuery(
      req.body.event,
      req.body.parameters
    );

    res.send(responses[0].queryResult);
  });
};
