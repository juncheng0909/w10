# Flash Translation Layer

整理日期：2026-11-14

FTL 是 SSD controller 上的韌體管理層，執行 logical-to-physical translation，並協調 GC 與 Wear Leveling。Host 可維持相同邏輯位址，實體位置則會改變。

## 教學模型與邊界

這裡聚焦一般由裝置管理的 NAND SSD，不延伸到 host-managed 特殊架構。

## 來源

- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
- [S3](sources/S3.md) · 1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification
