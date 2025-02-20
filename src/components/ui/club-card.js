'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

/**
 * サークルカードコンポーネント
 * @param {Object} props
 * @param {import('../../types').Club} props.club
 */
export default function ClubCard({ club }) {
  const defaultImage = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop";
  const isFull = club.members >= club.maxMembers;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-48">
        <Image
          src={club.image || defaultImage}
          alt={club.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-semibold text-white mb-1">{club.name}</h2>
          <p className="text-white/90 text-sm flex items-center gap-1">
            📍 {club.location}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant={isFull ? 'destructive' : 'default'}>
            {isFull ? '満員' : '募集中'}
          </Badge>
          <Badge variant="outline">{club.level}</Badge>
          <Badge variant="secondary">
            👥 {club.members}/{club.maxMembers}人
          </Badge>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {club.description}
        </p>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2">
            <span>⏰</span>
            {club.schedule}
          </p>
          <p className="flex items-center gap-2">
            <span>💰</span>
            {club.fee}
          </p>
        </div>
        <Link 
          href={`/clubs/${club.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          詳細を見る
        </Link>
      </div>
    </motion.div>
  );
} 