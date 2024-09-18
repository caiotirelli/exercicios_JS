// Obter elementos do DOM
const registerForm = document.getElementById('registerForm');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerError = document.getElementById('registerError');

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');

const activeUserElement = document.getElementById('activeUser');
const logoutButton = document.getElementById('logoutButton');

const submitButton = document.getElementById('submitButton');
const commentBox = document.getElementById('commentBox');
const commentsList = document.getElementById('commentsList');

// Armazena dados dos usuários
let users = [];
let activeUser = null;

// Registro de novo usuário
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    if (users.some(user => user.email === email)) {
        registerError.textContent = 'Usuário já registrado com este e-mail.';
        return;
    }

    users.push({ name, email, password });
    registerName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    registerError.textContent = 'Usuário registrado com sucesso!';
});

// Login de usuário
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        activeUser = user;
        activeUserElement.textContent = `Usuário ativo: ${user.name}`;
        loginEmail.value = '';
        loginPassword.value = '';
        loginError.textContent = '';
    } else {
        loginError.textContent = 'E-mail ou senha incorretos.';
    }
});

// Logout do usuário
logoutButton.addEventListener('click', function() {
    activeUser = null;
    activeUserElement.textContent = 'Nenhum usuário logado.';
});

// Sistema de Comentários
submitButton.addEventListener('click', () => {
    if (!activeUser) {
        alert('Você precisa estar logado para comentar.');
        return;
    }

    const commentText = commentBox.value.trim();

    if (commentText) {
        // Cria um novo elemento para o comentário
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<strong>${activeUser.name}:</strong> ${commentText}`;

        // Adiciona o comentário à lista de comentários
        commentsList.appendChild(commentElement);

        // Limpa o campo de comentário
        commentBox.value = '';
    } else {
        alert('Por favor, digite um comentário.');
    }
});


// Logout do usuário
logoutButton.addEventListener('click', function() {
    activeUser = null;
    activeUserElement.textContent = 'Nenhum usuário logado.';
});

// 2. Jogo da Velha
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(clickedCell) {
    const clickedIndex = clickedCell.getAttribute('data-index');
    
    if (gameState[clickedIndex] !== '' || !gameActive) return;
    
    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        resultDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        resultDisplay.textContent = 'Empate!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

resetButton.addEventListener('click', () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    resultDisplay.textContent = '';
    gameActive = true;
    currentPlayer = 'X';
});

// Slider de Imagens
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let slideIndex = 0;
const slideInterval = 3000; // Tempo em milissegundos (3 segundos)

// Função para mostrar o slide atual
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// Função para avançar o slide
function nextSlide() {
    slideIndex = (slideIndex < slides.length - 1) ? slideIndex + 1 : 0;
    showSlide(slideIndex);
}

// Função para voltar ao slide anterior
function prevSlide() {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : slides.length - 1;
    showSlide(slideIndex);
}

// Inicializa o slider
showSlide(slideIndex);

// Adiciona event listeners aos botões
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Transição automática entre slides
setInterval(nextSlide, slideInterval);


// Sistema de Scroll Suave
document.querySelectorAll('#sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        sidebar.classList.remove('open'); // Fecha o menu lateral ao clicar
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// 7. To-Do List com Drag and Drop
const todoItems = document.getElementById('todoItems');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
let draggedItem = null;

// Função para adicionar nova tarefa
addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
        newTask.classList.add('todo-item');
        newTask.setAttribute('draggable', 'true');
        todoItems.appendChild(newTask);
        newTaskInput.value = '';
        addDragAndDropHandlers(newTask); // Adiciona os eventos de drag-and-drop para o novo item
        addEditFeature(newTask); // Adiciona a funcionalidade de edição
    } else {
        alert('Por favor, insira uma tarefa.');
    }
});

// Função para ativar a edição ao clicar duas vezes no item
function addEditFeature(item) {
    item.addEventListener('dblclick', () => {
        const currentText = item.textContent;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentText;
        inputField.classList.add('edit-input');
        item.textContent = '';
        item.appendChild(inputField);
        item.classList.add('editing');

        inputField.addEventListener('blur', () => {
            item.textContent = inputField.value;
            item.classList.remove('editing');
            addEditFeature(item); // Adiciona a funcionalidade de edição novamente
        });

        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                inputField.blur();
            }
        });

        inputField.focus();
    });
}

// Função para arrastar e soltar
function addDragAndDropHandlers(item) {
    item.addEventListener('dragstart', function(event) {
        draggedItem = event.target;
        event.target.style.opacity = '0.5';
    });

    item.addEventListener('dragend', function(event) {
        event.target.style.opacity = '1';
        draggedItem = null;
    });

    todoItems.addEventListener('dragover', function(event) {
        event.preventDefault();
        const dropTarget = event.target;
        if (dropTarget && dropTarget !== draggedItem && dropTarget.nodeName === 'LI') {
            dropTarget.classList.add('drag-over');
        }
    });

    todoItems.addEventListener('dragleave', function(event) {
        const dropTarget = event.target;
        if (dropTarget && dropTarget !== draggedItem && dropTarget.nodeName === 'LI') {
            dropTarget.classList.remove('drag-over');
        }
    });

    todoItems.addEventListener('drop', function(event) {
        event.preventDefault();
        const dropTarget = event.target;
        if (dropTarget && dropTarget !== draggedItem && dropTarget.nodeName === 'LI') {
            dropTarget.classList.remove('drag-over');
            todoItems.insertBefore(draggedItem, dropTarget);
        }
    });
}

// Aplica os eventos de drag-and-drop e edição para os itens existentes
document.querySelectorAll('.todo-item').forEach(item => {
    addDragAndDropHandlers(item);
    addEditFeature(item);
});


// Tabs Dinâmicas
// Seleciona os elementos principais
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const addTabButton = document.getElementById('addTabButton');
const saveTabButton = document.getElementById('saveTabButton');
const tabTitleInput = document.getElementById('tabTitleInput');
const tabContentInput = document.getElementById('tabContentInput');
const tabForm = document.getElementById('tabForm');

let editingTab = null;  // Variável para armazenar a aba que está sendo editada

// Alterna entre as abas
function handleTabClick(button) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.querySelector(button.dataset.target).classList.add('active');
}

// Inicializa eventos de clique nas abas
tabButtons.forEach(button => {
    button.addEventListener('click', () => handleTabClick(button));
});

// Adicionar uma nova aba
addTabButton.addEventListener('click', () => {
    tabForm.style.display = 'block';  // Mostra o formulário
    tabTitleInput.value = '';  // Limpa o campo de título
    tabContentInput.value = '';  // Limpa o campo de conteúdo
    editingTab = null;  // Nenhuma aba está sendo editada
});

// Salvar a aba (nova ou editada)
saveTabButton.addEventListener('click', () => {
    const newTabTitle = tabTitleInput.value;
    const newTabContent = tabContentInput.value;

    if (!newTabTitle || !newTabContent) {
        alert('Preencha todos os campos');
        return;
    }

    if (editingTab) {
        // Editando aba existente
        editingTab.textContent = newTabTitle;
        const contentId = editingTab.dataset.target;
        document.querySelector(contentId).innerHTML = `<h3>${newTabTitle}</h3><p>${newTabContent}</p>`;
    } else {
        // Criando uma nova aba
        const newTabIndex = document.querySelectorAll('.tab-button').length + 1;
        const newTabId = `tab${newTabIndex}`;

        // Criar um novo botão para a aba
        const newTabButton = document.createElement('button');
        newTabButton.classList.add('tab-button');
        newTabButton.dataset.target = `#${newTabId}`;
        newTabButton.textContent = newTabTitle;
        document.querySelector('.tabs').insertBefore(newTabButton, addTabButton);

        // Criar o novo conteúdo da aba
        const newTabContentElement = document.createElement('div');
        newTabContentElement.id = newTabId;
        newTabContentElement.classList.add('tab-content');
        newTabContentElement.innerHTML = `<h3>${newTabTitle}</h3><p>${newTabContent}</p>`;
        document.querySelector('.tabs').after(newTabContentElement);

        // Atualizar o evento de clique do botão
        newTabButton.addEventListener('click', () => handleTabClick(newTabButton));
    }

    // Esconde o formulário após salvar
    tabForm.style.display = 'none';
});

