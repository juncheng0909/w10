# 總結與測驗

整理日期：2026-11-14

把更新流程串起來：Host 指定 LBA，FTL 決定 PPA，新頁保存新版本，舊頁失效，GC 回收 Block，Wear Leveling 分散磨耗，discard 提供不再需要的範圍。

## 教學模型與邊界

問：可以單獨 erase 一個 Page 嗎？答：本教材一般 NAND 模型以 Block erase。問：GC erase 前要做什麼？答：搬移有效頁並更新 mapping。問：TRIM 是否立即安全抹除？答：不保證。問：6/4 的 WAF？答：1.5。

## 來源

- [S1](sources/S1.md) · Overview；Media - Non-Volatile Memory
- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
- [S3](sources/S3.md) · 1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification
- [S4](sources/S4.md) · 2023-09-20；開頭說明與 Figure 1
- [S5](sources/S5.md) · Chapter 21；discard 說明；Deployment Considerations 的 TRIM 類型
