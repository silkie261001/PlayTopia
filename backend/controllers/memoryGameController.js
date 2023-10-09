function memoryGameController() {
  return {
    index(req, res) {
      return res.render("index");
    },
  };
}

module.exports = memoryGameController;
