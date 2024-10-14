"use client";
import CreateProfile from "@/components/create-profile/CreateProfile";
import CreateGroup from "@/components/CreateGroup/CreateGroup";
import GroupChat from "@/components/GroupChat/GroupChat";
import GroupDetails from "@/components/GroupDetails/GroupDetails";
import JoinGroup from "@/components/JoinGroup/JoinGroup";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useGlobalContext } from "@/GlobalProvider";
import { Group } from "@/GlobalTypes";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Application() {
  const { account } = useWallet();
  const [section, setSection] = useState<string>("");
  const [group, setGroup] = useState<Group | null>(null);
  const { user, loading } = useGlobalContext();

  const searchParams = useSearchParams();
  const urlGroupId = searchParams.get("groupId");

  useEffect(() => {
    if (urlGroupId) {
      setSection("join-group");
    }
  }, [urlGroupId]);

  useEffect(() => {
    console.log("loading", loading);
    console.log("account", account);
    console.log("user", user);
    console.log("section", section);
    if (!loading && account && user == null) {
      setSection("create-profile");
    }
  }, [user, loading, account, section, setSection]);

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setName(e.target.value);
  // };

  // const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setPhotoUrl(e.target.value);
  // };

  //   const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setGroupName(e.target.value);
  //   };
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
  //         console.error("Wallet not connected or account missing");
  //         return;
  //     }

  //     const fetchedGroup = await getGroupStruct(groupid);
  //     console.log(fetchedGroup);
  // };

  return (
    <div className="fixed bg-gray-100 dark:bg-neutral-800 text-black dark:text-white flex w-full min-h-[100vh]">
      <div
        className="bg-gray-200 dark:bg-neutral-900 text-black dark:text-white  
            min-w-[20%] flex flex-col p-4 md:p-6 gap-4"
      >
        <Sidebar section={section} setSection={setSection} setGroup={setGroup} group={group} />
      </div>
      <div className="w-full">
        <SectionHeader group={group} section={section} setSection={setSection} />
        {section == "create-profile" && <CreateProfile />}
        {section == "create-group" && <CreateGroup />}
        {section == "group" && group && <GroupChat group={group} />}
        <Suspense fallback={<div></div>}>
          {/* Now the component using useSearchParams is inside Suspense */}
          {section === "join-group" && <JoinGroup />}
        </Suspense>
        {section == "group-details" && group && <GroupDetails group={group} />}
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
