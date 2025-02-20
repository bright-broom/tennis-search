'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tennis Circle</h3>
            <p className="text-sm text-gray-600">
              テニスサークルを探して、新しい仲間と一緒にテニスを楽しみましょう。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link 
                  href="/clubs/new"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  サークル登録
                </Link>
              </li>
              <li>
                <Link 
                  href="/profile"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  プロフィール
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <p className="text-sm text-gray-600 mb-2">
              ご質問やご要望がございましたら、お気軽にお問い合わせください。
            </p>
            <a 
              href="mailto:contact@tennis-circle.example.com"
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              contact@tennis-circle.example.com
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Tennis Circle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 