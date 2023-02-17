import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { buscaUsuario } from "../../servicos/api";


import "./MenuUsuario.css";

import UsuarioContexto from "../../contextos/UsuarioContext";

import Botao from "../../componentes/Botao";

const MenuUsuario = () => {

    const { setId, nome, setNome } = useContext(UsuarioContexto);

    const navegate = useNavigate();
    
    const criarCotacao = (evento) => {
        evento.preventDefault();
        navegate("/criarCotacao");
    }

    const listarCotacoes = (evento) => {
        evento.preventDefault();
        navegate("/listarCotacoes");
    }

    const listarApolices = (evento) => {
        evento.preventDefault();
        navegate("/listarApolices");
    }
    
    const deslogarUsuario = () => {
        localStorage.removeItem("usuarioLogado");
    }

    useEffect(() => {
        let usuarioLogado = localStorage.getItem("usuarioLogado");
        if(usuarioLogado) {
            buscaUsuario(usuarioLogado)
            .then((usuario) => {
                setId(usuario.data[0].id);
                setNome(usuario.data[0].nome);                
            })
            .catch((e)=>{
                console.log(e);
            });
        }
        else {
            navegate("/");
        }
    }, []);

    return (
        <div>
            <p className="MenuUsuario-saudacoes">Olá {nome}, <Link className="MenuUsuario-sair" to="/" onClick={() => deslogarUsuario()}>Sair</Link></p>
            <div className="MenuUsuario-formulario"> 
                <h1 className="MenuUsuario-titulo">Minhas cotações</h1>
                <div className="MenuUsuario-botoes">
                    <Botao
                        botaoOnClick={criarCotacao}
                        botaoTexto="Criar Cotação"
                    />
                    <Botao
                        botaoOnClick={listarCotacoes}
                        botaoTexto="Listar Cotações"
                    />
                    <Botao
                        botaoOnClick={listarApolices}
                        botaoTexto="Listar Apólices"
                    />
                </div>
            </div>
        </div>   
    );
}

export default MenuUsuario;