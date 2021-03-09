// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event listeners
document.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)

// Functions
function addTodo(event) {
    event.preventDefault(); // Stop button from submiting and refreshing

    saveLocalTodos(todoInput.value);

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoInput.value = '';
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

function deleteTodoFromLocalStorage(todoToDelete) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const removeIndex = todos.indexOf(todoToDelete);
    todos.splice(removeIndex, 1);
    // todos.forEach(function(todo) {
    //     if (todoToDelete === todo) {
    //         todos.remove(todo);
    //         break;
    //     }
    // });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteCheck(event) {
    const item = event.target;
 
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');

        deleteTodoFromLocalStorage(todo.innerText);
        
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        // todo.remove();
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// function saveLocalCompletedTodos(todo) {
//     let todos;
//     if (localStorage.getItem('todos') == null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }

//     todos.push(todo);
//     localStorage.setItem('todos', JSON.stringify(todos));
// }

function getLocalTodos() {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    });
}