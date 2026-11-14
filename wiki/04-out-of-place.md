# 為什麼不能原地覆寫

整理日期：2026-11-14

NAND 遵守 erase-before-write 限制。一般更新採 out-of-place write：寫入已擦除的空閒頁，再讓 mapping 指向新版本，舊版本成為 invalid。邏輯失效不會把舊頁變回已擦除狀態。

## 教學模型與邊界

這是一般更新模型，不討論 partial-page programming 的特定限制，也不宣稱所有電荷狀態都絕對只能寫一次。

## 來源

- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
- [S3](sources/S3.md) · 1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification
- [S4](sources/S4.md) · 2023-09-20；開頭說明與 Figure 1
