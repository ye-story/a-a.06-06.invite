const names = [
  { id: "0", name: "общее" },
  { id: "1", name: "Света и Егор" },
  { id: "2", name: "Саша и Костя" },
  { id: "3", name: "Вика и Слава" },
  { id: "4", name: "Катя и Денис" },
  { id: "5", name: "Таня и Рома" },
  { id: "6", name: "Маша и Леша, дядя Вова и тетя Лиля" },
  { id: "7", name: "дядя Саша, тетя Наташа, Глеб" },
  { id: "8", name: "Света, тетя Вера и дядя Иван" },
  { id: "9", name: "Юля и Паша, Ваня и Надя" },
  { id: "10", name: "Лена и Сергей" },
  { id: "11", name: "дядя Толя, тетя Тома" },
  { id: "12", name: "Кристина и Антон" },
  { id: "13", name: "Олег и Алена" },
  { id: "14", name: "Сергей и Ольга" },
  { id: "15", name: "Крестый и тетя Света" },
  { id: "16", name: "Рома и Марина" },
  { id: "17", name: "Ирина и Максим" },
  { id: "18", name: "Вадим и Татьяна" },
  { id: "19", name: "Дмитрий и Ольга" },
  { id: "20", name: "Марина" },
  { id: "21", name: "Наташа" },
  { id: "22", name: "Паша" },
  { id: "23", name: "Крестная" },
  { id: "24", name: "тетя Надя" }
];

const baseURL = location.href.replace('admin/', '');
const container = document.getElementById('container');

names.forEach((name, index) => {
  const link = `${baseURL}?id=${name.id}`;

  const card = document.createElement('div');
  card.classList.add('guest-card');

  // Номер 01, 02...
  const numberElem = document.createElement('div');
  numberElem.classList.add('card-number');
  numberElem.textContent = (index + 1).toString().padStart(2, '0');

  // Имя
  const titleElem = document.createElement('div');
  titleElem.classList.add('name__title');
  titleElem.textContent = name.name;

  // Ссылка
  const linkElem = document.createElement('a');
  linkElem.classList.add('link-display');
  linkElem.href = link;
  linkElem.textContent = link;
  linkElem.target = '_blank';
  linkElem.title = "Открыть приглашение";

  // Кнопки
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const btnCopy = document.createElement('button');
  btnCopy.className = 'btn-copy';
  btnCopy.dataset.link = link;
  btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i> Копировать';

  const btnViber = document.createElement('a');
  btnViber.className = 'btn-share viber';
  btnViber.href = 'viber://forward?text=' + encodeURIComponent(link);
  btnViber.target = '_blank';
  btnViber.innerHTML = '<i class="fa-brands fa-viber"></i>';

  const btnTg = document.createElement('a');
  btnTg.className = 'btn-share telegram';
  btnTg.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Приглашение на свадьбу')}`;
  btnTg.target = '_blank';
  btnTg.innerHTML = '<i class="fa-brands fa-telegram"></i>';

  actionsDiv.append(btnCopy, btnViber, btnTg);
  
  card.append(numberElem, titleElem, linkElem, actionsDiv);
  container.append(card);
});

container.addEventListener('click', (e) => {
  const btnCopy = e.target.closest('.btn-copy');

  if (btnCopy) {
    const linkUrl = btnCopy.dataset.link;
    
    navigator.clipboard.writeText(linkUrl)
      .then(() => {
        const originalContent = btnCopy.innerHTML;
        
        btnCopy.classList.add('copied');
        btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> Готово';

        setTimeout(() => {
          btnCopy.classList.remove('copied');
          btnCopy.innerHTML = originalContent;
        }, 2000);
      })
      .catch((err) => {
        console.error('Ошибка:', err);
      });
  }
});