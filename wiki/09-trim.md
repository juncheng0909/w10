# TRIM 與 discard

整理日期：2026-11-14

檔案系統刪除資料後，可透過 discard 告知 SSD 哪些 LBA 不再需要。ATA 的命令名稱是 TRIM。這讓裝置不必一直保留這些邏輯資料，可能減少未來搬移。TRIM 不保證立即擦除，也不等於安全抹除。

## 教學模型與邊界

最後兩項是依 S5 的通知語意、不同讀取行為與 S2 的 Block erase 規則推導。TRIM 後不保證所有裝置一律讀回零。

## 來源

- [S5](sources/S5.md) · Chapter 21；discard 說明；Deployment Considerations 的 TRIM 類型
- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
