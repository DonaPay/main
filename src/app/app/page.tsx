"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
// import { CreateGroup } from "@/entry-functions/CreateGroup";
// import { aptosClient } from "@/utils/aptosClient";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getUserStruct } from "@/view-functions/getUserStruct";
import { getUserGroupStruct } from "@/view-functions/getUserGroupStruct";
import { getUsersByArray } from "@/view-functions/getUsersByArray";
import { getGroupStruct } from "@/view-functions/getGroupStruct";

function Application() {
  //   const { account, signAndSubmitTransaction, connected } = useWallet();

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setName(e.target.value);
  // };

  // const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setPhotoUrl(e.target.value);
  // };

  //   const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setGroupName(e.target.value);
  //   };

  // const handleGroupIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setGroupid(Number(e.target.value));
  // };

  // const handleCreateUser = async () => {
  //     if (!connected || !account) {
  //         console.error("Wallet not connected or account missing");
  //         return;
  //     }

  //     const transaction = await CreateUser(name, photoUrl);
  //     const txn = await signAndSubmitTransaction(transaction as any);
  //     console.log(txn);
  //     return txn;
  // };

  //   const handleCreateGroup = async () => {
  //     if (!connected || !account) {
  //       console.error("Wallet not connected or account missing");
  //       return;
  //     }
  //     const transaction = await CreateGroup(groupName);
  //     const txn = await signAndSubmitTransaction(transaction as any);
  //     console.log(txn.hash);
  //     const txnStatus = await aptosClient().waitForTransaction({ transactionHash: txn.hash });

  //     // Log the transaction status or handle accordingly
  //     if (txnStatus.success) {
  //       console.log("Transaction confirmed successfully:", txnStatus);
  //     } else {
  //       console.error("Transaction failed:", txnStatus);
  //     }

  //     return txn.hash;
  //   };

  //   const handleGetGroup = async () => {
  //     if (!connected || !account) {
  //       console.error("Wallet not connected or account missing");
  //       return;
  //     }

  //     const fetchedGroup = await getGroupStruct(9);
  //     console.log(fetchedGroup);
  //   };

  // useEffect(() => {
  //     console.log("first", user)
  // },[user])

  //   const handleGetUserGroup = async () => {
  //     if (!connected || !account) {
  //       console.error("Wallet not connected or account missing");
  //       return;
  //     }

  //     const fetchedUserGroup = await getUserGroupStruct(
  //       "0x0fa795f2566b0eeebbe1a2dcbe127161b02eda171d8a5053a979c623eac23af3",
  //     );
  //     console.log(fetchedUserGroup);
  //   };

  //   const handleGetUserStructArray = async () => {
  //     if (!connected || !account) {
  //       console.error("Wallet not connected or account missing");
  //       return;
  //     }

  //     const fetchedUsers = await getUsersByArray([
  //       account.address,
  //       "0x3dbd1c976225cd44bcc8bafc22ea2b78ccc9a83c5b3fee9ce8a67a6220230fa1",
  //     ]);
  //     console.log(fetchedUsers);
  //   };

  //   const handleGetUser = async () => {
  //     if (!connected || !account) {
  //       console.error("Wallet not connected or account missing");
  //       return;
  //     }
  //     const add = "0x0fa795f2566b0eeebbe1a2dcbe127161b02eda171d8a5053a979c623eac23af3";
  //     const fetchedUsers = await getUserStruct(add);
  //     console.log(fetchedUsers);
  //   };

  return (
    <div className="bg-gray-100 dark:bg-neutral-800 flex w-full justify-end flex-1 border border-neutral-200 dark:border-neutral-700 h-screen">
      {/* <Sidebar /> */}
      {/* <div className="flex flex-row gap-2 items-center">
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange} // Call the handler on value change
          placeholder="Enter Group Name"
          className="border border-gray-300 rounded p-2 text-white"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleCreateGroup}
        >
          Create Group
        </button>

      </div> */}

      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleGetGroup}
      >
        Get Group
      </button> */}
    </div>
  );
}

export default Application;

// <>
//   <div className="flex items-center justify-center flex-col gap-5 pt-5">
//     <div className="flex flex-row gap-2 items-center">
//       <input
//         type="text"
//         value={name}
//         onChange={handleNameChange} // Call the handler on value change
//         placeholder="Enter your name"
//         className="border border-gray-300 rounded p-2"
//       />

//       <input
//         type="text"
//         value={photoUrl}
//         onChange={handlePhotoUrlChange} // Call the handler on value change
//         placeholder="Enter photo URL"
//         className="border border-gray-300 rounded p-2"
//       />

//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleCreateUser}
//       >
//         Create User
//       </button>
//     </div>

// <button
//   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//   onClick={handleGetUser}
// >
//   Get User
// </button>

//     <div className="flex flex-row gap-2 items-center">
//       <input
//         type="text"
//         value={groupName}
//         onChange={handleGroupNameChange} // Call the handler on value change
//         placeholder="Enter Group Name"
//         className="border border-gray-300 rounded p-2"
//       />
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//         onClick={handleCreateGroup}
//       >
//         Create Group
//       </button>
//     </div>

//     <div className="flex flex-row gap-2 items-center">
//       <input
//         type="number"
//         value={groupid}
//         onChange={handleGroupIdChange} // Call the handler on value change
//         placeholder="Enter Group Id"
//         className="border border-gray-300 rounded p-2"
//       />

//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//         onClick={handleGetGroup}
//       >
//         Get group
//       </button>
//     </div>
//   </div>
// </>
