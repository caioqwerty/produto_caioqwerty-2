const fs = require('fs');
const path = require('path');

// Caminho do arquivo de banco de dados
const DB_PATH = path.join(__dirname, 'db.json');

// Inicializar banco se não existir
function inicializarDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

// Ler dados do banco
function lerDB() {
  inicializarDB();
  const dados = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(dados);
}

// Salvar dados no banco
function salvarDB(dados) {
  fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
}

// Adicionar novo registro
function adicionar(item) {
  const dados = lerDB();
  const novoItem = {
    id: dados.length > 0 ? Math.max(...dados.map(d => d.id)) + 1 : 1,
    ...item,
    criado: new Date().toISOString()
  };
  dados.push(novoItem);
  salvarDB(dados);
  return novoItem;
}

// Listar todos os registros
function listar() {
  return lerDB();
}

// Buscar por ID
function buscarPorId(id) {
  const dados = lerDB();
  return dados.find(item => item.id === id);
}

// Atualizar registro
function atualizar(id, novosDados) {
  const dados = lerDB();
  const index = dados.findIndex(item => item.id === id);
  if (index !== -1) {
    dados[index] = { ...dados[index], ...novosDados, id };
    salvarDB(dados);
    return dados[index];
  }
  return null;
}

// Deletar registro
function deletar(id) {
  const dados = lerDB();
  const filtrado = dados.filter(item => item.id !== id);
  salvarDB(filtrado);
  return filtrado.length < dados.length;
}

// Exportar funções
module.exports = {
  adicionar,
  listar,
  buscarPorId,
  atualizar,
  deletar,
  lerDB,
  salvarDB
};
