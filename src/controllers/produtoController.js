import {produto} from "../models/index.js";
import naoEncontrado from "../Middlewares/manipulador404.js";

const listarTodosProdutos = async (req, res, next) => {
  try {
    const listaProdutos = await produto.find({});
    res.status(200).json(listaProdutos);
  } catch (error) {
    next(error);
  }
};

const listarProdutoPorId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const produtoEncontrado = await produto.findById(id);

    if (produtoEncontrado !== null) {
      res.status(200).json(produtoEncontrado);
    }
    else {
      naoEncontrado(req, res, next, "ID do produto não encontrado", 400);
      
    }
        
  } catch(error) {
    next(error);
        
  }
};

const listarProdutoPorFiltro = async (req, res, next) => {
  try {
    const {nome, marca, categoria, minPreco, maxPreco} = req.query;

    const busca = {};

    if (nome) busca.nome = {$regex: nome, $options: "i"};
    if (marca) busca.marca = {$regex: marca, $options: "i"};
    if (categoria) busca.categoria = {$regex: categoria, $options: "i"};

    if (minPreco || maxPreco) busca.preco = {};
    if (minPreco) busca.preco.$gte = minPreco;
    if (maxPreco) busca.preco.$lte = maxPreco;

    const produtoEncontrado = await produto.find(busca);

    if (produtoEncontrado.length !== 0) {
      res.status(200).json(produtoEncontrado);
    }
    else {
      naoEncontrado(req, res, next, "Produto não encontrado com esses filtros", 400);
    }
  } catch (error) {
    next(error);
  }
};

const cadastrarProduto = async (req, res, next) => {
  try {
    const novoProduto = await produto.create(req.body);
    res.status(201).json({message: "Produto criado com sucesso", produto: novoProduto});
  } catch(error) {
    next(error);
  }
};

const atualizarProduto = async (req, res, next) => {
  try {
    const id = req.params.id;
    const produtoAlterado = await produto.findByIdAndUpdate(id, req.body);

    if (produtoAlterado !== null) {
      res.status(200).json({message: "Produto alterado com sucesso"});
    }
    else {
      naoEncontrado(req, res, next, "Produto não encontrado para alteração", 400);
    }

    
  } catch(error) {
    next(error);
  }
};

const deletarProduto = async (req, res, next) => {
  try {
    const id = req.params.id;
    const produtoDeletado = await produto.findByIdAndDelete(id);

    if (produtoDeletado !== null) {
      res.status(200).json({message: "Produto deletado com sucesso"});
    }
    else {
      naoEncontrado(req, res, next, "Produto não encontrado para exclusão", 400);
    }
  } catch(error) {
    next(error);
  }
};

export default {
  listarTodosProdutos,
  listarProdutoPorId,
  listarProdutoPorFiltro,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto
};
