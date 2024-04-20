function erroValidacao(req, res, next, error) {
  let mensagensErro = "";
  for (let erro in error.errors) {
    mensagensErro += `${error.errors[erro].message + "; "}`;
  }
  res.status(400).send({mensagem: `Os seguintes erros foram encontrados: ${mensagensErro}`, status: 400});
    
}

export default erroValidacao;