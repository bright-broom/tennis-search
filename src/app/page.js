import ClubList from '@/components/club-list';
import { SearchFilter } from '@/components/search-filter';
import { fetchClubs } from '@/lib/api';

export default async function Home() {
  const clubs = await fetchClubs();

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="mb-4 text-4xl font-bold text-center text-foreground">
            テニスサークルを見つけよう
          </h1>
          <p className="max-w-2xl text-lg text-center text-muted-foreground">
            あなたにぴったりのテニスサークルを見つけましょう。
            初心者から上級者まで、様々なレベルのサークルが見つかります。
          </p>
        </div>

        <SearchFilter />
        
        <div className="mt-8">
          <ClubList initialClubs={clubs} />
        </div>
      </main>
    </div>
  );
}
