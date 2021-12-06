module.exports = (sequelize: any, DataTypes: any) => {
    const City = sequelize.define(
      "City",
      {
        id: {
          type: DataTypes.BIGINT,
          //   defaultValue: sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        orderNum: { type: DataTypes.INTEGER, field: "order_num" },
        status: DataTypes.INTEGER,
      },
      {
        tableName: "lot_city",
        timestamps: false,
      }
    );
    return City;
  };