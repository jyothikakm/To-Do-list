// DOM Elements
const todoValue = document.getElementById("todo-input");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");

// Initialize the to-do list from localStorage or set it to an empty array
let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

// Load and display the list on page load
window.onload = () => ReadToDolist();

// Add a new task
function createToDoitems(task = null) {
  const taskValue = task || todoValue.value.trim();

  if (!taskValue) {
    todoAlert.innerText = "Enter a new task";
    todoValue.focus();
    return;
  }

  todo.push({ id: Date.now(), task: taskValue, completed: false });
  localStorage.setItem("todo-list", JSON.stringify(todo));
 
  todoValue.value = "";
  todoAlert.innerText = "";
  ReadToDolist();
}

// Display the list
function ReadToDolist() {
  listItems.innerHTML = todo.length
    ? todo
        .map(
          (item) => `
          <li class="todo-item" data-id="${item.id}">
            <span onclick="toggleComplete(${item.id})" style="text-decoration: ${
              item.completed ? "line-through" : "none"
            };">${item.task}</span>
            <span class="edit-btn" onclick="UpdateToDolist(${item.id})">Edit</span>
            <span class="delete-btn" onclick="deleteTodolist(${item.id})">Delete</span>
          </li>`
        )
        .join("")
    : "<p>No tasks found. Start adding some!</p>";
}

// Update a task
function UpdateToDolist(id) {
  const taskIndex = todo.findIndex((item) => item.id === id);
  const updatedTask = prompt("Edit your task:", todo[taskIndex].task);
  if (updatedTask) {
    todo[taskIndex].task = updatedTask.trim();
    localStorage.setItem("todo-list", JSON.stringify(todo));
    ReadToDolist();
  }
}

// Delete a task
function deleteTodolist(id) {
  todo = todo.filter((item) => item.id !== id);
  localStorage.setItem("todo-list", JSON.stringify(todo));
  ReadToDolist();
}

