import React, { useEffect, useState } from "react";
import { GroupChatPropstype } from "./types";
import { toast } from "sonner";
import { waitForTransactionConfirmation } from "@/utils/waitForTransaction";
import { createSabotage } from "@/entry-functions/CreateSabotage";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getPastSabotages } from "@/view-functions/getPastSabotages";
import { RegisterVote } from "@/entry-functions/RegisterVote";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const GroupChat = ({ group }: GroupChatPropstype) => {
  const [sabotageCreated, setSabotageCreated] = useState(false);
  const { signAndSubmitTransaction } = useWallet();
  const [currentSabotageId, setCurrentSabotageId] = useState(0);
  const [prevSabotageId, setPrevSabotageId] = useState<number | null>(null); // State for previous sabotage ID
  const [addrToVote, setAddrToVote] = useState(""); // State for address input
  const [loading, setLoading] = useState(false); // Loading state for sabotage creation
  const [voteDone, setVoteDone] = useState(false); // State to track if the vote is done

  const handleCreateSabotage = async () => {
    setLoading(true); // Start loading
    try {
      const groupJoinObj = await createSabotage(Number(group.id));
      const tx = await signAndSubmitTransaction(groupJoinObj as any);

      console.log("Created new sabotage", tx);
      setPrevSabotageId(currentSabotageId); // Update previous sabotage ID
      setSabotageCreated(true);
      return toast.promise(waitForTransactionConfirmation(tx.hash), {
        loading: "Creation in process",
        success: "New sabotage created",
        error: "Sabotage creation failed",
      });
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchLatestSabotage = async () => {
    try {
      const pastSabotages = await getPastSabotages(Number(group.id)); // Await to handle async
      if (!pastSabotages) {
        return;
      }
      const lastSabotageCreated = pastSabotages[pastSabotages.length - 1];
      console.log(lastSabotageCreated);

      const id = lastSabotageCreated.id;
      setCurrentSabotageId(id);
    } catch (error) {
      console.error("Failed to get past sabotages:", error); // Log any errors encountered
    }
  };

  useEffect(() => {
    if (sabotageCreated) {
      fetchLatestSabotage(); // Fetch and set current sabotage ID when a new sabotage is created
    }
  }, [sabotageCreated]); // Run this effect when sabotageCreated changes

  const handleRegisterVote = async () => {
    if (!addrToVote) {
      toast.error("Please enter an address to vote");
      return;
    }

    try {
      const groupJoinObj = await RegisterVote(Number(group.id), currentSabotageId, addrToVote);
      const tx = await signAndSubmitTransaction(groupJoinObj as any);
      console.log("Vote request transaction", tx);
      setLoading(false);
      setVoteDone(true); // Update state to indicate voting is done
      return toast.promise(waitForTransactionConfirmation(tx.hash), {
        loading: "Transaction in process",
        success: "Vote registered!",
        error: "Vote couldn't be registered!",
      });
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 relative">
      <h2 className="text-xl font-bold">
        {group.name}, ID: {group.id}
      </h2>

      <div className="absolute top-4 right-4 text-gray-600">
        Previous Sabotage ID: {prevSabotageId !== null ? prevSabotageId : "N/A"}
      </div>

      {sabotageCreated ? (
        <div className="flex flex-col items-center">
          <p className="text-green-500">Sabotage is ongoing! Please vote.</p>
          <div className="animate-spin mt-2">
            <FaSpinner size={24} className="text-blue-500" />
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded w-[50%] mx-auto"
          onClick={handleCreateSabotage}
        >
          {loading ? "Creating..." : "Create Sabotage"}
        </button>
      )}

      {voteDone ? (
        <p className="text-green-500">Thank you for voting!</p> // Message shown after voting is done
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            value={addrToVote}
            onChange={(e) => setAddrToVote(e.target.value)} // Update state on input change
            placeholder="Enter address to vote"
            className="border border-gray-300 rounded p-2 w-[80%] transition duration-300 ease-in-out focus:border-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
            onClick={handleRegisterVote}
          >
            Register Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupChat;
