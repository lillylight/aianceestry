import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const counterPath = path.join(process.cwd(), 'counter.json');

// Initialize counter file if it doesn't exist
async function initializeCounter() {
  try {
    await fs.access(counterPath);
  } catch {
    await fs.writeFile(counterPath, JSON.stringify({ count: 0 }));
  }
}

export async function GET() {
  await initializeCounter();
  const data = await fs.readFile(counterPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST() {
  await initializeCounter();
  const data = JSON.parse(await fs.readFile(counterPath, 'utf-8'));
  data.count += 1;
  await fs.writeFile(counterPath, JSON.stringify(data));
  return NextResponse.json(data);
}
