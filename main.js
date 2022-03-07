//* 遊戲狀態
const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
};

//* 花色
const Symbols = [
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png", // 黑桃
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png", // 愛心
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png", // 方塊
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png", // 梅花
];

//* 卡片
const view = {
  // 牌背
  getCardElement(index) {
    return `<div data-index="${index}" class="card back"></div>`;
  },
  // 牌面
  getCardContent(index) {
    //- 運算邏輯
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];
    return `
    <p>${number}</p>
    <img src="${symbol}"/>
    <p>${number}</p>
    `;
  },
  //- 特殊數字轉換
  transformNumber(number) {
    switch (number) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return number;
    }
  },
  displayCards(indexes) {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = indexes
      .map((index) => this.getCardElement(index))
      .join("");
  },
  //- 翻牌
  flipCard(card) {
    console.log(card);
    if (card.classList.contains("back")) {
      // 回傳正面
      card.classList.remove("back");
      card.innerHTML = this.getCardContent(Number(card.dataset.index)); // 改這裡
      return;
    }
    // 回傳背面
    card.classList.add("back");
    card.innerHTML = null;
  },
};

//* model
const model = {
  revealedCards: [],
};

//* controller
const controller = {
  currentState: GAME_STATE.FirstCardAwaits, // 加在第一行
  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52));
  },
};

//* 洗牌
const utility = {
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys());
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      [number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index],
      ];
    }
    return number;
  },
};

controller.generateCards();
//- 事件監聽器
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    view.flipCard(card);
  });
});
