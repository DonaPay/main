import type { Network } from "@aptos-labs/wallet-adapter-react";

export const NETWORK: Network = (process.env.NEXT_PUBLIC_APP_NETWORK as Network) ?? "testnet";
export const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;

export const PUBLISHER_ADDRESS = "071af5095e2ec809ce2998185f802ee2d4d936401614cc71a3987cc5a341a5ff";
