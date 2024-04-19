import requisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function ManipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    requisicaoIncorreta(req, res, next);
  } 
  else if (error instanceof mongoose.Error.ValidationError) {
    let mensagensErro = "";
    for (let erro in error.errors) {
      mensagensErro += `${error.errors[erro].message + "; "}`;
    }
    res.status(400).send({mensagem: `Os seguintes erros foram encontrados: ${mensagensErro}`, status: 400});
    
  }else {
    res.status(500).send({mensagem: "Erro interno do servidor.", status: 500});
  }
}

export default ManipuladorDeErros;