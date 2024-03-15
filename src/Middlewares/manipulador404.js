// eslint-disable-next-line no-unused-vars
function manipulador404(req, res, next) {
  res.status(404).send({mensagem: "Página não encontrada"});
}

export default manipulador404;