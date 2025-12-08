# ⏰ Timestamp ⇄ Date Converter

<div align="center">

**一个功能强大且易用的 Chrome 浏览器扩展**

支持在指定时区下进行时间戳与日期时间的双向转换

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)](https://www.google.com/chrome/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License](https://img.shields.io/badge/license-MIT-orange)](LICENSE)

</div>

---

## 📖 项目简介

Timestamp ⇄ Date Converter 是一个基于 Chrome Manifest V3 的浏览器扩展，专为开发者和需要频繁处理时间戳的用户设计。它提供了直观的界面和强大的功能，让时间戳与日期时间之间的转换变得简单快捷。

## ✨ 核心功能

### 🔄 双向转换
- **时间戳 → 日期**：将 Unix 时间戳（秒或毫秒）转换为人类可读的日期时间格式
- **日期 → 时间戳**：将日期时间转换为 Unix 时间戳（秒或毫秒）

### 🌏 时区支持
- 支持自定义时区偏移（UTC 偏移小时数）
- 支持小数时区偏移（例如：-5.5, +9.5）
- 默认使用 UTC+8（北京时间）
- 实时显示北京时间

### ⚡ 实时功能
- 实时显示当前时间戳（秒和毫秒）
- 每秒自动更新
- 快速获取当前时间戳

### 📋 便捷操作
- 一键复制转换结果
- 支持回车键快速转换
- 日期时间选择器，方便精确选择
- 支持毫秒级精度

## 🚀 安装方法

### 方式一：开发者模式加载（推荐）

1. **克隆或下载本仓库**
   ```bash
   git clone https://github.com/Jenwie-wj/timestamp-converter.git
   cd timestamp-converter
   ```

2. **打开 Chrome 扩展管理页面**
   - 在浏览器地址栏输入 `chrome://extensions/`
   - 或通过菜单：更多工具 → 扩展程序

3. **启用开发者模式**
   - 在页面右上角打开"开发者模式"开关

4. **加载扩展**
   - 点击"加载已解压的扩展程序"
   - 选择本项目的根目录
   - 完成！扩展图标将出现在浏览器工具栏

### 方式二：从 Chrome 应用商店安装

> 📝 注：本扩展目前暂未上架 Chrome 应用商店，敬请期待未来版本。

## 📚 使用指南

### 1️⃣ 时间戳转日期

1. **输入时间戳**
   - 在"时间戳输入"框中输入数字
   - 示例：`1633072800`（秒）或 `1633072800123`（毫秒）

2. **选择单位**
   - 选择"秒"或"毫秒"单位

3. **设置时区**
   - 输入 UTC 偏移小时数（如：+8, -5, +5.5）
   - 默认为 +8（北京时间）

4. **转换**
   - 点击"🔄 转换为日期"按钮
   - 或按回车键快速转换

5. **复制结果**
   - 点击"📋 复制结果"按钮一键复制

**输出格式**：`YYYY-MM-DD HH:mm:ss.SSS (UTC+X)`

### 2️⃣ 日期转时间戳

1. **选择日期时间**
   - 使用日期时间选择器选择目标时间
   - 默认显示当前时间

2. **设置时区**
   - 输入 UTC 偏移小时数
   - 默认为 +8（北京时间）

3. **选择输出单位**
   - 选择输出"秒"或"毫秒"

4. **转换**
   - 点击"🔄 转换为时间戳"按钮
   - 或按回车键快速转换

5. **复制结果**
   - 点击"📋 复制结果"按钮一键复制

### 3️⃣ 实时时间戳

扩展顶部实时显示：
- 当前时间戳（秒）
- 当前时间戳（毫秒）
- 北京时间（YYYY-MM-DD HH:mm:ss）

每秒自动更新，方便快速获取当前时间戳。

## 📋 支持的日期格式

扩展支持以下日期时间格式：

- `YYYY-MM-DD` - 日期（如：2021-10-01）
- `YYYY-MM-DD HH:mm` - 日期+时分（如：2021-10-01 13:30）
- `YYYY-MM-DD HH:mm:ss` - 日期+时分秒（如：2021-10-01 13:30:45）
- `YYYY-MM-DD HH:mm:ss.SSS` - 日期+时分秒+毫秒（如：2021-10-01 13:30:45.123）

## 🔍 使用场景

- **开发调试**：快速转换 API 返回的时间戳
- **日志分析**：解析服务器日志中的时间戳
- **数据库操作**：转换数据库中的时间字段
- **测试验证**：验证时间相关的业务逻辑
- **文档编写**：在文档中添加准确的时间信息

## 🛠️ 技术栈

- **Manifest Version**: V3（最新 Chrome 扩展规范）
- **前端技术**: 
  - 纯原生 JavaScript（无框架依赖）
  - HTML5 + CSS3
- **浏览器 API**:
  - Chrome Extension APIs
  - Clipboard API
  - Internationalization API (Intl)

## 📁 项目结构

```
timestamp-converter/
├── icons/              # 扩展图标文件
│   ├── icon16.svg     # 16x16 图标
│   ├── icon48.svg     # 48x48 图标
│   └── icon128.svg    # 128x128 图标
├── manifest.json       # 扩展配置文件
├── popup.html          # 弹窗界面 HTML
├── popup.js            # 核心逻辑 JavaScript
├── style.css           # 样式文件
└── README.md           # 项目文档
```

## ❓ 常见问题

### Q1: 为什么使用 UTC 偏移而不是时区名称（如 Asia/Shanghai）？

**A**: 当前版本使用 UTC 偏移小时的方式实现，更加简单直接。对于大多数使用场景，UTC 偏移已经足够。如果需要精确处理夏令时（DST）和 IANA 时区数据库，可以在后续版本中引入 Luxon 或增强 Intl API 支持。

### Q2: 时区偏移可以使用小数吗？

**A**: 可以！扩展支持小数时区偏移。例如：
- UTC+5.5（印度标准时间）
- UTC+9.5（澳大利亚中部标准时间）
- UTC-3.5（纽芬兰标准时间）

### Q3: 转换结果的精度如何？

**A**: 扩展支持毫秒级精度。时间戳转日期时，会保留完整的毫秒信息（.SSS）。日期转时间戳时，如果输入包含毫秒信息，也会被准确转换。

### Q4: 复制功能在某些网站不工作？

**A**: 这可能是由于浏览器的权限限制。请确保：
1. 扩展已获得必要的权限
2. 在扩展弹窗内点击复制按钮（而不是在其他页面）

### Q5: 为什么默认时区是 UTC+8？

**A**: UTC+8 是北京时间（中国标准时间），考虑到主要用户群体，将其设为默认值。您可以随时修改为任何需要的时区。

## 🔮 未来计划

- [ ] 支持更多预设时区快速选择（如：UTC、北京、东京、伦敦等）
- [ ] 添加批量转换功能
- [ ] 支持更多日期格式（ISO 8601、RFC 2822 等）
- [ ] 添加时区名称支持（IANA 时区数据库）
- [ ] 支持深色模式主题
- [ ] 添加历史记录功能
- [ ] 国际化支持（英文、中文等多语言）

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢所有为本项目做出贡献的开发者！

---

<div align="center">

**如果这个项目对您有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ by [Jenwie-wj](https://github.com/Jenwie-wj)

</div>
