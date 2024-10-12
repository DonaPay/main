import { PUBLISHER_ADDRESS } from "@/constants";

export const CreateGroup = async (name: string) => {
  try {
    let name = "Test Group";
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::createGroup`,
        functionArguments: [name],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
