"use client";
import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getUserStruct } from "@/view-functions/getUserStruct";
import { getGroupStruct } from "@/view-functions/getGroupStruct";
import { CreateUser } from "@/entry-functions/CreateUser";
import { CreateGroup } from "@/entry-functions/CreateGroup";

function Application() {
  const { account, signAndSubmitTransaction, connected } = useWallet();

  const [groupName, setGroupName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [groupid, setGroupid] = useState<number>(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(e.target.value);
  };

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleGroupIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupid(Number(e.target.value));
  };

  const handleCreateUser = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected or account missing");
      return;
    }

    const transaction = await CreateUser(name, photoUrl);
    const txn = await signAndSubmitTransaction(transaction as any);
    console.log(txn);
    return txn;
  };

  const handleCreateGroup = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected or account missing");
      return;
    }
    const transaction = await CreateGroup(groupName);
    const txn = await signAndSubmitTransaction(transaction as any);
    console.log(txn);
    return txn;
  };

  const handleGetUser = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected or account missing");
      return;
    }

    const fetchedUser = await getUserStruct(account.address);
    console.log(fetchedUser);
  };

  const handleGetGroup = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected or account missing");
      return;
    }

    const fetchedGroup = await getGroupStruct(groupid);
    console.log(fetchedGroup);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-5 pt-5">
        <div className="flex flex-row gap-2 items-center">
          <input
            type="text"
            value={name}
            onChange={handleNameChange} // Call the handler on value change
            placeholder="Enter your name"
            className="border border-gray-300 rounded p-2"
          />

          <input
            type="text"
            value={photoUrl}
            onChange={handlePhotoUrlChange} // Call the handler on value change
            placeholder="Enter photo URL"
            className="border border-gray-300 rounded p-2"
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateUser}
          >
            Create User
          </button>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleGetUser}
        >
          Get User
        </button>

        <div className="flex flex-row gap-2 items-center">
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange} // Call the handler on value change
            placeholder="Enter Group Name"
            className="border border-gray-300 rounded p-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <input
            type="number"
            value={groupid}
            onChange={handleGroupIdChange} // Call the handler on value change
            placeholder="Enter Group Id"
            className="border border-gray-300 rounded p-2"
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleGetGroup}
          >
            Get group
          </button>
        </div>
      </div>
    </>
  );
}

export default Application;
