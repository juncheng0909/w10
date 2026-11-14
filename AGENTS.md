# Inside SSD — 從 NAND Flash 到 FTL

本專案獨立於 w9。語言為繁體中文，讀者為初學 SSD 的大學生。

- Wiki 是教學內容的唯一依據。先更新來源紀錄與 Wiki，再更新證據卡及逐頁稿。
- `wiki/sources/S*.md` 必須包含來源編號、名稱、URL、整理日期、定位、關鍵概念、限制。
- 不直接複製外部文章。示例、計算、圖解都要標示為原創教學模型。
- 不把 NAND Page、Host logical block、erase Block 當成相同單位。
- Mapping 圖採 page-level 教學模型，不能宣稱所有 FTL 都是一對一 LBA/Page。
- GC 必須先搬有效頁並更新 mapping，才能 erase。TRIM 不代表立即擦除或安全抹除。
- 執行 `npm run build`、`npm test`、`npm run check`。HTML 變更後必須重做瀏覽器測試。
- `reports/` 只記錄真實結果。歷史 JSONL 不得覆寫。修正 Loop 每類最多三輪，超過即停止。
- 排版問題只修改 `templates/`，不得為通過版面檢查偷改 Wiki 或技術稿。
- 發布只允許通過當前 HTML 雜湊之瀏覽器關卡的版本。不得修改上層 sources/ 與 w9。
