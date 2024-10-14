import { PUBLISHER_ADDRESS } from "@/constants";

export const ApproveJoinGroupRequest = async (groupId: number, memberAddress: string) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::approve_group_join`,
        functionArguments: [groupId, memberAddress],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
