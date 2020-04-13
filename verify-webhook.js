const verifyWebhook = (req, res) => {
    let VERIFY_TOKEN = "EAAnvBpvWJWUBAFXCKF8IunHbBfBZChlajkST7QJj5ZCSnXXY5iHvvmehpTbHQaHJihGErLDhd1uXyf7j894myAVujLkxZAraoWHDt8zRNt5PwGEByqfvyGIkgmHyxgCxWzNJE8j3eIXBZCph5lebIF1y4VFOuGSuI2oKxsj8qKgkH821nvEKCMqxBksWYYEZD";//webhook key
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    console.log('mode', mode)
    console.log('token', token)
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            res.sendStatus(403);
        }
    }
};

module.exports = verifyWebhook;