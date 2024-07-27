import { Button } from "./_components/ui/button";


export default async function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="flex w-1/2 mx-auto flex-col items-center justify-center space-y-4">
        <h1 className="text-center text-6xl font-serif font-bold">Buy Archival Art from Museums Across the Country</h1>
        <Button>Shop</Button>
      </div>
    </main>
  );
};
