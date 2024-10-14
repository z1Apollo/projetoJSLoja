const detalhe = document.getElementById("detalhe");
const id = localStorage.getItem("id")

async function buscarDetalhe(){
    const url = `https://fakestoreapi.com/products/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        detalhe.innerHTML = `
        <div class="detalhejs">
        <img class="img-detalhe" src="${data.image}" alt="${data.title}">
        <p class="title-detalhe"> ${data.title} </p>
        <p> ${data.description} </p>
        </div>
        `
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
    }
}

buscarDetalhe()