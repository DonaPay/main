import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
// const aptos = new Aptos();

export const getUserStruct = async (address: string) => {
  try {
    const user = await aptosClient().view({
      payload: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::getUser`,
        typeArguments: [],
        functionArguments: [address],
      },
    });

    return user;
  } catch (error: any) {
    if (error.message.includes("112")) {
      console.error("User does not exist.");
    } else {
      console.error("An unexpected error occurred:", error.message);    }
    return null;
  }
};
