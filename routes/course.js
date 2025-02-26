const express = require("express");
const router = express.Router();

// 課程列表 TEST
let courseList = [];

const routes = [
    // 新增課程
    {
        path: "/",
        method: "POST",
        handler: (req, res) => {
            try {
                const { teacherID, title, description, createTime, validTime, startTime, endTime, max } = req.body;
                if (!teacherID || !title || !validTime || !startTime || !endTime || !max) {
                    const error = new Error("錯誤請求.");
                    error.status = 400;
                    throw error;
                }

                // 新增課程資料
                const newData = {
                    id: courseList.length + 1,
                    teacherID,
                    title,
                    description: description || "",
                    validTime,
                    startTime,
                    endTime,
                    max
                }
                courseList.push(newData);
                res.status(200).json(newData);
            } catch (error) {
                res.status(error.status).json({});
            }
        }
    },
    // 修改課程
    {
        path: "/:courseId",
        method: "PUT",
        handler: (req, res) => {
            try {
                const courseId = Number(req.params.courseId);
                const { id, teacherID, title, description, createTime, validTime, startTime, endTime, max } = req.body;
                if (!courseId || !title || !validTime || !startTime || !endTime || !max) {
                    const error = new Error("錯誤請求.");
                    error.status = 400;
                    throw error;
                }
                const index = courseList.findIndex(item => item.id === courseId);
                if(index === -1) {
                    const error = new Error("課程不存在.");
                    error.status = 404;
                    throw error;
                }
                courseList[index] = {
                    ...courseList[index],
                    title,
                    validTime,
                    startTime,
                    endTime,
                    max,
                    description: description || "",
                }
                res.status(200).json(courseList[index]);
            } catch (error) {
                res.status(error.status).json({});
            }
        }
    },
    // 取得講師課程列表
    {
        path: "/teacher/:teacherId",
        method: "GET",
        handler: (req, res) => {
            try {
                const teacherId = Number(req.params.teacherId);
                if (!teacherId) {
                    const error = new Error("錯誤請求.");
                    error.status = 400;
                    throw error;
                }
                const index = courseList.findIndex(item => item.teacherID === teacherId);
                if(index === -1) {
                    const error = new Error("查無講師課程.");
                    error.status = 404;
                    throw error;
                }
                const courseForTeacher = courseList.filter(item => item.teacherID === teacherId);
                res.status(200).json(courseForTeacher);
            } catch (error) {
                res.status(error.status).json([]);
            }
        }
    },
];

routes.forEach(route => {
    router[route.method.toLowerCase()](route.path, route.handler);
});

module.exports = router;