# CHANGELOG

## [2024-02-21] Next.js + Prisma + MySQL セットアップ & デバッグ

### ✅ 1. MySQL のセットアップ & Prisma の接続設定
#### 🔹 MySQL のセットアップ
- `brew services start mysql` で MySQL を起動
- `mysql -u root -p` でログイン確認
- `.env` に `DATABASE_URL="mysql://root@localhost:3306/tennis_search"` を設定（パスワードなし）
- `SHOW DATABASES;` で `tennis_search` が存在することを確認
- なければ `CREATE DATABASE tennis_search;` で作成

#### 🔹 Prisma の設定
- `prisma/schema.prisma` を作成
- `npx prisma generate` で Prisma クライアント生成
- `npx prisma migrate dev --name init` でデータベースにスキーマを適用

---

### ✅ 2. Next.js の API 修正（`POST /api/clubs`）
#### 🔹 エラー修正:
**エラー: `Argument maxMembers is missing.`**
- `POST /api/clubs` で `maxMembers` がないとエラーになる問題を修正
- `maxMembers` のデフォルト値を `10` に設定して解決

#### 🔹 改善:
- メールアドレス (`contact`) **以外は未入力でも登録可能** に変更
- `name`, `location` などのデフォルト値を設定
- `prisma.club.create()` の前に `clubData` を定義し、コードを整理

#### 🔹 最終コード:
- `src/app/api/clubs/route.js` に適用
- `POST` リクエストのバリデーションを強化

---

### ✅ 3. Next.js & Prisma のデバッグ
#### 🔹 エラー解決:
- **MySQL が起動していない (`Can't connect to MySQL server`)**
  - `brew services restart mysql` で解決
- **`P1000: Authentication failed`**
  - `.env` の `DATABASE_URL` から `password@` を削除して解決
- **`ENOENT: no such file or directory, stat '/tmp/mysql.sock'`**
  - `brew services restart mysql` & `rm -rf /opt/homebrew/var/mysql && brew postinstall mysql` で修正

#### 🔹 Next.js のデータ取得:
- `GET /api/clubs` でサークル一覧を取得
- `http://localhost:3000/api/clubs` でレスポンスを確認

---

### ✅ 4. 明日の作業予定
1. **フロントエンド側のフォーム (`club-form.js`) を修正**
   - `maxMembers` をユーザーが設定できるようにする
   - 必須項目（`contact`）のバリデーションをフロント側にも追加
2. **API (`PUT /api/clubs/[id]`) の実装**
   - サークル情報の更新機能を追加
3. **テストデータの作成**
   - MySQL にサークルデータを登録して動作確認
4. **エラー処理の改善**
   - Prisma のエラーハンドリングを強化
   - クライアント側のエラーメッセージを改善

---

## **🚀 まとめ**
✅ **Next.js + Prisma + MySQL のセットアップ完了**  
✅ **`POST /api/clubs` でメールアドレス以外未入力でも登録可能に修正**  
✅ **エラーハンドリング & デフォルト値設定で可読性向上**  
✅ **明日はフロントエンドの修正 & サークル情報の更新機能を実装！**

---

### **📌 コマンドリスト（明日使うかも）**
```sh
# MySQL 起動 & 再起動
brew services start mysql
brew services restart mysql

# Prisma のスキーマ適用 & クライアント生成
npx prisma generate
npx prisma migrate dev --name init

# Next.js の再起動
npm run dev
