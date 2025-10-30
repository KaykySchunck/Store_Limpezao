import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";

export default class Store extends Model {
  public id!: string;
  public name!: string;
  public url!: string;
  public whatsApp!: string;
  public merchantId!: string;
}

Store.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsApp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merchantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "merchant",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "store",
    timestamps: true,
  }
);
