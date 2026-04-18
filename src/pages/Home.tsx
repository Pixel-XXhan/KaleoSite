import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import SplineSection from '../sections/SplineSection';
import NarrativeText from '../sections/NarrativeText';
import CardStack from '../sections/CardStack';
import BreathSection from '../sections/BreathSection';
import ZigZagGrid from '../sections/ZigZagGrid';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeInOut' as const }
  }
};

const Home = () => {
  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-background"
    >
      {/* Hero Section */}
      <Hero />

      {/* 3D Spline Scene Section */}
      <SplineSection />

      {/* Narrative Text Section */}
      <NarrativeText />

      {/* Card Stack Parallax Gallery */}
      <CardStack />

      {/* BREATH Video Mask Section */}
      <BreathSection />

      {/* Zig-Zag Grid Section */}
      <ZigZagGrid />
    </motion.div>
  );
};

export default Home;
