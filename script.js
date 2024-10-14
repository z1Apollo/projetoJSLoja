async function fetchProdutos() {
    const url = `https://fakestoreapi.com/products`;
  
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProdutos(data);
    } catch (error) {
        console.error('Erro ao buscar o produto', error);
    }
}

function displayProdutos(produtos) {
    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = '';
  
    produtos.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.className = 'produto-card';
  
        produtoCard.addEventListener("click", async () => {
            window.location.href = "./produtos.html";
            localStorage.setItem("id", produto.id);
        });
        produtoCard.id = produto.id;
        produtoCard.innerHTML = `
            <div id="card-main" class="card-produto">
                <h2 class="produto-title">${produto.title}</h2>
                <img class="produto-img" src="${produto.image}" alt="${produto.title}">
                <p>R$ ${produto.price.toFixed(2)}</p>
            </div>
            <div class="caixa-btnjs"> 
                <button class="btn-prod">Adicionar ao carrinho</button>
            </div>
        `;

        const btnProd = produtoCard.querySelector('.btn-prod');

        btnProd.addEventListener('click', (event) => {
            event.stopPropagation();
            let carrinho = JSON.parse(localStorage.getItem('carrinho'));

            if (!Array.isArray(carrinho)) {
                carrinho = [];
            }

            const produtoExistente = carrinho.find(id => id === produto.id);
            
            if (!produtoExistente) {
                carrinho.push(produto.id);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                alert(`${produto.title} adicionado ao carrinho!`);
                updateCarrinhoCount(); 
            } else {
                alert(`${produto.title} já está no carrinho!`);
            }
        });
  
        produtosContainer.appendChild(produtoCard);
    });
}

function updateCarrinhoCount() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalProdutos = carrinho.length;
    const numberElement = document.getElementById('number');
    numberElement.textContent = totalProdutos; 
}

function resetCarrinhoCount() {
    const numberElement = document.getElementById('number');
    numberElement.textContent = '0'; 
}
  
window.onload = () => {
    localStorage.removeItem('carrinho');
    fetchProdutos();
    resetCarrinhoCount();
};
