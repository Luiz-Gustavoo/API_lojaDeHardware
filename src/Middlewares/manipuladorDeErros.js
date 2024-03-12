/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

function ManipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({mensagem: "Um ou mais dados fornecidos estão incorretos."});
  } else {
    res.status(500).send({mensagem: "Erro interno do servidor."});
  }
}

export default ManipuladorDeErros;