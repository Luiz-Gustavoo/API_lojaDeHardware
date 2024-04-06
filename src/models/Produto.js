import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId
    },

    nome: {
      type: String, 
      required: [true, "O nome do produto é obrigatório"]
    },
    marca: {
      type: String, 
      required: [true, "A marca do produto é obrigatória"]
    },

    preco: {
      type: Number, 
      required: [true, "o preço do produto é obrigatório"],    
    },

    estoque: {
      type: Number, 
      required: [true, "A quantidade em estoque do produto é obrigatória"]},

    categoria: {
      type: String,
      required: [true, "A categoria do produto é obrigatória"]
    }
      
  }, 
  {
    versionKey: false}
);

const produto = mongoose.model("hardwares", produtoSchema);

export default produto;