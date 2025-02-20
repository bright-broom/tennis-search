'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormField from '@/components/ui/form-field';
import { TENNIS_LEVELS } from '@/types';
import { createClub, uploadImage } from '@/lib/api';

// バリデーションスキーマ
const clubSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  court: z.string(),
  schedule: z.string(),
  level: z.string(),
  fee: z.string(),
  requirements: z.string(),
  contact: z.string().email('有効なメールアドレスを入力してください'),
});

export default function ClubForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      court: '',
      schedule: '',
      level: TENNIS_LEVELS.BEGINNER,
      members: 0,
      maxMembers: 10,
      fee: '',
      requirements: '',
      contact: '',
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const { url } = await uploadImage(file);
      setImagePreview(url);
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      setError('image', {
        type: 'manual',
        message: '画像のアップロードに失敗しました',
      });
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createClub({
        ...data,
        image: imagePreview,
      });
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('登録エラー:', error);
      setError('root', {
        type: 'manual',
        message: 'サークルの登録に失敗しました',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h1 className="text-3xl font-bold mb-8">サークルを登録する</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="name"
            label="サークル名"
            register={register}
            error={errors.name?.message}
            disabled={isSubmitting}
          />

          <div className="space-y-2">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
              サークル画像
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              disabled={isSubmitting}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="プレビュー"
                className="mt-2 w-full h-40 object-cover rounded-md"
              />
            )}
            {errors.image?.message && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <FormField
              id="description"
              label="サークル説明"
              type="textarea"
              register={register}
              error={errors.description?.message}
              disabled={isSubmitting}
            />
          </div>

          <FormField
            id="location"
            label="活動場所"
            register={register}
            error={errors.location?.message}
            disabled={isSubmitting}
          />

          <FormField
            id="court"
            label="使用コート"
            register={register}
            error={errors.court?.message}
            disabled={isSubmitting}
          />

          <FormField
            id="schedule"
            label="活動時間"
            register={register}
            error={errors.schedule?.message}
            disabled={isSubmitting}
            placeholder="例: 毎週土曜日 9:00-12:00"
          />

          <div className="space-y-2">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              レベル
            </label>
            <select
              id="level"
              className="w-full p-2 border rounded-md"
              disabled={isSubmitting}
              {...register('level')}
            >
              {Object.entries(TENNIS_LEVELS).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {errors.level?.message && (
              <p className="text-sm text-red-500">{errors.level.message}</p>
            )}
          </div>

          <FormField
            id="members"
            label="現在の会員数"
            type="number"
            register={register}
            error={errors.members?.message}
            disabled={isSubmitting}
          />

          <FormField
            id="maxMembers"
            label="最大会員数"
            type="number"
            register={register}
            error={errors.maxMembers?.message}
            disabled={isSubmitting}
          />

          <FormField
            id="fee"
            label="会費"
            register={register}
            error={errors.fee?.message}
            disabled={isSubmitting}
            placeholder="例: 月額3,000円"
          />

          <FormField
            id="requirements"
            label="持ち物"
            register={register}
            error={errors.requirements?.message}
            disabled={isSubmitting}
            placeholder="例: テニスラケット、テニスシューズ"
          />

          <div className="md:col-span-2">
            <FormField
              id="contact"
              label="連絡先"
              type="email"
              register={register}
              error={errors.contact?.message}
              disabled={isSubmitting}
              placeholder="example@tennis-circle.com"
            />
          </div>
        </div>

        {errors.root?.message && (
          <div className="text-center text-red-500">
            {errors.root.message}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              bg-blue-600 text-white py-3 px-8 rounded-md transition-colors duration-200
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
            `}
          >
            {isSubmitting ? '登録中...' : 'サークルを登録する'}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 