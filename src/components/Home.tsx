import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl font-bold mb-6 text-white">Welcome to Our SaaS Platform</h1>
        <p className="text-xl text-blue-200 mb-8">Experience the future of productivity</p>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Get Started
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Login to Your Account</DialogTitle>
            </DialogHeader>
            <Button 
              onClick={handleLogin}
              className="w-full bg-white text-gray-900 hover:bg-gray-100"
            >
              Login with Google
            </Button>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
      
      <div className="absolute inset-0 bg-[url('/shine.svg')] bg-no-repeat bg-center animate-pulse"></div>
    </div>
  );
};

export default Home;

