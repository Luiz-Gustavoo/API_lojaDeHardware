function erroBase(req, res, next, mensagem = "Erro interno no servidor", status = 500) {
  res.status(status).send({mensagem: mensagem, status: status});
}

export default erroBase;