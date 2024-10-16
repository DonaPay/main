import { PUBLISHER_ADDRESS } from "@/constants";

export const RegisterVote = async (groupId: number, sabotageId: number, addrToVote: string) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::register_vote`,
        functionArguments: [groupId, sabotageId, addrToVote],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
