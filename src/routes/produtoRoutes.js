import express from "express";
import produtoController from "../controllers/produtoController.js";

const routes = express.Router();

routes.get("/hardwares", produtoController.listarTodosProdutos);
routes.get("/hardwares/:id", produtoController.listarProdutoPorId);
routes.post("/hardwares", produtoController.cadastrarProduto);
routes.put("/hardwares/:id", produtoController.atualizarProduto);
routes.delete("/hardwares/:id", produtoController.deletarProduto);

export default routes;