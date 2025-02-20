import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * サークル詳細を取得
 * @param {Request} request
 * @param {{ params: { id: string } }} context
 */
export async function GET(request, { params }) {
  try {
    const club = await prisma.club.findUnique({
      where: {
        id: Number.parseInt(params.id, 10),
      },
      include: {
        joinRequests: true,
        _count: {
          select: {
            joinRequests: true,
          },
        },
      },
    });

    if (!club) {
      return NextResponse.json(
        { error: 'サークルが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(club);
  } catch (error) {
    console.error('Error in GET /api/clubs/[id]:', error);
    return NextResponse.json(
      { error: 'サークル情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

/**
 * サークルに参加申請
 * @param {Request} request
 * @param {{ params: { id: string } }} context
 */
export async function POST(request, { params }) {
  try {
    const data = await request.json();
    
    // バリデーション
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // ユーザーの取得または作成
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        name: data.name,
        email: data.email,
        level: 'BEGINNER',
        playYears: 0,
      },
    });

    // 参加申請の作成
    const joinRequest = await prisma.joinRequest.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message || '',
        clubId: Number.parseInt(params.id, 10),
        userId: user.id,
      },
    });

    return NextResponse.json(joinRequest, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/clubs/[id]:', error);
    return NextResponse.json(
      { error: '参加申請に失敗しました' },
      { status: 500 }
    );
  }
} 