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
    // happens when the add todo button is clicked
    event.preventDefault(); // Stop button from submiting and refreshing

    saveLocalTodos(todoInput.value, 'todos');

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

function deleteTodoFromLocalStorage(todoToDelete, structure) {
    // update on of the todo local storage structures
    // with a removed todo, then save back to local storage
    let todos;
    if (localStorage.getItem(structure) == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem(structure));
    }

    const removeIndex = todos.indexOf(todoToDelete);
    todos.splice(removeIndex, 1);

    localStorage.setItem(structure, JSON.stringify(todos));
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');

        // either delete todo from todos or todosCompleted
        if (Array.from(todo.classList).indexOf('completed') < 0) {
            deleteTodoFromLocalStorage(todo.innerText, 'todos');
        } else {
            deleteTodoFromLocalStorage(todo.innerText, 'todosCompleted');
        }
        
        // only remove the item after the animation
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    else if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;

        // either delete todo from todos or todosCompleted
        // then add the todo to the other list
        if (Array.from(todo.classList).indexOf('completed') < 0) {
            deleteTodoFromLocalStorage(todo.innerText, 'todos');
            saveLocalTodos(todo.innerText, 'todosCompleted');
        } else {
            deleteTodoFromLocalStorage(todo.innerText, 'todosCompleted');
            saveLocalTodos(todo.innerText, 'todos');
        }

        todo.classList.toggle('completed');
    }

    else if (item.classList[0] === 'todo-item') {
        //TODO loop through todoList and collapse any non-busy editing divs
        const todo = item.parentElement;
        console.log(todo.innerText);
        console.log(todoList.indexOf(todo));
        todo.innerHTML = '<form><input value="' + todo.innerText + '"><button class="todo-button"><i class="fas fa-edit"></i></button></form>';
    }
}

function saveLocalTodos(todo, structure) {
    // update on of the todo local storage structures
    // with a new todo, then save back to local storage
    let todos;
    if (localStorage.getItem(structure) == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem(structure));
    }

    todos.push(todo);
    localStorage.setItem(structure, JSON.stringify(todos));
}

function getLocalTodos() {
    // load uncompleted todos on document load
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

    // load completed todos on document load
    let todosCompleted;
    if (localStorage.getItem('todosCompleted') == null) {
        todosCompleted = [];
    } else {
        todosCompleted = JSON.parse(localStorage.getItem('todosCompleted'));
    }

    todosCompleted.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add('completed');
    
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