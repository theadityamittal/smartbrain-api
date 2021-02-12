const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a0b2005c15ca4ba8b049febcdb55af47'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'));
}

const handleImageCount = (req, res, db) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImageCount: handleImageCount,
    handleApiCall: handleApiCall
}