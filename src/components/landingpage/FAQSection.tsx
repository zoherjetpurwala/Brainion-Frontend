import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const faqs = [
  {
    question: 'What is Brainion?',
    answer: 'Brainion is an AI-powered second brain application that helps you capture, organize, and gain insights from your ideas and notes.'
  },
  {
    question: 'How does the AI work?',
    answer: 'Our AI analyzes your notes, identifies patterns and connections, and provides personalized insights and suggestions based on your content.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take data security very seriously. All your data is encrypted and stored securely. We never share your personal information with third parties.'
  },
  {
    question: 'Can I use Brainion offline?',
    answer: 'Yes, you can use Brainion offline on our mobile app. Your data will sync once youre back online.'
  }
]

const FAQSection = () => {
  return (
    <section id="faq" className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQSection

