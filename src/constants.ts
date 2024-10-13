import type { Network } from "@aptos-labs/wallet-adapter-react";

export const NETWORK: Network = (process.env.NEXT_PUBLIC_APP_NETWORK as Network) ?? "testnet";
export const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;

export const PUBLISHER_ADDRESS = "0x094468b85e81bafd35d320a3a8f8dcc4269635368cfa807d534405eee6e0e58a";
