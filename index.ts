/*
	compile the ts files:	tsc path/name.ts	(if exist tsconfig.json you can only type the 'tsc')
	to run the scripts:		npm run <scriptName>
	run the server:			node <mainFile.js>
*/
const express = require("express");
const app = express();
app.set("views", "./source/templates");
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/source'));

/*		template	*/
app.get('/', (req, res) => {
	res.render('index');		//	<%= variable %>
});
/**/

var port: number = 5667;
app.listen(port, () => {console.log(`Server is running`)});