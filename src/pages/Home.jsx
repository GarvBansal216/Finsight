import { Hero as NewHero } from "../components/ui/saa-s-template";
import FeaturesGrid from "../components/home/FeaturesGrid";
import HowItWorks from "../components/home/HowItWork";
import FAQ from "../components/home/FAQ";
import Slider from "../components/home/Slider";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Content */}
      <div className="relative z-10">
        {/* New hero section with dark background */}
        <div className="bg-black">
          <div className="relative">
            {/* Hero Heading */}
            <div className="text-center py-8 px-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">FinSight</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                AI-Powered Financial Intelligence Platform
              </p>
            </div>
            <NewHero />
          </div>
        </div>
        {/* Rest of the sections */}
        <div className="relative min-h-screen bg-black">
          <div className="relative z-10">
            <FeaturesGrid />
            <HowItWorks />
            <Slider />
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
