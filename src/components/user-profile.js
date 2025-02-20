'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userData, setUserData] = useState({
    name: "山田太郎",
    email: "yamada@example.com",
    avatar: "",
    level: "中級",
    playYears: 3,
    favoriteShot: "フォアハンド",
    bio: "週末にテニスを楽しんでいます。技術向上に意欲的です。"
  });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('アップロードに失敗しました');

      const data = await response.json();
      setUserData(prev => ({ ...prev, avatar: data.url }));
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      alert('画像のアップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 実際のアプリケーションでは、ここでAPIを呼び出してデータを更新します
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">プロフィール</h1>
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "キャンセル" : "編集"}
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 mb-4">
          {userData.avatar ? (
            <Image
              src={userData.avatar}
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-500">
                {userData.name.charAt(0)}
              </span>
            </div>
          )}
          {isEditing && (
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>プロフィール画像を編集</title>
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
        {isUploading && <p className="text-sm text-gray-500">アップロード中...</p>}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <input
              id="name"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              テニスレベル
            </label>
            <select
              id="level"
              value={userData.level}
              onChange={(e) => setUserData({ ...userData, level: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="初級">初級</option>
              <option value="中級">中級</option>
              <option value="上級">上級</option>
            </select>
          </div>

          <div>
            <label htmlFor="playYears" className="block text-sm font-medium text-gray-700 mb-1">
              テニス歴
            </label>
            <input
              id="playYears"
              type="number"
              value={userData.playYears}
              onChange={(e) => setUserData({ ...userData, playYears: Number.parseInt(e.target.value, 10) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="favoriteShot" className="block text-sm font-medium text-gray-700 mb-1">
              得意なショット
            </label>
            <input
              id="favoriteShot"
              type="text"
              value={userData.favoriteShot}
              onChange={(e) => setUserData({ ...userData, favoriteShot: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              自己紹介
            </label>
            <textarea
              id="bio"
              value={userData.bio}
              onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
              rows={4}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            保存
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <span className="text-gray-600">👤 名前:</span>
                {userData.name}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-600">📧 メール:</span>
                {userData.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-600">📈 レベル:</span>
                {userData.level}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-600">⏳ テニス歴:</span>
                {userData.playYears}年
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-600">🎾 得意なショット:</span>
                {userData.favoriteShot}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">自己紹介</h2>
            <p className="text-gray-600">{userData.bio}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
} 