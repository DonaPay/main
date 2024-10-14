import { PUBLISHER_ADDRESS } from "@/constants";

export const createGroup = async (name: string, ImageUrl: string) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::createGroup`,
        functionArguments: [name, ImageUrl],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
