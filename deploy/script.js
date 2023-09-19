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
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');

  updateHomeScreen();
};

// TOGGLES THE WITHDRAWAL INTERFACE
transactBtn.onclick = () => {
  homeCont.classList.toggle('hidden');
  transactCont.classList.toggle('hidden');
};

loanBtn.onclick = () => {
  alert('COMING SOON!!!');
};

// TOGGLES OVERLAY ON AND OFF ALLOWING FOR SAVE INTERFACE
saveBtn.onclick = () => {
  transactCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  overlay.classList.remove('hidden');
};

// CALLING THE FUNCTION TO WITHDRAW FROM BANK
withdrawBtn.onclick = () => {
  let cashValue = Number(withdrawInput.value);
  transactCont.classList.remove('hidden');
  homeCont.classList.add('hidden');
  calculations(user, 'withdraw', cashValue);
  withdrawInput.value = '';
};

checkBalanceBtn.onclick = () => {
  user.checkBalance();
};

// OVERLAY BUTTONS: SAVINGS EVENT LISTENERS

// SAVING TO SAVINGS ACCOUNT EVENT LISTENER
savingsOverlayBtn.onclick = () => {
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');
  overlay.classList.add('hidden');
  const inputSave = document.querySelector('#save-input').value;
  calculations(user, 'deposit', Number(inputSave), 'savingBalance');

  updateHomeScreen();
};

// SAVING TO CHECKING ACOUNT EVENT LISTENER
checkingOverlayBtn.onclick = () => {
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');
  overlay.classList.add('hidden');

  const inputSave = document.querySelector('#save-input').value;
  calculations(user, 'deposit', Number(inputSave), 'checkingBalance');

  updateHomeScreen();
};

// SELECT FORM INPUT ELEMENTS
submitRegistered.onclick = (e) => {
  e.preventDefault();
  // SELECT FORM INPUT ELEMENTS
  const names = document.querySelector('#user-name').value;
  const userAmount = document.querySelector('#user-amount').value;
  const accountType = document.querySelector('select').value;

  // REGEX TO ONLY ALLOW SPACED NAMES
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

    updateHomeScreen();
    owner.textContent = `Hello ${user.listArr[0]['firstName']}, what would you like to do today !!!`;
  }
};

// TOGGLE OVERLAY
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
    alert(
      `Savings account Balance: $${this.listArr[0]['savingBalance']}\n\nChecking Account Balance $${this.listArr[0]['checkingBalance']}`
    );
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

// CREATE A NEW USER AND INSTANTIATE THE CLIENT CLASS
function newUser(firstName, secondName, accountType, userAmount) {
  let saveBal;
  let checkBal;

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

// PERFORM CALCULATIONS
function calculations(user, operation = '', cashValue = '', acc = '') {
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
