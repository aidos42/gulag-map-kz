const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const updateCardsTextContent = (cardToUpdate, selector, value, isEmpty) => {
  const card = cardToUpdate.querySelector(selector);

  if (!isEmpty) {
    card.textContent = value;
  } else {
    card.classList.add('hidden');
  }
};

const addLinkToCard = (cardToUpdate, selector, value, isEmpty) => {
  const card = cardToUpdate.querySelector(selector);

  if (!isEmpty) {
    card.innerHTML = value;
  } else {
    card.classList.add('hidden');
  }
};

const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  updateCardsTextContent(cardElement, '.popup-title', card.title, card.title.length === 0);
  updateCardsTextContent(cardElement, '.popup-location', card.region, card.location.length === 0);
  updateCardsTextContent(cardElement, '.popup-date-opened', card.opened, card.opened.length === 0);
  updateCardsTextContent(cardElement, '.popup-date-closed', card.closed, card.closed.length === 0);
  addLinkToCard(cardElement, '.popup-link', `<a href=${card.link} target="_blank">Мемориал</a>`, card.link.length === 0);

  return cardElement;
};

export { renderCard };
