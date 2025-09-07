# Erfaring

## 環境構築

1. リポジトリをクローン
```bash
git clone git@github.com:u5u5u5u/erfaring.git
```

2. プロジェクトディレクトリへ移動
```bash
cd erfaring
```

3. 依存パッケージをインストール
```bash
npm install
```

4. 開発サーバーを起動
```bash
npm run dev
```

## ブランチ運用・命名規則

- `main` : 本番リリース用ブランチ
- `develop` : 開発統合用ブランチ
- 機能追加: `feature/xxxx`（例: `feature/login-page`）
- 機能更新: `update/xxxx`（例: `update/user-profile`）
- 修正: `fix/xxxx`（例: `fix/button-color`）

## 開発フロー

1. `develop` ブランチから作業用ブランチを作成

```bash
git switch develop
```

```bash
git pull origin develop
```

```bash
git switch -c your-branch-name
```

2. 作業後、コミット＆リモートへプッシュ

```bash
git add .
```

```bash
git commit -m "feat: 〇〇機能追加"
```

```bash
git push origin your-branch-name
```

3. GitHub 上で `develop` へ Pull Request（PR）を作成
4. レビュー・動作確認後、`develop`へマージ

## コミットメッセージ規則

- `feat`: 新機能の追加
- `update`: 既存機能の更新
- `delete`: 機能の削除
- `fix`: バグ修正
