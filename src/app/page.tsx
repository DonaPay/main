"use client";
import { Header } from "@/components/Header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { getUserStruct } from "@/view-functions/getUserStruct";

function App() {
  const { account, signAndSubmitTransaction, connected } = useWallet();

  const handleCreateUser = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected or account missing");
      return;
    }
    try {
      const transaction = {
        data: {
          function: "0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::createUser",
          functionArguments: ["Bhupinder Jogi", "https://usa.com"],
        },
      };
      const txn = await signAndSubmitTransaction(transaction);
      console.log(txn);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUser = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected or account missing");
      return;
    }

    const fetchedUser = await getUserStruct(account.address);
    console.log(fetchedUser);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateUser}
        >
          Create User
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleGetUser}
        >
          Get User
        </button>
      </div>
    </>
  );
}

export default App;
