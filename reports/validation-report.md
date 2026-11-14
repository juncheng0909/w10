# Validation report

每次記錄均由實際執行產生。技術模型檢查不能取代來源判讀；另見 ingest log。

## 執行 1 · 2026-11-14T06:25:29.738Z

狀態：NEEDS_REPAIR。修正輪數：{"source":0,"fidelity":0,"layout":0}

|關卡|結果|原因|
|---|---|---|
|來源整理 → Wiki Ingest → 來源檢查|PASS|通過|
|證據卡與 Wiki 忠實度|PASS|通過|
|教學大綱 → 逐頁內容 → 忠實度檢查|PASS|通過|
|HTML 與關鍵觀念模型|PASS|通過|
|版面與功能測試|FAIL|缺實際瀏覽器報告|

## 執行 2 · 2026-11-14T06:35:59.510Z

狀態：NEEDS_REPAIR。修正輪數：{"source":0,"fidelity":0,"layout":1}

|關卡|結果|原因|
|---|---|---|
|來源整理 → Wiki Ingest → 來源檢查|PASS|通過|
|證據卡與 Wiki 忠實度|PASS|通過|
|教學大綱 → 逐頁內容 → 忠實度檢查|PASS|通過|
|HTML 與關鍵觀念模型|PASS|通過|
|版面與功能測試|FAIL|1280px 有版面溢出|

## 執行 3 · 2026-11-14T06:37:38.841Z

狀態：NEEDS_REPAIR。修正輪數：{"source":0,"fidelity":0,"layout":2}

|關卡|結果|原因|
|---|---|---|
|來源整理 → Wiki Ingest → 來源檢查|PASS|通過|
|證據卡與 Wiki 忠實度|PASS|通過|
|教學大綱 → 逐頁內容 → 忠實度檢查|PASS|通過|
|HTML 與關鍵觀念模型|FAIL|12 頁與 12 組證據標記: Expected values to be strictly equal:

18 !== 12
|

## 執行 4 · 2026-11-14T06:38:00.056Z

狀態：PASS。修正輪數：{"source":0,"fidelity":1,"layout":2}

|關卡|結果|原因|
|---|---|---|
|來源整理 → Wiki Ingest → 來源檢查|PASS|通過|
|證據卡與 Wiki 忠實度|PASS|通過|
|教學大綱 → 逐頁內容 → 忠實度檢查|PASS|通過|
|HTML 與關鍵觀念模型|PASS|通過|
|版面與功能測試|PASS|通過|
|發布關卡|PASS|允許發布；部署結果另記|

## 測試範圍

- 可執行參考模型：Page/Block、FTL 更新、GC 搬移前禁止 erase、TRIM 邏輯失效、WAF。
- 結構與追溯：五份來源、Wiki 與證據卡一致、12 頁與各頁引用。
- 瀏覽器：見 browser-tests.json 的當前 HTML SHA-256、尺寸、逐頁與功能結果。
- 未做：實體 SSD 量測、韌體模擬、跨瀏覽器相容性認證。
