function chatController() {
  return {
    index(req, res) {
      return res.render("index");
    },
  };
}

module.exports = chatController;
