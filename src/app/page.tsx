"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-fradient";
import Link from "next/link";
import Application from "./Application";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import CanvasCursor from "@/components/ui/canvas-cursor";

function App() {
  const { connected, connect } = useWallet()

  return (
    <div className="relative h-[100vh] overflow-hidden w-full bg-slate-950">
       <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
      </div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
      </div>
      <div className="h-full flex items-center justify-center flex-col">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-500 dark:to-white text-2xl md:text-4xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          DonaPay
        </h2>
        <div className="relative z-20 max-w-xl mx-auto text-sm md:text-xl text-neutral-700 dark:text-neutral-400 text-center">
          Simplifing Group Payments, <span className="text-red-200">With a Twist!</span>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href={"/dashboard"}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              onClick={() => connect()}
              >
              <span>Start Spending</span>
            </HoverBorderGradient>
          </Link>
        </div>
        <div className="absolute bottom-4 mx-auto max-w-xl text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Powered by Aptos.
        </div>
      </div>
      <CanvasCursor />
    </div>
  )
}

export default App;
