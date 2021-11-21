module.exports = (sequelize: any, DataTypes: any) => {
    const Discount = sequelize.define(
      "Discount",
      {
        id: {
          type: DataTypes.BIGINT,
        //   defaultValue: sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        cityId: { type: DataTypes.INTEGER, field: "city_id" },
        logo: DataTypes.STRING,
        discountTitle: { type: DataTypes.STRING, field: "discount_title" },
        discountSubtitle: { type: DataTypes.STRING, field: "discount_subtitle" },
        discountContent: { type: DataTypes.TEXT, field: "discount_content" },
        auditStatus: { type: DataTypes.INTEGER, field: "audit_status" },
        discountOriginRate: { type: DataTypes.FLOAT, field: "discount_origin_rate" },
        discountNowRate: { type: DataTypes.FLOAT, field: "discount_now_rate" },
        status: DataTypes.INTEGER,
      },
      {
        tableName: "lot_discount",
        timestamps: false,
      }
    );
    return Discount
  }