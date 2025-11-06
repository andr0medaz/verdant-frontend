import HeroSection from "../components/hero/HeroSection";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-4">
      <div className="w-full max-w-md">
        <HeroSection/>

        <FeatureCard />
        <div className="p-4">
          <div className="bg-gray-300 h-32 rounded-2xl"></div>
        </div>
        <div className="p-4">
          <div className="bg-gray-300 h-32 rounded-2xl"></div>
        </div>
      </div>
    </main>
  );
}
