"use client";
import CreateProfile from "@/components/create-profile/CreateProfile";
import GroupChat from "@/components/GroupChat/GroupChat";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useGlobalContext } from "@/GlobalProvider";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";

function Application() {
    const { connected } = useWallet();
    const [section, setSection] = useState<string>("")
    const [groupId, setGroupId] = useState<string>("")

    const { user, loading } = useGlobalContext()

    useEffect(() => {
        if (!loading && connected && !user)
            setSection("create-profile")
    }, [user])


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

  // const handleGetGroup = async () => {
  //     if (!connected || !account) {
  //         console.error("Wallet not connected or account missing");
  //         return;
  //     }

  //     const fetchedGroup = await getGroupStruct(groupid);
  //     console.log(fetchedGroup);
  // };

    return (
        <div className="fixed bg-gray-100 dark:bg-neutral-800 text-black dark:text-white flex w-full min-h-[100vh]">
            <div className='bg-gray-200 dark:bg-neutral-900 text-black dark:text-white  
            min-w-[20%] flex flex-col p-4 md:p-6 gap-4'>
                <Sidebar section={section} setSection={setSection} setGroupId={setGroupId} groupId={groupId}/>
            </div>
            <div className="w-full p-4 md:p-6">
                {section == "create-profile" && <CreateProfile />}

                {section == "group" && <GroupChat groupId={groupId}/>}

            </div>
            

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

//     <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//       onClick={handleGetUser}
//     >
//       Get User
//     </button>

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
