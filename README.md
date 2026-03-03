# Aula de Typescript da Take na plataforma DIO
  
*Bem vindo!!*

O objetivo desse repositório é mostrar exemplos e desafios de typescript que vão dar uma noção geral suficiente da ferramenta para que ela seja usada no dia a dia do desenvolvedor.
  
Para quem é esse repositório:

* Pessoas que tem vontade de aprender javascript aplicando boas práticas desde o início  
* Pessoas que já usam javascript e querem desaprender hábitos negativos da linguagem
* Quem já teve dor de cabeça com javascript e tem um trauma a ser curado

## O que é o Typescript

É um superset do typescript que trás tipagem estática para a linguagem, além de outras features, com o propósito de melhorar a qualidade do código escrito e a sua usabilidade. Como é um superset o código compilado e usado em produção ainda é javascript, porém é um JS mais resiliente e turbinado graças ao uso de TS durante o desenvolvimento.

## Do que você vai precisar

Ferramentas necessárias:  

* Do Node instalado na sua máquina  
* Instalar o typescript usando o npm (npm install -g typescript)
  * É interessante que ele seja instalado de forma global, para que o usuário possa usar a biblioteca a qualquer momento e em qualquer projeto para fazer testes rápidos com o TS.
* De uma IDE como o visual studio code  

Requisitos técnicos:  

* Lógica de programação
* Mas é melhor ainda se tiver um conhecimento básico de javascript  

## Sobre a estrutura de commits

Os commits foram feitos de tal forma que o usuário pode ler commit a commit em ordem de publicação e acompanhar gradualmente a criação do repositório e a lógica aplicada. É recomendado que o primeiro estudo seja feito dessa forma. Pequenos erros nos comentários ou de gramática podem ser encontrados no caminho (consequências do programador que estuda de madrugada), mas eles já foram devidamente corrigidos na última versão da main.

## Estrutura do repositório

* *src*
  * Contém arquivos com exemplos de uso de TS e JS comentados para facilitar o entendimento da ferramenta
* *desafios*
  * Contém vários arquivos JS que podem ser refatorados para solidificar o conhecimento adquirido na aula
* *index.html*
  * É onde está a chamada para o arquivo app.js e pode ser manipulado a vontade para testarem seus scripts
* *tsconfig.json*
  * O coração do TS que configura suas funcionalidades.  
* *package.json*
  * Nesse arquivo foram colocados alguns scripts com o propósito de facilitar a vida de quem usar esse repositório
        *start
            * Inicia o *lite-server*, que vai escutar modificações no index.html e em seus arquivos importados. É útil caso queira fazer testes no browser. A porta disposta normalmente é a *localhost:3000*
        *watch  
            * Roda o *tsc --watch* com o propósito de compilar constantemente qualquer coisa que for editada nos arquivos TS para sua contraparte em JS. Esse comando evita que *tsc* tenha que ser digitado constantemente para fazer a compilação.  

## Sobre como testar

* Teste mão livre
  * Faça suas alterações em src/app.ts
    * Rode *tsc* ou *npm watch* para compilar elas para o arquivo dist/app.js
    * Caso queira fazer um teste interagindo com o DOM, altere o index.html
    * Rode o npm start e acesse o localhost:3000
* Testar algum dos arquivos da pasta de exemplos ou desafios
  * Copie e cole o conteúdo para o arquivo src/app.ts ou altere o caminho do atributo src da tag script no index.html  
        * ex : *src=dist/app.js* -> *src=dist/exemplos/any.js*
    * Rode *tsc* ou *npm watch* para compilar elas para o arquivo dist/app.js
    * Caso queira fazer um teste interagindo com o DOM, altere o index.html
    * Rode o npm start e acesse o localhost:3000
Caso queira fazer testes usando html é só alterar o index.html.

## Sobre o tsconfig.json

