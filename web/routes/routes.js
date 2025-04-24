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

    app.get("/abrirOcorrencia", (req,res) => {
        res.render("pages/abrirOcorrencia", {
            titulo: "abrir Ocorrencia",
        })
        console.log("abrirOcorrencia Acessado.")
    })

    app.get("/almoxarifadoPedido", (req,res) => {
        res.render("pages/almoxarifadoPedido", {
            titulo: "Pedido ao Almoxarifado",
        })
        console.log("almoxarifadoPedido Acessado.")
    })

    app.get("/cadastroFuncion", (req,res) => {
        res.render("pages/cadastroFuncion", {
            titulo: "Cadastro de Funcionários",
        })
        console.log("cadastroFuncion Acessado.")
    })

    app.get("/cadastroMaq", (req,res) => {
        res.render("pages/cadastroMaq", {
            titulo: "Cadastro de Maquinas",
        })
        console.log("cadastroMaq Acessado.")
    })

    app.get("/comandos", (req,res) => {
        res.render("pages/comandos", {
            titulo: "Comandos",
        })
        console.log("comandos Acessado.")
    })

    app.get("/configuracoes", (req,res) => {
        res.render("pages/configuracoes", {
            titulo: "Configurações",
        })
        console.log("configuracoes Acessado.")
    })

    app.get("/gerenEquipamentos", (req,res) => {
        res.render("pages/gerenEquipamentos", {
            titulo: "Gerenciamento de Equipamentos",
        })
        console.log("gerenEquipamentos Acessado.")
    })

    app.get("/inicial", (req,res) => {
        res.render("pages/inicial", {
            titulo: "Pagina Inicial",
        })
        console.log("inicial Acessado.")
    })

    app.get("/listaOcorrencia", (req,res) => {
        res.render("pages/listaOcorrencia", {
            titulo: "Lista Ocorrencia",
        })
        console.log("comandos Acessado.")
    })

    app.get("/listaOs", (req,res) => {
        res.render("pages/listaOs", {
            titulo: "Lista Os",
        })
        console.log("listaOs Acessado.")
    })

    app.get("/notificacoes", (req,res) => {
        res.render("pages/notificacoes", {
            titulo: "Notificacoes",
        })
        console.log("notificacoes Acessado.")
    })
}


module.exports={definirRotas};