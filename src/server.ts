import "dotenv/config";
import express from "express";
import cors from "cors";
import pedagogicalRoutes from "./routes/pedagogical.routes.js";

const app = express();

// Configuração de CORS permitindo explicitamente o seu frontend
app.use(cors({
    origin: "https://happy-code-shelter.lovable.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Corrige o preflight usando uma expressão regular válida para o Express
app.options(/(.*)/, cors());

app.use(express.json());

app.use("/pedagogical", pedagogicalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});