let user; // BUTTONS

const homeBtn = document.querySelector('#home-btn');
const transactBtn = document.querySelector('#transact-btn');
const loanBtn = document.querySelector('#loans-btn');
const saveBtn = document.querySelector('#save-btn');
const withdrawBtn = document.querySelector('#withdraw-btn');
const checkBalanceBtn = document.querySelector('#check-balance');

const owner = document.querySelector('#owner');

const submitRegistered = document.querySelector('#submit-registered');

// OVERLAY BUTTONS
const checkingOverlayBtn = document.querySelector('#overlay-checking');
const savingsOverlayBtn = document.querySelector('#overlay-savings');

// SELECTING THE OVERLAY DIV
const overlay = document.querySelector('.overlay');
const overlayContainer = document.querySelector('.overlay-container');

// INPUTS
const saveInput = document.querySelector('#save-input');
const withdrawInput = document.querySelector('#withdraw-input');

// SELECTING THE DIVS HOLDING PARTICULAR INFORMATION
const checkingCont = document.querySelector('.checking');
const transactCont = document.querySelector('.transact');
const homeCont = document.querySelector('.home');

// HOME PAGE
const ownerName = document.querySelector('#name');
const balance = document.querySelector('#balance');
const accNum = document.querySelector('.acc-number');

let accountType;

function updateHomeScreen() {
  accountType = user.listArr[0]['accountType'];
  ownerName.textContent = `${user.listArr[0]['firstName']} ${user.listArr[0]['secondName']}`;
  balance.textContent =
    accountType === 'savings'
      ? `Balance: $${user.listArr[0]['savingBalance']}`
      : `Balance: $${user.listArr[0]['checkingBalance']}`;
  accNum.textContent = `acc no: ${user.listArr[0]['accNum']} . ${accountType}`;
}

// EVENT LISTENERS
homeBtn.onclick = () => {
  // let accountType = user.listArr[0]['accountType'];

  checkingCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');

  // ownerName.textContent = `${user.listArr[0]['firstName']} ${user.listArr[0]['secondName']}`;
  // balance.textContent =
  //   accountType === 'savings'
  //     ? `Balance: $${user.listArr[0]['savingBalance']}`
  //     : `Balance: $${user.listArr[0]['checkingBalance']}`;
  // accNum.textContent = `acc no: ${user.listArr[0]['accNum']} . ${accountType}`;

  updateHomeScreen();
};

transactBtn.onclick = () => {
  checkingCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  transactCont.classList.remove('hidden');
};

loanBtn.onclick = () => {
  alert('COMING SOON!!!');
};

saveBtn.onclick = () => {
  checkingCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  overlay.classList.remove('hidden');
  // TO CHANGE THIS IMMEDIATELY
  calculations('deposit', user);
};

withdrawBtn.onclick = () => {
  let cashValue = Number(withdrawInput.value);

  checkingCont.classList.add('hidden');
  transactCont.classList.remove('hidden');
  homeCont.classList.add('hidden');
  calculations('withdraw', user, cashValue);
  withdrawInput.value = '';
};

checkBalanceBtn.onclick = () => {
  alert(
    `Savings account Balance: $${user.listArr[0]['savingBalance']}\n\nChecking Account Balance $${user.listArr[0]['checkingBalance']}`
  );
};

// OVERLAY BUTTONS: SAVINGS EVENT LISTENERS
savingsOverlayBtn.onclick = () => {
  checkingCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');
  overlay.classList.add('hidden');

  const inputSave = document.querySelector('#save-input').value;
  calculations('deposit', user, Number(inputSave), 'savingBalance');
  inputSave = '';

  updateHomeScreen();
};

checkingOverlayBtn.onclick = () => {
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');
  overlay.classList.add('hidden');
  checkingCont.classList.add('hidden');

  const inputSave = document.querySelector('#save-input').value;
  calculations('deposit', user, Number(inputSave), 'checkingBalance');
  inputSave = '';

  updateHomeScreen();
};

// SELECT FORM INPUT ELEMENTS

