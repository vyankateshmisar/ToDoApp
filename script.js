// Retrive the todo from localstorage or initialize an empty

let todo = JSON.parse(globalThis.window.localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");

const todoList = document.getElementById("todoList");

const todoCount = document.getElementById("todoCount");

const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

const addTask = () => {
  //   console.log("I m here");
  let newTask = todoInput.value.trim();
  if (newTask.length > 0) {
    todo.push({
      text: newTask,
      disabled: false,
    });
  }
  saveToLocalStorage();
  todoInput.value = "";
  displayTasks();
};
// ? is called ternary operator
const displayTasks = () => {
  todoList.innerHTML = "";
  todo.forEach((item, idx) => {
    const p = document.createElement("p");
    p.innerHTML = `
    <div class = "todo-container">
      <input type= "checkbox" class = "todo-checkbox"
      id = "input-${idx}" ${item.disabled ? "checked" : ""} >
      <p id="todo-${idx}" class = "${item.disabled ? "disabled" : ""}"
      onclick = "editTask(${idx})"
       > 
       ${item.text}
      </p>
    </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(idx);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
};

const deleteAllTasks = () => {
  todo = [];
  saveToLocalStorage();
  displayTasks();
};

const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

const toggleTask = (idx) => {
  todo[idx].disabled = !todo[idx].disabled;
  saveToLocalStorage();
  displayTasks();
};

const editTask = (idx) => {
  const currEle = document.getElementById(`todo-${idx}`);
  const currText = todo[idx].text;
  const inputEle = document.createElement("input");
  inputEle.value = currText;
  currEle.replaceWith(inputEle);
  inputEle.focus();
  inputEle.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      const updatedText = inputEle.value.trim();
      if (updatedText) {
        todo[idx].text = updatedText;
        saveToLocalStorage();
      }
      displayTasks();
    }
  });
};
