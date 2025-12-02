# Timestamp ⇄ Date Chrome 插件

一个简单的 Chrome 扩展（Manifest V3），用于在指定时区（以 UTC 偏移小时为准）下进行时间戳（秒/毫秒）与年月日互转。

功能
- 时间戳（秒或毫秒） → 指定时区的日期时间（支持毫秒）
- 日期字符串（支持毫秒） → 指定时区下的时间戳（秒或毫秒）
- 时区以“UTC 偏移小时”为准（支持小数，例如 -5.5），默认 UTC+8

安装（开发者模式，本地加载）
1. 将本仓库克隆或下载到本地。
2. 在 Chrome 地址栏打开 chrome://extensions/ 并开启“开发者模式”。
3. 点击“加载已解压的扩展程序”，选择本项目根目录即可。

日期格式支持
- YYYY-MM-DD
- YYYY-MM-DD HH:mm
- YYYY-MM-DD HH:mm:ss
- YYYY-MM-DD HH:mm:ss.SSS

备注
- 当前实现基于 UTC 偏移小时，不使用 IANA 时区数据库；如需精确处理夏令时与 IANA 时区（例如 Asia/Shanghai），可以在后续版本中引入 Luxon / Intl 支持.