* Algumas configurações e funcionalidades legais são:
    1. Opções básicas:
        * target
            * Define para qual versão do ECMAScript o typescript vai ser convertido
        * lib
            * Define quais bibliotecas vão vir por default com o TS. Isso é bacana caso o TS esteja sendo usado no backend e a iteração com o DOM não é necessária. Como teste, tentem remover as bibliotecas do DOM e olhem seu código enchendo de erros porque não sabe o que é um document
        * sourceMap
            * Cria arquivos .map.js que geram uma cópia do seu arquivo TS no source do browser (aquele do inspect). Podem ser debugados via breakpoint direto no browser e são uma excelente ajuda, já que o código compilado de JS é menos legível que o TS.
        * outDir
            * Pasta para onde seus arquivos JS serão enviados
        * rootDir
            * Pasta de onde seus arquivos TS serão coletados. Pode ser necessário inserir a opção include fora do *compilerOptions* com a pasta *src* inclusa
    2. Opções de checagem de tipo:
        * strict
            * Marca todas opções de checagem de tipo como verdadeiras. Ideal caso seja a intenção do usuário ter o código mais consistente possível
        * noImplicitAny
            * Levanta erro caso variáveis não estejam tipadas. Caso essa seja a intenção, um "any" tem que ser explicitamente tipado
        * strictNullChecks
            * Pode levantar erro caso uma variável em uso seja potencialmente nula.
                * Ex: um botão que foi buscado usando um getElementById que não necessariamente vai encontrar um elemento é usado para escutar um evento.
    3. Outras opções
        * noUnusedLocals
            * Levanta erro sempre que uma variável local não está sendo utilizada, como um let dentro de uma função
        * nuUnusedParameters
            * Mesmo caso de noUnusedLocals, mas para parâmetros de função
        * noImplicitReturns
            * Levanta um erro caso uma função tenha caminhos que retornam valor e outros que não retornam
    4. Existem outras regras e explicações mais elaboradas na documentação oficial (<https://www.typescriptlang.org/tsconfig>)

## Sobre colaboração

Sinta-se livre para abrir pull requests com melhorias para ajudar quem quiser aprender mais sobre Typescript. Também podem tirar dúvidas comigo via comentário.

---

# 🎬 CineTS - Buscador de Filmes Seguro (TypeScript & Vite)

Projeto desenvolvido como desafio para a DIO, focado em transformar uma lógica simples de busca em uma aplicação resiliente, segura e otimizada, aplicando conceitos avançados de infraestrutura e defesa cibernética.

## 🌐 Arquitetura de Rede e Fluxo de Dados

Como estudante de Redes no SENAI, a arquitetura deste projeto foi desenhada para garantir a integridade dos dados desde a origem até o navegador:

Comunicação Criptografada: Todas as requisições para a API do TMDB são realizadas via HTTPS (Porta 443), garantindo TLS/SSL e protegendo contra ataques de interceptação na rede local.

Perímetro de Confiança (CSP): Implementação de uma Content Security Policy que define uma lista branca (allowlist) de domínios, impedindo que o navegador carregue recursos de fontes não autorizadas.

Resolução de Nomes e MIME: Migração para o Vite para garantir o tratamento correto de tipos MIME (application/javascript), evitando bloqueios de segurança do navegador durante o carregamento de módulos TypeScript.

## 🛡️ Camadas de Cybersecurity (Security by Design)

O projeto implementa o conceito de Defense in Depth (Defesa em Profundidade):

Sanitização de Input (Anti-Injection): Função dedicada para limpar entradas do usuário, removendo caracteres especiais que poderiam ser usados em tentativas de injeção na URL da API.

Proteção contra XSS: Renderização dinâmica utilizando textContent e criação manual de nós no DOM (document.createElement), neutralizando qualquer script malicioso vindo de respostas da API.

Gestão de Segredos (Secret Management): Isolamento da API_KEY em arquivo config.ts ignorado pelo Git, prevenindo o vazamento de credenciais em repositórios públicos.

Filtro de Integridade (UX Resilience): Monitoramento do evento onerror em imagens para auto-remoção de elementos corrompidos, mantendo a interface limpa e profissional.

## 🚀 Infraestrutura e Automação (DevOps)

O ambiente de desenvolvimento no Mac mini M4 foi otimizado para performance e segurança:

Motor de Build (Vite): Substituição de dependências vulneráveis por uma toolchain moderna que utiliza HMR (Hot Module Replacement) para desenvolvimento instantâneo.

Gestão de Vulnerabilidades: Uso de npm audit para identificar e remediar falhas na cadeia de suprimentos de software antes do deploy.

Automação de Scripts: Comandos personalizados no package.json para limpeza de ambiente (clean) e build de produção (prod).

## 🛠️ Como Executar

Instale as dependências: npm install.

Configure a Chave: Crie src/config.ts com sua chave do TMDB.

Inicie: npm start
