import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";

export default class Categorie extends Model {
  public id!: string;
  public name!: string;
  public fk_idstore!: string;
}

Categorie.init(
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
    fk_idstore: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
  }
);
