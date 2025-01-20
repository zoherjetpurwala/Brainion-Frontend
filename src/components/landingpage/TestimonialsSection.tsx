import { Marquee } from "../ui/marquee";

const testimonials = [
  {
    quote:
      "Brainion has revolutionized the way I organize my thoughts. It's like having a personal assistant for my brain!",
    author: "Sarah J., Entrepreneur",
  },
  {
    quote:
      "The AI-powered insights have helped me connect ideas I never would have on my own. It's truly game-changing.",
    author: "Michael L., Researcher",
  },
  {
    quote:
      "I can't imagine working without Brainion now. It's become an essential part of my creative process.",
    author: "Emily R., Writer",
  },
  {
    quote:
      "Brainion has revolutionized the way I organize my thoughts. It's like having a personal assistant for my brain!",
    author: "Sarah J., Entrepreneur",
  },
  {
    quote:
      "The AI-powered insights have helped me connect ideas I never would have on my own. It's truly game-changing.",
    author: "Michael L., Researcher",
  },
  {
    quote:
      "I can't imagine working without Brainion now. It's become an essential part of my creative process.",
    author: "Emily R., Writer",
  },
  {
    quote:
      "Brainion has revolutionized the way I organize my thoughts. It's like having a personal assistant for my brain!",
    author: "Sarah J., Entrepreneur",
  },
  {
    quote:
      "The AI-powered insights have helped me connect ideas I never would have on my own. It's truly game-changing.",
    author: "Michael L., Researcher",
  },
  {
    quote:
      "I can't imagine working without Brainion now. It's become an essential part of my creative process.",
    author: "Emily R., Writer",
  },
  {
    quote:
      "Brainion has revolutionized the way I organize my thoughts. It's like having a personal assistant for my brain!",
    author: "Sarah J., Entrepreneur",
  },
  {
    quote:
      "The AI-powered insights have helped me connect ideas I never would have on my own. It's truly game-changing.",
    author: "Michael L., Researcher",
  },
  {
    quote:
      "I can't imagine working without Brainion now. It's become an essential part of my creative process.",
    author: "Emily R., Writer",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="relative w-full px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          What Our Users Say
        </h2>
        <Marquee pauseOnHover className="[--duration:60s] ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-blue-50 w-96 p-6 rounded-lg shadow-md border-[1px] border-blue-600/50"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-1">
                <img
                  src="https://avatar.iran.liara.run/public"
                  alt="avatar"
                  className="w-8 h-8 border border-blue-700 rounded-full"
                />
                <p className="text-gray-800 font-semibold">
                  - {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-white"></div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
