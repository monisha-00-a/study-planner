const dashboardTasks = document.getElementById("dashboardTasks");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

function formatTask(task) {
  return `${task.subject} – ${task.date} at ${task.time}`;
}

function showToday() {
  dashboardTasks.innerHTML = "";
  const today = new Date().toISOString().slice(0, 10);
  const tasks = loadTasks().filter(t => t.date === today);

  if (tasks.length === 0) {
    dashboardTasks.innerHTML = "<li>No tasks for today!</li>";
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = formatTask(task);
    dashboardTasks.appendChild(li);
  });
}

function showWeek() {
  dashboardTasks.innerHTML = "";
  const today = new Date();
  const tasks = loadTasks().filter(task => {
    const taskDate = new Date(task.date);
    const diff = (taskDate - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff < 7;
  });

  if (tasks.length === 0) {
    dashboardTasks.innerHTML = "<li>No tasks for this week!</li>";
    return;
  }

  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = formatTask(task);
    dashboardTasks.appendChild(li);
  });
}
