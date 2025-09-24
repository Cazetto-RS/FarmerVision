// Inicializa um array vazio para armazenar sessões
let sessoes = [];

export function addSessao(usuario, token) {
  sessoes.push({
    usuario,
    token,
    criadoEm: Date.now()
  });
}

export function buscarSessao(usuario, token) {
  return sessoes.find(s => (s.usuario === usuario && s.token === token));
}

// Função para limpar sessões expiradas
function limparSessoes() {
  const agora = Date.now();
  const umaHora = 60 * 60 * 1000; // 1 hora em ms

  sessoes = sessoes.filter(session => (agora - session.criadoEm) < umaHora);

  console.log(`[CLEANUP] Sessões ativas: ${sessoes.length}`);
}

// Configura execução automática a cada 1h
setInterval(limparSessoes, 60 * 60 * 1000); // 1h