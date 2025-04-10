const form = document.getElementById("newTaskForm");
if (!form) throw new Error("No new task form detected");

const taskInput = document.getElementById("input");
if (!taskInput) throw new Error("No task input detected");

const taskUl = document.getElementById("tasksList");
if (!taskUl) throw new Error("New task list detected");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { task } = getData(e.target);
  if (task.length === 0) return;

  addNewTask(task);
  taskInput.value = "";
})

/**
 * 
 * @param {EventTarget} form 
 * @returns The form data
 */
function getData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

/**
 * 
 * @param {string} task 
 */
function addNewTask(task) {
  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox")
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("change", handleCheckbox)
  li.appendChild(checkbox);

  // Task span
  const span = document.createElement("span");
  span.classList.add("task")
  span.textContent = task;
  li.appendChild(span);

  // Duplicate button
  const duplicateButton = document.createElement("button");
  duplicateButton.classList.add("duplicate");
  duplicateButton.textContent = "+";
  duplicateButton.addEventListener("click", handleDuplicate)
  li.appendChild(duplicateButton);

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  removeButton.textContent = "-";
  removeButton.addEventListener("click", handleRemove)
  li.appendChild(removeButton);

  taskUl.appendChild(li);
}

/**
 * 
 * @param {Event} e Checkbox change event
 */
function handleCheckbox(e) {
  const checkbox = e.currentTarget;
  const span = checkbox.parentElement.querySelector(".task");

  if (checkbox.checked) {
    span.classList.add("strikethrough");
  } else {
    span.classList.remove("strikethrough");
  }
}

/**
 * 
 * @param {MouseEvent} e Click event
 */
function handleDuplicate(e) {
  const li = e.currentTarget.parentElement;
  const newLi = li.cloneNode(true);

  // `.cloneNode()` doesn't clone event listeners so add them manually
  newLi.querySelector(".checkbox").addEventListener("change", handleCheckbox);
  newLi.querySelector(".duplicate").addEventListener("click", handleDuplicate);
  newLi.querySelector(".remove").addEventListener("click", handleRemove);
  
  taskUl.appendChild(newLi);
}

/**
 * 
 * @param {MouseEvent} e Click event
 */
function handleRemove(e) {
  const li = e.currentTarget.parentElement;
  li.remove();
}