const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync('src/json/accounts.json', { encoding: "UTF8" });
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json', { encoding: "UTF8" });
const users = JSON.parse(userData);

app.get('/', (req, res) => {

    res.render('index', {
        title: 'Account Summary',
        accounts
    });
});

app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings });
});

app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking });
});

app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
    res.render('profile', { user: users[0] });
});

app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);

    let accountsJSON = JSON.stringify(accounts);

    //fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, { encoding: "UTF8" });
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');

    res.render('transfer', {
        message: "Transfer Completed"
    })

});

app.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

app.post('/payment', (req, res) => {

    let amount = req.body.amount;
    accounts.credit.balance -= parseInt(amount);
    accounts.credit.available += parseInt(amount);

    let accountsJSON = JSON.stringify(accounts);

    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');

    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit
    });
});









app.listen(3000, () => {
    console.log("PS Project Running on port 3000!");
});