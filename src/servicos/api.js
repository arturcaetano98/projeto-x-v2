// Tudo que tem contato com relação ao servidor.
import axios from "axios";

export const api = axios.create({
	baseURL: "https://projeto-x-backend-v2-68pccioq0-arturcaetano98.vercel.app/"
});

export const realizaLogin = async(body) => {
	const resposta = await api.post("/login", body);
	return resposta;
}

export const buscaUsuario = async(usuario) => {
    const resposta = await api.get("/usuarios/" + usuario);
	return resposta;
}

export const enviaUsuario = async(body) => {
    const resposta = await api.post("/usuarios/", body);
	return resposta;
}


export const buscaCPF = async(cpf) => {
    const resposta = await api.get("/segurados/cpf/" + cpf);
	return resposta.data;
}

export const buscaSegurados = async() => {
    const resposta = await api.get("/segurados/");
	return resposta;
}

export const buscaPorSegurado = async(n_cotacao) => {
    const resposta = await api.get("/segurados/" + n_cotacao);
	return resposta;
}

export const enviaSegurado = async(body) => {
    const resposta = await api.post("/segurados/", body);
	return resposta;
}

export const alteraSegurado = async(n_cotacao, body) => {
    const resposta = await api.put("/segurados/" + n_cotacao, body);
	return resposta;
}