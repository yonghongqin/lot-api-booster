module.exports = (sequelize: any, DataTypes: any) => {
  const Dict = sequelize.define(
    "Dict",
    {
      id: {
        type: DataTypes.BIGINT,
        //   defaultValue: sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      dictType: { type: DataTypes.INTEGER, field: "dict_type" },
      dictLabel: { type: DataTypes.STRING, field: "dict_label" },
      dictValue: { type: DataTypes.STRING, field: "dict_value" },
      status: DataTypes.INTEGER,
    },
    {
      tableName: "sys_dict_data",
      timestamps: false,
    }
  );
  return Dict;
};
