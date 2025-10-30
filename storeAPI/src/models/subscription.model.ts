import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";
import Merchant from "./merchant.model";

export default class Subscription extends Model {
  public id!: string;
  public stripeSubscriptionId!: string;
  public stripeCustomerId!: string;
  public stripePriceId!: string;
  public status!: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  public currentPeriodStart!: Date;
  public currentPeriodEnd!: Date;
  public cancelAtPeriodEnd!: boolean;
  public canceledAt?: Date;
  public fk_merchantId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripePriceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'canceled', 'past_due', 'unpaid', 'trialing'),
      allowNull: false,
      defaultValue: 'active',
    },
    currentPeriodStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    currentPeriodEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cancelAtPeriodEnd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canceledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fk_merchantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Merchant,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "subscriptions",
    timestamps: true,
  }
);

Subscription.belongsTo(Merchant, { foreignKey: "fk_merchantId" });
Merchant.hasOne(Subscription, { foreignKey: "fk_merchantId" }); 