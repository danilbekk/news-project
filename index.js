const express = require("express");

const hbs = require("express-handlebars");

const data = require("./data");

const app = express();
app.use(express.static(__dirname));

app.set("view engine", "handlebars");

app.engine("handlebars", hbs());

app.get("/", (req, res) => {
  res.render("content", {
    mainNews: data.news.slice(0, 2),
    sideBar: data.news.slice(2, 6),
    headers: data.categories,
  });
});

app.get("/categoryId/:id", (req, res) => {
  const filtr = data.news.filter(
    (item) => item.categoryId === Number(req.params.id)
  );
  res.render("content", {
    mainNews: filtr.slice(0, 2),
    sideBar: filtr.slice(2, filtr.length),
    headers: data.categories,
  });
});

app.get("/news/:id", (req, res) => {
  const find = data.news.find((item) => item.id === Number(req.params.id));
  console.log(find);
  res.render("up", {
    find,
    headers: data.categories,
  });
});

app.get("/news", (req, res) => {
  res.json(data.news);
});

app.get("/itNews", (req, res) => {
  res.render("content", {
    id: 1,
  });
});

app.listen(3000);
