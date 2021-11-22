module.exports = (sequelize: any, DataTypes: any) => {
    const House = sequelize.define(
      "House",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        cityId: { type: DataTypes.INTEGER, field: "city_id" },
        mainPic: { type: DataTypes.STRING, field: "main_pic" },
        subject: DataTypes.STRING,
        houseCategory: { type: DataTypes.STRING, field: "house_category" },
        renovationCategory: { type: DataTypes.STRING, field: "renovation_category" },
        floorPlan: { type: DataTypes.STRING, field: "floor_plan" },
        floorArea: { type: DataTypes.STRING, field: "floor_area" },
        totalPrice: { type: DataTypes.FLOAT, field: "total_price" },
        isRecommend: { type: DataTypes.BOOLEAN, field: "is_recommend" },
        status: DataTypes.INTEGER,
      },
      {
        tableName: "lot_house",
        timestamps: false,
      }
    );
    return House
  }