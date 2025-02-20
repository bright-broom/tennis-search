'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TENNIS_LEVELS } from '@/types';

export function SearchFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (key, value) => {
    replace(`${pathname}?${createQueryString(key, value)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">検索フィルター</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
            キーワード
          </label>
          <Input
            id="keyword"
            type="text"
            placeholder="サークル名や活動場所で検索"
            defaultValue={searchParams.get('keyword') ?? ''}
            onChange={(e) => handleSearch('keyword', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            レベル
          </label>
          <select
            id="level"
            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            defaultValue={searchParams.get('level') ?? ''}
            onChange={(e) => handleSearch('level', e.target.value)}
          >
            <option value="">全てのレベル</option>
            {Object.entries(TENNIS_LEVELS).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
            空き状況
          </label>
          <select
            id="availability"
            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            defaultValue={searchParams.get('availability') ?? ''}
            onChange={(e) => handleSearch('availability', e.target.value)}
          >
            <option value="">全ての空き状況</option>
            <option value="available">空きあり</option>
            <option value="full">満員</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => {
            replace(pathname);
          }}
        >
          フィルターをリセット
        </Button>
      </div>
    </div>
  );
} 