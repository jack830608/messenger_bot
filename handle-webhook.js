const axios = require('axios');

const sendMessage = (sender_psid , received_message) => {    
    axios.post('https://graph.facebook.com/v3.3/me/messages?access_token=EAAnvBpvWJWUBAFXCKF8IunHbBfBZChlajkST7QJj5ZCSnXXY5iHvvmehpTbHQaHJihGErLDhd1uXyf7j894myAVujLkxZAraoWHDt8zRNt5PwGEByqfvyGIkgmHyxgCxWzNJE8j3eIXBZCph5lebIF1y4VFOuGSuI2oKxsj8qKgkH821nvEKCMqxBksWYYEZD',
    {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "text": `我是回音桶：${received_message.text}`
        }
    }
)
}

const handleMessage = (sender_psid, received_message) => {
    sendMessage(sender_psid , received_message);
}

const handlePostback = (sender_psid, received_postback) => {
    let payload = received_postback.payload;

    if (payload === 'GET_STARTED') {

    }
}

const handleWebhook = (req, res) => {
    let body = req.body;
    if (body.object === 'page') {

        body.entry.forEach(function (entry) {

            let webhook_event = entry.messaging[0];

            let sender_psid = webhook_event.sender.id;

            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message)
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback)
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }

};

module.exports = handleWebhook;