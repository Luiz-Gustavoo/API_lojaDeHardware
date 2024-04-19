function requisicaoIncorreta(req, res, next, mensagem ="Um ou mais dados fornecidos estão incorretos", status = 400) {
  res.status(status).send({mensagem: mensagem, status: status});
}

export default requisicaoIncorreta;