export {};

// --- Interfaces (Contratos) ---
interface Filme {
    id: number;
    original_title: string;
    overview: string;
}

interface SearchResponse {
    results: Filme[];
}

interface RequestParams {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
}

interface TokenResponse {
    request_token: string;
}

interface SessionResponse {
    session_id: string;
}

// --- Cliente HTTP ---
class HttpClient {
    static async get<T>({ url, method, body = null }: RequestParams): Promise<T> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(method, url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.statusText);
                }
            };
            
            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            }
            // Importante: Enviar stringify apenas se houver body
            request.send(body ? JSON.stringify(body) : null);
        });
    }
}

// --- Variáveis de Estado ---
let apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
let sessionId: string;
let requestToken: string;

// Seletores com Verificação de Tipo (Casting)
const loginButton = document.getElementById('login-button') as HTMLButtonElement | null;
const searchButton = document.getElementById('search-button') as HTMLButtonElement | null;
const searchContainer = document.getElementById('search-container') as HTMLDivElement | null;

// --- Funções de Lógica ---

async function procurarFilme(query: string): Promise<SearchResponse> {
    const encodedQuery = encodeURI(query);
    return await HttpClient.get<SearchResponse>({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedQuery}`,
        method: "GET"
    });
}

async function criarRequestToken(): Promise<void> {
    const result = await HttpClient.get<TokenResponse>({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    });
    requestToken = result.request_token;
}

async function logar(): Promise<void> {
    const usernameInput = (document.getElementById('login') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('senha') as HTMLInputElement).value;

    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: usernameInput,
            password: passwordInput,
            request_token: requestToken
        }
    });
}

async function criarSessao(): Promise<void> {
    const result = await HttpClient.get<SessionResponse>({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    });
    sessionId = result.session_id;
}

// --- Event Listeners (Com checagem de existência) ---

if (searchButton && searchContainer) {
    searchButton.addEventListener('click', async () => {
        const inputSearch = document.getElementById('search') as HTMLInputElement;
        const query = inputSearch.value;
        
        const listaExistente = document.getElementById("lista");
        if (listaExistente) listaExistente.remove();

        try {
            const listaDeFilmes = await procurarFilme(query);
            const ul = document.createElement('ul');
            ul.id = "lista";

            listaDeFilmes.results.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item.original_title;
                ul.appendChild(li);
            });

            searchContainer.appendChild(ul);
        } catch (err) {
            console.error("Erro na busca:", err);
        }
    });
}

if (loginButton) {
    loginButton.addEventListener('click', async () => {
        try {
            await criarRequestToken();
            await logar();
            await criarSessao();
            alert('Login realizado com sucesso!');
        } catch (error) {
            console.error("Falha na autenticação:", error);
            alert('Erro ao logar. Verifique o console.');
        }
    });
}