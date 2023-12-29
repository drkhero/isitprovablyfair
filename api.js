const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const crypto = require('crypto');


app.use(express.json());


app.use(cors({
    origin: 'http://127.0.0.1:5500' // or '*' for all origins
}));


function verifyingGameHash(data, gameID) {
    let hashedSeed = data;
    for (let i = 0; i < gameID; i++) {
        hashedSeed = crypto.createHash('sha256').update(hashedSeed).digest('hex');
    }
    return hashedSeed;
}





const gameResult = (seed, salt) => {
    const nBits = 52; 


    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(Buffer.from(seed, 'hex'));
    seed = hmac.digest('hex');


    seed = seed.slice(0, nBits / 4);
    const r = parseInt(seed, 16);


    let X = r / Math.pow(2, nBits); 


    X = 99 / (1 - X);


    const result = Math.floor(X);
    return Math.max(1, result / 100);
};


const sha256 = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
};


const gameBust = (gameHash, numRounds) => {
    let prevHash = null;
    for (let i = 0; i < numRounds; i++) {
        let hash = prevHash ? sha256(String(prevHash)) : gameHash;
        
        let bust = gameResult(hash, '0000000000000000004d6ec16dafe9d8370958664c1dc422f452892264c59526');
        return bust
        prevHash = hash;
    }
};









app.post('/send-data', (req, res) => {
    const data = req.body;

    console.log('Data received:', data);

    let responseData;

    responseData = { message: `${verifyingGameHash(data.gameHash, data.gameID)}, ${gameBust(data.gameHash, 1)}x` };
   

    res.json(responseData);
});







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});