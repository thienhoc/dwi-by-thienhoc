<p align="center">
  <img src="assets/brand/readme-flow.svg" width="960" alt="Dwi 工作流：六条模块路径经过人本层后汇聚为受控操作">
</p>

<h1 align="center">面向 AI 智能体的人本层</h1>

<p align="center">一个模块化的人本层，用于减少过度规划、Token 浪费、上下文丢失，以及在权限不明确时执行操作。</p>

<p align="center"><strong>Research Preview 0.2.0</strong> · 最新已审核仓库版本：v0.2.2 · 6 个专用模块 + 1 个可选 All-in-One</p>

<p align="center"><a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.fr.md">Français</a> · <a href="README.hi.md">हिन्दी</a></p>

> **许可：**代码和可安装模块采用 Apache-2.0；文档与仓库原创资源采用 CC BY 4.0。品牌使用请遵循 [TRADEMARKS.md](TRADEMARKS.md)。

## Dwi 是什么

AI 编程工具负责控制工具权限。Dwi 补充工作流中经常被默认处理的人类控制层：真实意图、允许修改的范围、适度的工作量、写入权限，以及支持结论的证据。

Dwi 不是新的运行时、守护进程或 MCP 服务器。每个模块都可以独立检查、安装和移除。

## 从你遇到的问题开始

| 当前情况 | 建议模块 | 主要作用 |
| --- | --- | --- |
| 智能体的问题冗长或难以回答 | Dwi • Conduct | 解释术语并提供安全默认选项 |
| 小任务演变成庞大计划 | Dwi • Lean | 找到足够完成任务的最小路径 |
| Token 或时间使用不透明 | Dwi • Budget | 设置资源边界，只报告可观察的使用情况 |
| Claude 与 Codex 需要协作 | Dwi • Bridge | 区分建议、权限、影响与证据 |
| 多个智能体需要共同结构 | Dwi • Arc | 限定工作单元，并确保每个范围只有一个写入者 |
| 结论听起来确定，但证据不清楚 | Dwi • Evidence | 区分已验证、已观察、估算、目标和未知 |
| 多类问题在同一工作流中反复出现 | Dwi • All-in-One | 只组合与当前问题相关的 Dwi 视角 |

## 安全试用

1. 只选择一个模块。
2. 安装前阅读对应的 `SKILL.md` 和英文模块指南。
3. 先在项目范围内、可回滚且没有秘密信息或外部副作用的任务上试用。
4. 明确调用模块，并与日常工作流比较。
5. 如果没有帮助，直接删除模块目录。

完整安装命令、安全说明、架构和证据政策目前以[英文 README](README.md)和[越南文 README](README.vi.md)为准。命令、路径、哈希和模块名称应保持原样，不要翻译。

## 状态

- 模块内容 Research Preview 基线：`0.2.0`
- 最新已审核仓库版本：`v0.2.2`
- 本补丁：修复 Codex 与 Claude Code 的仅显式调用安装契约
- 标准模块正文与 SHA-256：相较 `v0.2.0` 无变化
- 可安装内容：6 个专用模块 + 可选 All-in-One
- 精确安装命令以英文或越南文文档为准

联系：[hoc@wi.works](mailto:hoc@wi.works)
