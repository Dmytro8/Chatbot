module.exports = (router) => {
  router.get("/", (req, res) => {
    res.json({
      message: "Hi! I'm GET Route",
    });
  });

  router.post("/df_text_query", (req, res) => {
    res.send({
      do: "text query",
    });
  });

  router.post("/df_event_query", (req, res) => {
    res.send({
      do: "event query",
    });
  });
};
