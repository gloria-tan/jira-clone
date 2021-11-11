// npm install --save-dev jsonwebtoken

const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const userDbPath = '__mock__/db.json';
const listeningPort = 10010;


const server = jsonServer.create();

const router = jsonServer.router(userDbPath);

const userdb = JSON.parse(fs.readFileSync('__mock__/auth.json', 'utf-8'));

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())

const SECRET_KEY = '123456789';
const expiresIn = '1h';

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => {
        console.log(`${token} verified failed.`)
        return decode === undefined ? decode : err;
    });
}

function isAuthenticated({email, password}) {
    return userdb.users.findIndex(user => user.email === email && user.password === password) != -1;
}

function findUser(email) {
    return userdb.users.findIndex( user => user.email === email) != -1;
}

// Register a new user
server.post('/auth/register', (req, res) => {
    console.log(`Called register endpoint, request body ${req.body}`);
    const {email, password} = req.body;
    let status = 401;
    let message = '';

    // Duplicated account
    if (findUser(email) === true) {
        message = 'Email already registered.';
        res.status(status).json({status, message});
        return;
    }

    // Write user to the db
    let buffer = null;
    fs.readFile(userDbPath, (err, data) => {
        if (err) {
            message = err.toString();
            res.status(status).json({status, message});
            return;
        }

        // Get current data
        buffer = JSON.parse(data.toString());
        const last_item_id = buffer.users[buffer.users.length - 1].id;

        // Add new user
        buffer.users.push({id: last_item_id + 1, email, password});

    });

    if (buffer && buffer.length > 1) {
        fs.writeFile(userDbPath, (err, result) => {
            if (err) {
                message = err.toString();
                res.status(status).json({status, message});
                return;
            }
        });
    }

    // create token for new user
    const access_token = createToken({email, password});
    status = 200;
    res.status(status).json({status, access_token});
    return;
});

// Login to one of the users from 
server.post('/auth/login', (req, res) => {
    const {email, password} = req.body;
    if (isAuthenticated({email, password}) == false) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({status, message});
        return;
    }

    const access_token = createToken({email, password});
    res.status(200).json({access_token});
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    const status = 401;
    const message = 'Bad authorization header';

    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        console.log('Missing authorization token.');
        res.status(status).json({status, message});
        return;
    }

    try {
        const verifyResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyResult instanceof Error) {
            console.log('Token verified failed.');
            res.status(status).json({status, message});
            return;
        }
        next();
    }
    catch (err) {
        console.log('Exception happend while verifing token');
        res.status(status).json({status, message});
        return;
    }

    return;
});

server.use(router);
server.listen(listeningPort, () => {
    console.log('Starting server .... ...');
    console.log('Running jwt json server on 10010');
})
