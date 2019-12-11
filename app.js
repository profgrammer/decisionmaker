const express = require('express');
const app = express();
const bp = require('body-parser');
const fetch = require('node-fetch');
app.use(bp.json());

app.post('/dialogflow', (req, res) => {
    fetch('https://yesno.wtf/api').then(result => {
        result.json().then(body => {
            res.json({
                "fulfillmentMessages": [
                  {
                    "image": {
                      "imageUri": body.image
                    }
                  }
                ],
              });
        }).catch(error => {
            res.json({
                "fulfillmentMessages": [
                    {
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