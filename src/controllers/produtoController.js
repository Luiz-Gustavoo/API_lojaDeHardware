import produto from "../models/Produto.js";


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
      res.status(400).send({message: "ID do produto não encontrado"});
    }
        
  } catch(error) {
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
    await produto.findByIdAndUpdate(id, req.body);
    res.status(200).json({message: "Produto alterado com sucesso"});
  } catch(error) {
    next(error);
  }
};

const deletarProduto = async (req, res, next) => {
  try {
    const id = req.params.id;
    await produto.findByIdAndDelete(id);
    res.status(200).json({message: "Produto deletado com sucesso"});
  } catch(error) {
    next(error);
  }
};

export default {
  listarTodosProdutos,
  listarProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto
};
