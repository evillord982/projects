const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const prioritySelect = document.getElementById('prioritySelect'); // FIXED

loadTasks();

function addTask(){
    
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value; // FIXED - removed ()

    if (taskText){
        const task = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            completed: false
        };

        createTaskElement(task);
        taskInput.value = '';
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
    listItem.dataset.id = task.id; // FIXED - added this line
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

    buttonContainer.appendChild(editButton); // FIXED - append to buttonContainer
    buttonContainer.appendChild(deleteButton); // FIXED - append to buttonContainer
    
    listItem.appendChild(taskInfo); // FIXED - append taskInfo first
    listItem.appendChild(buttonContainer); // FIXED - append buttonContainer
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
        const meta = item.querySelector('.task-meta').textContent;

        const priorityMatch = meta.match(/\[(.*?)\]/);
        
        tasks.push({
            id: id,
            text: text,
            priority: priorityMatch ? priorityMatch[1].toLowerCase() : 'medium',
            completed: false
        });
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

// REMOVED the duplicate editButton event listener that was here

function editTask(listItem, task) {
    
    const taskInfo = listItem.querySelector('.task-info');
    const oldText = task.text;

    // Clear task info
    taskInfo.innerHTML = '';

    // Create input to edit
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldText; // FIXED - was oldTaskText
    input.className = 'editInput';
    taskInfo.appendChild(input); // FIXED - was listItem
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
    taskInfo.appendChild(saveButton); // FIXED - was listItem

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'cancelEdit';
    taskInfo.appendChild(cancelButton); // FIXED - was listItem

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
            
            // Update priority class
            listItem.className = '';
            listItem.classList.add(`priority-${task.priority}`);
            
            saveTasks();
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