"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-fradient";
import Link from "next/link";
import Application from "./Application";

function App() {
  return (
    <BackgroundLines className="w-full flex-col px-4">
      <div className="h-[100vh] flex items-center justify-center flex-col">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-500 dark:to-white text-2xl md:text-4xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          DonaPay
        </h2>
        <div className="max-w-xl mx-auto text-sm md:text-xl text-neutral-700 dark:text-neutral-400 text-center">
          Simplifing Group Payments, <span className="text-red-200">With a Twist!</span>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href={"/lendingpool"}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>Get Started</span>
            </HoverBorderGradient>
          </Link>

          <Link href={"/flashloan"}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>Flash Loans</span>
            </HoverBorderGradient>
          </Link>
        </div>
        <Application />
        <div className="absolute bottom-4 mx-auto max-w-xl text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Powered by Aptos.
        </div>
      </div>
    </BackgroundLines>
  );
}

export default App;
