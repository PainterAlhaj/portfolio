import React from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Skills from "../components/Home/Skills";
import Projects from "../components/Home/Projects";
import Services from "../components/Home/Services";
import Contact from "../components/Home/Contact";
import { projectItem } from "../utils/constants";
// import DeveloperTools from "../components/Home/DeveloperTools";

const projects: projectItem[] = [
  {
    title: "WhatsApp Business Automation",
    description:
      "Automate your business communication and manage customer interactions from one place. Manage leads and contacts, automate follow-ups, run WhatsApp campaigns, and reach customers faster—helping businesses save time, reduce repetitive work, and turn more leads into customers.",
    tech: ["MERN", "TypeScript"],
    link: "https://growwithwhatsapp.vercel.app",
    image: [
      "/assets/analytics.png",
      "/assets/addcontact.png",
      "/assets/howitworks.png",
      "/assets/templates.png",

    ],
    status: "completed",
    projectType: "personal",
  },
  {
    title: "Foodchow — Restaurant Marketplace & Ordering Platform",
    description:
      "Foodchow combines a restaurant marketplace and complete food ordering engine into one platform, connecting customers with local restaurants while giving food businesses the tools to grow online.",
    tech: ["Next.js", "TypeScript", "Node.js", "Socket.io", "PostgreSQL"],
    link: "https://www.foodchow.com",
    image: [
      "/assets/homepage.png",
      "/assets/restaurant-listing.png",
      "/assets/ordering-engine-new.png",
      "/assets/checkout.png",
    ],
    status: "completed",
    projectType: "client",
  },
  // {
  //   title: "SaaS Dashboard",
  //   description:
  //     "A sophisticated analytics dashboard for SaaS businesses, providing deep insights into user behavior, revenue metrics, and system performance with interactive visualizations.",
  //   tech: ["Next.js", "TypeScript", "Tailwind CSS", "D3.js"],
  //   link: "https://example-saas.com",
  //   image: [
  //     "https://images.unsplash.com/photo-1551288049-bbda48652ad8?auto=format&fit=crop&w=800&q=80",
  //     "https://images.unsplash.com/photo-1504868584819-f8eecccc90ed?auto=format&fit=crop&w=800&q=80",
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  //     "https://images.unsplash.com/photo-1543674892-7d64d4ad8115?auto=format&fit=crop&w=800&q=80",
  //   ],
  //   status: "completed",
  //   projectType: "client",
  // },
  // {
  //   title: "Fitness & Wellness App",
  //   description:
  //     "A mobile-responsive web app for personalized fitness plans, habit tracking, and community engagement. Integrates with various health APIs to provide holistic wellness data.",
  //   tech: ["React", "Express", "MongoDB", "GraphQL"],
  //   link: "https://example-fitness.com",
  //   image: [
  //     "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  //     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
  //     "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  //     "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
  //   ],
  //   status: "completed",
  //   projectType: "client",
  // },
];

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Projects projects={projects} />
      {/* <DeveloperTools /> */}
      <Skills />
      <About />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
