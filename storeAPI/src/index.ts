import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { initializeDatabase } from "./db/config/sequelize";
// Stripe desativado temporariamente.
// Para reativar, descomente a linha abaixo e as configurações do webhook.
// import stripeRoutes from "./application/stripe/stripe.routes";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://storeapi-2e57.onrender.com",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://mystore.vercel.app",
    "https://mystore-git-main.vercel.app",
    "https://store-ohr1.vercel.app",
    "https://store-ohr1-git-main-thalesmenzs-projects.vercel.app",
    "https://store-ohr1-ctdps90it-thalesmenzs-projects.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

app.use(cors(corsOptions));

// Stripe desativado temporariamente.
// Para reativar o webhook do Stripe, descomente a linha abaixo e garanta que venha ANTES do express.json():
// app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

// Middleware JSON para outras rotas
app.use(express.json());

// Rotas
app.use("/api", routes);

// Inicializar banco de dados e criar tabelas se não existirem
initializeDatabase()
  .then(() => {
    console.log("✅ Banco de dados inicializado com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro ao inicializar banco de dados:", error);
  });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
  // Stripe desativado temporariamente.
  // Para reativar, reexiba o log abaixo com a URL do webhook:
  // console.log("Webhook endpoint: http://localhost:3001/api/stripe/webhook");
});

export { app };
