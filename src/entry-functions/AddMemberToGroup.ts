import { PUBLISHER_ADDRESS } from "@/constants";

export const AddMemberToGroup = async (groupId: number, memberAddress: string) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::add_member_to_group`,
        functionArguments: [groupId, memberAddress],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
