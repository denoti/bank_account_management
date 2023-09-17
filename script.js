// BUTTONS
const homeBtn = document.querySelector('#home-btn');
const transactBtn = document.querySelector('#transact-btn');
const loanBtn = document.querySelector('#loans-btn');
const saveBtn = document.querySelector('#save-btn');
const withdrawBtn = document.querySelector('#withdraw-btn');
const checkBalanceBtn = document.querySelector('#check-balance');

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

overlay.addEventListener('click', (e) => {
  if (saveInput === document.activeElement) {
    // RECEIVE DATA
  } else {
    overlay.classList.add('hidden');
    homeCont.classList.remove('hidden');
  }
});

// IMPLEMENTING THE CLASS FUNCTIONALITY
class