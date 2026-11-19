// A sessão demonstrativa é criada pela página de login.
// Se o usuário tentar abrir esta página diretamente, ele volta para o login.
const usuarioAutenticado = sessionStorage.getItem("usuarioAutenticado");

if (usuarioAutenticado === null) {
  window.location.href = "login.html";
}

// Função responsável por exibir a foto correspondente ao usuário autenticado.
// A escolha é feita pelo nome guardado no sessionStorage durante o login.
function configurarUsuario(): void {
  const fotoUsuario = document.getElementById("foto-usuario") as HTMLImageElement;
  const nomeUsuario = document.getElementById("nome-usuario") as HTMLParagraphElement;

  if (usuarioAutenticado === "admin") {
    fotoUsuario.src = "img/admin.jpg";
    fotoUsuario.alt = "Foto do usuário admin";
    nomeUsuario.textContent = "admin";
  } else if (usuarioAutenticado === "fabiano") {
    fotoUsuario.src = "img/fabiano.jpeg";
    fotoUsuario.alt = "Foto do usuário fabiano";
    nomeUsuario.textContent = "fabiano";
  } else {
    fotoUsuario.src = "";
  }
}

// Função responsável por validar os dados e calcular a média das duas notas.
// Recebe o nome e os textos das notas informados nos campos da página.
// Retorna os dados validados ou apresenta uma mensagem de erro na tela.
function validarDadosECalcular(): { nome: string; media: number } | null {
  const campoNome = document.getElementById("nome-aluno") as HTMLInputElement;
  const campoNota1 = document.getElementById("primeira-nota") as HTMLInputElement;
  const campoNota2 = document.getElementById("segunda-nota") as HTMLInputElement;
  const mensagem = document.getElementById("mensagem-calculadora") as HTMLParagraphElement;

  const nome = campoNome.value;
  const nota1 = Number(campoNota1.value);
  const nota2 = Number(campoNota2.value);

  // A validação verifica os campos vazios antes de usar os valores numéricos.
  if (nome === "" || campoNota1.value === "" || campoNota2.value === "") {
    mensagem.textContent = "Preencha o nome e as duas notas.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return null;
  }

  // Number() pode retornar NaN quando o conteúdo não é um número válido.
  if (Number.isNaN(nota1) || Number.isNaN(nota2)) {
    mensagem.textContent = "Digite notas válidas.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return null;
  }

  // A regra acadêmica desta atividade exige notas entre zero e dez.
  if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
    mensagem.textContent = "As notas devem estar entre 0 e 10.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return null;
  }

  const media = (nota1 + nota2) / 2;
  mensagem.textContent = "";
  mensagem.classList.remove("erro", "sucesso");

  return {
    nome: nome,
    media: media
  };
}

// Função responsável por calcular e apresentar a média na área de resultados.
// Usa toFixed(2) para manter o formato com duas casas decimais.
function calcularMedia(): void {
  const dados = validarDadosECalcular();

  if (dados === null) {
    return;
  }

  const resultadoNome = document.getElementById("resultado-nome") as HTMLSpanElement;
  const resultadoMedia = document.getElementById("resultado-media") as HTMLSpanElement;
  const resultadoSituacao = document.getElementById("resultado-situacao") as HTMLSpanElement;

  resultadoNome.textContent = dados.nome;
  resultadoMedia.textContent = dados.media.toFixed(2);
  resultadoSituacao.textContent = "-";
  resultadoSituacao.classList.remove("resultado-aprovado", "resultado-reprovado");
}

// Função responsável por verificar a situação acadêmica do aluno.
// Média igual ou maior que 7 é aprovado; média inferior a 7 é reprovado.
function verificarSituacao(): void {
  const dados = validarDadosECalcular();

  if (dados === null) {
    return;
  }

  const resultadoNome = document.getElementById("resultado-nome") as HTMLSpanElement;
  const resultadoMedia = document.getElementById("resultado-media") as HTMLSpanElement;
  const resultadoSituacao = document.getElementById("resultado-situacao") as HTMLSpanElement;

  resultadoNome.textContent = dados.nome;
  resultadoMedia.textContent = dados.media.toFixed(2);
  resultadoSituacao.classList.remove("resultado-aprovado", "resultado-reprovado");

  if (dados.media >= 7) {
    resultadoSituacao.textContent = "APROVADO";
    resultadoSituacao.classList.add("resultado-aprovado");
  } else {
    resultadoSituacao.textContent = "REPROVADO";
    resultadoSituacao.classList.add("resultado-reprovado");
  }
}

// Função responsável por limpar os campos e todos os resultados da calculadora.
function limparCalculadora(): void {
  const campoNome = document.getElementById("nome-aluno") as HTMLInputElement;
  const campoNota1 = document.getElementById("primeira-nota") as HTMLInputElement;
  const campoNota2 = document.getElementById("segunda-nota") as HTMLInputElement;
  const mensagem = document.getElementById("mensagem-calculadora") as HTMLParagraphElement;
  const resultadoNome = document.getElementById("resultado-nome") as HTMLSpanElement;
  const resultadoMedia = document.getElementById("resultado-media") as HTMLSpanElement;
  const resultadoSituacao = document.getElementById("resultado-situacao") as HTMLSpanElement;

  campoNome.value = "";
  campoNota1.value = "";
  campoNota2.value = "";
  mensagem.textContent = "";
  mensagem.classList.remove("erro", "sucesso");
  resultadoNome.textContent = "-";
  resultadoMedia.textContent = "-";
  resultadoSituacao.textContent = "-";
  resultadoSituacao.classList.remove("resultado-aprovado", "resultado-reprovado");
  campoNome.focus();
}

// Função responsável por mostrar a data e a hora atual na calculadora.
function atualizarDataHora(): void {
  const elementoDataHora = document.getElementById("data-hora") as HTMLParagraphElement;
  const dataAtual = new Date();
  elementoDataHora.textContent =
    dataAtual.toLocaleDateString("pt-BR") +
    " - " +
    dataAtual.toLocaleTimeString("pt-BR");
}

// Localiza os botões e configura os eventos de click da página.
const botaoCalcular = document.getElementById("botao-calcular") as HTMLButtonElement;
const botaoSituacao = document.getElementById("botao-situacao") as HTMLButtonElement;
const botaoLimpar = document.getElementById("botao-limpar") as HTMLButtonElement;
const botaoSair = document.getElementById("botao-sair") as HTMLButtonElement;

botaoCalcular.addEventListener("click", calcularMedia);
botaoSituacao.addEventListener("click", verificarSituacao);
botaoLimpar.addEventListener("click", limparCalculadora);

// Ao sair, remove a sessão demonstrativa e retorna o usuário para a Home.
botaoSair.addEventListener("click", function (): void {
  sessionStorage.removeItem("usuarioAutenticado");
  window.location.href = "index.html";
});

// Exibe a data e atualiza o horário a cada segundo.
atualizarDataHora();
window.setInterval(atualizarDataHora, 1000);
configurarUsuario();
