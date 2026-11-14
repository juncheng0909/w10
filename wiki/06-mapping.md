# LBA / PPA Mapping

整理日期：2026-11-14

LBA 是 Host 使用的 Logical Block Address，PPA 在本教材代表 Physical Page Address。為方便理解，示例以一個邏輯資料單位對應一頁。更新 A 時對應可由 B0:P0 改成 B1:P0，讀取仍使用 A 的邏輯位址。

## 教學模型與邊界

教學採 page-level mapping。真實 LBA 大小不一定等於 Page，也可能多個 LBA 共用一頁，FTL mapping 粒度與結構會不同。PPA 字母縮寫是教材記號。

## 來源

- [S2](sources/S2.md) · SSD Organization；Endurance；Garbage Collection；The Flash Translation Layer
- [S3](sources/S3.md) · 1. Why are SSD data placement technologies needed?；SSD Basics；SSD Write Amplification
