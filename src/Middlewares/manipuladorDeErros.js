import requisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import erroBase from "../errors/ErroBase.js";
import erroValidacao from "../errors/ErroValidacao.js";
import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function ManipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    requisicaoIncorreta(req, res, next);
  } 
  else if (error instanceof mongoose.Error.ValidationError) {
    erroValidacao(req, res, next, error);
  }else {
    erroBase(req, res, next);
  }
}

export default ManipuladorDeErros;