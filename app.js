const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="toggle">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete">Delete</button>
          </div>
        `;

        li.querySelector('.toggle').addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector('.delete').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        text: taskInput.value,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
});

renderTasks();