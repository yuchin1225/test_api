const express = require('express');
const { createServer } = require('http');
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

createServer(server).listen(3000, () => {
    console.log('Server is running on port 3000');
});