import { Lightbulb, Brain, Zap, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const features = [
  {
    icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
    title: 'Idea Capture',
    description: 'Quickly jot down your ideas anytime, anywhere. Never lose a brilliant thought again.'
  },
  {
    icon: <Brain className="h-6 w-6 text-blue-600" />,
    title: 'AI-Powered Insights',
    description: 'Our advanced AI analyzes your notes and generates valuable insights and connections.'
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: 'Instant Retrieval',
    description: 'Find any piece of information in seconds with our powerful search and tagging system.'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-blue-600" />,
    title: 'Smart Suggestions',
    description: 'Receive personalized content and action suggestions based on your notes and interests.'
  }
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className='bg-blue-50 rounded-lg shadow-md border-[1px] py-5 border-blue-600/50'>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

