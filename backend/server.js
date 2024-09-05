var express = require('express')
const session = require('express-session');
var cors = require('cors')
const jwt = require("jsonwebtoken");

var app = express()
const secretKey = "your-secret-key";

//configurações da aplicação
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));

//emulando banco de dados
var dados = {
    usuarios: [
        {id: '1', nome:'Teste da Silva', email: 'teste@teste.com', senha: '1234', idade: '18'}, 
        {id: '2', nome:'dartanha portes', email: 'dartanhanp@uol.com', senha: '8419', idade: '38'},
        {id: '3', nome:'Fiona Shirek', email: 'fionashirek@gmail.com', senha: '2010', idade: '15'},       
    ]
}

//Função para gerar o token de acesso da sessão
const generateToken = (userID) => {
    return jwt.sign({userID}, secretKey, { expiresIn: 60 * 60});
};

//checagem de token de acesso
function verifyJWT(req, res, next){
    console.log('verify ', req.body)
    let token = req.body.sessionID
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva na sessão para uso posterior
      req.session.usuarioID = decoded.userID;
      console.log('verify: ', req.session)
      next();
    });
}

//função para carregar dados do usuario a partir do ID
function findUserByID(userID){
    let encontrado = {}
    
    dados.usuarios.forEach((usuario)=>{
        console.log(usuario.id, userID)
        if(usuario.id==userID){
            encontrado = usuario
        }
    })
    
    return encontrado
}

app.post('/login', (req, res, next)=>{

    //o que veio de dados do front
    console.log( req.body)
 
    let logado = false
    let usuarioLogado = {}
    dados.usuarios.forEach((usuario)=>{
        if(usuario.email==req.body.email && usuario.senha==req.body.senha){
            logado = true
            usuarioLogado = usuario
        }
    })

    if(logado){
        //obter a sessao
        const sessionData = req.session;
        //gravar o id do usuario logado na sessao
        req.session.isLogado = true;
        req.session.usuarioID = usuarioLogado.id;
        console.log('login ', req.session)
        //gerar o token da sessão
        const token = generateToken(usuarioLogado.id);
        res.send({sessionID: token})        
    }else{
        res.send('Error....')
    }
        
})

app.post('/test', verifyJWT, (req, res, next)=>{

    //recuperar dados a sessão
    const sessionData = req.session;
    console.log('test ', sessionData)

    //com id correto posso buscar o resto das informações do usuario
    let usuario = findUserByID(sessionData.usuarioID)
    console.log(usuario)
    res.send(usuario.nome)
})


app.listen(8080)