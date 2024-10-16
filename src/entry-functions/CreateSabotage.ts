import { PUBLISHER_ADDRESS } from "@/constants";

export const createSabotage = async (groupId: number) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::create_sabotage`,
        functionArguments: [groupId],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
