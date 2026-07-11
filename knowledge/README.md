# 知识库公开边界

- `knowledge/private/sources.json` 是网站 AI 分身允许回答的知识白名单；它只保存在本地并上传至 Cloudflare KV，不进入公开 GitHub 仓库。
- 只有本人已经确认可以被访客通过 AI 问答获知的事实，才能写入该文件。
- 未确认的访谈原稿、补充材料和私人笔记不得混入 `sources.json`，应另行离线保存。
- 家庭与感情隐私、政治观点、第三方隐私、账号密钥和前公司未公开信息不得进入公开知识库。
- 个人访谈内容使用 `sourceType: "self_interview"`，前端显示为“本人自述 · 访谈整理”，不伪装成外部原文链接。
- 更新流程：修改私有来源 → 运行 `knowledge:index` → 上传 `knowledge/private/index.json` 到 KV 键 `knowledge:index:v1` → 重新部署 Worker → 回归测试。

注意：即使知识只存放在 Worker、KV 或 D1 中，只要 AI 被允许据此回答，访客仍可能通过连续提问推断原始内容。因此，存储位置不能替代内容公开审核。
