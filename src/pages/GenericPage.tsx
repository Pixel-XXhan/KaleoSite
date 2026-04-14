import { motion } from 'framer-motion';

const GenericPage = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="min-h-[100svh] pt-32 pb-20 px-6 md:px-10 flex flex-col items-center justify-center text-center bg-kaleo-sand">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-display text-headline text-kaleo-charcoal mb-4"
      >
        {title}
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-16 h-[1px] bg-kaleo-terracotta my-6"
      />
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="font-body text-kaleo-charcoal/70 max-w-xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default GenericPage;
