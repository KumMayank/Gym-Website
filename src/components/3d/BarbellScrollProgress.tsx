'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function BarbellScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top progress line glow */}
      <motion.div
        className="h-1 bg-gradient-to-r from-orange-600 via-[#FF4B1F] to-[#FF9F45] origin-left shadow-[0_0_15px_#FF4B1F]"
        style={{ scaleX }}
      />
    </div>
  );
}
