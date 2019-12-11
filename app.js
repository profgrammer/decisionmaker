const express = require('express');
const app = express();
const bp = require('body-parser');
const fetch = require('node-fetch');
const morgan = require('morgan');
app.use(bp.json());
app.use(morgan('dev'));
app.post('/dialogflow', (req, res) => {
    fetch('https://yesno.wtf/api').then(result => {
        result.json().then(body => {
            res.json({
                "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "text": {
                            "text": [body.answer]
                        }
                    }
                ],
              });
        }).catch(error => {
            res.json({
                "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "text": {
                            "text": ["unable to reach the server."]
                        }
                    }
                ]
            })
        });
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));