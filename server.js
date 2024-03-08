/*
esse arquivo serve para iniciar o servidor express
*/

import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Servidor rodando! link: http://localhost:3000/');
});

