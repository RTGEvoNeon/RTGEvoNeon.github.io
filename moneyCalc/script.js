const age = prompt("Ваше имя");
alert(age);
alert("Приветсвую вас");
const generateId = () => `calc${Math.round(Math.random() * 1e8).toString(16)}`;

const totalBalance = document.querySelector(".total__balance"),
   totalMoneyIncome = document.querySelector(".total__money-income"),
   totalMoneyExpenses = document.querySelector(".total__money-expenses"),
   historyList = document.querySelector(".history__list"),
   form = document.getElementById("form"),
   operationName = document.querySelector(".operation__name"),
   operationAmount = document.querySelector(".operation__amount"),
   historyItem = document.querySelector(".history__item");

let dataBaseOperation = JSON.parse(localStorage.getItem("calc")) || [];

/* Удаление дела */
const deleteOperation = (event) => {
   const target = event.target;
   if (event.target.classList.contains("history_delete"))
      dataBaseOperation = dataBaseOperation.filter((operation) => operation.id !== target.dataset.id);

   init();
};

const renderOperation = (operation) => {
   console.log(operation.id);
   const listItem = document.createElement("li");
   listItem.classList.add("history__item");
   changeColor(operation, listItem);

   listItem.innerHTML = `
   ${operation.description}
   <span class="history__money">${operation.amount} ₽</span>
   <button class="history_delete" data-id="${operation.id}">x</button>
`;
   historyList.append(listItem);
};

const changeColor = (operation, listItem) => {
   if (operation.amount > 0) listItem.classList.add("history__item-plus");
   else listItem.classList.add("history__item-minus");
};

const newBalance = () => {
   const income = dataBaseOperation.filter((item) => item.amount > 0).reduce((result, item) => result + item.amount, 0);
   const expense = dataBaseOperation
      .filter((item) => item.amount < 0)
      .reduce((result, item) => result + item.amount, 0);

   totalMoneyIncome.textContent = income + " ₽";
   totalMoneyExpenses.textContent = expense + " ₽";
   totalBalance.textContent = income + expense + " ₽";
};

const init = () => {
   historyList.textContent = "";
   dataBaseOperation.forEach((item) => {
      renderOperation(item);
   });
   newBalance();
   localStorage.setItem("calc", JSON.stringify(dataBaseOperation));
};

const addOperation = (event) => {
   event.preventDefault();
   const operationNameValue = operationName.value,
      operationAmountValue = operationAmount.value;

   operationName.style.borderColor = "";
   operationAmount.style.borderColor = "";

   if (operationNameValue && operationAmountValue) {
      let operation = {
         id: generateId(),
         description: operationNameValue,
         amount: +operationAmountValue,
      };
      dataBaseOperation.push(operation);
      init();
   } else {
      if (!operationNameValue) operationName.style.borderColor = "red";
      if (!operationAmountValue) operationAmount.style.borderColor = "red";
   }

   operationName.value = "";
   operationAmount.value = "";
};
form.addEventListener("submit", addOperation);
historyList.addEventListener("click", deleteOperation);
init();
