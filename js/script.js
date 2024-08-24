inventory = [
    {
        id: 0,
        name: 'Iphone 11',
        quantity: 2
    },
    {
        id: 1,
        name: 'Geladeira',
        quantity: 2
    },
    {
        id: 2,
        name: 'Teclado Mecanico',
        quantity: 1
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
    event.preventDefault();

    const nameProduct = document.getElementById('produto').value;
    const quantidadeProduct = document.getElementById('quantidade').value

    const newProducts = {
        id: inventory.length,
        name: nameProduct,
        quantity: quantidadeProduct
    }

    inventory.push(newProducts);

    updateTable();

    document.getElementById('produto').value = "";
    document.getElementById('quantidade').value = "";

    modalAdicinar.classList.add('none');
});


// Capturar dados modal Update

const updateForm = document.querySelector('#modal-atualizar form');

updateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const idProduct = parseInt(document.getElementById('idProdutoUpdate').value);
    const newNameProduct = document.getElementById('novo-nome').value;
    const newQuantity = document.getElementById('nova-quantidade').value;

    const product = inventory.find(item => item.id == idProduct)

    if (product) {
        product.name = newNameProduct;
        product.quantity = newQuantity;

        updateTable();

        document.getElementById('idProdutoUpdate').value = "";
        document.getElementById('novo-nome').value = "";
        document.getElementById('nova-quantidade').value = "";

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
