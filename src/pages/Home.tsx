import Hero from '../sections/Hero';
import NarrativeText from '../sections/NarrativeText';
import CardStack from '../sections/CardStack';
import BreathSection from '../sections/BreathSection';
import ZigZagGrid from '../sections/ZigZagGrid';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Narrative Text Section */}
      <NarrativeText />

      {/* Card Stack Parallax Gallery */}
      <CardStack />

      {/* BREATH Video Mask Section */}
      <BreathSection />

      {/* Zig-Zag Grid Section */}
      <ZigZagGrid />
    </>
  );
};

export default Home;
