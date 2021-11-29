module.exports = (sequelize: any, DataTypes: any) => {
    const AdsPrice = sequelize.define(
      "AdsPrice",
      {
        id: {
          type: DataTypes.BIGINT,
        //   defaultValue: sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        cityId: { type: DataTypes.INTEGER, field: "city_id" },
        namespace: DataTypes.STRING,
        type: DataTypes.INTEGER,
        adsDuration: { type: DataTypes.INTEGER, field: "ads_duration" }, // 有效时长
        adsRate: { type: DataTypes.FLOAT, field: "ads_rate" }, // 广告费
        status: DataTypes.INTEGER,
      },
      {
        tableName: "lot_ads_price",
        timestamps: false,
      }
    );
    return AdsPrice
  }