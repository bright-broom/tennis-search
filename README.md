#### **📄 `README.md`**
```markdown
# 🎾 テニスサークル検索アプリ（Next.js + Prisma + MySQL）

## 📌 プロジェクト概要
本プロジェクトは **Next.js (App Router) + Prisma + MySQL** を使用した **テニスサークル検索アプリ** です。  
ユーザーはサークルを検索し、詳細情報を閲覧し、参加申請が可能です。  
**バックエンドは Next.js API Routes、データベースは MySQL を使用。**

---

## 🏗️ 技術スタック
| 分類         | 使用技術 |
|-------------|------------------------------------------------|
| **フロントエンド** | Next.js 14 (App Router), React, Tailwind CSS |
| **バックエンド** | Next.js API Routes, Prisma ORM |
| **データベース** | MySQL (PlanetScale / Local MySQL) |
| **認証** | NextAuth.js (今後実装予定) |
| **デプロイ** | Vercel (フロント), PlanetScale (DB) |

---

## 🚀 環境構築 & セットアップ

### **1️⃣ リポジトリをクローン**
```sh
git clone https://github.com/your-username/tennis-search.git
cd tennis-search
```

### **2️⃣ 必要なパッケージをインストール**
```sh
npm install
```

### **3️⃣ `.env` を作成**
```sh
cp .env.example .env
```
⬇️ **`.env` の `DATABASE_URL` を設定**（MySQL の接続情報）
```plaintext
DATABASE_URL="mysql://root@localhost:3306/tennis_search"
```

### **4️⃣ Prisma のセットアップ**
```sh
npx prisma generate
npx prisma migrate dev --name init
```
🔹 `npx prisma studio` でデータベースを GUI で確認可能。

### **5️⃣ Next.js を起動**
```sh
npm run dev
```
🔹 **`http://localhost:3000` でアプリが動作することを確認！**

---

## 🗂️ ディレクトリ構成
```plaintext
.
├── prisma              # Prismaスキーマ & マイグレーション
│   ├── schema.prisma   # データベース構造の定義
│   ├── migrations      # マイグレーション履歴
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── clubs     # サークル関連API (GET, POST)
│   │   │   │   ├── route.js
│   │   ├── clubs        # サークル詳細ページ
│   │   │   ├── [id]
│   │   │   │   └── page.js
│   │   │   ├── new
│   │   │   │   └── page.js
│   │   ├── profile      # ユーザープロフィールページ
│   │   ├── layout.js    # 全体レイアウト
│   │   ├── page.js      # トップページ
│   ├── components      # UI コンポーネント
│   ├── lib             # ユーティリティ関数, Prismaクライアント
│   │   ├── prisma.js   # Prisma インスタンス
│   │   ├── api.js      # API 呼び出し用関数
│   ├── styles          # Tailwind CSS
├── .env                # 環境変数
├── next.config.js      # Next.js の設定
├── package.json        # 依存パッケージ一覧
└── README.md           # 本ファイル
```

---

## 🔌 API 仕様

### **📌 `GET /api/clubs`**
**📍 概要:** サークル一覧を取得  
**📤 リクエスト:** なし  
**📥 レスポンス:**
```json
[
  {
    "id": 1,
    "name": "テニスサークルA",
    "location": "東京",
    "level": "中級",
    "maxMembers": 20,
    "contact": "example@example.com",
    "createdAt": "2024-02-21T12:00:00.000Z"
  }
]
```

### **📌 `POST /api/clubs`**
**📍 概要:** サークルを登録  
**📤 リクエストボディ (JSON)**
```json
{
  "name": "テニスサークルB",
  "location": "大阪",
  "level": "初級",
  "contact": "example@example.com"
}
```
🔹 `contact`（メールアドレス）のみ必須、他は未入力でもデフォルト値で登録。

---

## 🛠️ Prisma スキーマ
```prisma
model Club {
  id           Int      @id @default(autoincrement())
  name         String
  image        String?
  description  String?
  location     String
  court        String?
  schedule     String?
  level        String
  members      Int      @default(0)
  maxMembers   Int      @default(10)
  fee          String?
  requirements String?
  contact      String   @unique
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## 🔄 今後の開発予定
- [ ] **`PUT /api/clubs/[id]`**（サークル情報の更新機能）
- [ ] **ユーザー認証（NextAuth.js）**
- [ ] **サークル参加申請機能**
- [ ] **検索フィルター（地域・レベル）**
- [ ] **デプロイ（Vercel / PlanetScale）**

---

## 🚀 よく使うコマンド
```sh
# MySQL 起動 & 再起動
brew services start mysql
brew services restart mysql

# Prisma のスキーマ適用 & クライアント生成
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio  # GUI で DB 管理

# Next.js を起動
npm run dev
```
