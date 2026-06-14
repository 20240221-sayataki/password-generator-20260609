'use client';

import { useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    number: true,
    symbol: true,
  });
  const [length, setLength] = useState(16);
  const [history, setHistory] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);

  const [excludeChars, setExcludeChars] = useState('');

  const toggleOption = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const generatePassword = () => {
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

    // 除外文字を取り除く
    if (excludeChars) {
      chars = chars.split('').filter((c) => !excludeChars.includes(c)).join('');
    }

    if (chars === '') {
      alert('少なくとも1つは文字種を選択してください');
      return;
    }

    if (chars === '') {
      alert('少なくとも1つは文字種を選択してください');
      return;
    }

  const results: string[] = [];
  for (let j = 0; j < count; j++) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    results.push(result);
  }

  setPasswords(results);
  setPassword(results[0]);
  setHistory([...results, ...history].slice(0, 5));
  setCopied(false);
};

  const getStrength = () => {
    const typeCount = Object.values(options).filter(Boolean).length;

    if (typeCount >= 3 && length >= 12) return '強';
    if (typeCount >= 2 && length >= 8) return '中';
    return '弱';
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">パスワード生成ツール</h1>

        <div className="mb-4">
          <label className="flex justify-between mb-1">
            <span>文字数</span>
            <span>{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="flex justify-between mb-1">
            <span>生成件数</span>
            <span>{count}件</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">除外文字</label>
          <input
            type="text"
            value={excludeChars}
            onChange={(e) => setExcludeChars(e.target.value)}
            placeholder="例: 0O1lI"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="mb-4 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.upper}
              onChange={() => toggleOption('upper')}
            />
            大文字 (A-Z)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.lower}
              onChange={() => toggleOption('lower')}
            />
            小文字 (a-z)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.number}
              onChange={() => toggleOption('number')}
            />
            数字 (0-9)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.symbol}
              onChange={() => toggleOption('symbol')}
            />
            記号 (!@#$...)
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4"
        >
          パスワードを生成する
        </button>

        {passwords.length > 0 && (
          <div className="mt-4">
            <ul className="space-y-2">
              {passwords.map((pw, index) => (
                <li
                  key={index}
                  className="bg-gray-100 rounded-lg p-3 text-center font-mono text-lg break-all"
                >
                  {pw}
                </li>
              ))}
            </ul>
            <button
              onClick={copyToClipboard}
              className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              {copied ? 'コピーしました！' : '1件目をコピー'}
            </button>
            <div className="mt-2 text-center font-semibold">
              強度：{getStrength()}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">生成履歴</h2>
            <ul className="space-y-1">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 rounded p-2 text-sm font-mono break-all"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}