// Editar uma aba existente
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('dblclick', () => {
        editingTab = button;
        tabForm.style.display = 'block';
        const contentId = button.dataset.target;
        const currentContent = document.querySelector(contentId);

        tabTitleInput.value = button.textContent;
        tabContentInput.value = currentContent.querySelector('h3').textContent;
    });
});


// Modal de Login
const modal = document.getElementById('loginModal');
const modalButton = document.getElementById('modalButton');
const modalCloseButton = document.getElementById('modalCloseButton');

modalButton.addEventListener('click', () => {
    modal.classList.add('open');
});

modalCloseButton.addEventListener('click', () => {
    modal.classList.remove('open');
});


// Inicializa o gráfico com Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
let chartData = [12, 19, 3, 5, 2, 3];
const labels = ['Vermelho', 'Azul', 'Amarelo', 'Verde', 'Roxo', 'Laranja'];

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# de Votos',
            data: chartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Preenche o seletor de índices com opções
const dataIndexSelect = document.getElementById('dataIndex');

function populateDataIndexSelect() {
    dataIndexSelect.innerHTML = '';
    chartData.forEach((value, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Campo ${index + 1} (${labels[index]})`;
        dataIndexSelect.appendChild(option);
    });
}

// Função para atualizar o gráfico com um novo valor
const chartForm = document.getElementById('chartForm');
const newValue = document.getElementById('newValue');

chartForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const value = parseFloat(newValue.value);
    const index = parseInt(dataIndexSelect.value);

    if (!isNaN(value) && index >= 0 && index < chartData.length) {
        chartData[index] = value;
        myChart.update();
        newValue.value = '';
    }
});

// Inicializa o seletor com opções
populateDataIndexSelect();



// Seleciona os elementos principais do menu lateral
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const closeMenuButton = document.getElementById('closeMenuButton');

// Abre o menu lateral
menuButton.addEventListener('click', () => {
    sidebar.style.width = '250px';
    document.body.style.marginLeft = '250px';
});

// Fecha o menu lateral
closeMenuButton.addEventListener('click', () => {
    sidebar.style.width = '0';
    document.body.style.marginLeft = '0';
});

// Navegação suave para os links do menu lateral
document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        sidebar.style.width = '0';  // Fecha o menu lateral após o clique
        document.body.style.marginLeft = '0';  // Reseta o margin-left
    });
});

// Para botões específicos do menu
document.getElementById('logoutButton').addEventListener('click', () => {
    alert('Você saiu da sessão!');
    // Adicione lógica de logout, se necessário
    sidebar.style.width = '0';
    document.body.style.marginLeft = '0';
});

// Alternar tema (exemplo)
const toggleThemeButton = document.getElementById('toggleThemeButton');
toggleThemeButton?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    sidebar.style.width = '0';
    document.body.style.marginLeft = '0';
});
