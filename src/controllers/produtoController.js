import {produto} from "../models/index.js";
import naoEncontrado from "../Middlewares/manipulador404.js";
import requisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

const listarTodosProdutos = async (req, res, next) => {
  try {

    let {pagina = 1, limite = 3, ordenacao = "_id:-1"} = req.query;

    pagina = parseInt(pagina);
    limite = parseInt(limite);

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    if (pagina > 0 && limite > 0) {
      const listaProdutos = await produto.find()
        .sort({[campoOrdenacao] : ordem })
        .skip((pagina - 1) * limite)
        .limit(limite);
      
      res.status(200).json(listaProdutos);
    } else {
      requisicaoIncorreta(req, res, next, "Dados da paginação incorretos", 400);
    }
    
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

const listarProdutoPorFiltro = async (req, res, next) => {
  try {
    let {pagina = 1, limite = 3, ordenacao = "_id:-1"} = req.query;

    pagina = parseInt(pagina);
    limite = parseInt(limite);


    let [campoOrdenacao, ordem] = ordenacao.split(":");

    const busca = await processaBusca(req.query);

    if ((busca !== null) && (pagina > 0 && limite > 0)) {
      const produtoEncontrado = await produto.find(busca)
        .sort({[campoOrdenacao] : ordem})
        .skip((pagina - 1) * limite)
        .limit(limite);

      res.status(200).json(produtoEncontrado);

    } else {
      naoEncontrado(req, res, next, "Nenhum produto encontrado com base nesses filtros");
    }

  } catch (error) {
    next(error);
  }
};

function processaBusca(parametros) {
  const {nome, marca, categoria, minPreco, maxPreco} = parametros;

  const busca = {};

  if (nome) busca.nome = {$regex: nome, $options: "i"};
  if (marca) busca.marca = {$regex: marca, $options: "i"};
  if (categoria) busca.categoria = {$regex: categoria, $options: "i"};

  if (minPreco || maxPreco) busca.preco = {};
  if (minPreco) busca.preco.$gte = minPreco;
  if (maxPreco) busca.preco.$lte = maxPreco;

  return busca;
}

export default {
  listarTodosProdutos,
  listarProdutoPorId,
  listarProdutoPorFiltro,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto
};
