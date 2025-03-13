//Importando os módulos
const pkg = require("./imports/import")
const app = pkg.express();

//Importando as configurações
const config = require("./config/config");
config.definirConfiguracoes(app,pkg);

//Importando as configurações de banco de dados
const bd = require("./db/db_config");

//Importando as rotas
const rotas = require("./routes/routes");
rotas.definirRotas(app);

app.listen(process.env.PORTA_SERVIDOR, () => {console.log("Iniciado com sucesso!")});