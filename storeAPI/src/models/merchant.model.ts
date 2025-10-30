import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";

export default class Merchant extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public stripeCustomerId?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Merchant.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "merchant",
    timestamps: true,
  }
);
