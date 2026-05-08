"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { AboutUs } from "@/components/sections/AboutUs";
import { ContactUs } from "@/components/sections/ContactUs";

import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        
        {/* Full Width Services */}
        <div id="services">
          <Services />
        </div>

        {/* About & How It Works (White BG / Container) */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 space-y-32">
          <AboutUs />
          <div id="how-it-works">
            <HowItWorks />
          </div>
        </div>

        {/* Full Width Stats Section */}
        <Stats />

        {/* Contact Us (Container) */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24" id="contact">
          <ContactUs />
        </div>
      </main>
      <Footer />
    </div>
  );
}





