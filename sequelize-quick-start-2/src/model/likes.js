module.exports = (Sequelize, sequelize, boardModel) => {
  const likes = sequelize.define("likes", {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    board_id: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      references: {
        model: boardModel,
        key: "id"
      },
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false
    }
  });

  likes.sync();
  return likes;
};
