# 可執行 Graph 與 Loop

[Graph v1](graph-v1.mmd) 是初版且未修改。實際執行器：[workflow.mjs](../scripts/workflow.mjs)。

執行：

```text
node scripts/workflow.mjs
node scripts/workflow.mjs --resume
```

第一個命令開新 run，依序檢查來源、Wiki、證據卡、大綱、逐頁稿、忠實度、HTML、單元模型、瀏覽器雜湊，通過才產生 release-ready.json。失敗會刪除過期 release-ready 並寫入 state.json 及 append-only workflow-runs.jsonl。

修正是人工審查的實際檔案修改，不用自動重試掩蓋失敗。依 state 的 returnTo 修正，再用 --resume。每個 run 分別記錄 source / fidelity / layout 三類修正輪數，最多三輪。第三輪仍失敗即 STOP，後續 resume 不再放行。來源不足回來源整理並補檢索；證據失配回證據卡，逐頁失配回逐頁稿；溢出只可修 templates。

瀏覽器使用 1280×720、390×844 與 360×800 檢查全部 12 頁，測試鍵盤、網址 hash、按鈕與測驗。瀏覽器結果須含當前 index.html SHA-256，HTML 一變就失效。發布的 CI 再執行相同關卡，缺少或過期報告一律拒絕發布。

HTML 是簡報產物，Wiki 是內容依據。build 不會覆寫 Wiki。Graph 若未變更，不虛構前後差異；若修改則新增版本檔與 diff。
