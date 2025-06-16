document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const taskList = document.getElementById("task-list");

    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
    <span onclick="toggleComplete(${task.id})">${task.text}</span>
    <div class="actions">
      <button class="edit" onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </div>
  `;

    taskList.appendChild(li);
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function setTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    setTasks(tasks);

    const li = document.querySelector(`[data-id='${id}']`);
    if (li) li.remove();
}

function toggleComplete(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    setTasks(tasks);

    const li = document.querySelector(`[data-id='${id}']`);
    li.classList.toggle("completed");
}

function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit your task:", task.text);

    if (newText === null || newText.trim() === "") return;

    task.text = newText.trim();
    setTasks(tasks);

    const li = document.querySelector(`[data-id='${id}']`);
    if (li) {
        li.querySelector("span").innerText = task.text;
    }
}
