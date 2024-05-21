const express = require("express");
const app = express();
app.set("views", "./source/templates");
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/source'));
app.get('/', (req, res) => {
    res.render('index');
});
var port = 5667;
app.listen(port, () => { console.log(`Server is running`); });
