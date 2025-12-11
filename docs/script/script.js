const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const prioritySelect = document.getElementById('prioritySelect');

loadTasks();

// Priority order: lower number = higher priority
function getPriorityOrder(priority) {
    const order = { 'high': 0, 'medium': 1, 'low': 2 };
    return order[priority] || 1;
}

// Sort and re-render all tasks by priority
function sortAndRenderTasks() {
    // Get all tasks from DOM
    let tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        const id = item.dataset.id;
        const priority = item.dataset.priority; // Read directly from dataset
        const text = item.querySelector('.task-text').textContent;
        
        tasks.push({
            id: id,
            text: text,
            priority: priority,
            completed: false
        });
    });
    
    // Sort by priority (high first)
    tasks.sort((a, b) => getPriorityOrder(a.priority) - getPriorityOrder(b.priority));
    
    // Clear the list
    taskList.innerHTML = '';
    
    // Re-render all tasks in sorted order
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function addTask(){
    
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText){
        const task = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            completed: false
        };

        createTaskElement(task);
        taskInput.value = '';
        sortAndRenderTasks(); // Sort after adding
        saveTasks();
    } else {
        alert("Invalid input.")
    }
}

addButton.addEventListener('click', addTask);  
taskInput.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        addTask();
    }
});

function createTaskElement(task){

    const listItem = document.createElement('li');
    listItem.dataset.id = task.id;
    listItem.dataset.priority = task.priority; // Store priority in dataset
    listItem.classList.add(`priority-${task.priority}`);

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const taskMeta = document.createElement('span');
    taskMeta.className = 'task-meta';
    taskMeta.textContent = `[${task.priority.toUpperCase()}]`;

    taskInfo.appendChild(taskText);
    taskInfo.appendChild(taskMeta);

    //buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'task-actions';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.className = 'deleteTask';
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editTask';

    buttonContainer.appendChild(editButton); 
    buttonContainer.appendChild(deleteButton); 
    
    listItem.appendChild(taskInfo); 
    listItem.appendChild(buttonContainer); 
    taskList.appendChild(listItem);

    
    deleteButton.addEventListener('click', function(){
        taskList.removeChild(listItem);
        saveTasks();
    });

    editButton.addEventListener('click', function() {
        editTask(listItem, task);
    });
    
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        
        const id = item.dataset.id;
        const text = item.querySelector('.task-text').textContent;
        const priority = item.dataset.priority; // Read directly from dataset
        
        tasks.push({
            id: id,
            text: text,
            priority: priority,
            completed: false
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Sort tasks by priority before displaying
    tasks.sort((a, b) => getPriorityOrder(a.priority) - getPriorityOrder(b.priority));
    tasks.forEach(createTaskElement);
}

//clear tasks list function
const clearButton = document.getElementById('clearList');

clearButton.addEventListener('click', function() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});


function editTask(listItem, task) {
    
    const taskInfo = listItem.querySelector('.task-info');
    const oldText = task.text;

    // Clear task info
    taskInfo.innerHTML = '';

    // Create input to edit
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'editInput';
    taskInfo.appendChild(input);
    input.focus();

    // Priority dropdown
    const priorityEdit = document.createElement('select');
    priorityEdit.innerHTML = `
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
    `;
    priorityEdit.value = task.priority;
    taskInfo.appendChild(priorityEdit);

    // Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'saveEdit';
    taskInfo.appendChild(saveButton); 

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'cancelEdit';
    taskInfo.appendChild(cancelButton); 

    // Function to handle saving
    const saveEdit = function() {
        const newText = input.value.trim();
        if (newText) {
            task.text = newText;
            task.priority = priorityEdit.value;
            
            // Recreate the task display
            taskInfo.innerHTML = '';
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            
            const taskMeta = document.createElement('span');
            taskMeta.className = 'task-meta';
            taskMeta.textContent = `[${task.priority.toUpperCase()}]`;
            
            taskInfo.appendChild(taskText);
            taskInfo.appendChild(taskMeta);
            
            // Update priority in dataset
            listItem.dataset.priority = task.priority;
            
            // Update priority class
            listItem.className = '';
            listItem.classList.add(`priority-${task.priority}`);
            
            saveTasks();
            sortAndRenderTasks(); // Sort after editing
        } else {
            alert("Task cannot be empty.");
        }
    };

    saveButton.addEventListener('click', saveEdit);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });

    cancelButton.addEventListener('click', function() {
        taskInfo.innerHTML = '';
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        const taskMeta = document.createElement('span');
        taskMeta.className = 'task-meta';
        taskMeta.textContent = `[${task.priority.toUpperCase()}]`;
        
        taskInfo.appendChild(taskText);
        taskInfo.appendChild(taskMeta);
    });
}