var todoList = {
    todos: [],
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, newText){
       var changeTodoPositionInput =  this.todos[position];
       changeTodoPositionInput.todoText = newText;
    },
    deleteTodo: function(position){
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function(){
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        this.todos.forEach(function (todo){
            if(todo.completed === true){
                completedTodos++;
            }
        });
        this.todos.forEach(function (todo){
            if(totalTodos === completedTodos){
                todo.completed = false;
            }
            else{
                todo.completed = true;
            }
        });   
    },
    retrieveTodos: function(){
        var todos = JSON.parse(localStorage.getItem('todos'));
        
        if(todos != null || todos != null){
            todoList.todos = todos;
            views.displayTodos();
        };
    }
}

var handlers = {
    addTodo: function(event){
        event.preventDefault;
        if(event.keyCode === 13){
            var todoTextInput = document.getElementById('todoTextInput');
            if(todoTextInput.value!=""){
                todoList.addTodo(todoTextInput.value);
                todoTextInput.value = "";
                views.displayTodos(); 
            }
        }
    },
    changeTodo: function(position){
        var todoText = document.getElementById(position);
        var oldTodoText = todoList.todos[position].todoText
        var changeTodoTextInput = prompt("Change Todo text: ", oldTodoText);

        if(changeTodoTextInput === null || changeTodoTextInput === ""||changeTodoTextInput===oldTodoText){
            return false;
        }
        else{
            todoList.changeTodo(position,changeTodoTextInput);
            views.displayTodos();
        }
    },
    deleteTodo: function(position){
        if(confirm("Do you want to delete this todo?")){
            todoList.deleteTodo(position);
            views.displayTodos();
        }
        else{
        }
    },
    toggleCompleted: function(position){
        todoList.toggleCompleted(position);
        views.displayTodos();
    },
    toggleAll: function(){
        todoList.toggleAll();
        views.displayTodos();
    }
}

var views = {
    displayTodos: function(){
        var todosUl = document.querySelector('ul');
        var todos =  todoList.todos;
        localStorage.setItem('todos', JSON.stringify(todoList.todos));
        todosUl.innerHTML = "";
        todos.forEach(function(todo, position){
            var todoLi = document.createElement('li');
            var checkBox = document.createElement('input');
            var todoTextWithCompletion = "";

            todoLi.id = position;
            checkBox.type = 'checkbox';
            checkBox.id = position;
            if(todo.completed === true){
                todoTextWithCompletion = "(X) " + todo.todoText;
            }
            else{
                todoTextWithCompletion = "( ) " + todo.todoText;
            }
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todoLi.appendChild(this.createEditButton());
            todoLi.appendChild(this.createToggleButton(todo.completed));           
            todoLi.appendChild(this.createLineBreak());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function(){
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    createEditButton: function(){
        var editButton = document.createElement('button');
        editButton.textContent = 'Change';
        editButton.className = 'changeButton';
        return editButton;
    },
    createToggleButton: function(completed){
        var toggleButton = document.createElement('button');
        if(completed === true){
            toggleButton.textContent = 'Completed';
        }
        else{
            toggleButton.textContent = 'Complete';
        }
       
        toggleButton.className = 'toggleButton';
        return toggleButton;
    },
    createLineBreak: function(){
        var line = document.createElement('hr');
        return line;
    },
    setUpEventListener: function(){
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if(elementClicked.className === 'deleteButton'){
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            else if(elementClicked.className === 'changeButton'){
                handlers.changeTodo(parseInt(elementClicked.parentNode.id));
            }
            else if(elementClicked.className === 'toggleButton'){
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
            else{}
        });
    },
}

todoList.retrieveTodos();
views.setUpEventListener();





