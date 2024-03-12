import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String},
    marca: {type: String},
    preco: {type: Number},
    estoque: {type: Number},
    categoria: {type: String}
}, {versionKey: false});

const produto = mongoose.model('hardwares', produtoSchema);

export default produto;