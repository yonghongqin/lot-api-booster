"use strict";
module.exports = (sequelize: any, DataTypes: any) => {
  let ClientMenu = sequelize.define(
    "ClientMenu",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      menuName: { type: DataTypes.STRING, field: "menu_name" },
      displayLevel: { type: DataTypes.INTEGER, field: "display_level" },
      tabType: { type: DataTypes.INTEGER, field: "tab_type" },
      visible: DataTypes.INTEGER,
      cityId: { type: DataTypes.INTEGER, field: "city_id" },
      menuUrl: { type: DataTypes.STRING, field: "menu_url" },
      icon: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      tableName: "lot_client_menu",
      timestamps: false,
    }
  );

  return ClientMenu;
};
