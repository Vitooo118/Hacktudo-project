import "dotenv/config";
import express from "express";
import cors from "cors";
import pedagogicalRoutes from "./routes/pedagogical.routes.js";

const app = express();

// Configuração ampla de CORS para evitar bloqueios no preflight
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Força o atendimento a requisições de OPTIONS (preflight)
app.options("*", cors());

app.use(express.json());

app.use("/pedagogical", pedagogicalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});