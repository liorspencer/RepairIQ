function definirRotas(app){
    app.get("/", (req,res) => {
        res.render("index", {
            titulo: "Página Inicial",
            mensagem: "Se você está vendo isso, funcionou!"
        });
        console.log("Acessado.")
    });
}
module.exports={definirRotas};