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
    app.get("/dashboard", (req,res) => {
        res.render("pages/dashboard", {
            titulo: "Dashboard",
        })
        console.log("Dashboard Acessado.")
    })
}
module.exports={definirRotas};