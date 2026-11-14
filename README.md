# Inside SSD — 從 NAND Flash 到 FTL

第十週生成式 AI 作業。對象為不熟悉 SSD 的大學生，語言為繁體中文。

- [12 頁 HTML 簡報](https://juncheng0909.github.io/w10/)
- [成果導覽](https://juncheng0909.github.io/w10/resources.html)
- [Wiki 索引](wiki/README.md)
- [Ingest log](reports/ingest-log.md)
- [Validation report](reports/validation-report.md)
- [Graph 與執行方式](workflow/README.md)
- [Reflection](reports/reflection.md)
- [繳交範本](SUBMISSION.md)

## 操作

左右方向鍵、PageUp / PageDown、Space、Home / End 可切頁。手機可點上一頁／下一頁並垂直閱讀。第 12 頁可展開四題答案。每頁下方提供 Wiki、來源紀錄及原始來源連結。

## 重現

需要 Node.js 22 以上，無第三方套件。

```text
npm run build
npm test
node scripts/test-workflow.mjs
npm run serve
```

瀏覽器必須實測當前 HTML，逐頁檢查 1280×720、390×844、360×800，保存結果至 reports/browser-tests.json 並填入 SHA-256。`scripts/record-browser.mjs` 只保存本次實測結果，不是可重新執行的瀏覽器測試器；未重新實測不得用它偽造新的通過報告。最後執行 `npm run check` 或失敗修正後 `node scripts/workflow.mjs --resume`。發布工作流程也會拒絕缺少或過期的瀏覽器報告。

## 專案結構

`wiki/` 是知識庫；`content/` 是證據卡、大綱與逐頁稿；`templates/` 是排版與操作；`scripts/` 是建置及關卡；`workflow/` 是 Graph；`reports/` 是真實測試歷史。此專案未修改 w9。

## 邊界

本教材是一般 NAND SSD 的入門模型。四頁 Block、page-level mapping 與 WAF 數字均為教學示意，不代表所有產品的實作。來源可讀性與語意由人工閱讀確認，程式能檢查引用與一致性，但不能自動證明技術真理。老師未提供正式評分表，因此不保證分數。
