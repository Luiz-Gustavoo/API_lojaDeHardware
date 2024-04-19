// eslint-disable-next-line no-unused-vars
function naoEncontrado(req, res, next, mensagem = "Página não encontrada", status = 404) {
  res.status(status).send({mensagem: mensagem, status: status});
}

export default naoEncontrado;