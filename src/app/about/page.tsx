import AboutHero from '../assets/museum-about-hero.jpg';

export default async function Home() {
  return (
    <main className="flex max-h-[90vh] items-center">
      <img src={AboutHero.src} className="w-1/4 rounded-xl ml-32 mt-20" />
      <div className="mx-auto flex w-1/2 flex-col items-center justify-center space-y-4">
        <h1 className="text-center font-serif text-6xl font-bold">
          Welcome to Salad!
        </h1>
        <p>
        We believe that art should be accessible to everyone. Our goal is to bring
        stunning public artwork from museums right to your home.
        </p>
        <h4 className="text-xl">What We Offer</h4>
        <p>
          We partner with museums to use their best pieces to offer beautiful
          canvas prints of their most popular pieces. With our profit sharing
          model, we ensure that we can continue to all profit while making
          amazing art accessible.
        </p>
      </div>
    </main>
  );
}
