const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para permitir que o Express entenda requisições em formato JSON
app.use(express.json());

/* =============================================================================
  COMENTÁRIO OBRIGATÓRIO - INVESTIGAÇÃO DA MEMÓRIA
  
  O array 'produtos' abaixo funciona como o nosso "banco de dados" temporário.
  Ele reside inteiramente na memória RAM do servidor. 
  
  O que isso significa? Significa que enquanto o servidor estiver rodando,
  os dados persistirão. Porém, a memória RAM é volátil. Se o processo do Node
  for encerrado ou reiniciado, tudo o que estiver neste array será limpo.
  =============================================================================
*/
const produtos = [];

// 1. Rota para Consultar os produtos (GET)
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// 2. Rota para Cadastrar produtos (POST)
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    
    if (!nome || !preco) {
        return res.status(400).json({ error: "Nome e preço são obrigatórios." });
    }

    const novoProduto = { id: produtos.length + 1, nome, preco };
    produtos.push(novoProduto);
    
    res.status(201).json({ message: "Produto cadastrado com sucesso!", produto: novoProduto });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT}/produtos para ver os produtos.`);
});