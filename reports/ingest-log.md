# Ingest log

日期：2026-11-14（Asia/Taipei）。每份來源已透過 web open 閱讀相關段落，無大量引文。此紀錄由實際閱讀後建立，並非僅列網址。

|來源|結果|採用位置|關鍵概念|
|---|---|---|---|
|[S1](../wiki/sources/S1.md)|PASS / 正式 ingest|Overview；Media - Non-Volatile Memory|SSD 使用非揮發記憶體。NAND 由 controller 管理，可透過多個 channel 連接。Cell 儲存位元，Page 是 program 單位，Block 包含多個 Page 並整體 erase。SLC/MLC/TLC/QLC 分別表示每 Cell 1/2/3/4 bits。|
|[S2](../wiki/sources/S2.md)|PASS / 正式 ingest|SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer|NAND 更新採另寫新頁。FTL 維護 logical-to-physical 對應。GC 先搬移所有有效頁，更新指標，再擦除整個 Block。Wear Leveling 分散寫入造成的磨耗，P/E 會影響耐用度。|
|[S3](../wiki/sources/S3.md)|PASS / 正式 ingest|1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification|Host 使用 LBA。FTL 將邏輯位址轉為 NAND 實體位址，更新資料會寫入空閒頁並讓舊頁失效。GC 額外搬移造成 Write Amplification，WAF 以 SSD 寫入量除以 Host 寫入量衡量。資料配置可影響 GC 成本。|
|[S4](../wiki/sources/S4.md)|PASS / 正式 ingest|2023-09-20；開頭說明與 Figure 1|Read/write 使用 Page 單位，erase 使用較大的 Block 單位。Erase 所需時間會干擾 throughput 與 latency。低延遲 SSD 仍需管理 erase 的成本。|
|[S5](../wiki/sources/S5.md)|PASS / 正式 ingest|Chapter 21；discard 說明；Deployment Considerations 的 TRIM 類型|Host 可透過 discard 告知裝置某段 logical blocks 已不再使用。ATA 使用 TRIM，SCSI 使用 UNMAP 等命令。支援狀態取決於裝置與儲存堆疊。TRIM 後讀取行為有不同類型，不能一概宣稱讀回零。|

## 實際發現

1. S2 的 GC 段落在同一句中對 0→1 是否可行給出矛盾敘述。捨棄位元方向，以 S1/S3/S4 確認 Page program 與 Block erase 原則。
2. S3 與 S4 的 Block 容量範圍不同。教材不採固定真實容量，以四頁 Block 明示為示意。
3. S5 屬 RHEL 7，保留 discard 概念及 TRIM 讀取語意限制，不轉載舊版設定建議。

來源定位以章節名稱為準，網站行號會隨頁面變動。來源原文版權歸各作者，Wiki 與圖解以自己的文字及教學模型表達。
