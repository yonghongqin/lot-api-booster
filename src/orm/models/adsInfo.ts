module.exports = (sequelize: any, DataTypes: any) => {
  const AdsInfo = sequelize.define(
    "AdsInfo",
    {
      id: {
        type: DataTypes.BIGINT,
        //   defaultValue: sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      cityId: { type: DataTypes.INTEGER, field: "city_id" },
      banner: DataTypes.STRING,
      namespace: DataTypes.STRING,
      subject: DataTypes.STRING,
      summary: DataTypes.STRING,
      type: DataTypes.INTEGER,
      detail: DataTypes.TEXT,
      adsRate: { type: DataTypes.FLOAT, field: "ads_rate" }, // 广告费
      paymentProof: { type: DataTypes.STRING, field: "payment_proof" }, // 付款截图
      auditFailReason: { type: DataTypes.STRING, field: "audit_fail_reason" }, // 审核失败原因
      adsDuration: { type: DataTypes.INTEGER, field: "ads_duration" }, // 有效时长
      discountSubtitle: { type: DataTypes.STRING, field: "discount_subtitle" }, // 优惠子标题
      discountOriginRate: {type: DataTypes.FLOAT, field: "discount_origin_rate" },
      discountNowRate: { type: DataTypes.FLOAT, field: "discount_now_rate" },
      auditStatus: { type: DataTypes.INTEGER, field: "audit_status" },
      status: DataTypes.INTEGER,
    },
    {
      tableName: "lot_ads_info",
      timestamps: false,
    }
  );
  return AdsInfo;
};
