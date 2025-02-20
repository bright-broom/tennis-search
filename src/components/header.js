'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Tennis Circle
            </Link>
          </motion.div>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              ホーム
            </Link>
            <Link 
              href="/clubs/new"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              サークル登録
            </Link>
            <Link 
              href="/profile"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              プロフィール
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 