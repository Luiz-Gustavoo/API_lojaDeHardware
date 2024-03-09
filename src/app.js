import express from 'express';
import conectarDatabase from './config/dbConnect.js';
import routes from './config/routes/produtoRoutes.js';

const conexao = await conectarDatabase();

conexao.on("error", (error) => {
    console.log("Erro ao conectar ao banco de dados", error);
});

conexao.once("open", () => {
    console.log("Conexão com banco de dados feita com sucesso");
});

const app = express();

app.use(express.json());
app.use(routes);

export default app;