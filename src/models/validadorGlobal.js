import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", 
  {validator: (valor) => {
    return valor !== "";},
  message: (props) => `O campo '${props.path}' foi fornecido em branco.`
  });

mongoose.Schema.Types.Number.set("validate", 
  {validator: (valor) => {
    return valor > 0 && valor < 100000;
  },
  message: (props)  => `O valor '${props.value}' fornecido no campo '${props.path}' é inválido.`
  });


