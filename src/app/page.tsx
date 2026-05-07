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
        
        <div className="mx-auto max-w-[1440px] px-10 py-12 space-y-16">
          {/* Services Section */}
          <div id="services">
            <Services />
          </div>
          
          {/* About Us Section */}
          <AboutUs />

          {/* How It Works Section */}
          <div id="how-it-works">
            <HowItWorks />
          </div>

          <Stats />

          {/* Contact Us Section */}
          <div id="contact">
            <ContactUs />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}





