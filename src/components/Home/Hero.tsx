import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import CVPDF from "/assets/Alhaj_Resume.pdf";
import { SocialLink } from "../../utils/constants";
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpSlow,
  scaleReveal,
  hoverScale,
} from "../../utils/animations";
import Hero3D from "./Hero3D";

/* ===================== COMPONENT ===================== */

const Hero: React.FC = () => {
  const socials: SocialLink[] = [
    { href: "https://github.com/PainterAlhaj", icon: <Github /> },
    { href: "https://www.linkedin.com/in/alhaz-painter-b98452320", icon: <Linkedin /> },
    { href: "mailto:painteralhaj@gmail.com", icon: <Mail /> },
    // { href: "https://www.youtube.com/@creative_dev", icon: <Youtube /> },
    // { href: "https://www.instagram.com/creative_dev", icon: <Instagram /> },
  ];

  return (
    <section className="relative mb-10 sm:mb-0 sm:h-[94vh] overflow-hidden">
      <div className="xl:max-w-7xl mx-auto sm:px-6 w-full h-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 h-full lg:items-center justify-between">
          {/* LEFT — TEXT */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="show"
            className="px-4 sm:px-0 w-full  max-w-2xl z-10 relative pt-10 sm:pt-0"
          >
            <motion.p
              variants={fadeUp}
              className="font-jost text-xs ml:text-sm tracking-widest text-neutral-600 mb-4"
            >
              HELLO, I AM
            </motion.p>

            <motion.h1
              variants={fadeUpSlow}
              className="
                text-[clamp(3rem,9vw,7rem)]
                font-funnel
                font-extrabold
                leading-[0.95]
                tracking-tight
                mb-6 md:mb-8
              "
            >
              Shaikh Alhaj
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="sm:max-w-sm lg:max-w-xl font-jost text-lg ml:text-xl sm:text-lg md:text-xl tracking-widest text-neutral-600 mb-4 md:mb-6 uppercase"
            >
              Full Stack Developer · MERN Specialist · Problem Solver
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="sm:max-w-sm md:max-w-md lg:max-w-xl text-base ml:text-lg xsm:text-xl sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-4 md:mb-8"
            >
              I build high-performance, visually stunning web applications and
              digital experiences focused on modern design and scalable
              architecture.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="
    mt-6
    mb-5
    sm:mb-6
    gap-10
    flex
    justify-center
    sm:justify-start
    text-neutral-800
    text-center
  "
            >
              <div>
                <p className="text-3xl sm:text-5xl font-funnel font-bold leading-none">
                  20+
                </p>
                <p className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                  Projects
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-5xl font-funnel font-bold leading-none">
                  100+
                </p>
                <p className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                  Commits
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-5xl font-funnel font-bold leading-none">
                  5+
                </p>
                <p className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                  Years Exp
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <motion.button
                whileHover={hoverScale}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-4 bg-black text-white rounded-full hover:bg-neutral-900 transition hover:cursor-pointer"
              >
                Let’s collaborate
              </motion.button>

              <motion.a
                whileHover={hoverScale}
                whileTap={{ scale: 0.98 }}
                href={CVPDF}
                download
                className="px-10 py-4 border border-neutral-400 rounded-full hover:bg-neutral-200 transition text-center"
              >
                Download CV
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex justify-center sm:justify-start items-center gap-6 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10 mt-8"
            >
              {socials.map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-black transition"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D ANIMATION */}
          <motion.div
            variants={scaleReveal}
            initial="hidden"
            animate="show"
            className="
              w-full
              lg:w-1/2
              h-[400px]
              sm:h-[480px]
              lg:h-[450px]
              xl:h-[500px]
              z-10
              relative
              flex
              items-center
              justify-center
              my-auto
              
            "
          >
            <Hero3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
