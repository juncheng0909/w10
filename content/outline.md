# 教學大綱

唯一內容來源：[Wiki](../wiki/README.md)。資料流：Wiki → 證據卡 → 逐頁稿 → HTML。

1. Inside SSD：從 NAND Flash 到 FTL（E01）
2. SSD 基本架構：Host 看見位址，controller 管理 NAND（E01）
3. NAND Flash 與 Cell：一顆 Cell 可以儲存幾個 bits？（E02）
4. Page 與 Block：讀寫與擦除，使用不同的單位（E03）
5. 為什麼不能原地覆寫：新版本寫到別處，舊版本等待回收（E04）
6. Flash Translation Layer：把邏輯世界接到實體世界（E05）
7. LBA / PPA Mapping：同一個 LBA，可以換一個實體位置（E06）
8. Garbage Collection：搬走有效資料，才能整個擦除（E07）
9. Wear Leveling：讓磨耗分散到不同區域（E08）
10. TRIM 與 discard：告知裝置：這些資料不再需要（E09）
11. Write Amplification：一次 Host 寫入，可能帶來更多內部寫入（E10）
12. 總結與測驗：用四個問題，檢查你是否理解（E11）