submitRegistered.onclick = () => {
  // SELECT FORM INPUT ELEMENTS
  const names = document.querySelector('#user-name').value;
  const userAmount = document.querySelector('#user-amount').value;
  const accountType = document.querySelector('select').value;

  let reg = /([a-zA-z]{2,10}) ([a-zA-z]{2,10})/gm.test(names);

  let firstName = names.split(' ')[0];
  let secondName = names.split(' ')[1];

  // CHECKING IF INPUT FIELDS ARE EMPTY
  if (reg === false || userAmount.length === 0 || userAmount < 500) {
    alert('Please INPUT correct NAMES and AMOUNT');
  } else {
    document.querySelector('.register').classList.add('hidden');
    homeCont.classList.remove('hidden');
    homeBtn.disabled = false;
    transactBtn.disabled = false;
    loanBtn.disabled = false;
    saveBtn.disabled = false;
    checkBalanceBtn.disabled = false;
    user = newUser(firstName, secondName, accountType, Number(userAmount));
  }

  owner.textContent = `Hello ${user.listArr[0]['firstName']}! What would you like to do today!?`;
  ownerName.textContent = `${user.listArr[0]['firstName']} ${user.listArr[0]['secondName']}`;
  // balance.textContent =
  //   accountType === 'savings'
  //     ? `Balance: $${user.listArr[0]['savingBalance']}`
  //     : `Balance: $${user.listArr[0]['checkingBalance']}`;

  if (accountType === 'savings') {
    balance.textContent = `Balance: $${user.listArr[0]['savingBalance']}`;
  } else if (accountType === 'checking') {
    balance.textContent = `Balance: $${user.listArr[0]['checkingBalance']}`;
  } else {
    return;
  }
  accNum.textContent = `acc no: ${user.listArr[0]['accNum']} . ${accountType}`;
};

overlay.addEventListener('click', () => {
  if (saveInput === document.activeElement) {
    homeCont.classList.add('hidden');
  } else {
    overlay.classList.add('hidden');
  }
});

// IMPLEMENTING THE CLASS FUNCTIONALITY
class Bank {
  constructor() {
    this.listArr = [];
    this.accountNumber = Math.floor(Math.random() * 10000000);
  }

  addClient(client) {
    client.accNum = this.accountNumber;
    this.listArr.push(client);
  }
  checkBalance() {
    return this.listArr[0]['balance'];
  }
  deposit(value, acc) {
    this.listArr[0][acc] += value;
    return this.listArr[0][acc];
  }
  withdraw(value) {
    try {
      if (this.listArr[0]['checkingBalance'] < value) {
        throw new Error('Not enough Amount in your CHECKING ACCOUNT!');
      } else if (value === 0) {
        throw new Error('You cannot withdraw $0!!!');
      } else {
        alert(`Success $${value} withdrawn`);
        return (this.listArr[0]['checkingBalance'] -= value);
      }
    } catch (error) {
      alert(
        `Available balance is $${this.listArr[0]['checkingBalance']}\n${error}`
      );
    } finally {
      return this.listArr[0]['checkingBalance'];
    }
  }
}

class Client {
  constructor(
    firstName,
    secondName,
    accountType,
    savingBalance,
    checkingBalance
  ) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.accountType = accountType;
    this.savingBalance = savingBalance;
    this.checkingBalance = checkingBalance;
  }
}

// accountCreated.addClient(newClient);
// console.log(accountCreated.checkBalance());
// console.log(accountCreated.withdraw(500));

function newUser(firstName, secondName, accountType, userAmount) {
  let saveBal;
  let checkBal;
  console.log(userAmount);

  if (accountType === 'savings') {
    saveBal = userAmount;
    checkBal = 0;
  } else {
    saveBal = 0;
    checkBal = userAmount;
  }

  let newClient = new Client(
    firstName,
    secondName,
    accountType,
    saveBal,
    checkBal
  );
  let accountCreated = new Bank();
  user = accountCreated;
  user.addClient(newClient);
  return user;
}

function calculations(operation, user, cashValue, acc) {
  switch (operation) {
    case 'deposit':
      user.deposit(cashValue, acc);
      break;
    case 'withdraw':
      user.withdraw(cashValue);
      break;
    case 'checkbalance':
      user.checkBalance();
      break;
    default:
      break;
  }
}

// let x = calculations('deposit');
