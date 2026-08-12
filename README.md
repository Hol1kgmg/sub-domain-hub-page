# sub-domain-hub-page

`hol1kgmg.com` 配下で運用しているサブドメイン一覧を表示するハブページです。各サブドメインをカード形式で表示し、名前・カテゴリ・スクリーンショットからリンク先を確認できます。

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Vite+](https://voidzero.dev) - Vite / Rolldown / Vitest / tsdown / Oxlint / Oxfmt をまとめたツールチェーン (`vp` CLI)
- [Panda CSS](https://panda-css.com) - スタイリング
- [valibot](https://valibot.dev) - データスキーマのバリデーション
- [Storybook](https://storybook.js.org)
- [Cloudflare Pages](https://pages.cloudflare.com) ([OpenNext](https://opennext.js.org) 経由でデプロイ)

## Getting Started

### 開発環境（Nix）

このプロジェクトは [Nix](https://nixos.org) の devShell（`flake.nix`）で `vp` (Vite+) や `gitleaks` などの開発ツールを管理しています。[direnv](https://direnv.net) を導入し、リポジトリ直下で以下を実行してください。

```bash
direnv allow
```

これにより `.envrc`（`use flake`）を通じて devShell が自動的に読み込まれます。direnv を使わない場合は、都度以下で devShell に入ってください。

```bash
nix develop
```

> devShell に入っていない場合、`vp` や pre-commit フックが利用するツールが見つからずコマンドが失敗することがあります。

### インストール・起動

依存関係のインストール:

```bash
vp install
```

開発サーバーの起動:

```bash
vp dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## サブドメインの追加

`src/data/subdomains.json` にエントリを追加します。

```json
{
  "id": "example",
  "name": "Example",
  "url": "https://example.hol1kgmg.com",
  "category": "dev",
  "screenshot": "/screenshots/example.jpg"
}
```

- `category` は `src/data/categories.ts` で定義されている値（`dev` / `tool` / `media`）から選択します。
- `screenshot` は任意で、`public/screenshots/` 配下の画像パスを指定します。
- データは `src/data/subdomains.ts` で valibot によりスキーマ検証されます。

## 主なコマンド

```bash
vp dev          # 開発サーバー起動
vp build        # 本番ビルド
vp check        # フォーマット・lint・型チェック
vp test         # テスト実行
vp run storybook # Storybook 起動
```

## Cloudflare Pages へのデプロイ

```bash
pnpm build:cf    # OpenNext でビルド
pnpm deploy:cf   # ビルド + デプロイ
pnpm preview:cf  # wrangler dev でプレビュー
```
