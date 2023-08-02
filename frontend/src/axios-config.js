import axios from "axios";

// Configura a baseURL do Axios
axios.defaults.baseURL = "http://localhost:3000/";

// Configura o tipo de conteúdo como JSON
axios.defaults.headers.post["Content-Type"] = "application/json";

// Configura o tempo limite para as requisições
axios.defaults.timeout = 10000;

export default axios;
