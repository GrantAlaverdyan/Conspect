var pg = require('pg');

const config = {
    user: 'postgres',
    database: 'ited',
    password: 'Gr345tem',
    port: 5432
};

const pool = new pg.Pool(config);



pool.connect(function (err, client, done) {

    if (err) {
        console.log("Can not connect to the DB" + err);
    }
    client.query("INSERT INTO users (name, age) values ('Nick Fury', '55');", function (err, result) {
        done();
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }
        console.log(result.rows);
        pool.end()
    })
})
