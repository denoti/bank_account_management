// BUTTONS
const homeBtn = document.querySelector('#home-btn');
const transactBtn = document.querySelector('#transact-btn');
const loanBtn = document.querySelector('#loans-btn');
const saveBtn = document.querySelector('#save-btn');
const withdrawBtn = document.querySelector('#withdraw-btn');
const checkBalanceBtn = document.querySelector('#check-balance');

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
const savingsCont = document.querySelector('.savings');
const checkingCont = document.querySelector('.checking');
const transactCont = document.querySelector('.transact');
const homeCont = document.querySelector('.home');

// EVENT LISTENERS
homeBtn.onclick = () => {
  savingsCont.classList.add('hidden');
  checkingCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.remove('hidden');
};

transactBtn.onclick = () => {
  savingsCont.classList.add('hidden');
  checkingCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  transactCont.classList.remove('hidden');
};

loanBtn.onclick = () => {
  alert('COMING SOON!!!');
};

saveBtn.onclick = () => {
  savingsCont.classList.add('hidden');
  checkingCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  overlay.classList.remove('hidden');
};

// withdrawBtn.onclick = () => {
//   savingsCont.classList.add('hidden');
//   checkingCont.classList.add('hidden');
//   transactCont.classList.remove('hidden');
//   homeCont.classList.add('hidden');
// };

checkBalanceBtn.onclick = () => {
  savingsCont.classList.remove('hidden');
  checkingCont.classList.remove('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.add('hidden');
};

// OVERLAY BUTTONS: SAVINGS EVENT LISTENERS
savingsOverlayBtn.onclick = () => {
  checkingCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  overlay.classList.add('hidden');
  savingsCont.classList.remove('hidden');
  console.log('savings');
};

checkingOverlayBtn.onclick = () => {
  savingsCont.classList.add('hidden');
  transactCont.classList.add('hidden');
  homeCont.classList.add('hidden');
  overlay.classList.add('hidden');
  checkingCont.classList.remove('hidden');
  console.log('checking');
};

// SELECT FORM INPUT ELEMENTS

submitRegistered.onclick = () => {
  // SELECT FORM INPUT ELEMENTS
  const names = document.querySelector('#user-name');
  const userAmount = document.querySelector('#user-amount').value;
  const accountType = document.querySelector('select');
  const accountVal = accountType.value;

  let firstName = names.value.split(' ')[0];
  let secondName = names.value.split(' ')[1];

  // CHECKING IF INPUT FIELDS ARE EMPTY
  if (names === '' || userAmount === '') {
    alert('Please Fill in REQUIRED Fields');
  } else {
    console.log(firstName, secondName, userAmount, accountVal);
    document.querySelector('.register').classList.add('hidden');
    homeCont.classList.remove('hidden');
    homeBtn.disabled = false;
    transactBtn.disabled = false;
    loanBtn.disabled = false;
    saveBtn.disabled = false;
    checkBalanceBtn.disabled = false;
  }

  newUser(firstName, secondName, balance, accountType);
};

overlay.addEventListener('click', () => {
  if (saveInput === document.activeElement) {
    homeCont.classList.add('hidden');
    // RECEIVE DATA
  } else {
    overlay.classList.add('hidden');
  }
});

// IMPLEMENTING THE CLASS FUNCTIONALITY
class Bank {
  constructor() {
    this.listArr = [];
  }
  addClient(client) {
    this.listArr.push(client);
  }
  checkBalance() {
    return this.listArr[0]['balance'];
  }
  deposit(value) {
    this.listArr[0]['balance'] += value;
    return this.listArr[0]['balance'];
  }
  withdraw(value) {
    try {
      if (this.listArr[0]['balance'] > value) {
        return (this.listArr[0]['balance'] -= value);
      } else {
        throw new Error('Not enough Amount');
      }
    } catch (error) {
      alert('Error Withdrawing! Try again later');
    } finally {
      return this.listArr[0]['balance'];
    }
  }
}

class Client {
  constructor(firstName, secondName, balance, accountType) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.balance = balance;
    this.accountType = accountType;
  }
}

// accountCreated.addClient(newClient);
// console.log(accountCreated.checkBalance());
// console.log(accountCreated.withdraw(500));

let user;

function newUser(firstName, secondName, balance, accountType) {
  let newClient = new Client('Dennis', 'Otieno', 5000, 'savings');
  let accountCreated = new Bank();
  user = accountCreated.addClient(newClient);
  return user;
}

function calculations(operation) {
  switch (operation) {
    case 'deposit':
      let x = user.deposit(100);
      console.log(x);
      break;
    case 'withdraw':
      let y = user.withdraw(200);
      console.log(y);
      break;
    case 'checkbalance':
      user.checkBalance();
      break;
    default:
      break;
  }
}

// let x = calculations('deposit');
