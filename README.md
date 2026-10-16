# 手机性能排行 · 站点

本仓库只承载静态站点（`web/`）。数据由私有源仓库定时同步后推送过来，
推送到 `main` 时由 `.github/workflows/deploy-pages.yml` 自动发布到 GitHub Pages。

同步时间见 `web/data/meta.json` 的 `syncedAtText`。
