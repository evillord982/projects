const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask(){
    
    const task = taskInput.value.trim();
    if (task){  //if task input field is empty, add task, then clear the input field after pressed the add task button
        createTaskElement(task);
        taskInput.value = '';
        saveTasks();
    } else {
        alert("Invalid input, try again!")
    }
}

addButton.addEventListener('click', addTask);   //click the add task button to peform add task function
taskInput.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        addTask();
        }
    });

function createTaskElement(task){

    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.className = 'deleteTask';
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editTask';

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    taskList.appendChild(listItem);

    
    deleteButton.addEventListener('click', function(){
        taskList.removeChild(listItem);
        saveTasks();
    })

    editButton.addEventListener('click', function() {
        editTask(listItem, task);
    });
    
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        // Get only the text node, not the buttons
        const taskText = item.childNodes[0].textContent.trim();
        tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}

//clear tasks list function
const clearButton = document.getElementById('clearList');

clearButton.addEventListener('click', function() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

//edit task button

editButton.addEventListener('click', function() {
        editTask(listItem, task);
    });

    


function editTask(listItem, oldTaskText) {
    // Remove existing text
    listItem.textContent = '';

    // Create input to edit
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldTaskText;
    input.className = 'editInput';
    listItem.appendChild(input);
    input.focus();

    // Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'saveEdit';
    listItem.appendChild(saveButton);

    // Cancel button (optional)
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'cancelEdit';
    listItem.appendChild(cancelButton);

    // Function to handle saving
    const saveEdit = function() {
        const newText = input.value.trim();
        if (newText) {
            listItem.innerHTML = '';
            createTaskElement(newText);
            taskList.removeChild(listItem); // Remove original, replaced in new element
            saveTasks();
        } else {
            alert("Task cannot be empty.");
        }
    };

    // Save action on button click
    saveButton.addEventListener('click', saveEdit);

    // Save action on Enter key press
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });

    // Cancel acti
    cancelButton.addEventListener('click', function() {
        listItem.innerHTML = '';
        createTaskElement(oldTaskText);
        taskList.removeChild(listItem);
    });
}




