require("dotenv").config({ path: "../.env" });

module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define(
    "Folder",
    {
      folder_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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

  return Folder;
};
