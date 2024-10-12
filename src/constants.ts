import type { Network } from "@aptos-labs/wallet-adapter-react";

export const NETWORK: Network = (process.env.NEXT_PUBLIC_APP_NETWORK as Network) ?? "testnet";
export const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;

export const PUBLISHER_ADDRESS = "0xc0292743f90a9dee8171eb0866519c9c4334be377800b40f45551f87fe555f51";
