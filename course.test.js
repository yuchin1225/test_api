const request = require('supertest');
const express = require('express');
const courseRoutes = require('./routes/course');


const server = express();
server.use(express.json());
server.use('/api/v1/course', courseRoutes);

describe('/api/v1/course API 測試', () => {

  // 測試課程資料列表
  let courseList = [];

  // 測試新增課程
  it('新增課程 - [POST] /api/v1/course', async () => {
    // 新增課程資料
    const newCourse = {
      teacherID: 1,
      title: "測試課程",
      description: "測試課程描述",
      validTime: "2025-02-01 00:00",
      startTime: "0800",
      endTime: "1200",
      max: 30
    };

    const response = await request(server)
      .post('/api/v1/course')
      .send(newCourse)
      .expect(200);

    // 檢查回傳的課程資料是否正確
    expect(response.body).toHaveProperty('id');
    expect(response.body.teacherID).toBe(newCourse.teacherID);
    expect(response.body.title).toBe(newCourse.title);
    expect(response.body.description).toBe(newCourse.description);
    expect(response.body.validTime).toBe(newCourse.validTime);
    expect(response.body.startTime).toBe(newCourse.startTime);
    expect(response.body.endTime).toBe(newCourse.endTime);
    expect(response.body.max).toBe(newCourse.max);

    // 資料加入測試課程資料列表
    courseList.push(response.body);
  });

  // 測試新增課程失敗, 缺少必要資料
  it('新增課程失敗, 缺少必要資料 - [POST] /api/v1/course', async () => {
    const newCourse = {
      title: "測試課程"
    };

    const response = await request(server)
      .post('/api/v1/course')
      .send(newCourse)
      .expect(400);

    // 錯誤回傳空物件
    expect(response.body).toMatchObject({});
  });

  // 測試更新課程
  it('更新課程 - [PUT] /api/v1/course/1', async () => {
    // 更新課程資料
    const updateCourse = {
      title: '測試課程2',
      description: '測試課程描述2',
      validTime: "2025-02-01 00:00",
      startTime: "1300",
      endTime: "1500",
      max: 30
    };

    const response = await request(server)
      .put('/api/v1/course/1')
      .send(updateCourse)
      .expect(200);

    // 檢查回傳的課程資料是否更新
    expect(response.body.title).toBe(updateCourse.title);
    expect(response.body.description).toBe(updateCourse.description);
    expect(response.body.validTime).toBe(updateCourse.validTime);
    expect(response.body.startTime).toBe(updateCourse.startTime);
    expect(response.body.endTime).toBe(updateCourse.endTime);
    expect(response.body.max).toBe(updateCourse.max);

    // 測試課程資料列表更新 id === 1 更新新資料
    courseList = courseList.map(course => course.id === 1 ? { ...course, ...updateCourse } : course);
  });

  // 測試更新課程失敗, 缺少必要資料
  it('更新課程失敗, 缺少必要資料 - [PUT] /api/v1/course/1', async () => {
    // 更新課程資料
    const updateCourse = {
      title: '測試課程2',
    };

    const response = await request(server)
      .put('/api/v1/course/1')
      .send(updateCourse)
      .expect(400);

    // 錯誤回傳空物件
    expect(response.body).toMatchObject({});
  });

  // 測試更新課程失敗, 查無課程ID
  it('更新課程失敗, 查無課程ID - [PUT] /api/v1/course/2', async () => {
    // 更新課程資料
    const updateCourse = {
      title: '測試課程2',
      description: '測試課程描述2',
      validTime: "2025-02-01 00:00",
      startTime: "1300",
      endTime: "1500",
      max: 30
    };

    const response = await request(server)
      .put('/api/v1/course/2')
      .send(updateCourse)
      .expect(404);

    // 錯誤回傳空物件
    expect(response.body).toMatchObject({});
  });


  // 測試查詢教師課程
  it('查詢教師課程 - [GET] /api/v1/course/teacher/1', async () => {
    const response = await request(server)
      .get('/api/v1/course/teacher/1')
      .expect(200);

    // 判斷是否有回傳更新後的課程資料
    expect(response.body[0].teacherID).toBe(courseList[0].teacherID);
    expect(response.body[0].title).toBe(courseList[0].title);
    expect(response.body[0].description).toBe(courseList[0].description);
    expect(response.body[0].validTime).toBe(courseList[0].validTime);
    expect(response.body[0].startTime).toBe(courseList[0].startTime);
    expect(response.body[0].endTime).toBe(courseList[0].endTime);
    expect(response.body[0].max).toBe(courseList[0].max);
  });

  // 測試查詢教師課程失敗, 錯誤的教師ID
  it('查詢教師課程失敗, 無效 - [GET] /api/v1/course/teacher/53fa9b7a-1aa5-43ac-b28c-c03022d8c231', async () => {

    const response = await request(server)
      .get('/api/v1/course/teacher/53fa9b7a-1aa5-43ac-b28c-c03022d8c231')
      .expect(400);

    // 錯誤回傳空列表
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(0);
  });

  // 測試查詢教師課程失敗, 查無教師ID
  it('查詢教師課程失敗, 查無教師ID - [GET] /api/v1/course/teacher/2', async () => {

    const response = await request(server)
      .get('/api/v1/course/teacher/2')
      .expect(404);

    // 錯誤回傳空列表
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(0);
  });

});