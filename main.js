// Store tasks in an array
let tasks = [];

// Task constructor
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.isDone = false;
  }

  markDone() {
    this.isDone = true;
  }

  // Mark task as undone
  unmarkDone() {
    this.isDone = false;
  }
}

// Add a new task
function addTask() {
  const titleInput = document.getElementById("taskTitle");
  const descriptionInput = document.getElementById("taskDescription");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title && description) {
    const task = new Task(title, description);
    tasks.push(task);

    // Render the tasks
    renderTasks();

    // Clear the input fields
    titleInput.value = "";
    descriptionInput.value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Mark a task as done
function markTaskDone(index) {
  tasks[index].markDone();
  renderTasks();
}

// Mark a task as undone
function unmarkTaskDone(index) {
  tasks[index].unmarkDone();
  renderTasks();
}

// Render the tasks on the screen
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the list before re-rendering

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add(
      "MuiListItem-root",
      "MuiListItem-padding",
      "MuiListItem-divider"
    );

    const taskText = document.createElement("span");
    taskText.textContent = `${task.title} - ${task.description}`;
    taskText.classList.add(
      task.isDone ? "MuiTypography-colorTextSecondary" : ""
    );

    // Mark task as done/undone button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.isDone ? "Undo" : "Done";
    toggleButton.classList.add(
      "MuiButton-root",
      "MuiButton-contained",
      "MuiButton-containedPrimary"
    );
    toggleButton.onclick = () => {
      if (task.isDone) {
        unmarkTaskDone(index);
      } else {
        markTaskDone(index);
      }
    };

    // Delete task button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "MuiButton-root",
      "MuiButton-contained",
      "MuiButton-containedSecondary"
    );
    deleteButton.onclick = () => deleteTask(index);

    taskElement.appendChild(taskText);
    taskElement.appendChild(toggleButton);
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);
  });
}

// Create the MUI-based To-Do List form
function createToDoApp() {
  const root = document.getElementById("root");

  // Create the main container (MUI Card)
  const card = document.createElement("div");
  card.classList.add(
    "MuiCard-root",
    "MuiPaper-elevation1",
    "MuiCard-elevation1"
  );

  const cardContent = document.createElement("div");
  cardContent.classList.add("MuiCardContent-root");

  // Add header
  const header = document.createElement("h2");
  header.textContent = "To-Do List";
  header.classList.add("MuiTypography-root", "MuiTypography-h6");

  // Create input fields (TextField)
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "taskTitle";
  titleInput.placeholder = "Task Title";
  titleInput.classList.add(
    "MuiInputBase-root",
    "MuiOutlinedInput-root",
    "MuiInputBase-fullWidth"
  );

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "taskDescription";
  descriptionInput.placeholder = "Task Description";
  descriptionInput.classList.add(
    "MuiInputBase-root",
    "MuiOutlinedInput-root",
    "MuiInputBase-fullWidth"
  );

  // Add task button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Task";
  addButton.classList.add(
    "MuiButton-root",
    "MuiButton-contained",
    "MuiButton-containedPrimary"
  );
  addButton.onclick = addTask;

  // Add form to the content
  cardContent.appendChild(header);
  cardContent.appendChild(titleInput);
  cardContent.appendChild(descriptionInput);
  cardContent.appendChild(addButton);

  // Task list
  const taskList = document.createElement("ul");
  taskList.id = "taskList";

  cardContent.appendChild(taskList);
  card.appendChild(cardContent);

  root.appendChild(card);
}

createToDoApp();
