import type { Network } from "@aptos-labs/wallet-adapter-react";

export const NETWORK: Network = (process.env.NEXT_PUBLIC_APP_NETWORK as Network) ?? "testnet";
export const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;

export const PUBLISHER_ADDRESS = "0x0331d78e63bb9e6cda72be405b09d16c5a7f5464df3f0a374004656d5596f44c";
