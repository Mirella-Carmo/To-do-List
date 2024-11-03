// Seleção de elementos
let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');

inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        adicionarNovaTarefa();
    }
});

btnAddTarefa.addEventListener('click', adicionarNovaTarefa);

// Evento para fechar a janela de edição
janelaEdicaoBtnFechar.addEventListener('click', alternarJanelaEdicao);

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();
    atualizarTarefa();
});

// Funtion
function adicionarNovaTarefa() {
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    };
    adicionarTarefa(tarefa);
    inputNovaTarefa.value = '';
}

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
}

function criarTagLI(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.addEventListener('click', () => editarTarefa(tarefa.id));

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnExcluir');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function editarTarefa(idTarefa) {
    let li = document.getElementById(idTarefa);
    if (li) {
        idTarefaEdicao.innerHTML = `#${idTarefa}`;
        inputTarefaNomeEdicao.value = li.querySelector('.textoTarefa').innerText;
        alternarJanelaEdicao();
    }
}

function atualizarTarefa() {
    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');
    let tarefaAtual = document.getElementById(idTarefa);

    if (tarefaAtual) {
        let novaDescricao = inputTarefaNomeEdicao.value;
        tarefaAtual.querySelector('.textoTarefa').innerText = novaDescricao;
        alternarJanelaEdicao();
    }
}

function excluirTarefa(idTarefa) {
    let confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
        let li = document.getElementById(idTarefa);
        if (li) {
            listaTarefas.removeChild(li);
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}
