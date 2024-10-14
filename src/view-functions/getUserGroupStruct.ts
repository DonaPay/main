import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";

export const getUserGroupStruct = async (address: string) => {
  try {
    const userGroups = await aptosClient().view({
      payload: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::get_user_groups`,
        typeArguments: [],
        functionArguments: [address],
      },
    });

    if (userGroups[0]) return userGroups[0];
    else return null;
  } catch (error: any) {
    if (error.message.includes("112")) {
      console.error("User does not exist.");
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null;
  }
};
