function definirRotas(app){
    app.get("/", (req,res) => {
        res.send("Funcionou!");
        console.log("Acessado com sucesso!");
    })
}
module.exports={definirRotas};