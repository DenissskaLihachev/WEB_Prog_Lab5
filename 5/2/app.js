const express = require("express");
const hbs = require("hbs");
const app = express();
const fs = require("fs");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer")
const upload = multer();

app.engine("hbs", expressHbs.engine({
    layoutsDir: "views/layouts",
    defaultLayout: "layout",
    extname: "hbs"
}))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/main", urlencodedParser, function (request, response) {
    response.render("main");
});

var arr = new Array("RTX 2060", "35 000", "999", "Xeon E5-1650", "20 000", "10", "Какой-то товар", "999 000", "1");

app.post("/getData", upload.fields([]), (request, response) => {
    if (!request.body)
        return response.sendStatus(400);

    response.send(arr[request.body.data - 1]);
});

var table = `<tr><td>Название</td><td>Цена</td><td>Количество</td></tr><tr><td>RTX 2060</td><td>35 000</td><td>999</td></tr><tr><td>Xeon E5-1650</td><td>20 000</td><td>10</td></tr><td>Какой-то товар</td><td>999 000</td><td>1</td></tr>`

app.get("/getTable", (request, response) => {
    response.send(table);
});

app.listen(3000, function () {
});