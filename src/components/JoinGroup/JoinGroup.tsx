import { Group, User } from "@/GlobalTypes";
import { getGroupStruct } from "@/view-functions/getGroupStruct";
import { getUsersByArray } from "@/view-functions/getUsersByArray";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddressDisplay } from "@/utils/addressUtility";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { JoinGroupRequest } from "@/entry-functions/JoinGroupRequest";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner";
import { waitForTransactionConfirmation } from "@/utils/waitForTransaction";

const JoinGroup = () => {
  const [joinGroup, setJoinGroup] = useState<Group | null>(null);
  const [admins, setAdmins] = useState<User[]>([]);

  const { signAndSubmitTransaction } = useWallet();

  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        try {
          console.log("Group ID:", groupId);

          // Fetch group data
          const fetchedGroup = await getGroupStruct(Number(groupId));
          console.log("Fetched Group in Join Group:", fetchedGroup);

          if (fetchedGroup) {
            setJoinGroup(fetchedGroup);

            // Fetch admins after group is fetched
            const fetchedAdmins = await getUsersByArray(fetchedGroup.admins);
            console.log("Fetched Admins in Join Group:", fetchedAdmins);

            if (fetchedAdmins) {
              setAdmins(fetchedAdmins);
            }
          }
        } catch (error) {
          console.error("Error fetching group or admins:", error);
        }
      }
    };

    fetchData();
  }, [groupId]);

  const handleJoinrequest = async () => {
    try {
      const groupJoinObj = await JoinGroupRequest(Number(groupId));
      const tx = await signAndSubmitTransaction(groupJoinObj as any);

      console.log("Join Group request transaction", tx);

      return toast.promise(waitForTransactionConfirmation(tx.hash), {
        loading: "Transaction in process",
        success: "Group Request sent successfully!",
        error: "Group request sending failed!",
      });
    } catch (error: any) {
      toast.error("You are already in this group or you have sent request once");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      {joinGroup ? (
        <>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Name : {joinGroup.name}</div>
            <div className="text-2xl font-bold">ID : {joinGroup.id}</div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold">Group Admins</div>
            <div className="w-full grid grid-cols-[1fr,1fr] gap-4">
              {admins.length === 0 && (
                <>
                  {[...Array(4)].map((_, idx) => (
                    <div className="flex items-center gap-2 w-full" key={idx}>
                      <div className="flex items-center space-x-4 w-full">
                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                        <div className="space-y-2 w-full">
                          <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                          <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                        </div>
                      </div>
                    </div>
                  ))}
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
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">Send Join Request</div>
            <div>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black
                                 dark:text-white flex items-center space-x-2 text-sm"
                onClick={handleJoinrequest}
              >
                <span>Send Join Request</span>
              </HoverBorderGradient>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default JoinGroup;
