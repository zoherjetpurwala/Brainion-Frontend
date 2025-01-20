import { Button } from "../ui/button";

const HeroComponent = () => {
  return (
    <div className="flex flex-col gap-20 items-center px-6 pb-12 lg:pb-16 pt-32 lg:gap-8 md:pt-40 lg:pt-52">
      {/* Announcement Banner */}
      <div className="relative flex text-sm space-x-2 items-center z-10 rounded-full bg-white py-0.5 px-4 ring-1 ring-blue-800/25">
        <span className="px-1 py-1">🚀 Brainion Beta – Ready to Use Now!</span>
      </div>

      {/* Main Heading and Description */}
      <div className="flex flex-col w-full max-w-6xl justify-center items-center gap-8">
        <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold tracking-[-0.020em] text-center text-blue-900">
          <span className="text-blue-800/35">The</span> AI-powered Brain Companion
          <span className="text-blue-800/35"> for storing your ideas </span>
          <br className="hidden md:block" />
          anytime, anywhere
        </h1>

        <h2 className="px-8 w-full max-w-2xl text-lg font-medium leading-tight text-center lg:text-2xl text-blue-950">
          Brainion turns your ideas and notes into actionable insights with AI.
        </h2>

        {/* Button */}
        <div className="flex flex-col">
          <Button className="bg-blue-800 hover:bg-blue-950 text-white font-medium rounded-full px-6 py-5">
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
