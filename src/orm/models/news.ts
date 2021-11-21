module.exports = (sequelize: any, DataTypes: any) => {
    const News = sequelize.define(
      "News",
      {
        id: {
          type: DataTypes.INTEGER,
        //   defaultValue: sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        cityId: { type: DataTypes.INTEGER, field: "city_id" },
        detail: DataTypes.STRING,
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        isRecommend: { type: DataTypes.INTEGER, field: "is_recommend" },
        orderNum: { type: DataTypes.INTEGER, field: "order_num" },
        status: DataTypes.INTEGER,
      },
      {
        tableName: "lot_news",
        timestamps: false,
      }
    );
    return News
  }