require("dotenv").config({ path: "../.env" });
const Folder = require("./Folder");

module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    "Notes",
    {
      note_title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      note_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      schema: process.env.DATABASE_SCHEMA,
      timestamps: true,
      createdAt: "created_at", // Rename createdAt column
      updatedAt: "updated_at", // Rename updatedAt column
      hooks: {
        beforeValidate: (instance, options) => {
          instance.setDataValue(
            "created_at",
            new Date().toLocaleDateString("jp-JP"),
          );
          instance.setDataValue(
            "updated_at",
            new Date().toLocaleDateString("jp-JP"),
          );
        },
        beforeUpdate: (instance, options) => {
          instance.setDataValue(
            "updated_at",
            new Date().toLocaleDateString("jp-JP"),
          );
        },
      },
    },
  );

  Notes.associate = (models) => {
    Notes.hasMany(models.Folder, {
      foreignKey: "FolderId", // Use the correct foreign key field in Folder model
      onDelete: "CASCADE", // Cascade deletion when a user is deleted
    });
  };

  return Notes;
};
