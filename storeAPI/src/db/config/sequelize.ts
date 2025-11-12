import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.MYSQL_USER;
const dbPassword = process.env.MYSQL_PASS;
const dbDatabase = process.env.DB_MYSQL_NAME;

if (!dbHost || !dbUser || !dbPassword || !dbDatabase) {
  throw new Error(
    "As variáveis de ambiente do banco de dados não estão configuradas corretamente."
  );
}

const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Função para criar o banco de dados se não existir
const createDatabaseIfNotExists = async () => {
  try {
    // Conecta sem especificar o banco de dados
    const tempSequelize = new Sequelize("mysql", dbUser, dbPassword, {
      host: dbHost,
      dialect: "mysql",
      logging: false,
    });

    // Cria o banco de dados se não existir
    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbDatabase}\`;`);
    console.log(`✅ Banco de dados '${dbDatabase}' verificado/criado com sucesso.`);
    
    await tempSequelize.close();
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error);
    throw error;
  }
};

// Função para inicializar o banco de dados
export const initializeDatabase = async () => {
  try {
    // Primeiro cria o banco de dados se não existir
    await createDatabaseIfNotExists();
    
    // Testa a conexão
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza os modelos (cria as tabelas se não existirem)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com sucesso.');
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
    throw error;
  }
};

export default sequelize;
