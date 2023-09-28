let express     = require('express');
let bodyParser  = require('body-parser');
let fs          = require('fs');

let app         = express();
let JSON_STORE  = './json-store'


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let transactions = [];

app.get('/', (req, res, next) => {
    res.send('You have reached to the root of the API!');
});

app.get('/balance', (req, res, next) => {
    let balances = [];
    let payerBalance = {};

    transactions = fs.readFileSync(JSON_STORE, { encoding: 'utf8', flag: 'r' });
    transactions = JSON.parse(transactions);

    for (let transaction of transactions) {
        if (!(transaction['payer'] in payerBalance)) {
            payerBalance[transaction['payer']] = 0;
        }
        payerBalance[transaction['payer']] += transaction['points'];
    }

    for (let payer in payerBalance) {
        let balance = {};
        balance[payer] = payerBalance[payer];
        balances.push(balance)
    }

    res.status(200).send(balances);
})

app.post('/add', (req, res, next) => {
    let payer = req.body.payer;
    let points = req.body.points;
    let timestamp = req.body.timestamp;
    let transaction = {};

    transaction['payer'] = payer;
    transaction['points'] = parseInt(points);
    transaction['timestamp'] = timestamp;

    transactions = fs.readFileSync(JSON_STORE, { encoding: 'utf8', flag: 'r' });
    transactions = JSON.parse(transactions);
    transactions.push(transaction);

    fs.truncateSync(JSON_STORE)
    fs.writeFileSync(JSON_STORE, JSON.stringify(transactions));

    res.status(200).send('Success');
})

function compareTransactions(a, b) {
    if (a['timestamp'] > b['timestamp']) {
        return -1
    } else if (a['timestamp'] < b['timestamp']) {
        return 1
    } else {
        return 0
    }
}

app.post('/spend', (req, res, next) => {
    let points = parseInt(req.body.points);
    let required = points;
    let deductions = [];

    transactions = fs.readFileSync(JSON_STORE, { encoding: 'utf8', flag: 'r' });
    transactions = JSON.parse(transactions);

    transactions.sort(compareTransactions);

    let length = transactions.length;
    let i = length - 1;

    while(i >= 0) {
        if (transactions[i].points >= required) {
            transactions[i].points -= required;
            deductions.push({"payer": transactions[i].payer, "points": required});
            required = 0
            break;
        } else {
            required = required - transactions[i].points;
            deductions.push({"payer": transactions[i].payer, "points": transactions[i].points});
            transactions[i].points = 0;
        }
        i -= 1;
    }

    fs.truncateSync(JSON_STORE);
    fs.writeFileSync(JSON_STORE, JSON.stringify(transactions));

    if (required) {
        res.status(400).send('User doesn’t have enough points');
    } else {
        res.status(200).send(deductions);
    }
})

let server = app.listen(8000, "127.0.0.1", () => {
    console.log('Listening to ' + server.address().port + ' and ' + server.address().address);

    let str = fs.readFileSync(JSON_STORE, { encoding: 'utf8', flag: 'r' });
    if (str == '') {
        fs.writeFileSync(JSON_STORE, JSON.stringify([]));
    };
})