import Link from "next/link";
import { Button } from "./_components/ui/button";
import HeroImage from "./assets/museum-hero.jpg";

export default async function Home() {
  return (
    <main className="flex max-h-[90vh] items-center">
      <img src={HeroImage.src} className="w-1/4 rounded-xl ml-32 mt-20" />
      <div className="mx-auto flex w-1/2 flex-col items-center justify-center space-y-4">
        <h1 className="text-center font-serif text-6xl font-bold">
          Buy Archival Art from Museums Across the Country
        </h1>
        <Link href="/shop">
          <Button>Shop</Button>
        </Link>
      </div>
    </main>
  );
}
