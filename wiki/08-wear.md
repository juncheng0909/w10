# Wear Leveling

整理日期：2026-11-14

NAND 經歷 program/erase 循環會磨耗。Wear Leveling 嘗試分散磨耗，避免部分區域過早耗盡。GC 的目標是取得可寫空間，Wear Leveling 的目標是分散磨耗，兩者會互相影響。

## 教學模型與邊界

不承諾消除磨耗，也不從玩具示例估算真實 SSD 壽命。圖中 P/E 數字只示意分配策略。

## 來源

- [S1](sources/S1.md) · Overview；Media - Non-Volatile Memory
- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
- [S3](sources/S3.md) · 1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification
