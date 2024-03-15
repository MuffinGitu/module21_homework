const pageInput = document.getElementById('page-input');
const limitInput = document.getElementById('limit-input');
const requestBtn = document.getElementById('request-btn');
const errorMessage = document.getElementById('error-message');
const imagesList = document.getElementById('images-list');

let lastPage = localStorage.getItem('lastPage') || 1;
let lastLimit = localStorage.getItem('lastLimit') || 10;

pageInput.value = lastPage;
limitInput.value = lastLimit;

requestBtn.addEventListener('click', () => {
  const page = parseInt(pageInput.value);
  const limit = parseInt(limitInput.value);

  if (isNaN(page) || page < 1 || page > 10) {
    errorMessage.innerText = 'Номер страницы вне диапазона от 1 до 10';
    imagesList.innerHTML = '';
    return;
  }

  if (isNaN(limit) || limit < 1 || limit > 10) {
    errorMessage.innerText = 'Лимит вне диапазона от 1 до 10';
    imagesList.innerHTML = '';
    return;
  }

  errorMessage.innerText = '';

  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Не удалось выполнить запрос');
      }

      return response.json();
    })
    .then(data => {
      imagesList.innerHTML = '';

      data.forEach(image => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const author = document.createElement('p');

        img.src = image.download_url;
        author.innerText = `Автор: ${image.author}`;

        li.appendChild(img);
        li.appendChild(author);

        imagesList.appendChild(li);
      });

      localStorage.setItem('lastPage', page);
      localStorage.setItem('lastLimit', limit);
    })
    .catch(error => {
      errorMessage.innerText = error.message;
      imagesList.innerHTML = '';
    });
});