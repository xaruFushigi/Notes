module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Notes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define other columns here
      note_title: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      note_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      FolderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Folders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Notes");
  },
};
