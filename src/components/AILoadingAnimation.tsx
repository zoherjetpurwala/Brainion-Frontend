"use client"

import { motion } from "framer-motion"

const AILoadingAnimation = () => {
  // Enhanced animation variants with modern easing
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 25,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const coreVariants = {
    animate: {
      scale: [1, 1.15, 1],
      boxShadow: [
        "0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)",
        "0 0 50px rgba(255, 255, 255, 0.6), 0 0 100px rgba(255, 255, 255, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.2)",
        "0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)",
      ],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  }

  const ringVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const outerRingVariants = {
    animate: {
      rotate: -360,
      transition: {
        duration: 12,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const nodeVariants = (delay: number) => ({
    animate: {
      scale: [0.8, 1.3, 0.8],
      opacity: [0.6, 1, 0.6],
      boxShadow: [
        "0 0 15px rgba(255, 255, 255, 0.4)",
        "0 0 30px rgba(255, 255, 255, 0.8)",
        "0 0 15px rgba(255, 255, 255, 0.4)",
      ],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.6, 1],
        delay: delay,
      },
    },
  })

  const connectionVariants = (delay: number) => ({
    animate: {
      opacity: [0, 0.8, 0],
      scaleX: [0.3, 1, 0.3],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.6, 1],
        delay: delay,
      },
    },
  })

  const orbitVariants = (delay: number) => ({
    animate: {
      rotate: 360,
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay: delay,
      },
    },
  })

  const floatingVariants = (delay: number) => ({
    animate: {
      y: [-12, 12, -12],
      x: [-6, 6, -6],
      opacity: [0.4, 0.9, 0.4],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.6, 1],
        delay: delay,
      },
    },
  })

  const pulseRingVariants = (delay: number) => ({
    animate: {
      scale: [0, 5],
      opacity: [0.8, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.4, 0, 0.6, 1],
        delay: delay,
      },
    },
  })

  const neuralPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0, 0.8, 0],
      transition: {
        pathLength: { duration: 2.5, ease: [0.4, 0, 0.6, 1] },
        opacity: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: [0.4, 0, 0.6, 1] },
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />

      {/* Main container */}
      <motion.div
        className="relative w-64 h-64 flex items-center justify-center"
        variants={containerVariants}
        animate="animate"
      >
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 rounded-full blur-3xl" />

        {/* SVG Neural Network Paths */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>

          {/* Enhanced neural pathways */}
          <motion.path
            d="M 60 60 Q 128 40 196 60"
            stroke="url(#pathGradient1)"
            strokeWidth="3"
            fill="none"
            variants={neuralPathVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M 60 196 Q 128 216 196 196"
            stroke="url(#pathGradient1)"
            strokeWidth="3"
            fill="none"
            variants={neuralPathVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          />
          <motion.path
            d="M 60 128 Q 40 60 60 60"
            stroke="url(#pathGradient2)"
            strokeWidth="2.5"
            fill="none"
            variants={neuralPathVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4 }}
          />
          <motion.path
            d="M 196 128 Q 216 196 196 196"
            stroke="url(#pathGradient2)"
            strokeWidth="2.5"
            fill="none"
            variants={neuralPathVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.1 }}
          />
        </svg>

        {/* Central AI Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
            backdropFilter: "blur(10px)",
            zIndex: 10,
          }}
          variants={coreVariants}
          animate="animate"
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full animate-pulse" />
        </motion.div>

        {/* Inner Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{
            borderImage:
              "linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8)) 1",
            zIndex: 8,
          }}
          variants={ringVariants}
          animate="animate"
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderImage: "linear-gradient(90deg, rgba(255, 255, 255, 0.6), transparent, rgba(255, 255, 255, 0.6)) 1",
            zIndex: 6,
          }}
          variants={outerRingVariants}
          animate="animate"
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.3)) 1",
            zIndex: 2,
          }}
          variants={containerVariants}
          animate="animate"
        />

        {/* Enhanced Neural Nodes */}
        {[
          { top: "12%", left: "35%" },
          { top: "18%", right: "30%" },
          { bottom: "35%", left: "25%" },
          { bottom: "25%", right: "35%" },
          { top: "45%", left: "10%" },
          { top: "45%", right: "10%" },
          { top: "25%", left: "50%", transform: "translateX(-50%)" },
          { bottom: "25%", left: "50%", transform: "translateX(-50%)" },
        ].map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 rounded-full border border-white/50"
            style={{
              ...position,
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
              backdropFilter: "blur(5px)",
              zIndex: 9,
            }}
            variants={nodeVariants(index * 0.4)}
            animate="animate"
          >
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          </motion.div>
        ))}

        {/* Modern Connection Lines */}
        {[
          { top: "38%", left: "38%", width: "24%", transform: "rotate(45deg)" },
          { top: "58%", left: "32%", width: "28%", transform: "rotate(-25deg)" },
          { top: "48%", right: "32%", width: "26%", transform: "rotate(55deg)" },
          { top: "68%", left: "50%", width: "20%", transform: "translateX(-50%) rotate(90deg)" },
          { top: "28%", left: "50%", width: "18%", transform: "translateX(-50%) rotate(0deg)" },
        ].map((style, index) => (
          <motion.div
            key={index}
            className="absolute h-0.5 rounded-full"
            style={{
              ...style,
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
              zIndex: 7,
            }}
            variants={connectionVariants(index * 0.5)}
            animate="animate"
          />
        ))}

        {/* Orbiting Particles */}
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={`orbit-${index}`}
            className="absolute top-1/2 left-1/2 w-3 h-3"
            style={{ zIndex: 6 }}
            variants={orbitVariants(index * 0.8)}
            animate="animate"
          >
            <motion.div
              className="w-3 h-3 rounded-full border border-white/50"
              style={{
                transform: `translateX(${70 + index * 8}px) translateY(-50%)`,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                backdropFilter: "blur(3px)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                transition: {
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: [0.4, 0, 0.6, 1],
                  delay: index * 0.6,
                },
              }}
            />
          </motion.div>
        ))}

        {/* Floating Ambient Particles */}
        {[
          { top: "18%", left: "18%" },
          { top: "22%", right: "15%" },
          { bottom: "18%", left: "15%" },
          { bottom: "22%", right: "18%" },
          { top: "50%", left: "8%" },
          { top: "50%", right: "8%" },
        ].map((position, index) => (
          <motion.div
            key={`float-${index}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              ...position,
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))",
              zIndex: 5,
            }}
            variants={floatingVariants(index * 1.2)}
            animate="animate"
          />
        ))}

        {/* Enhanced Pulse Rings */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={`pulse-${index}`}
            className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              borderColor: `rgba(255, 255, 255, ${0.4 - index * 0.1})`,
              zIndex: 3,
            }}
            variants={pulseRingVariants(index * 1.2)}
            animate="animate"
          />
        ))}

        {/* Energy Wave Background */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.15), transparent, rgba(255, 255, 255, 0.1), transparent)",
            zIndex: 1,
          }}
          animate={{
            rotate: 360,
            transition: {
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        />
      </motion.div>


    </div>
  )
}

export default AILoadingAnimation