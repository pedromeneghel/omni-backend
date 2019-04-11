const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').Server(app); //conexão http com front end
const io = require('socket.io')(server); //conexão ws com front end

io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://pedromeneghel:Bcs03Nti@cluster0-as1jw.mongodb.net/bancoOmini?retryWrites=true',
    {
        useNewUrlParser : true
    }
);


app.use((req, res, next) => {
    req.io = io ;

    return next();
});

app.use(express.json());
app.use(express.urlencoded( { extended : true})); //upload de arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'tmp'))); //verificar por que não está gravando e buscando as imagens corretamente
app.use(require('./routes'));

//Criando realtime, para notificar usuários dos novos arquivos


server.listen(3333);