const DEBUG = true;
const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
var catalog, rawdata, comments, commentsFile = "source/comments.json", item_id = null;
var currUser = {
    "email": null,
    "pass": null,
    "surname": null,
    "name": null,
    "phone_number": null,
    "address": null
};
if (DEBUG) {
    currUser = {
        "email": 'isabel@gmail.com',
        "pass": '12345678',
        "surname": 'Admin',
        "name": 'Isabel',
        "phone_number": null,
        "address": null
    };
}
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'isabeldb'
});
connection.connect();
connection.query("SET SESSION wait_timeout = 604800");
const app = express();
app.set("views", `${process.cwd()}/source`);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', require('ejs').__express);
app.use(express.static(`${process.cwd()}/source`));
var port = 3000;
app.listen(port, () => { console.log(`Server is running. Please visit localhost:${port}`); });
function upload(data) {
    rawdata = fs.readFileSync(commentsFile);
    comments = JSON.parse(rawdata);
    data = JSON.parse(data);
    if (Object.keys(comments).includes(Object.keys(data)[0])) {
        const l = parseInt(Object.keys(data)[0]);
        const id = Object.keys(comments[Object.keys(data)[0]]).length + 1;
        let value = `{"${Object.keys(comments[Object.keys(data)[0]]).length + 1}":${JSON.stringify(data[Object.keys(data)[0]])}}`;
        data = JSON.parse(value);
        const combinedObj = Object.assign({}, comments[l], data);
        const mi = Object.assign({}, comments, { [l]: combinedObj });
        let newjson = JSON.stringify(mi);
        fs.writeFile(commentsFile, newjson, error => {
            if (error)
                throw error;
            if (DEBUG)
                console.log(' -- Comments uploaded : again.');
        });
    }
    else {
        let id = Object.keys(data)[0];
        let value = `{"1":${JSON.stringify(data[Object.keys(data)[0]])}}`;
        data = JSON.parse(value);
        const combinedObj = Object.assign({}, comments, { [id]: data });
        let newjson = JSON.stringify(combinedObj);
        fs.writeFile(commentsFile, newjson, error => {
            if (error)
                throw error;
            if (DEBUG)
                console.log(' -- Comments uploaded : first time.');
        });
    }
}
app.get('/', (req, res) => {
    let q, newc = Array(), iter = 0, lim;
    ;
    connection.query('SELECT count(*) as value FROM accessory', (error, results, fields) => {
        if (error)
            throw error;
        lim = results[0].value;
        for (let c = 1; c < 5; ++c) {
            q = `SELECT article, title, price, media_id as media FROM accessory WHERE category_id='${c}'`;
            connection.query(q, (error, results, fields) => {
                if (error)
                    throw error;
                newc.push(results);
                for (let i = 0; i < results.length; ++i) {
                    q = `SELECT URL as media FROM media where media.id = ${results[i].media} limit 1`;
                    connection.query(q, (error, inner_res, fields) => {
                        if (error)
                            throw error;
                        newc[c - 1][i].media = inner_res[0].media;
                        ++iter;
                        if (iter >= lim)
                            res.render('index', { catalog: newc });
                    });
                }
            });
        }
    });
});
app.post('/', (req, res) => {
    let buffCatalog;
    let q = req.body.search.toString().toLowerCase().replace(/[^0-9A-z]/gi, '');
    let id = parseInt(q.replace(/[^0-9]/gi, ''));
    q = q.replace(/[^A-z]/gi, '');
    let sql = `SELECT article, title, price, media_id as media FROM accessory WHERE article LIKE '${id}' OR title LIKE '%${q}%'`;
    connection.query(sql, (error, results, fields) => {
        if (error)
            throw error;
        buffCatalog = results;
        for (let i = 0; i < results.length; ++i) {
            sql = `SELECT URL as media FROM media where media.id = ${results[i].media} limit 1`;
            connection.query(sql, (error, inner_res, fields) => {
                if (error)
                    throw error;
                buffCatalog[i].media = inner_res[0].media;
                if (i == results.length - 1) {
                    res.render('catalog', { catalog: buffCatalog });
                }
            });
        }
    });
});
app.get('/item', (req, res) => {
    item_id = (req.query.id) ? parseInt(req.query.id) : (item_id) ? item_id : 1;
    rawdata = fs.readFileSync(commentsFile);
    comments = JSON.parse(rawdata);
    let sql = `SELECT count(article) as c FROM accessory WHERE article='${item_id}'`;
    connection.query(sql, (error, results, fields) => {
        if (error)
            throw error;
        if (results[0].c < 1) {
            res.redirect('/');
            return;
        }
        else {
            sql = `SELECT article, title, description, price, media_id as media FROM accessory WHERE article='${item_id}'`;
            let item;
            connection.query(sql, (error, results, fields) => {
                if (error)
                    throw error;
                item = results[0];
                sql = `SELECT URL as media FROM media where media.id = ${item.media}`;
                connection.query(sql, (error, inner_res, fields) => {
                    if (error)
                        throw error;
                    item.media = Array();
                    for (let i = 0; i < inner_res.length; ++i) {
                        item.media.push(inner_res[i].media);
                    }
                    if (DEBUG)
                        console.log(item);
                    res.render('item', { comments: comments, user: currUser, item: item });
                });
            });
        }
    });
});
app.post('/item', (req, res) => {
    if (currUser.email == null) {
        res.redirect('/login');
        return;
    }
    if (req.body.usersurname && req.body.username) {
        if (req.body.newcom.replace(/[\s]/gi, '').length > 1) {
            const json = `{"${req.body.item}":{"surname":"${req.body.usersurname.replace(/[^A-zА-я]/gi, '')}","username":"${req.body.username.replace(/[^A-zА-я]/gi, '')}","text":${JSON.stringify(req.body.newcom).replace(/[\n\r\b]/gi, '').replace(/["'`]/gi, '\"')}}}`;
            upload(json);
        }
        res.redirect(`/item?id=${item_id}`);
        return;
    }
    else if (!req.body.id && (!req.body.usersurname || !req.body.username)) {
        res.redirect('/settings');
        return;
    }
    let q = `INSERT INTO orders(number, user_email, accessory_id, count) VALUES (null, '${currUser.email}', '${req.body.id}', '${req.body.count}')`;
    connection.query(q, (error, results, fields) => {
        if (error)
            throw error;
        if (DEBUG)
            console.log(`order : ${currUser.email}\t(${req.body.id} , ${req.body.count})`);
    });
    res.redirect('/item');
});
app.get('/orders', (req, res) => {
    if (currUser.email == null) {
        res.redirect('/login');
        return;
    }
    connection.query(`SELECT count(*) as c FROM admin WHERE email='${currUser.email}'`, (error, results, fields) => {
        if (error)
            throw error;
        if (results[0].c < 1) {
            res.redirect('/');
            return;
        }
    });
    let buffCatalog, q = `SELECT o.number, o.user_email, u.phone_number, u.surname, u.name, o.accessory_id, o.count, a.title, a.media_id as media, a.price FROM orders as o JOIN accessory as a JOIN user as u WHERE o.accessory_id=a.article AND o.user_email=u.email`;
    connection.query(q, (error, results, fields) => {
        if (error)
            throw error;
        buffCatalog = results;
        for (let i = 0; i < results.length; ++i) {
            q = `SELECT URL as media FROM media where media.id = ${results[i].media} limit 1`;
            connection.query(q, (error, inner_res, fields) => {
                if (error)
                    throw error;
                buffCatalog[i].media = inner_res[0].media;
                if (i == results.length - 1) {
                    res.render('orders', { catalog: buffCatalog });
                }
            });
        }
    });
});
app.post('/orders', (req, res) => {
    let arr = JSON.parse(req.body.remove.toString());
    let q = `DELETE FROM orders WHERE user_email='${arr.email.replace(/[^0-9A-z@_.]/gi, '')}' AND number='${arr.number.replace(/[^0-9]/gi, '')}'`;
    connection.query(q, (error, results, fields) => {
        if (error)
            throw error;
        res.redirect('/orders');
    });
});
app.get('/cart', (req, res) => {
    if (currUser.email == null) {
        res.redirect('/login');
        return;
    }
    connection.query(`SELECT count(*) as c FROM orders WHERE user_email='${currUser.email}'`, (error, results, fields) => {
        if (error)
            throw error;
        if (results[0].c < 1) {
            res.redirect('/');
            return;
        }
    });
    let buffCatalog, q = `SELECT o.number, o.user_email, o.accessory_id, o.count, a.title, a.media_id as media, a.price FROM orders as o JOIN accessory as a WHERE o.user_email='${currUser.email}' AND o.accessory_id=a.article`;
    connection.query(q, (error, results, fields) => {
        if (error)
            throw error;
        buffCatalog = results;
        for (let i = 0; i < results.length; ++i) {
            q = `SELECT URL as media FROM media where media.id = ${results[i].media} limit 1`;
            connection.query(q, (error, inner_res, fields) => {
                if (error)
                    throw error;
                buffCatalog[i].media = inner_res[0].media;
                if (i == results.length - 1) {
                    res.render('cart', { catalog: buffCatalog });
                }
            });
        }
    });
});
app.post('/cart', (req, res) => {
    if (Object.keys(req.body).toString().includes('count')) {
        let arr = JSON.parse(req.body.count.toString());
        let q = `UPDATE orders SET count='${arr.count}' WHERE user_email='${currUser.email}' AND accessory_id='${arr.id}'`;
        connection.query(q, (error, results, fields) => {
            if (error)
                throw error;
            res.redirect('/cart');
        });
    }
    else {
        let q = `DELETE FROM orders WHERE user_email='${currUser.email}' AND accessory_id='${req.body.remove}'`;
        connection.query(q, (error, results, fields) => {
            if (error)
                throw error;
            res.redirect('/cart');
        });
    }
});
app.get('/catalog', (req, res) => {
    let q = `SELECT article, title, price, media_id as media FROM accessory`;
    connection.query(q, (error, results, fields) => {
        if (error)
            throw error;
        catalog = results;
        for (let i = 0; i < results.length; ++i) {
            q = `SELECT URL as media FROM media where media.id = ${results[i].media} limit 1`;
            connection.query(q, (error, inner_res, fields) => {
                if (error)
                    throw error;
                catalog[i].media = inner_res[0].media;
                if (i == results.length - 1) {
                    res.render('catalog', { catalog: catalog });
                }
            });
        }
    });
});
app.post('/catalog', (req, res) => {
    let buffCatalog;
    let q = req.body.search.toString().toLowerCase().replace(/[^0-9A-z]/gi, '');
    let id = parseInt(q.replace(/[^0-9]/gi, ''));
    q = (q.replace(/[^A-z]/gi, '')) ? `%${q.replace(/[^A-z]/gi, '')}%` : null;
    connection.query(`SELECT count(*) as c FROM accessory WHERE article LIKE '${id}' OR title LIKE '${q}'`, (error, results, fields) => {
        if (error)
            throw error;
        if (results[0].c < 1) {
            res.redirect('/catalog');
            return;
        }
    });
    let sql = `SELECT article, title, price, media_id as media FROM accessory WHERE article LIKE '${id}' OR title LIKE '${q}'`;
    connection.query(sql, (error, results, fields) => {
        if (error)
            throw error;
        buffCatalog = results;
        for (let i = 0; i < results.length; ++i) {
            sql = `SELECT URL as media FROM media where media.id = ${results[i].media} limit 1`;
            connection.query(sql, (error, inner_res, fields) => {
                if (error)
                    throw error;
                buffCatalog[i].media = inner_res[0].media;
                if (i == results.length - 1) {
                    res.render('catalog', { catalog: buffCatalog });
                }
            });
        }
    });
});
app.get('/reg', (req, res) => {
    res.render('reg');
});
app.post('/reg', (req, res) => {
    let isExist = false;
    connection.query('SELECT email FROM user', (error, results, fields) => {
        if (error)
            throw error;
        results.forEach(result => {
            if (result.email.toString() == req.body.email.replace(/[^0-9A-z@_.]/gi, '')) {
                isExist = true;
                return;
            }
        });
        if (isExist) {
            res.redirect('/reg');
            return;
        }
        else {
            if (req.body.pass.replace(/[^0-9A-z_-]/gi, '') != req.body.confirmPass.replace(/[^0-9A-z_-]/gi, '')) {
                res.redirect('/reg');
                return;
            }
            let sn = (req.body.surname == undefined || req.body.surname == null || req.body.surname == "") ? null : req.body.surname.replace(/[^A-zА-я]/gi, '');
            let n = (req.body.name == undefined || req.body.name == null || req.body.name == "") ? null : req.body.name.replace(/[^A-zА-я]/gi, '');
            let num = (req.body.phone_number == undefined || req.body.phone_number == null || req.body.phone_number == "") ? null : req.body.phone_number.replace(/[^0-9]/gi, '');
            let adr = (req.body.address == undefined || req.body.address == null || req.body.address == "") ? null : req.body.address.replace(/[^0-9A-zА-я.,]/gi, '');
            let q = `INSERT INTO user(email, pass, surname, name, phone_number, address) VALUES("${req.body.email.replace(/[^0-9A-z@_.]/gi, '')}", '${req.body.pass.replace(/[^0-9A-z_-]/gi, '')}', '${sn}', '${n}', ${num}, '${adr}')`;
            connection.query(q, (error, results, fields) => {
                if (error)
                    throw error;
                res.redirect('/login');
            });
        }
    });
});
var isok = 1;
app.get('/login', (req, res) => {
    res.render('login', { result: { isok, currUser } });
});
app.post('/login', (req, res) => {
    let pass = req.body.pass.replace(/[^0-9A-z_-]/gi, '');
    let q = `SELECT COUNT(*) as count FROM user WHERE email='${req.body.email.replace(/[^0-9A-z@_.]/gi, '')}' AND pass='${pass}'`;
    connection.query(q, (error, results, fields) => {
        if (error)
            throw error;
        if (results[0].count > 0) {
            currUser.email = req.body.email.replace(/[^0-9A-z@_.]/gi, '');
            currUser.pass = pass;
            q = `SELECT * FROM user WHERE email='${currUser.email}'`;
            connection.query(q, (error, results, fields) => {
                if (error)
                    throw error;
                currUser.surname = (results[0].surname == undefined || results[0].surname == null || results[0].surname == "") ? null : results[0].surname;
                currUser.name = (results[0].name == undefined || results[0].name == null || results[0].name == "") ? null : results[0].name;
                currUser.phone_number = (results[0].phone_number == undefined || results[0].phone_number == null || results[0].phone_number == "") ? null : results[0].phone_number;
                currUser.address = (results[0].address == undefined || results[0].address == null || results[0].address == "") ? null : results[0].address;
            });
            res.redirect('/');
        }
        else {
            isok = 0;
            res.render('login', { result: { isok, currUser } });
            isok = 1;
        }
    });
});
app.get('/settings', (req, res) => {
    connection.query(`SELECT count(*) as c FROM admin WHERE email='${currUser.email}'`, (error, results, fields) => {
        if (error)
            throw error;
        if (results[0].c < 1) {
            res.render('sets', { sets: currUser, b: false });
            return;
        }
        else {
            res.render('sets', { sets: currUser, b: true });
        }
    });
});
app.post('/settings', (req, res) => {
    if (req.body.exit == "true") {
        currUser = {
            "email": null,
            "pass": null,
            "surname": null,
            "name": null,
            "phone_number": null,
            "address": null,
        };
        res.redirect('/settings');
        return;
    }
    let newmail = (req.body.email == undefined || req.body.email == null || req.body.email == "") ? null : req.body.email.replace(/[^0-9A-z@_.]/gi, '');
    let p1 = (req.body.pass1 == undefined || req.body.pass1 == null || req.body.pass1 == "") ? null : req.body.pass1.replace(/[^0-9A-z_-]/gi, '');
    let p2 = (req.body.pass2 == undefined || req.body.pass2 == null || req.body.pass2 == "") ? null : req.body.pass2.replace(/[^0-9A-z_-]/gi, '');
    let sn = (req.body.surname == undefined || req.body.surname == null || req.body.surname == "") ? null : req.body.surname.replace(/[^A-zА-я]/gi, '');
    let n = (req.body.name == undefined || req.body.name == null || req.body.name == "") ? null : req.body.name.replace(/[^A-zА-я]/gi, '');
    let num = (req.body.phone == undefined || req.body.phone == null || req.body.phone == "") ? null : req.body.phone.replace(/[^0-9]/gi, '');
    let adr = (req.body.address == undefined || req.body.address == null || req.body.address == "") ? null : req.body.address.replace(/[^0-9A-zА-я.,]/gi, '');
    let q, changes = Array();
    if (p1 != null && p1 == p2 && p1 != currUser.pass) {
        changes.push(`pass='${p1}'`);
        currUser.pass = p1;
    }
    if (currUser.surname != sn && sn != null) {
        changes.push(`surname='${sn}'`);
        currUser.surname = sn;
    }
    if (currUser.name != n && n != null) {
        changes.push(`name='${n}'`);
        currUser.name = n;
    }
    if (currUser.phone_number != num && num != null) {
        changes.push(`phone_number='${num}'`);
        currUser.phone_number = num;
    }
    if (currUser.address != adr && adr != null) {
        changes.push(`address='${adr}'`);
        currUser.address = adr;
    }
    if (newmail != null && currUser.email != newmail) {
        changes.push(`email='${newmail}'`);
    }
    if (changes.length > 0) {
        q = `UPDATE user SET ${changes.join(',')} WHERE email='${currUser.email}'`;
        if (DEBUG)
            console.log(q);
        if (newmail != null && currUser.email != newmail)
            currUser.email = newmail;
        connection.query(q, (error, results, fields) => {
            if (error)
                throw error;
            res.redirect('/settings');
        });
    }
});
