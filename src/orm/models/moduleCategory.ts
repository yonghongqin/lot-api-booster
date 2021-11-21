module.exports = (sequelize: any, DataTypes: any) => {
  const ModuleCategory = sequelize.define(
    "ModuleCategory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      cityId: { type: DataTypes.INTEGER, field: "city_id" },
      namespace: DataTypes.STRING,
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      sort: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      tableName: "lot_module_category",
      timestamps: false,
    }
  );

  // ModuleCateory.associate = (models: any) => {
  //   // associations can be defined here
  //   Address.Country = Address.belongsTo(models.Country)
  //   Address.ProvinceState = Address.belongsTo(models.ProvinceState)
  //   Address.User = Address.belongsTo(models.User)
  // }


  return ModuleCategory
}