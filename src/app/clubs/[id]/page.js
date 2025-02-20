'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchClubById, joinClub } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Input,
  Textarea,
  useToast,
} from '@/components/ui';

// 定数
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop";

// 初期フォームデータ
const initialJoinFormData = {
  name: '',
  email: '',
  message: '',
};

export default function ClubDetails() {
  // Hooks
  const params = useParams();
  const { toast } = useToast();
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState(initialJoinFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // データ取得
  useEffect(() => {
    const loadClub = async () => {
      try {
        const clubData = await fetchClubById(params.id);
        setClub(clubData);
      } catch (error) {
        console.error('Error loading club:', error);
        toast({
          title: 'エラーが発生しました',
          description: 'サークル情報の取得に失敗しました。',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadClub();
  }, [params.id, toast]);

  // イベントハンドラー
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await joinClub(club.id, joinFormData);
      if (success) {
        toast({
          title: '参加申請を送信しました',
          description: 'サークルからの返信をお待ちください。',
          variant: 'success',
        });
        setIsJoinDialogOpen(false);
        setJoinFormData(initialJoinFormData);
      } else {
        throw new Error('参加申請に失敗しました');
      }
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ローディング表示
  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
      </div>
    );
  }

  // エラー表示
  if (!club) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            サークルが見つかりませんでした
          </h1>
          <p className="text-gray-600">
            指定されたサークルは存在しないか、削除された可能性があります。
          </p>
        </div>
      </div>
    );
  }

  // メインコンテンツ
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* ヘッダー画像 */}
          <div className="relative h-64 md:h-96">
            <Image
              src={club.image || DEFAULT_IMAGE}
              alt={club.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
              {club.name}
            </h1>
          </div>

          {/* サークル情報 */}
          <div className="p-8">
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600">{club.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">基本情報</h2>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">📍 場所:</span>
                  {club.location}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">🎾 コート:</span>
                  {club.court}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">⏰ 活動時間:</span>
                  {club.schedule}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">📈 レベル:</span>
                  {club.level}
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">参加情報</h2>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">👥 メンバー:</span>
                  <span className={club.members >= club.maxMembers ? 'text-red-500' : 'text-green-500'}>
                    {club.members}/{club.maxMembers}人
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">💰 会費:</span>
                  {club.fee}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">🎯 持ち物:</span>
                  {club.requirements}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-600">📧 連絡先:</span>
                  {club.contact}
                </p>
              </div>
            </div>

            {/* 参加申請ボタン */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setIsJoinDialogOpen(true)}
                disabled={club.members >= club.maxMembers}
                variant={club.members >= club.maxMembers ? 'secondary' : 'default'}
              >
                {club.members >= club.maxMembers
                  ? '定員に達しました'
                  : '参加を申請する'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 参加申請モーダル */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>参加申請</DialogTitle>
            <DialogDescription>
              以下のフォームに必要事項を入力して、参加申請を送信してください。
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                お名前
              </label>
              <Input
                id="name"
                value={joinFormData.name}
                onChange={(e) => setJoinFormData({ ...joinFormData, name: e.target.value })}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={joinFormData.email}
                onChange={(e) => setJoinFormData({ ...joinFormData, email: e.target.value })}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                メッセージ
              </label>
              <Textarea
                id="message"
                value={joinFormData.message}
                onChange={(e) => setJoinFormData({ ...joinFormData, message: e.target.value })}
                disabled={isSubmitting}
                placeholder="自己紹介や参加動機をお書きください"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsJoinDialogOpen(false)}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '送信中...' : '申請を送信'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
