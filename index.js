const express = require('express');
const bodyParser = require('body-parser');
const verifyWebhook = require('./verify-webhook');
const hanldeWebhook = require('./handle-webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res) => res.send('Success'));
app.get('/webhook', verifyWebhook);
app.post('/webhook', hanldeWebhook);

app.listen(5000, () => console.log('Express server is listening on port 5000'));