// Sample accounts
let accounts = [
    { accountNumber: '123456', pin: '1234', balance: 1000 },
    { accountNumber: '654321', pin: '4321', balance: 2000 },
];

// DOM Elements
const createAccountForm = document.getElementById('create-account-form');
const newAccountNumber = document.getElementById('new-account-number');
const newPin = document.getElementById('new-pin');
const newBalance = document.getElementById('new-balance');
const createMessage = document.getElementById('create-message');

const searchInput = document.getElementById('search-account');
const searchBtn = document.getElementById('search-btn');
const searchMessage = document.getElementById('search-message');

const accountsTableBody = document.querySelector('#accounts-table tbody');

// Functions
function updateAccountsTable() {
    accountsTableBody.innerHTML = accounts.map((account, index) => `
        <tr>
            <td>${account.accountNumber}</td>
            <td>$${account.balance.toFixed(2)}</td>
            <td>
                <button onclick="deleteAccount(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function createAccount(event) {
    event.preventDefault();
    const accountNumber = newAccountNumber.value.trim();
    const pin = newPin.value.trim();
    const balance = parseFloat(newBalance.value);

    if (accounts.find(acc => acc.accountNumber === accountNumber)) {
        createMessage.textContent = 'Account number already exists.';
        return;
    }

    accounts.push({ accountNumber, pin, balance });
    createMessage.textContent = 'Account created successfully!';
    updateAccountsTable();

    // Clear input fields
    newAccountNumber.value = '';
    newPin.value = '';
    newBalance.value = '';
}

function searchAccount() {
    const accountNumber = searchInput.value.trim();
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (account) {
        searchMessage.textContent = `Account Found! Balance: $${account.balance.toFixed(2)}`;
    } else {
        searchMessage.textContent = 'Account not found.';
    }
}

function deleteAccount(index) {
    if (confirm('Are you sure you want to delete this account?')) {
        accounts.splice(index, 1);
        updateAccountsTable();
    }
}

// Event Listeners
createAccountForm.addEventListener('submit', createAccount);
searchBtn.addEventListener('click', searchAccount);

// Initialize
updateAccountsTable();
