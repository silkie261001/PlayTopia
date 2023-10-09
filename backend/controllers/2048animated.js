function animatedGameController() {
  return {
    index(req, res) {
      return res.render("index");
    },
  };
}

module.exports = animatedGameController;
