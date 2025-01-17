import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your Brainion account in seconds.'
  },
  {
    number: '02',
    title: 'Capture Ideas',
    description: 'Use our app or browser extension to save your thoughts.'
  },
  {
    number: '03',
    title: 'Organize',
    description: 'Let AI categorize and tag your notes automatically.'
  },
  {
    number: '04',
    title: 'Gain Insights',
    description: 'Discover connections and actionable insights from your ideas.'
  }
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 rounded-3xl m-2 md:m-5">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 rounded-3xl"
        style={{
          backgroundImage: "url('/waves.svg')",
        }}
      ></div>
      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
                <ArrowRight className="w-8 h-8 text-blue-400 mt-4 hidden lg:block" />
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

