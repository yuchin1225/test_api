const express = require('express');
const courseRouter = require("./routes/course");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const apiRoutes = [
    {
        path: "/course",
        route: courseRouter,
    }
]

// 定義 /api/v1 路由
apiRoutes.forEach(route => {
    server.use(`/api/v1${route.path}`, route.route);
});

module.exports = server;