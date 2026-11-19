// Função responsável por apresentar uma mensagem na tela de login.
// Recebe o texto da mensagem e uma classe que define a aparência do resultado.
// Ela usa textContent para não inserir HTML e classList para aplicar o estilo.
function mostrarMensagem(texto        , tipo        )       {
  const mensagem = document.getElementById("mensagem-login")                        ;

  mensagem.textContent = texto;
  mensagem.classList.remove("erro", "sucesso");

  if (tipo !== "") {
    mensagem.classList.add(tipo);
  }
}

// Função responsável por apagar os campos e limpar as mensagens do login.
// Ela não altera a quantidade de tentativas já utilizadas pelo usuário.
function limparLogin()       {
  const campoUsuario = document.getElementById("usuario")                    ;
  const campoSenha = document.getElementById("senha")                    ;

  campoUsuario.value = "";
  campoSenha.value = "";
  mostrarMensagem("", "");
  campoUsuario.focus();
}

// Variáveis das credenciais demonstrativas e do controle de tentativas.
// Os dados ficam disponíveis no código do navegador e não representam segurança real.
const usuarioAdmin = "admin";
const senhaAdmin = "admin";
const usuarioFabiano = "fabiano";
const senhaFabiano = "neymar";
let tentativasRestantes = 3;

// Localiza os elementos utilizados pelo formulário de autenticação.
const formulario = document.getElementById("formulario-login")                   ;
const campoUsuario = document.getElementById("usuario")                    ;
const campoSenha = document.getElementById("senha")                    ;
const botaoEntrar = document.getElementById("botao-entrar")                     ;
const botaoLimpar = document.getElementById("botao-limpar")                     ;
const textoTentativas = document.getElementById("tentativas-login")                        ;

// O evento submit impede o envio automático e executa a validação demonstrativa.
formulario.addEventListener("submit", function (evento             )       {
  evento.preventDefault();

  const usuarioInformado = campoUsuario.value;
  const senhaInformada = campoSenha.value;

  // Esta validação informa se algum campo obrigatório não foi preenchido.
  if (usuarioInformado === "" || senhaInformada === "") {
    mostrarMensagem("Preencha o usuário e a senha.", "erro");
    return;
  }

  // Compara os valores digitados com as duas combinações demonstrativas.
  const loginAdminCorreto =
    usuarioInformado === usuarioAdmin && senhaInformada === senhaAdmin;
  const loginFabianoCorreto =
    usuarioInformado === usuarioFabiano && senhaInformada === senhaFabiano;

  if (loginAdminCorreto || loginFabianoCorreto) {
    mostrarMensagem("Login realizado com sucesso!", "sucesso");

    // sessionStorage guarda uma informação simples enquanto o navegador estiver nesta sessão.
    sessionStorage.setItem("usuarioAutenticado", usuarioInformado);

    // Redireciona automaticamente para a calculadora após o login correto.
    window.location.href = "calculadora.html";
  } else {
    tentativasRestantes = tentativasRestantes - 1;
    textoTentativas.textContent =
      "Tentativas disponíveis: " + String(tentativasRestantes);

    if (tentativasRestantes > 0) {
      mostrarMensagem("Usuário ou senha incorretos.", "erro");
    } else {
      mostrarMensagem("Acesso bloqueado após três tentativas.", "erro");
      campoUsuario.disabled = true;
      campoSenha.disabled = true;
      botaoEntrar.disabled = true;
    }
  }
});

// O evento click limpa os campos ao utilizar o botão LIMPAR.
botaoLimpar.addEventListener("click", limparLogin);
