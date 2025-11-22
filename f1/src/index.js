import express from 'express';
import serialize from 'serialize-javascript';
//import visit from './visit';

const app = express();
const PORT = process.env.port || 8090;

app.use(express.json());


function recreate(new_body, body) {
    for (var key in body) {
        if (typeof body[key] == 'object') {
            var replacement = body[key];
            key = key.replaceAll("<", "_").replaceAll(">", "_");
            recreate(new_body[key], replacement);
        } else {
            new_body[key] = body[key];
        }
    }
    return new_body;
}
var sanitize_keys = (req, res, next) => {
    var new_body = recreate({}, req.body);
    req.body = new_body;
    return next();
};

app.get('/', (req, res) => {
    if (req.query) {
        return res.status(200).send(serialize(req.query));
    } else return res.status(200).send("hi!");
    
});

var clean_url = (req, res, next) => {
    if (req.body.url) {
        if (req.body.url.startsWith("http://") || req.body.url.startsWith("https://")) {
            return next();
        }
    } return res.redirect('/'); 
}

app.post('/report', clean_url, (req, res) => {
    if (req.body.url) {
        visit(req.body.url);
    }
    return res.status(200).send('URL sent.'); 
});

app.post('/', sanitize_keys, (req, res) => {
    return res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});