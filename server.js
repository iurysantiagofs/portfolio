const express = require('express');
const nunjucks = require('nunjucks');

const videos = require("./data");

const server = express();

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function (req, res) {

    const about  = {
        avatar_url: "https://avatars1.githubusercontent.com/u/61994276?s=400&v=4",
        name: "Iury Santiago",
        rote: "Analista de Sistemas",
        description: 'Programador Fullstack',
        link: [
            { name: "Github", url: "https://github.com/iurysantiagofs" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/iury-santiago-6a531b190/" }
        ]
    };

    return res.render("about" , { about });
});

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos });
});

server.get("/video" , function (req, res) {
    const id = req.query.id;

    const video = videos.find(function (video) {
       return video.id == id;
    })

    if (!video) {
        return res.send("Video not found!");
    }

    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("server is running");
});