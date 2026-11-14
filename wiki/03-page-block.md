# Page 與 Block

整理日期：2026-11-14

Page 是基本 read/program 單位，erase 以包含多個 Page 的 Block 為單位。不能為了更新其中一頁就直接擦除，而忽略同一 Block 內仍有效的資料。

## 教學模型與邊界

圖中每個 Block 只有四頁，是縮小的教學模型，並非實際 NAND 容量。Host logical block 不等於 NAND erase Block。實際尺寸依產品而異。

## 來源

- [S1](sources/S1.md) · Overview；Media - Non-Volatile Memory
- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
- [S4](sources/S4.md) · 2023-09-20；開頭說明與 Figure 1
