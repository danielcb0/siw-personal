async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const user = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            fetchCategories();
        } else {
            alert('Login failed: ' + user.message);
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

async function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const user = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            fetchCategories();
        } else {
            alert('Registration failed: ' + user.message);
        }
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

async function fetchCategories() {
    if (!localStorage.getItem('user')) {
        alert('You are not logged in.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const categories = await response.json();
        const categoriesDiv = document.getElementById('categories');
        const categorySelect = document.getElementById('categorySelect');
        categoriesDiv.innerHTML = '';
        categorySelect.innerHTML = '';

        categories.forEach(category => {
            const div = document.createElement('div');
            div.textContent = `${category.title}: ${category.description}`;
            categoriesDiv.appendChild(div);

            const option = document.createElement('option');
            option.value = category.categoryId;
            option.textContent = category.title;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        alert('Failed to fetch categories: ' + error.message);
    }
}

async function addCategory() {
    if (!localStorage.getItem('user')) {
        alert('You are not logged in.');
        return;
    }

    const title = document.getElementById('categoryTitle').value;
    const description = document.getElementById('categoryDescription').value;

    try {
        const response = await fetch('http://localhost:8080/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            fetchCategories();
        } else {
            const data = await response.json();
            alert('Failed to add category: ' + data.message);
        }
    } catch (error) {
        alert('Failed to add category: ' + error.message);
    }
}

async function fetchTransactions() {
    if (!localStorage.getItem('user')) {
        alert('You are not logged in.');
        return;
    }

    const categoryId = document.getElementById('categorySelect').value;

    try {
        const response = await fetch(`http://localhost:8080/api/categories/${categoryId}/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const transactions = await response.json();
        const transactionsDiv = document.getElementById('transactions');
        transactionsDiv.innerHTML = '';

        transactions.forEach(transaction => {
            const div = document.createElement('div');
            div.textContent = `Amount: ${transaction.amount}, Note: ${transaction.note}, Date: ${new Date(transaction.transactionDate).toLocaleDateString()}`;
            transactionsDiv.appendChild(div);
        });
    } catch (error) {
        alert('Failed to fetch transactions: ' + error.message);
    }
}

async function addTransaction() {
    if (!localStorage.getItem('user')) {
        alert('You are not logged in.');
        return;
    }

    const categoryId = document.getElementById('categorySelect').value;
    const amount = document.getElementById('transactionAmount').value;
    const note = document.getElementById('transactionNote').value;
    const transactionDate = new Date(document.getElementById('transactionDate').value).getTime();

    try {
        const response = await fetch(`http://localhost:8080/api/categories/${categoryId}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, note, transactionDate })
        });

        if (response.ok) {
            fetchTransactions();
        } else {
            const data = await response.json();
            alert('Failed to add transaction: ' + data.message);
        }
    } catch (error) {
        alert('Failed to add transaction: ' + error.message);
    }
}
