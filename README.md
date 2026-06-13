# パスワード生成ツール

Next.js + Tailwind CSSで作成したパスワード生成ツール。

## 機能

- パスワード生成（クリックでランダム生成）
- クリップボードへのコピー
- 文字種のオン/オフ（大文字・小文字・数字・記号）
- 文字数のスライダー調整（4〜32文字）
- パスワード強度の表示（弱・中・強）

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16.2.7（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| Node.js | v24.16.0 |

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` で起動します。

## ディレクトリ構成

```
password-generator/
├── app/
│   ├── page.tsx        ← メインのアプリ画面
│   ├── layout.tsx      ← 全ページ共通のレイアウト
│   └── globals.css     ← グローバルCSS
├── public/             ← 静的ファイル置き場
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

AppRouterでは `app/` フォルダ内の構造がそのままURLになる。

## 実装の概要

### state管理

```tsx
const [password, setPassword] = useState('');       // 生成されたパスワード
const [copied, setCopied] = useState(false);        // コピー済みフラグ
const [length, setLength] = useState(16);           // パスワードの文字数
const [options, setOptions] = useState({            // 使用する文字種
  upper: true,
  lower: true,
  number: true,
  symbol: true,
});
```

### パスワード生成ロジック

`options`で選択された文字種だけを組み合わせて文字セットを作成し、`length`で指定された文字数分ランダムに抽出する。

```tsx
const charSets = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  number: '0123456789',
  symbol: '!@#$%^&*',
};

let chars = '';
if (options.upper) chars += charSets.upper;
if (options.lower) chars += charSets.lower;
if (options.number) chars += charSets.number;
if (options.symbol) chars += charSets.symbol;
```

全文字種がオフの場合はアラートを表示して処理を中断する。

### 強度判定ロジック

選択された文字種の数と文字数から「弱・中・強」を判定する。

```tsx
const getStrength = () => {
  const typeCount = Object.values(options).filter(Boolean).length;

  if (typeCount >= 3 && length >= 12) return '強';
  if (typeCount >= 2 && length >= 8) return '中';
  return '弱';
};
```

### クリップボードコピー

`navigator.clipboard.writeText()`でコピーし、2秒間「コピーしました！」を表示する。

```tsx
const copyToClipboard = () => {
  navigator.clipboard.writeText(password);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
```

## 今後の拡張予定

- 生成履歴の表示
- 複数パスワードの一括生成
- 除外文字の指定（`0`と`O`など）
- ユーザー認証・DB連携
- デプロイ（Vercel）