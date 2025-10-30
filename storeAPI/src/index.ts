import express from "express";
import cors from "cors";
import routes from "./routes/index";
import stripeRoutes from "./application/stripe/stripe.routes";

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

// Configuração especial para webhook do Stripe (raw body)
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

// Middleware JSON para outras rotas
app.use(express.json());

// Rotas
app.use("/api", routes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
  console.log("Webhook endpoint: http://localhost:3001/api/stripe/webhook");
});

export { app };
