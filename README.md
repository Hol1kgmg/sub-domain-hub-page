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

### 前提条件

[Nix](https://nixos.org/)（Flakes 有効）と [direnv](https://direnv.net/) がインストールされ、シェルに統合されていること。

macOS (Homebrew):

```bash
brew install nix direnv
```

Flakes の有効化:

```bash
mkdir -p ~/.config/nix
echo 'experimental-features = nix-command flakes' >> ~/.config/nix/nix.conf
```

シェル統合 (zsh):

```bash
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### 開発環境（Nix）

リポジトリ直下で以下を実行すると、ツールのインストールと Git フックの設定が一括で行われます。以降はディレクトリに入るだけで環境が有効になります。

```bash
direnv allow
```

`direnv` が `flake.nix` の devShell を読み込み、次のツールが PATH に入ります。

| ツール | 用途 |
|---|---|
| vp | Vite+ CLI（`web/` の開発・ビルド・テスト） |
| just | タスクランナー（[justfile](justfile)） |
| gitleaks / lefthook | pre-commit でステージ済みの差分をシークレット走査する（[lefthook.yaml](lefthook.yaml)） |
| gh / gh-dash | GitHub 操作 |
| actionlint / ghalint / pinact | GitHub Actions の検証と SHA pin |
| markserv | `just docs` で Markdown を http://localhost:8080 に配信する |

エージェント用スキルは `skills.nix` の宣言から devShell 起動時に `.agents/skills` へ同期されます
（`just skills` / `just skills-list` / `just skills-update`）。独自スキルは [skills/](skills/) に置きます。
エージェント用のルール（`.claude/rules/*.md`）も同じ流儀で、`rules.nix` の宣言から `.agents/rules` へ同期されます
（`just rules` / `just rules-list` / `just rules-update`、取得元は [registry/rules/](registry/rules/)）。独自ルールは [rules/](rules/) に置きます。

> devShell に入っていない場合、`vp` や pre-commit フックが利用するツールが見つからずコマンドが失敗することがあります。

### インストール・起動

アプリ本体は `web/` 配下にあります。以降のコマンドは `web/` で実行してください。

```bash
cd web
```

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

`web/src/data/subdomains.json` にエントリを追加します。

```json
{
  "id": "example",
  "name": "Example",
  "url": "https://example.hol1kgmg.com",
  "category": "dev",
  "screenshot": "/screenshots/example.jpg"
}
```

- `category` は `web/src/data/categories.ts` で定義されている値（`dev` / `tool` / `media`）から選択します。
- `screenshot` は任意で、`web/public/screenshots/` 配下の画像パスを指定します。
- データは `web/src/data/subdomains.ts` で valibot によりスキーマ検証されます。

## 主なコマンド

`web/` で実行します。

```bash
vp dev          # 開発サーバー起動
vp build        # 本番ビルド
vp check        # フォーマット・lint・型チェック
vp test         # テスト実行
vp run storybook # Storybook 起動
```

## Cloudflare Pages へのデプロイ

Cloudflare Pages のビルド設定では「ルートディレクトリ」を `web` にしてください。ローカルからは `web/` で以下を実行します。

```bash
pnpm build:cf    # OpenNext でビルド
pnpm deploy:cf   # ビルド + デプロイ
pnpm preview:cf  # wrangler dev でプレビュー
```

## テンプレート同期

リポジトリ構成は [claude-temp](https://github.com/Hol1kgmg/claude-temp) をテンプレート元としています。テンプレート元の変更と lockfile の更新は、必要なときに手動で取り込みます。

```bash
just sync      # テンプレート元の変更を取り込む
just update    # flake.lock / sources.lock.json を更新して検証する
```

`just sync` はマージコミットで取り込みます。PR 経由にする場合も **Create a merge commit** を使ってください（squash / rebase は共通祖先を壊します）。

- 設計判断の記録: [adr/](adr/)
