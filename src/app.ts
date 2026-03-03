export {};
import { API_KEY } from './config.js';

const container = document.getElementById('results-container') as HTMLDivElement | null;

function sanitizarInput(texto: string): string {
    // Remove tags HTML e caracteres que podem ser usados para injeção
    return texto.replace(/[<>/{}[\]\\^`|]/g, '').trim();
}
interface Filme {
    id: number;
    original_title: string;
    poster_path: string;
    overview: string;
}

interface SearchResponse {
    results: Filme[];
}

interface RequestParams {
    url: string;
    method: 'GET' | 'POST';
}

class HttpClient {
    static async get<T>({ url, method }: RequestParams): Promise<T> {
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
            request.send();
        });
    }
}

const botao = document.getElementById('button') as HTMLButtonElement | null;
const inputFilme = document.getElementById('input1') as HTMLInputElement | null;

// Unificamos tudo em um único IF e um único Listener
if (botao && inputFilme && container) {
    botao.addEventListener('click', async () => {
        const querySuja = inputFilme.value;
        const query = sanitizarInput(querySuja);

        if (!query) {
            alert("Digite o nome de um filme!");
            return;
        }

        // --- ESTADO DE LOADING ---
        botao.disabled = true;
        botao.innerText = "Buscando...";
        container.innerHTML = `<p class="loading-text">Carregando filmes...</p>`;

        try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}`;
            const dados = await HttpClient.get<SearchResponse>({ url, method: 'GET' });

            container.innerHTML = ""; // Limpa o texto de loading

            if (dados.results.length > 0) {
                dados.results.forEach(filme => {
                    // 1. Filtro imediato: Se a API já diz que não tem poster, nem criamos o card
                    if (!filme.poster_path) {
                        return; 
                    }

                    const movieCard = document.createElement('div');
                    movieCard.className = 'movie-card';

                    const imageElement = document.createElement('img');
                    imageElement.src = `https://image.tmdb.org/t/p/w200${filme.poster_path}`;
                    imageElement.alt = filme.original_title;

                    // 🛡️ LÓGICA DE AUTO-REMOÇÃO (Filtro de Qualidade)
                    imageElement.onerror = () => {
                        // Se a imagem tentar carregar e falhar, o card inteiro é removido
                        console.warn(`Removendo card de "${filme.original_title}" por falha no carregamento.`);
                        movieCard.remove(); 
                    };

                    const titleElement = document.createElement('h3');
                    titleElement.textContent = filme.original_title; 

                    movieCard.appendChild(imageElement);
                    movieCard.appendChild(titleElement);
                    container.appendChild(movieCard);
                });
            } else {
                container.innerHTML = "<p>Nenhum filme encontrado.</p>";
            }
        } catch (erro) {
            console.error("Erro na API:", erro);
            container.innerHTML = "<p>Erro ao buscar filmes. Tente novamente.</p>";
        } finally {
            // --- RESTAURAR BOTÃO ---
            botao.disabled = false;
            botao.innerText = "Buscar Filme";
        }
    });
}