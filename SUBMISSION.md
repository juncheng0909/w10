# 第十週作業

- 姓名：蘇俊誠
- 學號：E64131590
- 專案：Inside SSD — 從 NAND Flash 到 FTL
- 主題：SSD Architecture & Flash Translation Layer
- Repository：https://github.com/juncheng0909/w10
- 簡報：https://juncheng0909.github.io/w10/
- 成果導覽：https://juncheng0909.github.io/w10/resources.html
- Wiki：https://github.com/juncheng0909/w10/blob/main/wiki/README.md
- Ingest：https://github.com/juncheng0909/w10/blob/main/reports/ingest-log.md
- 測試：https://github.com/juncheng0909/w10/blob/main/reports/validation-report.md
- Graph：https://github.com/juncheng0909/w10/blob/main/workflow/README.md
- Reflection：https://github.com/juncheng0909/w10/blob/main/reports/reflection.md

## 主題簡介

本專案以 SSD Architecture & Flash Translation Layer 為主題，為不熟悉 SSD 的大學生建立繁體中文 LLM Wiki。先整理 SNIA、Williams College、Samsung、KIOXIA 與 Red Hat 五份資料，再以 Wiki 為唯一內容依據，製作 12 頁 HTML 簡報，說明 NAND、Page/Block、FTL Mapping、GC、Wear Leveling、TRIM 與 Write Amplification。

## 流程與實際執行摘要

來源整理 → Wiki Ingest → 來源檢查 → 證據卡 → 教學大綱 → 逐頁內容 → 忠實度檢查 → HTML → 版面與功能測試 → 發布。來源、內容或版面失敗會退回對應節點，每類修正最多三輪。實際完成 8 項技術檢查、4 項流程測試，以及三種尺寸各 12 頁的瀏覽器檢查；失敗與修正均有紀錄。

## 反思摘要

最常反覆修正的是 HTML 版面與功能測試：桌面高度超出視窗，以及 GC 圖與展開答案碰到來源區。實際調整是在 HTML 產生後、發布前增加內容與來源區重疊檢查、全展開測驗檢查，並以 HTML 雜湊防止沿用過期報告。沒有改變 Graph 的節點順序，因為原有回退回圈已能處理問題；修改的是檢查條件與排版。完整說明見 Reflection 連結。

## 可供老師驗證的項目

1. 五份來源具有編號、網址、整理日期、概念摘要與採用限制。
2. Wiki → 證據卡 → 大綱 → 逐頁稿 → 12 頁 HTML 可逐項追溯。
3. 每頁有原創圖表、Wiki 與來源連結。支援鍵盤及手機閱讀。
4. 可執行檢查關卡，含失敗退回位置、修正輪數上限與發布阻擋。
5. 實際保存自動檢查、瀏覽器失敗、排版修正與重測結果。
6. 特別檢查 Page/Block、Mapping、GC、TRIM 與 WAF。

## AI 使用揭露

使用生成式 AI 協助閱讀指定資料、以繁體中文整理 Wiki、產生圖解及程式、執行檢查並記錄問題。來源衝突、教學簡化與測試限制均留在專案中。


