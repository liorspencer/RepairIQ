//Realizar todas as configurações do projeto
function definirConfiguracoes(app, pkg) {
    app.use(pkg.bodyParser.urlencoded({ extended: false }));
    app.use(pkg.bodyParser.json()); // Usar JSON na comunicação
    //Adicionar a configuração do CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //Permitir qualquer host
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
        app.use(pkg.cors());
        next();
    });
}
module.exports = { definirConfiguracoes };