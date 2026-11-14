# 逐頁內容

## 1. Inside SSD

從 NAND Flash 到 FTL

SSD 使用非揮發性 NAND 儲存資料，controller 負責與 Host 及 NAND 溝通。多個 channel 可連接 NAND。內部管理讓 Host 可以使用邏輯位址存取資料。

講者補充：一筆資料更新，為什麼會引發一連串內部工作？

依據：[E01](evidence.json)

## 2. SSD 基本架構

Host 看見位址，controller 管理 NAND

SSD 使用非揮發性 NAND 儲存資料，controller 負責與 Host 及 NAND 溝通。多個 channel 可連接 NAND。內部管理讓 Host 可以使用邏輯位址存取資料。

講者補充：電腦送出 LBA 存取要求，SSD 內部才決定實體位置。

依據：[E01](evidence.json)

## 3. NAND Flash 與 Cell

一顆 Cell 可以儲存幾個 bits？

Cell 以可辨識的狀態儲存位元。SLC/MLC/TLC/QLC 分別儲存 1/2/3/4 bits per cell。更多 bits 需要區分更多狀態，耐用度與效能通常有所取捨。

講者補充：不畫固定的 0/1 電荷方向，避免把不同編碼簡化為同一電路實作。

依據：[E02](evidence.json)

## 4. Page 與 Block

讀寫與擦除，使用不同的單位

Page 是基本 read/program 單位，erase 以包含多個 Page 的 Block 為單位。不能為了更新其中一頁就直接擦除，而忽略同一 Block 內仍有效的資料。

講者補充：圖中每個 Block 只有四頁，是縮小的教學模型，並非實際 NAND 容量。Host logical block 不等於 NAND erase Block。實際尺寸依產品而異。

依據：[E03](evidence.json)

## 5. 為什麼不能原地覆寫

新版本寫到別處，舊版本等待回收

NAND 遵守 erase-before-write 限制。一般更新採 out-of-place write：寫入已擦除的空閒頁，再讓 mapping 指向新版本，舊版本成為 invalid。邏輯失效不會把舊頁變回已擦除狀態。

講者補充：這是一般更新模型，不討論 partial-page programming 的特定限制，也不宣稱所有電荷狀態都絕對只能寫一次。

依據：[E04](evidence.json)

## 6. Flash Translation Layer

把邏輯世界接到實體世界

FTL 是 SSD controller 上的韌體管理層，執行 logical-to-physical translation，並協調 GC 與 Wear Leveling。Host 可維持相同邏輯位址，實體位置則會改變。

講者補充：這裡聚焦一般由裝置管理的 NAND SSD，不延伸到 host-managed 特殊架構。

依據：[E05](evidence.json)

## 7. LBA / PPA Mapping

同一個 LBA，可以換一個實體位置

LBA 是 Host 使用的 Logical Block Address，PPA 在本教材代表 Physical Page Address。為方便理解，示例以一個邏輯資料單位對應一頁。更新 A 時對應可由 B0:P0 改成 B1:P0，讀取仍使用 A 的邏輯位址。

講者補充：教學採 page-level mapping。真實 LBA 大小不一定等於 Page，也可能多個 LBA 共用一頁，FTL mapping 粒度與結構會不同。PPA 字母縮寫是教材記號。

依據：[E06](evidence.json)

## 8. Garbage Collection

搬走有效資料，才能整個擦除

GC 挑選待回收 Block，先把仍有效的 Page 搬到安全位置並更新 mapping，才 erase 原 Block。Invalid Page 不需保留。搬移也會發生 NAND 寫入，因此 GC 並非零成本。

講者補充：原創示例：B0=[A舊,B有效,C有效,D失效]。搬移 B、C 兩頁後，B0 才能整體擦除。任何 erase 前漏搬有效頁都會遺失資料。

依據：[E07](evidence.json)

## 9. Wear Leveling

讓磨耗分散到不同區域

NAND 經歷 program/erase 循環會磨耗。Wear Leveling 嘗試分散磨耗，避免部分區域過早耗盡。GC 的目標是取得可寫空間，Wear Leveling 的目標是分散磨耗，兩者會互相影響。

講者補充：不承諾消除磨耗，也不從玩具示例估算真實 SSD 壽命。圖中 P/E 數字只示意分配策略。

依據：[E08](evidence.json)

## 10. TRIM 與 discard

告知裝置：這些資料不再需要

檔案系統刪除資料後，可透過 discard 告知 SSD 哪些 LBA 不再需要。ATA 的命令名稱是 TRIM。這讓裝置不必一直保留這些邏輯資料，可能減少未來搬移。TRIM 不保證立即擦除，也不等於安全抹除。

講者補充：最後兩項是依 S5 的通知語意、不同讀取行為與 S2 的 Block erase 規則推導。TRIM 後不保證所有裝置一律讀回零。

依據：[E09](evidence.json)

## 11. Write Amplification

一次 Host 寫入，可能帶來更多內部寫入

WAF = NAND 寫入 bytes / Host 寫入 bytes，使用同一觀察區間。GC 的有效頁搬移是額外寫入來源。原創計算：Host 寫入 4 頁等量資料、NAND 寫入 6 頁等量資料，WAF=6/4=1.5。

講者補充：計算忽略壓縮、快取與其他 metadata 成本，只隔離 GC 的教學效果。TRIM 可能減少搬移，實際 WAF 仍依工作負載與實作而異。

依據：[E10](evidence.json)

## 12. 總結與測驗

用四個問題，檢查你是否理解

把更新流程串起來：Host 指定 LBA，FTL 決定 PPA，新頁保存新版本，舊頁失效，GC 回收 Block，Wear Leveling 分散磨耗，discard 提供不再需要的範圍。

講者補充：先回答，再展開解答。回到 Wiki，可以追查每個觀念。

依據：[E11](evidence.json)
