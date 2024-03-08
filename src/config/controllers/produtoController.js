import produto from "../models/Produto.js";

const listarTodosProdutos = async (req, res) => {
    try {
        const listaProdutos = await produto.find({});
        res.status(200).json(listaProdutos);
    } catch(error) {
        res.status(500).json({message: `${error.message} -- Falha na requisição dos produtos`});
    }
}

const listarProdutoPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const produtoEncontrado = await produto.findById(id);
        res.status(200).json(produtoEncontrado);
    } catch(error) {
        res.status(500).json({message: `${error.message} -- Falha na requisição do produto`});
    }
}

const cadastrarProduto = async (req, res) => {
    try {
        const novoProduto = await produto.create(req.body);
        res.status(201).json({message: "Produto criado com sucesso", produto: novoProduto});
    } catch(error) {
        res.status(500).json({message: `${error.message} -- Falha ao cadastrar produto`});
    }
}

const atualizarProduto = async (req, res) => {
    try {
        const produtoAlterado = await produto.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({message: "Produto alterado com sucesso"});
    } catch(error) {
        res.status(500).json({message: `${error.message} -- Falha ao cadastrar produto`});
    }
}

const deletarProduto = async (req, res) => {
    try {
        const id = req.params.id;
        await produto.findByIdAndDelete(id);
        res.status(200).json({message: "Produto deletado com sucesso"});
    } catch(error) {
        res.status(500).json({message: `${error.message} -- Falha ao deletar produto`});
    }
}

export default {
    listarTodosProdutos,
    listarProdutoPorId,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
}
