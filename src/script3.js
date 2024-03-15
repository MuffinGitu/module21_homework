// Проверяем, есть ли запись в localStorage
if (localStorage.getItem('userInfo')) {
    // Если есть, получаем данные о пользователе и выводим сообщение
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const lastVisit = new Date(userInfo.lastVisit);
    const name = userInfo.name;
    const formattedDate = lastVisit.toLocaleString(); // Форматируем дату для вывода в alert
    alert(`Добрый день, ${name}! Давно не виделись. В последний раз вы были у нас ${formattedDate}`);
    
    // Записываем новую дату последнего посещения
    const now = new Date();
    const newUserInfo = {name, lastVisit: now};
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  } else {
    // Если записи нет, запрашиваем имя пользователя и записываем данные в localStorage
    const name = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');
    const now = new Date();
    const userInfo = {name, lastVisit: now};
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }