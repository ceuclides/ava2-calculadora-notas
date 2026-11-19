# Calculadora de Notas

## Site publicado

https://ceuclides.github.io/ava2-calculadora-notas/

## Descrição

Projeto acadêmico de Front-End desenvolvido para demonstrar conceitos básicos de HTML5, CSS3 e TypeScript. O site apresenta uma Home, uma tela de login demonstrativa e uma calculadora de média acadêmica.

O projeto também utiliza um logotipo circular nas páginas e uma foto identificadora na calculadora conforme o usuário que realizou o login.

## Objetivo acadêmico

Este projeto foi desenvolvido como atividade do 2º semestre do curso de Análise e Desenvolvimento de Sistemas. A finalidade é praticar estrutura de páginas, estilos responsivos, eventos, validações, sessões de navegador e organização de arquivos.

## Tecnologias utilizadas

- HTML5
- CSS3
- TypeScript
- JavaScript gerado pelo TypeScript

Não são utilizados frameworks, bibliotecas CSS, banco de dados ou backend.

## Estrutura de pastas

```text
projeto-calculadora-notas/
├── index.html
├── login.html
├── calculadora.html
├── css/
│   └── style.css
├── img/
│   ├── logo.jpeg
│   ├── admin.jpg
│   └── fabiano.jpeg
├── src/
│   ├── login.ts
│   └── calculadora.ts
├── js/
│   ├── login.js
│   └── calculadora.js
├── tsconfig.json
├── .gitignore
└── README.md
```

## Funcionalidades das páginas

### Home

- Apresenta o projeto.
- Possui menu de navegação.
- Exibe o logotipo circular da aplicação.
- Apresenta identificação acadêmica e autores no rodapé.
- Direciona o usuário para a tela de login.

### Login

- Valida usuário e senha.
- Permite até três tentativas.
- Bloqueia o formulário após três erros.
- Cria uma sessão demonstrativa no `sessionStorage`.
- Redireciona para a calculadora em caso de sucesso.

### Calculadora

- Verifica se existe uma sessão válida.
- Recebe o nome do aluno e duas notas.
- Valida campos vazios, valores não numéricos e notas fora do intervalo de 0 a 10.
- Calcula a média aritmética com duas casas decimais.
- Exibe APROVADO para média maior ou igual a 7.
- Exibe REPROVADO para média inferior a 7.
- Apresenta data e hora atual.
- Permite limpar os dados e encerrar a sessão.
- Exibe uma foto circular e o nome do usuário autenticado:
  - `admin`: usa `img/admin.jpg`;
  - `fabiano`: usa `img/fabiano.jpeg`.

## Credenciais demonstrativas

| Usuário | Senha |
|---|---|
| `admin` | `admin` |
| `fabiano` | `neymar` |

Essas credenciais são de demonstração. Qualquer pessoa com acesso ao código pode visualizá-las; esta solução não representa autenticação segura.

Após o login, o usuário pode visualizar sua foto na área da calculadora. Essa identificação é visual e não substitui os controles demonstrativos da sessão.

## Executar localmente

1. Abra a pasta do projeto no Visual Studio Code.
2. Execute um servidor local na raiz do projeto.
3. Abra `http://localhost:4173/index.html`.

Exemplo com Python:

```bash
python3 -m http.server 4173
```

## Compilar o TypeScript

Instale o TypeScript no ambiente de desenvolvimento:

```bash
npm install --save-dev typescript
```

O projeto utiliza `tsconfig.json` para procurar os arquivos em `src/` e gerar o JavaScript em `js/`. A configuração pode ser compilada diretamente:

```bash
npx tsc
```

O HTML deve continuar referenciando os arquivos `.js` gerados na pasta `js/`, e não os arquivos `.ts`.
