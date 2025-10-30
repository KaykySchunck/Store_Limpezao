import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config/sequelize";
import Store from "./store.model"; // Importação direta do modelo Store
import Categorie from "./categorie.model";
// Importação direta do modelo Category

class Item extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public stock!: number;
  public value!: number;
  public fk_idstore!: string;
  public fk_idcategory!: string;
}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fk_idstore: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Store, // Referência direta ao modelo Store
        key: "id",
      },
    },
    fk_idcategory: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Categorie, // Referência direta ao modelo Category
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "itens",
    timestamps: true,
  }
);

// Associações
Item.belongsTo(Store, {
  foreignKey: "fk_idstore",
  as: "store",
});

Item.belongsTo(Categorie, {
  foreignKey: "fk_idcategory",
  as: "category",
});

export default Item;
