# SSD 基本架構

整理日期：2026-11-14

SSD 使用非揮發性 NAND 儲存資料，controller 負責與 Host 及 NAND 溝通。多個 channel 可連接 NAND。內部管理讓 Host 可以使用邏輯位址存取資料。

## 教學模型與邊界

電腦送出 LBA 存取要求，SSD 內部才決定實體位置。

## 來源

- [S1](sources/S1.md) · Overview；Media - Non-Volatile Memory
- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
