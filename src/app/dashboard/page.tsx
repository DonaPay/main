"use client";
import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getUserStruct } from "@/view-functions/getUserStruct";
import { getGroupStruct } from "@/view-functions/getGroupStruct";
import { CreateUser } from "@/entry-functions/CreateUser";
import { CreateGroup } from "@/entry-functions/CreateGroup";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Application() {
    const { account, signAndSubmitTransaction, connected } = useWallet();

    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)

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
        <div className="bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
            <Sidebar open={sideBarOpen} setOpen={setSideBarOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {/* {sideBarOpen ? <Logg /> : <LogoIcon />} */}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {/* <Dashboard /> */}
        </div>
    );
}

export const links = [
    {
        label: "Dashboard",
        href: "#",
        icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Profile",
        href: "#",
        icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Settings",
        href: "#",
        icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Logout",
        href: "#",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
];

export default Application;
