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
        detail: DataTypes.TEXT,
        auditStatus: { type: DataTypes.INTEGER, field: "audit_status" },
        status: DataTypes.INTEGER,
      },
      {
        tableName: "lot_ads_info",
        timestamps: false,
      }
    );
    return AdsInfo
  }