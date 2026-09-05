import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import {
  staggerContainer,
  staggerContainerSlow,
  fadeUp,
  EASE_PREMIUM,
} from "../../utils/animations";

/* ===================== DATA ===================== */

const journeyItems = [
  {
    year: "2021",
    title: "Started Programming Journey",
    details:
      "Explored the world of code for the first time, learning the basic logic and structure of software.",
  },
  // {
  //   year: "2020",
  //   title: "Building Fundamentals",
  //   details:
  //     "Dived deep into various programming paradigms and started building small, utility-based applications.",
  // },
  {
    year: "2022",
    title: "Entering Web Development",
    details:
      "Transitioned to web technologies, focusing on creating responsive and interactive user interfaces.",
  },
  {
    year: "2023",
    title: "Mastering Modern Frameworks",
    details:
      "Focused on React and other modern libraries to build scalable frontend applications.",
  },
  {
    year: "2024",
    title: "Full-stack Projects",
    details:
      "Started building end-to-end applications, integrating complex backends with polished frontends.",
  },
  {
    year: "2025",
    title: "Professional Contributions",
    details:
      "Collaborated on various projects and started contributing to open-source communities.",
  },
  {
    year: "2026",
    title: "Current Focus",
    details:
      "Building high-end production systems and exploring new horizons in digital craftsmanship.",
  },
];

/* ===================== COMPONENT ===================== */

const About = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isDesktop = () => window.innerWidth >= 1024;

  const toggleItem = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="about" className="py-8 lg:py-16 scroll-mt-14">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          className="font-funnel font-extrabold text-[clamp(3.5rem,9vw,7rem)] leading-[1.02] tracking-tight max-w-4xl"
        >
          About Me
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          className="mt-6 md:mt-8 max-w-3xl text-base sm:text-xl leading-[1.9] text-neutral-700"
        >
          I’m a Full Stack Developer specializing in the MERN stack, focused on building scalable, production-ready web applications that solve real-world problems.
          <br />
          <br />I enjoy turning ideas into reliable digital products, working across both frontend and backend development with a strong focus on clean architecture, performance, and user experience.
        </motion.p>

        {/* JOURNEY */}
        <motion.div variants={staggerContainerSlow} className="mt-12 lg:mt-24">
          <motion.p
            variants={fadeUp}
            className="mb-10 text-xs sm:text-sm tracking-[0.35em] uppercase text-neutral-600"
          >
            Journey
          </motion.p>

          <div className="space-y-10 md:space-y-14 lg:space-y-20">
            {journeyItems.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  onHoverStart={() => isDesktop() && setActiveIndex(idx)}
                  onHoverEnd={() => isDesktop() && setActiveIndex(null)}
                  className="relative"
                >
                  {/* HEADER */}
                  <motion.div
                    onClick={() => !isDesktop() && toggleItem(idx)}
                    whileHover={isDesktop() ? { scale: 1.015 } : undefined}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="cursor-pointer py-2 sm:py-3 lg:py-4"
                  >
                    {/* MOBILE */}
                    <div className="lg:hidden space-y-2">
                      <span className="font-funnel text-sm sm:text-base text-neutral-500 mb-2">
                        {item.year}
                      </span>

                      <div className="flex items-center justify-between gap-6 mt-2">
                        <h4 className="font-semibold text-xl sm:text-3xl leading-tight tracking-tight text-neutral-900">
                          {item.title}
                        </h4>

                        <motion.span
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 22,
                          }}
                          className="text-neutral-500"
                        >
                          <Plus size={24} />
                        </motion.span>
                      </div>
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden lg:flex items-center justify-between gap-10">
                      <div className="flex items-center gap-10">
                        <span className="font-mono text-sm text-neutral-500 w-14">
                          {item.year}
                        </span>

                        <h4 className="font-semibold text-[clamp(1.9rem,3vw,2.5rem)] leading-tight tracking-tight text-neutral-900 max-w-3xl">
                          {item.title}
                        </h4>
                      </div>

                      <motion.span
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 22,
                        }}
                        className="text-neutral-500"
                      >
                        <Plus size={26} />
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* DETAILS */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.5, ease: EASE_PREMIUM },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.3 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 max-w-3xl text-neutral-700 text-base sm:text-lg leading-[1.85]">
                          {item.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* LINE */}
                  <div className="mt-4 lg:mt-8 h-px bg-border" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
