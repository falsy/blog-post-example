const boardModel = require("./boards");
const likeModel = require("./likes");

module.exports = (Sequelize, sequelize) => {
  const boards = boardModel(Sequelize, sequelize);
  const likes = likeModel(Sequelize, sequelize, boards);

  return {
    boards,
    likes
  };
};
