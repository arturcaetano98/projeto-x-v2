import "./Login.css";

import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { buscaUsuario, realizaLogin} from "../../servicos/api";

import "react-toastify/dist/ReactToastify.css";

import CampoTexto from "../../componentes/CampoTexto";
import Botao from "../../componentes/Botao";

import UsuarioContexto from "../../contextos/UsuarioContext";

const Login = () => {

    const navegate = useNavigate();

    const { setId, setNome, username, setUsername, senha, setSenha } = useContext(UsuarioContexto);

    const loginSubmit = async (evento) => {

        evento.preventDefault();

        const body = {
            "usuario": username,
            "senha": senha
        }
        
        let retornoLogin;
        retornoLogin = await realizaLogin(body);
        retornoLogin = retornoLogin.data;
        
        if((retornoLogin.sucesso === true) && (retornoLogin.usuarioLogado != null)){

            let usuario = await buscaConta(retornoLogin.usuarioLogado);
            usuario = usuario.data;

            setNome(usuario[0].nome);
            setUsername("");
            setSenha("");
            setId(usuario[0].id);

            navegate("/menuUsuario");
            localStorage.setItem("usuarioLogado", usuario[0].username);
        }
        else if((retornoLogin.sucesso === true) && (retornoLogin.usuarioLogado === null)){
            toast.error("Username ou senha inválidos!!!!!");
        }
        else {
            toast.error("Username não existe!!!!!");
        }
    }

    const buscaConta = async (username) => {
        return await buscaUsuario(username);
    }

    useEffect(() => {
        let usuarioLogado = localStorage.getItem("usuarioLogado");
        if(usuarioLogado) {
            buscaUsuario(usuarioLogado)
            .then((usuario) => {
                setId(usuario.data[0].id);
                setNome(usuario.data[0].nome);                
            })
            .catch((e) => {
                console.log(e);
            });
        }
        else {
            toast.warning("Realize o Login para entrar!");
        }
    }, []);

    return(
        <div className="Login-formulario">
            <form onSubmit={loginSubmit}>
                <h2 className="Login-titulo">Login</h2>
                    <ToastContainer />
                    <CampoTexto
                        campoTextoLabel="Username:"
                        campoTextoRequired={true}
                        campoTextoType="text"
                        campoTextoPlaceholder="Digite o username"
                        campoTextoValue={username}
                        campoTextoMaxLength={45}
                        alteraCampo={valorCampo => {
                            setUsername(valorCampo);
                        }}
                    />
                    <CampoTexto
                        campoTextoLabel="Senha:"
                        campoTextoRequired={true}
                        campoTextoType="password"
                        campoTextoPlaceholder="Digite a senha"
                        campoTextoValue={senha}
                        campoTextoMaxLength={18}
                        alteraCampo={valorCampo => {
                            setSenha(valorCampo);
                        }}
                    />
                    <Botao
                        botaoOnClick={() => loginSubmit}
                        botaoTexto="Login"
                    />
            </form>
        </div>
    );
}

export default Login;