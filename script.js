document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!subject || !date || !time) return;

  const task = { subject, date, time };
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // UI update
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `${subject} – ${date} at ${time} <button onclick="markDone(this)">✓</button>`;
  taskList.appendChild(li);
  this.reset();

  // Reminder
  const taskDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const diff = taskDateTime - now;
  if (diff > 0) {
    setTimeout(() => {
      alert(`⏰ Reminder: Time to study ${subject}!`);
    }, diff);
  }
});

function markDone(button) {
  button.parentElement.classList.toggle('done');
}
