import express from 'express';
import {createClient} from 'redis';
import { minimatch } from 'minimatch';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const FLAG = process.env.FLAG || "vie{test}";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function rand_code() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const app = express();

/* Redis initialization stuff. You can ignore this part of code */
const client = createClient({url:"redis://redis:6379"});
client.on('error', err => console.log('[!!!] Redis Client Error: ', err));
await client.connect();
client.set(rand_code(), FLAG);
/* End Redis initalization stuff */

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', async (req, res) => {
    var camper = req.query.camper;
    var signup_code = req.query.signup;
    camper = await client.get(camper);
    if (!camper || camper == "" || !signup_code) {
        return res.status(404).send("CAMPER NOT FOUND")
    }
    if (minimatch(camper, signup_code)) {
        return res.status(200).send("Camper found and validated! You're on the waitlist :)");
    } else {
        return res.status(403).send("Camper signup code is INVALID!");
    }
});

app.get('/debug', async (req, res) => {
    var camper = req.query.camper;
    var result = await client.keys(camper);
    if (result.length == 0 || !result) {
        return res.status(404).send("No campers");
    } else {
        return res.status(200).send("Camper found");
    }
})

const PORT = 1337;
app.listen(PORT, () => {
    console.log(`[** ${new Date(Date.now())} **]: Listening on port ${PORT}`);
});