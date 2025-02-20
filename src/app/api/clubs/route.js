import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// APIルートの設定
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * サークル一覧を取得
 */
export async function GET() {
  try {
    const clubs = await prisma.club.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { joinRequests: true },
        },
      },
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error in GET /api/clubs:', error);
    return NextResponse.json(
      { error: 'サークル情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * サークルを登録
 * @param {Request} request
 */
export async function POST(request) {
  try {
    const data = await request.json();

    // メールアドレス（contact）のみ必須
    if (!data.contact) {
      return NextResponse.json(
        { error: 'メールアドレスは必須です' },
        { status: 400 }
      );
    }

    // デフォルト値の設定
    const clubData = {
      name: data.name || '未設定',
      image: data.image || '',
      description: data.description || '説明なし',
      location: data.location || '未設定',
      court: data.court || '未設定',
      schedule: data.schedule || '未設定',
      level: data.level || '未設定',
      members: data.members ?? 0,
      maxMembers: data.maxMembers ?? 10,
      fee: data.fee || '未設定',
      requirements: data.requirements || 'なし',
      contact: data.contact,
    };

    // データベースに登録
    const club = await prisma.club.create({ data: clubData });

    return NextResponse.json(club, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/clubs:', error);
    return NextResponse.json(
      { error: 'サークルの登録に失敗しました' },
      { status: 500 }
    );
  }
}
