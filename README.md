
# TEST API 練習

使用 express.js jest 測試 api 資料正確性。

> [!NOTE]
> TDD (Test-driven development) 概念「先寫測試，在進入開發工作」.

### 測試步驟
1. api 路徑配置與回應資料
2. 開始撰寫 test 並且定義假資料
3. 利用假資料請求，檢查回應的資料正確且符合預期

### 結構

```bash
/
├── server.js
├── course.test.js - 測試 course API
├── /routes
│   ├── course.js  - course API router
```

### 安裝
```bash
npm install | pnpm install
```

### 執行測試
```bash
npm run test | pnpm run test
```