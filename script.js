let tarefas = []
const InputTarefa = document.getElementById("inputTarefa")

const salvo = localStorage.getItem('tarefas');

if (salvo) {
    tarefas = JSON.parse(salvo);
    renderizarTarefas();
}

function AdicionarTarefa(){
    let Tarefa = InputTarefa.value.trim()

    if (Tarefa.length > 14){
        document.getElementById("pla").textContent = "Muitas letras, escreva menos."
        document.getElementById("pla").style.color = "rgb(189, 52, 52)"
        document.getElementById("certificado").textContent = ""
    }else if (Tarefa == ""){
        document.getElementById("certificado").textContent = "Nada a adicionar ."
        document.getElementById("certificado").style.color = "rgb(189, 52, 52)"
        InputTarefa.value = ""
        document.getElementById("pla").textContent = ""
    }else{
        InputTarefa.value = ""
        tarefas.push(Tarefa)

        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        renderizarTarefas()

        document.getElementById("certificado").textContent = "Tarefa adicionada com sucesso!"
        document.getElementById("certificado").style.color = "rgb(145, 184, 54)"

        document.getElementById("pla").textContent = ""
    }
}

function renderizarTarefas() {
    let listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""

    for (let i = 0; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]

        let removeButton = document.createElement("button")
        let editButton = document.createElement("button")

        removeButton.textContent = "Remover item"
        editButton.textContent = "Editar item"
        editButton.className = "edit"
        removeButton.className = "remove"

        removeButton.onclick = () => removerTarefa(i)
        editButton.onclick = () => editarTarefa(i)
        
        novaTarefa.appendChild(removeButton)
        novaTarefa.appendChild(editButton)
        listaTarefas.appendChild(novaTarefa)

    }
}

function removerTarefa(i) {
    tarefas.splice(i, 1)

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    document.getElementById("certificado").textContent = "Tarefa Removida com sucesso"
    document.getElementById("certificado").style.color = "rgb(145, 7, 7)"

    renderizarTarefas()
}

function editarTarefa(i){
    InputTarefa.value = tarefas[i]
    document.getElementById("certificado").textContent = "Editando tarefa "
    tarefas.splice(i, 1)
    renderizarTarefas()
}