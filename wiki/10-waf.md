# Write Amplification

整理日期：2026-11-14

WAF = NAND 寫入 bytes / Host 寫入 bytes，使用同一觀察區間。GC 的有效頁搬移是額外寫入來源。原創計算：Host 寫入 4 頁等量資料、NAND 寫入 6 頁等量資料，WAF=6/4=1.5。

## 教學模型與邊界

計算忽略壓縮、快取與其他 metadata 成本，只隔離 GC 的教學效果。TRIM 可能減少搬移，實際 WAF 仍依工作負載與實作而異。

## 來源

- [S3](sources/S3.md) · 1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification
- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
