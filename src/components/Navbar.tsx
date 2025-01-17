import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`;
  };

  return (
    <nav
      className={`flex flex-col justify-center w-full md:max-w-xl items-end fixed top-0 inset-x-0 z-50 flex-none p-2 h-16 md:my-2 md:rounded-full border-0 md:border-[1px] border-blue-800/15 backdrop-blur-3xl md:top-6 md:left-1/2 right-auto md:-translate-x-1/2 text-primary bg-white/50 scroll transition-all duration-300 ${
        isScrolled
          ? "shadow-xl shadow-blue-800/15 border-none max-sm:rounded-full max-sm:mx-[0.5rem] max-sm:top-6 max-sm:max-w-[calc(100%-1rem)]"
          : ""
      }`}
    >
      <div className="flex gap-2 justify-between items-center w-full md:gap-px">
        <a
          href="/"
          className="select-none text-blue-900 flex items-center text-2xl font-medium font-sans transition-all py-1.5 flex-none px-3 ml-1"
        >
          Brainion.
        </a>

        <div className="flex-1 md:hidden" />

        <div className="select-none flex items-center flex-none px-3 ml-1">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className={`text-black ring-1 ring-blue-800/5 hover:bg-blue-800/15 font-medium rounded-full px-6 shadow-none transition-all duration-300 ${
                  isScrolled ? "bg-blue-800 hover:bg-blue-950 text-white" : ""
                }`}
              >
                Get Started
              </Button>
            </DialogTrigger>
            <AnimatePresence>
              {isOpen && (
                <DialogContent className="sm:max-w-md bg-white/65 backdrop-blur-xl shadow-lg dark:bg-gray-900 rounded-lg p-0 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="p-6"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-900 dark:text-white text-center mb-6">
                        Login
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <Button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-md py-2 px-4 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md border border-gray-200"
                      >
                        <FaGoogle className="text-xl" />
                        Continue with Google
                      </Button>
                      <Button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md py-2 px-4 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                      >
                        <FaGithub className="text-xl" />
                        Continue with GitHub
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
                      By continuing, you agree to our Terms of Service and
                      Privacy Policy.
                    </p>
                  </motion.div>
                </DialogContent>
              )}
            </AnimatePresence>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
