import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://kick.com/api/v1/channels/kingchief/videos?sort=latest');
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch Kick VODs' }, { status: 500 });
    }
    const json = await res.json();
    return NextResponse.json(json.videos || []);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
