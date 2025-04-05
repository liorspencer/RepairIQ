function definirRotas(app){
    app.get("/", (req,res) => {
        res.render("index", {
            titulo: "Página Inicial",
            mensagem: "Se você está vendo isso, funcionou!"
        });
        console.log("Página Inicial Acessado.")
    });
    app.get("/login", (req,res) => {
        res.render("pages/login", {
            titulo: "Login",
        })
        console.log("Login Acessado.")
    })
}
module.exports={definirRotas};