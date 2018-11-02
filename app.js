var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.listen(process.env.PORT || 5000);

// Server index page
app.get('/', (req, res) => {
    res.send('Deployed!')
});

// Facebook Webhook
// Used for verification
app.get("/webhook", (req, res) => {
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        console.log("Verified webhook");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.error("Verification failed. The tokens do not match.");
        res.sendStatus(403);
    }
})
