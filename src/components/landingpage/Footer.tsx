import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-12 rounded-t-xl mt-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Brainion</h3>
            <p>Your AI-powered second brain for capturing and organizing ideas.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Features</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Pricing</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-300">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300"><Facebook /></a>
              <a href="#" className="hover:text-blue-300"><Twitter /></a>
              <a href="#" className="hover:text-blue-300"><Instagram /></a>
              <a href="#" className="hover:text-blue-300"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-200/50 text-center">
          <p>&copy; {new Date().getFullYear()} Brainion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

