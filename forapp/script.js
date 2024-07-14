let currentEditIndex = null;
let currentEditType = null;

document.addEventListener('DOMContentLoaded', function() {
    showTodo(); // Ensure default view on page load
});

function showTodo() {
    document.getElementById('todoSection').style.display = 'block';
    document.getElementById('notesSection').style.display = 'none';
}

function showNotes() {
    document.getElementById('todoSection').style.display = 'none';
    document.getElementById('notesSection').style.display = 'block';
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const task = taskInput.value.trim();
    const date = taskDate.value;

    if (task === "" || date === "") {
        alert("Please enter a task and a date.");
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = `${task} - Due: ${date}`;
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => openEditModal(`${task} - Due: ${date}`, li, 'task'));
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => li.remove());
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    taskInput.value = '';
    taskDate.value = '';
}

function addNote() {
    const noteTitle = document.getElementById('noteTitle').value.trim();
    const noteInput = document.getElementById('noteInput').value.trim();

    if (noteTitle === "" || noteInput === "") {
        alert("Please enter a note title and content.");
        return;
    }
    
    const noteList = document.getElementById('noteList');
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.innerHTML = `<strong>${noteTitle}</strong><br>${noteInput}`;
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => openEditModal(`${noteTitle} - ${noteInput}`, li, 'note'));
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => li.remove());
    li.appendChild(deleteButton);

    noteList.appendChild(li);
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteInput').value = '';
}

function openEditModal(item, li, type) {
    currentEditIndex = Array.from(li.parentNode.children).indexOf(li);
    currentEditType = type;
    document.getElementById('editInput').value = item;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    const newItem = document.getElementById('editInput').value.trim();
    if (newItem === "") {
        alert("Please enter a value.");
        return;
    }
    
    const listId = currentEditType === 'task' ? 'taskList' : 'noteList';
    const list = document.getElementById(listId);
    const li = list.children[currentEditIndex];
    li.querySelector('span').innerHTML = newItem;
    
    closeModal();
}

function setTheme(theme) {
    const body = document.body;
    body.className = theme;
}
