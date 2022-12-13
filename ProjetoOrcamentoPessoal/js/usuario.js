class User{
    constructor(username, password){
        this.username = username
        this.password = password
    }
    validarUsuario(){
        for (let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null ){
                return false
            }
        }
        return true
    }
}

class BdUsuario{
    constructor(){
        let idUser = localStorage.getItem('idUser')

        if (idUser === null){
            localStorage.setItem('idUser', 10000)
        } 
    }

    getProximoId(){
        let proximoId = localStorage.getItem('idUser')//null
        return parseInt(proximoId)+1
    }

    gravar(u){

        if(this.pesquisarLogin(u)){
            alert('Nome de Usuário indisponível')
        }else{
            let idUser = this.getProximoId()

            localStorage.setItem(idUser, JSON.stringify(u))
            localStorage.setItem('idUser', idUser)
            document.getElementById('cadUser').value=''
            document.getElementById('cadUserPass').value=''
            alert('Cadastro realizado com sucesso')
        }

    }

    pesquisarLogin(usuario){
        let todosUsuarios = []
        todosUsuarios = this.recuperarTodosUser();

        for(let x in todosUsuarios){
            if(todosUsuarios[x].username == usuario.username){
                return true
            }
        }

    }

    recuperarTodosUser(){
        let usuarios = []

        let id = localStorage.getItem('idUser')

        for(let i = 10000; i<=id ;i++){
            let usuario = JSON.parse(localStorage.getItem(i))

            //verificar indices removidos para pular 
            if(usuario === null){
                continue
            }

            usuario.id = i
            usuarios.push(usuario)
        }
        return usuarios
    }

    pesquisar(usuario){
        let todosUsuarios = []
        todosUsuarios = this.recuperarTodosUser();

        for(let x in todosUsuarios){
            if(todosUsuarios[x].username == usuario.username && todosUsuarios[x].password == usuario.password){
                return true
            }
        }

    }
}

function cadastroUsuario(){ 
    let username = document.getElementById('cadUser')
    let password = document.getElementById('cadUserPass')

    let usuario = new User(
        username.value,
        password.value
    )
    if(usuario.validarUsuario()){
        bdUsuario.gravar(usuario)
        
        //todo limpar campos e alerta de sucesso e fechar modal de cadastro
    }else{
        alert('Por favor, digite um Usuario e uma senha')
    }
}



function verificarUsuario(){ 
    const userLogin = document.getElementById('userLogin').value
    const userPass = document.getElementById('userPass').value

    let usuario = new User(userLogin, userPass)
    let resposta = bdUsuario.pesquisar(usuario)

    if(resposta){
        console.log('funcionando')
        window.location.href ='http://127.0.0.1:5500/ProjetoOrcamentoPessoal/cadastro.html'
    }else{
        console.log('algo diferente')
        alert('Usuário ou Senha Inválidos')
    }
}



let bdUsuario = new BdUsuario()
