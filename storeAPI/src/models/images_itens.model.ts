import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";
import Item from "./itens.model";

class ImageItens extends Model {
  public id!: string;
  public url!: string;
  public key!: string;
  public fk_id_item!: string;
}

ImageItens.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_id_item: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Item,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "images_itens",
    timestamps: true,
  }
);

// Definindo a relação entre Item e ImageItens
Item.hasMany(ImageItens, {
  foreignKey: "fk_id_item",
  as: "images", // Nome da associação
});

ImageItens.belongsTo(Item, {
  foreignKey: "fk_id_item",
  as: "item", // Nome da associação
});

export default ImageItens;
