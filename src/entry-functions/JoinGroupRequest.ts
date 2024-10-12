import { PUBLISHER_ADDRESS } from "@/constants";

export const JoinGroupRequest = async (groupId: number) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::group_join_request`,
        functionArguments: [groupId],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
