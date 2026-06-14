import { NextRequest, NextResponse } from 'next/server';

type Options = {
  upper: boolean;
  lower: boolean;
  number: boolean;
  symbol: boolean;
};

export async function POST(req: NextRequest) {
  const { length, count, options, excludeChars } = await req.json();

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

  if (excludeChars) {
    chars = chars.split('').filter((c) => !excludeChars.includes(c)).join('');
  }

  if (chars === '') {
    return NextResponse.json(
      { error: '少なくとも1つは文字種を選択してください' },
      { status: 400 }
    );
  }

  const results: string[] = [];
  for (let j = 0; j < count; j++) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    results.push(result);
  }

  return NextResponse.json({ passwords: results });
}