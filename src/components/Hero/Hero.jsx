import HeroContent from "../Hero/HeroContent";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-white px-4 sm:px-6">
      <div className="max-w-5xl w-full">
        <HeroContent />
      </div>
    </section>
  );
}
