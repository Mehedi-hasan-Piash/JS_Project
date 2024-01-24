
// find the elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


//showMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`)
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.classList.remove(`bg-${status}`)
    }, 3000)
}

//create todo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add('li-style');
    todoElement.innerHTML =  `<span> ${todoValue} </span>
     <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"> </i> </button> </span>`;

     todoLists.appendChild(todoElement);

     const deleteButton = todoElement.querySelector('#deleteButton')
     deleteButton.addEventListener('click', deleteTodo)

};


//deleteTodo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectedTodo);
    showMessage('todo is deleted', 'danger')
    


    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem('mytodos', JSON.stringify(todos));
};


//getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem('mytodos') ? JSON.parse(localStorage.getItem('mytodos')) : [];
}


//add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;


    // unique id 
    const todoId = Date.now().toString();
    createTodo (todoId, todoValue);

    showMessage('todo is added', 'success');

    // add todo to localStorage
    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem('mytodos', JSON.stringify(todos));

    todoInput.value = '';
};


// loadTodo
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
}


//adding listener
todoForm.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', loadTodos);

































































































