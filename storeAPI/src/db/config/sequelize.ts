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

// Função para inicializar o banco de dados
// NOTA: Esta função assume que o banco de dados já existe.
// Se você precisar criar o banco automaticamente, será necessário usar um usuário com privilégios de CREATE DATABASE.
export const initializeDatabase = async () => {
  try {
    // Testa a conexão com o banco de dados (assumindo que já existe)
    await sequelize.authenticate();
    console.log(`✅ Conexão com o banco de dados '${dbDatabase}' estabelecida com sucesso.`);
    
    // Sincroniza os modelos (cria as tabelas se não existirem)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com sucesso.');
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
    throw error;
  }
};

export default sequelize;
