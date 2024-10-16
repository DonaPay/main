import { Group, User } from "@/GlobalTypes";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { AddressDisplay } from "@/utils/addressUtility";
import { getUsersByArray } from "@/view-functions/getUsersByArray";
import { AddMemberToGroup } from "@/entry-functions/AddMemberToGroup";
import { useGlobalContext } from "@/GlobalProvider";
import { ApproveJoinGroupRequest } from "@/entry-functions/ApproveJoinRequest";
import { toast } from "sonner";
import { waitForTransactionConfirmation } from "@/utils/waitForTransaction";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Link } from "lucide-react";
import { link } from "fs";

const GroupDetails = ({ group }: { group: Group }) => {
  const [memberAddress, setMemberAddress] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [admins, setAdmins] = useState<User[]>([]);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [groupJoinRequests, setGroupJoinRequests] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { signAndSubmitTransaction } = useWallet();
  const { user, groups } = useGlobalContext();

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const linkUrl = `${baseUrl}/app/?groupId=${group.id}`;

  useEffect(() => {
    QRCode.toDataURL(linkUrl)
      .then((url) => {
        setQrCodeUrl(url);
        console.log("QR Code URL:", url);
      })
      .catch((err) => {
        console.log("error in setting url");
        console.error(err);
      });
    fetchData();
  }, [group, groups]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before data fetching

    const fetchedAdmins = await getUsersByArray(group.admins);
    if (fetchedAdmins && fetchedAdmins.length > 0) setAdmins(fetchedAdmins as any);
    const fetchedMembers = await getUsersByArray(group.members);
    if (fetchedMembers && fetchedMembers.length > 0) setGroupMembers(fetchedMembers as any);

    const fetchedJoinRequests = await getUsersByArray(group.joinRequests);
    if (fetchedJoinRequests && fetchedJoinRequests.length > 0) setGroupJoinRequests(fetchedJoinRequests as any);

    setLoading(false); // Set loading to false once all data is fetched
  };
  const handleApproveRequest = async (groupMember: any) => {
    console.log(groupMember.addr);
    try {
      const groupJoinObj = await ApproveJoinGroupRequest(Number(group.id), groupMember.addr);
      const tx = await signAndSubmitTransaction(groupJoinObj as any);
      console.log("Join Group request transaction", tx);
      await fetchData();
      return toast.promise(waitForTransactionConfirmation(tx.hash), {
        loading: "Transaction in process",
        success: "Group join request approved!",
        error: "Group join request couldn't be approved!",
      });
    } catch (error: any) {
      toast.error("Something went wrong", error);
    }
  };

  const handleMemberAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberAddress(event.target.value); // Update the state as the user types
  };

  const handleAddMember = async () => {
    try {
      const trxObject = await AddMemberToGroup(Number(group.id), memberAddress);
      if (trxObject) {
        const txn = await signAndSubmitTransaction(trxObject as any);
        console.log("create Group txn", txn);
        await fetchData();
        return toast.promise(waitForTransactionConfirmation(txn.hash), {
          loading: "Member adding in process",
          success: "Member added successfully!",
          error: "Member could not be added",
        });
      } else toast.warning("No image entered");
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll">
      <div className="w-full flex gap-4 flex-col md:grid md:grid-cols-[1fr,3fr]">
        {/* QR Code */}
        <div className="flex flex-col gap-2">
          <Link href={linkUrl}>
            <Image src={qrCodeUrl} width={250} height={250} alt="Join Group QR Code" />
          </Link>
          <div>Scan QR Code to join {group.name}</div>
        </div>

        {/* Admins */}
        <div className="w-full flex flex-col gap-4">
          <div className="text-3xl font-bold">Group Admins</div>
          <div className="w-full grid grid-cols-[1fr,1fr] gap-4">
            {admins.length === 0 && (
              <>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {admins.length > 0 &&
            admins.map((admin, idx) => (
              <div className="flex items-center gap-2 w-full" key={idx}>
                <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                  <AvatarImage src={admin?.photoUrl} alt={admin.name} className="bg-gray-200 dark:bg-neutral-700" />
                  <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">{admin?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="w-full font-light text-sm">
                  <div>{admin.name}</div>
                  <AddressDisplay address={admin.addr} maxLength={25} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex flex-col md:grid md:grid-cols-[1fr,1fr] gap-4">
        {/* Members */}
        <div className="w-full flex flex-col gap-4">
          <div className="text-3xl font-bold">Group Members</div>
          <div className="w-full grid grid-cols-[1fr,1fr] gap-4">
            {groupMembers.length === 0 && (
              <>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {groupMembers.length > 0 &&
            groupMembers.map((groupMember, idx) => (
              <div className="flex items-center gap-2 w-full" key={idx}>
                <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                  <AvatarImage
                    src={groupMember?.photoUrl}
                    alt={groupMember.name}
                    className="bg-gray-200 dark:bg-neutral-700"
                  />
                  <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">
                    {groupMember?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full font-light text-sm">
                  <div>{groupMember.name}</div>
                  <AddressDisplay address={groupMember.addr} maxLength={25} />
                </div>
              </div>
            ))}
          {admins.some((admin) => admin.addr === user?.addr) && (
            <div className="flex flex-col w-full mt-8">
              <div className="flex items-center gap-3 w-full">
                <input
                  type="text"
                  value={memberAddress} // Controlled input
                  onChange={handleMemberAddressChange} // Update state on change
                  placeholder="Enter Address"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </div>
          )}
        </div>

        {/* join Requests */}
        <div className="w-full flex flex-col gap-4">
          <div className="text-3xl font-bold">Join Requests</div>
          <div className="w-full grid grid-cols-[1fr,1fr] gap-4">
            {loading ? (
              <>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center space-x-4 w-full">
                    <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                      <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                </div>
              </>
            ) : groupJoinRequests.length === 0 ? (
              <p> No Join Requests</p>
            ) : (
              <></>
            )}
          </div>

          {groupJoinRequests.length > 0 &&
            groupJoinRequests.map((groupMember, idx) => (
              <div className="flex items-center gap-2 w-full" key={idx}>
                <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                  <AvatarImage
                    src={groupMember?.photoUrl}
                    alt={groupMember.name}
                    className="bg-gray-200 dark:bg-neutral-700"
                  />
                  <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">
                    {groupMember?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full font-light text-sm flex flex-row gap-4">
                  <div className="flex flex-col">
                    {groupMember.name}
                    <AddressDisplay address={groupMember.addr} maxLength={25} />
                  </div>
                  {admins.some((admin) => admin.addr === user?.addr) && (
                    <button
                      className="text-white rounded-xl p-2 bg-slate-400"
                      onClick={() => {
                        handleApproveRequest(groupMember);
                      }}
                      key={idx}
                    >
                      Approve request
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
