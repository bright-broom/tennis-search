'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClubCard from '@/components/ui/club-card';

/**
 * サークルリストコンポーネント
 * @param {Object} props
 * @param {Array<import('../types').Club>} props.initialClubs
 */
export default function ClubList({ initialClubs }) {
  const [clubs] = useState(initialClubs);

  if (!clubs || clubs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            サークルが見つかりませんでした
          </h3>
          <p className="text-gray-600">
            検索条件を変更して、再度お試しください。
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {clubs.map((club) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ClubCard club={club} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 