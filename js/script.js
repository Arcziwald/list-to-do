{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindEvents = () => {
    const removestat = document.querySelectorAll(".js-remove");

    removestat.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDonestat = document.querySelectorAll(".js-toggleDone");

    toggleDonestat.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };
  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__item ${
        task.done && hideDoneTasks ? "tasks__item--hidden" : ""
      } js-task">
        <button class="tasks__button tasks__button--toggleDone js-toggleDone${
          task.done ? " emoji " : ""
      }"></button>
      <span class="tasks__content${task.done ? " tasks__content--toggleDone " : ""}">
        ${task.content}
      </span>
     <button class="tasks__button tasks__button--remove js-remove">🗑</button>
      </li>
    `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderStat = () => {
    const statElement = document.querySelector(".js-stat");
    if (!tasks.length) {
      statElement.innerHTML = "";
      return;
    }
    statElement.innerHTML = `
        <button class="stat__button button--toggleHideDoneButton js-toggleHideDoneButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="stat__button  button--markAllDoneButton js-markAllDoneButton"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}> Ukończ wszystkie 
        </button> `;
  };

  const bindstatEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDoneButton");
    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }
    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneButton"
    );
    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    bindEvents();
    renderStat();
    bindstatEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = newTaskInput.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskInput.value = "";
    }
    newTaskInput.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
