inventory = [
    {
        id: 0,
        name: 'Iphone 11',
        quantity: 2,
        price: 2.999,
        user: 'José Gomes'
    },
    {
        id: 1,
        name: 'Geladeira',
        quantity: 2,
        price: 2.500,
        user: 'José Gomes'
    },
    {
        id: 2,
        name: 'Teclado Mecanico',
        quantity: 1,
        price: 219.99,
        user: 'José Gomes'
    }
]

// Adicionar elementos na tabela
const tbody = document.getElementById('inventory-table-body')

function updateTable() {
    tbody.innerHTML = '';

    inventory.forEach(item => {
        const row = document.createElement('tr');
    
        const idCell = document.createElement('td');
        idCell.textContent = `#${item.id}`;
        row.appendChild(idCell);
    
        const nameCell = document.createElement('td');
        nameCell.textContent = `${item.name}`;
        row.appendChild(nameCell);
    
        const quantityCell = document.createElement('td');
        quantityCell.textContent = `${item.quantity}`;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `R$${item.price}`;
        row.appendChild(priceCell);

        const userCell = document.createElement('td');
        userCell.textContent = `${item.user}`;
        row.appendChild(userCell);
    
        tbody.appendChild(row);
    });    
}

updateTable();

// Logica dos Modais

const btnAdd = document.getElementById('btn-add');
const btnUpdate = document.getElementById('btn-update');
const btnDelete = document.getElementById('btn-delete');

const modalAdicinar = document.getElementById('modal-adicionar');
const modalUpdate = document.getElementById('modal-atualizar');
const modalDelete = document.getElementById('modal-deletar');

const closeButtons = document.querySelectorAll('.close-button');

// Abrir modais
 
btnAdd.addEventListener('click', () => {
    modalAdicinar.classList.remove('none');
});

btnUpdate.addEventListener('click', () => {
    modalUpdate.classList.remove('none');
});

btnDelete.addEventListener('click', () => {
    modalDelete.classList.remove('none');
});


// fechar moldal 

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.classList.add('none');
    });
});

// Capturar dados modal Adicionar


const addForm = document.querySelector('#modal-adicionar form');

addForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const nameProduct = document.getElementById('produto').value.trim();
    const quantidadeProduct = parseInt(document.getElementById('quantidade').value);
    const priceProduct = parseFloat(document.getElementById('priceInput').value);
    const userProduct = document.getElementById('userInput').value.trim();

    let isValid = true;

    // Validações
    if (nameProduct === '') {
        alert('O campo "Nome do Produto" não pode ficar vazio.');
        isValid = false;
    } 

    if (isNaN(quantidadeProduct) || quantidadeProduct <= 0) {
        alert('Por favor, insira uma quantidade válida (maior que 0).');
        isValid = false;
    }

    if (isNaN(priceProduct) || priceProduct <= 0) {
        alert('Por favor, insira um preço válido (maior que 0).');
        isValid = false;
    }

    if (userProduct === '') {
        alert('Por favor, insira o nome de usuário.');
        isValid = false;
    }

    if (!isValid) {
        return;  // Para a execução do código se o formulário não for válido
    }

    const newProducts = {
        id: inventory.length,
        name: nameProduct,
        quantity: quantidadeProduct,
        price: priceProduct.toFixed(2),
        user: userProduct
    };

    inventory.push(newProducts);

    updateTable();

    // Limpa os valores dos campos do formulário
    document.getElementById('produto').value = "";
    document.getElementById('quantidade').value = "";
    document.getElementById('priceInput').value = "";
    document.getElementById('userInput').value = "";

    // Aguarde até que a tabela seja atualizada antes de fechar o modal
    setTimeout(() => {
        modalAdicinar.classList.add('none');
    }, 300); // Pequeno atraso para garantir que a tabela seja atualizada antes de fechar o modal
});



// Capturar dados modal Update

const updateForm = document.querySelector('#modal-atualizar form');

updateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const idProduct = parseInt(document.getElementById('idProdutoUpdate').value.trim());
    const newNameProduct = document.getElementById('novo-nome').value;
    const newQuantity = parseInt(document.getElementById('nova-quantidade').value);
    const newPrice = parseFloat(document.getElementById('nova-preco').value);
    const newUser = document.getElementById('novo-user').value.trim();

    let isValid = true;

    if (isNaN(idProduct) || idProduct < 0) {
        alert('Por favor, insira um ID de produto válido.');
        isValid = false;
    }

    if (newNameProduct === '') {
        alert('O campo "Novo Nome" não pode ficar vazio.');
        isValid = false;
    }

    if (isNaN(newQuantity) || newQuantity <= 0) {
        alert('Por favor, insira uma quantidade válida (maior que 0).');
        isValid = false;
    }

    if (isNaN(newPrice) || newPrice <= 0) {
        alert('Por favor, insira um preço válido (maior que 0).');
        isValid = false;
    }

    if (newUser === '') {
        alert('O campo "Novo Usuário" não pode ficar vazio.');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const product = inventory.find(item => item.id == idProduct)

    if (product) {
        product.name = newNameProduct;
        product.quantity = newQuantity;
        product.price = newPrice;
        product.user = newUser;

        updateTable();

        document.getElementById('idProdutoUpdate').value = "";
        document.getElementById('novo-nome').value = "";
        document.getElementById('nova-quantidade').value = "";
        document.getElementById('nova-preco').value = "";
        document.getElementById('novo-user').value = "";

        modalUpdate.classList.add('none');
    } else {
        alert('No find Product');
    }
})

// Deletar dados Modal delete

const deleteForm = document.querySelector('#modal-deletar form');

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const idDelete = parseInt(document.getElementById('produto-id-deletar').value);
    const index = inventory.findIndex(item => item.id === idDelete);

    if (index !== -1) {
        inventory.splice(index, 1);
        updateTable();
        alert('Produto deletado com sucesso!');
        modalDelete.classList.add('none');
    } else {
        alert('ID não encontrado');
    }

    document.getElementById('produto-id-deletar').value = "";
});
