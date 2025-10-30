import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";
import Store from "./store.model";

export default class StoreCustomizations extends Model {
  public id!: string;
  public backgroundColorHeader!: string;
  public colorTextTitleHeader!: string;
  public titleHeaderText!: string;
  public imageBannerUrl!: string | null;
  public imageBannerKey!: string | null;
  public backgroundColorNavbar!: string;
  public colorTextNavbar!: string;
  public backgroundCatalog!: string;
  public storeId?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

StoreCustomizations.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    backgroundColorHeader: {
      type: DataTypes.STRING,
    },
    colorTextTitleHeader: {
      type: DataTypes.STRING,
    },
    titleHeaderText: {
      type: DataTypes.STRING,
    },
    imageBannerUrl: {
      type: DataTypes.STRING,
    },
    imageBannerKey: {
      type: DataTypes.STRING,
    },
    backgroundColorNavbar: {
      type: DataTypes.STRING,
    },
    colorTextNavbar: {
      type: DataTypes.STRING,
    },
    backgroundCatalog: {
      type: DataTypes.STRING,
    },
    fk_storeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Store,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "store-customizations-layout",
    timestamps: true,
  }
);

StoreCustomizations.belongsTo(Store, { foreignKey: "fk_storeId" });
Store.hasMany(StoreCustomizations, { foreignKey: "fk_storeId" });
