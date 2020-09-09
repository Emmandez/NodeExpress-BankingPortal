const express = require('express');
const { accounts, writeJSON } = require('../data');
const router = express.Router();



router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);

    writeJSON();

    res.render('transfer', {
        message: "Transfer Completed"
    })

});

router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

router.post('/payment', (req, res) => {

    let amount = req.body.amount;
    accounts.credit.balance -= parseInt(amount);
    accounts.credit.available += parseInt(amount);

    writeJSON();

    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit
    });
});

module.exports = router;