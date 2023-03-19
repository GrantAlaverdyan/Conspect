const express = require('express')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser');
var pg = require('pg');
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("avatar");

const config = {
    user: 'postgres',
    database: 'ited',
    password: 'Gr345tem',
    port: 5432
};

const pool = new pg.Pool(config);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(cors({
//     origin: 'https://localhost:3000'
// }));

app.use(cors({
    origin: '*'
}));

app.get('/', function (req, res) {
    res.send('Hello World!!!')
})

app.post('/savequestion', function (req, res) {
    // const { questionName, answerValue } = req.body;
    upload(req, res, (err) => {
        console.log("Request --- some", JSON.parse(req.body.some));
        obj = JSON.parse(req.body.some)
        const { questionName, answerValue } = obj;
        console.log(questionName, answerValue)
        console.log("Request file ---", req.file);
        const fileName = req.file ? req.file.filename : "";
        pool.connect(function (err, client, done) {

            if (err) {
                console.log("Can not connect to the DB" + err);
            }


            client.query(`INSERT INTO questions(question_name, answer_value, file_name) VALUES('${questionName}', '${answerValue}', '${fileName}'); `, function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).json({ response: 'success' });
            })
        })

    })
})

app.get('/getallquestions', function (req, res) {

    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }


        client.query(`SELECT * FROM questions;`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).json({ response: result.rows });
        })
    })
})

app.post('/deletequestion', function (req, res) {
    console.log(req.body)
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }


        client.query(`DELETE from questions where id='${req.body.idQuestion}';`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).json({ response: 'success' });
        })
    })

})

app.post('/editquestion', function (req, res) {
    const { id, text } = req.body;

    console.log(text, id)
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }


        client.query(`UPDATE questions SET answer_value='${text}' WHERE id=${Number(id)};`,
            function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).json({ response: 'success' });
            })
    })

})

app.get('/download', function (req, res) {
    console.log("check", req.query);
    const file = `./uploads/${req.query.fileName}`;
    res.download(file);
})


app.listen(5000, console.log("Сервер работает на 5000-ом порту"))
