const userIdInput = document.getElementById('userIdInput');
const getTasksButton = document.getElementById('getTasksButton');
const tasksList = document.getElementById('tasksList');
const errorMessage = document.getElementById('errorMessage');

getTasksButton.addEventListener('click', () => {
  const userId = userIdInput.value;
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Пользователь с указанным id не найден');
      }
      return response.json();
    })
    .then(data => {
      tasksList.innerHTML = '';
      data.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerText = task.title;
        if (task.completed) {
          taskItem.style.textDecoration = 'line-through';
        }
        tasksList.appendChild(taskItem);
      });
    })
    .catch(error => {
      errorMessage.innerText = error.message;
    });
});