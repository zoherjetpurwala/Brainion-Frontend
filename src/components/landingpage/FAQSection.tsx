import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: 'What is Brainion?',
    answer: 'Brainion is an AI-powered second brain application that helps you capture, organize, and gain insights from your ideas and notes. It works as your personal knowledge management system, making it easier to store and retrieve information when you need it.'
  },
  {
    question: 'How does the AI work?',
    answer: 'Our AI analyzes your notes, identifies patterns and connections, and provides personalized insights and suggestions based on your content. It uses advanced natural language processing to understand context, create meaningful tags, and help you discover relationships between ideas you might otherwise miss.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take data security very seriously. All your data is encrypted and stored securely. We never share your personal information with third parties. Brainion uses industry-standard encryption protocols and regular security audits to ensure your information remains private and protected.'
  },
  {
    question: 'Can I use Brainion offline?',
    answer: 'Yes, you can use Brainion offline on our mobile app. Your data will sync once youre back online. The offline mode allows you to continue capturing and organizing your thoughts even without an internet connection.'
  },
  {
    question: 'What platforms is Brainion available on?',
    answer: 'Brainion is available on web, iOS, and Android. Your data syncs seamlessly across all your devices, so you can access your second brain anywhere, anytime.'
  },
  {
    question: 'How is Brainion different from other note-taking apps?',
    answer: 'Unlike traditional note-taking apps, Brainion uses AI to actively help you organize, connect, and gain insights from your notes. It doesnt just store information—it helps you make better use of it through intelligent suggestions, automatic organization, and powerful search capabilities.'
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Got Questions?
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-5"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-blue-700/70 max-w-2xl mx-auto"
          >
            Find answers to common questions about Brainion. Can't find what you're looking for? 
            <a href="#contact" className="text-blue-600 hover:underline ml-1">Contact us</a>.
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-blue-100 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium text-blue-900 hover:text-blue-700 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-1 pb-6 text-blue-800/70 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Still have questions?</h3>
            <p className="text-blue-700/70 mb-4">Our support team is ready to help you with any questions you may have.</p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;