'use strict';
const express = require('express');
const http = require('http');
const mysql = require('mysql');
const { Pool, Client } = require('pg');
const pgconf = require('./postgres-config.json');
const msconf = require('./mysql-config.json');

var app = express();

app.get('/postgres', function(req, res, next) {
    var results = [];
    
    // Postgres configuration
    var postgres_host = pgconf.db_host;
    var postgres_username = pgconf.db_username;
    var postgres_password = pgconf.db_password;
    var postgres_name = pgconf.db_name;
    var postgres_port = pgconf.db_port;

    // Connect to postgres database
    var client = new Client({
        host: postgres_host,
        port: postgres_port,
        user: postgres_username,
        password: postgres_password,
        database: postgres_name
    });

    client.connect();

    client.query("CREATE TABLE IF NOT EXISTS pgTable(ID SERIAL PRIMARY KEY, Name VARCHAR(64))");
    client.query("INSERT INTO pgTable(Name) SELECT md5(random()::text)");

    client.query('SELECT * FROM pgTable', (err, res2) => {
        console.log(err, res2);
        var row;
        res.send(res2.rows);
        client.end();
    });
});

app.get('/mysql', function(req, res, next) {
    var results = [];
    
    // Postgres configuration
    var mysql_host = msconf.db_host;
    var mysql_username = msconf.db_username;
    var mysql_password = msconf.db_password;
    var mysql_name = msconf.db_name;
    var mysql_port = msconf.db_port;

    // Connect to postgres database
    var con = mysql.createConnection({
        host: mysql_host,
        port: mysql_port,
        user: mysql_username,
        password: mysql_password,
        database: mysql_name
    });

    con.connect(function(err) {
      if (err) throw err;
        console.log("Connected!");
        
        con.query("CREATE TABLE IF NOT EXISTS msTable(ID SERIAL PRIMARY KEY, Name VARCHAR(64))");
        con.query("INSERT INTO msTable(Name) SELECT LEFT(UUID(), 15);");
        
        con.query("SELECT * FROM msTable;", function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
            res.send(result);
        });
    });
});

app.use('/', express.static(__dirname));

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});
