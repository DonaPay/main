import type { Network } from "@aptos-labs/wallet-adapter-react";

export const NETWORK: Network = (process.env.NEXT_PUBLIC_APP_NETWORK as Network) ?? "testnet";
export const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;

export const PUBLISHER_ADDRESS = "0x3a54f7b3cffcc2d28098608c7fa3c1e3f2fcaae9e8df3ff0ee57652f0f7a0744";
