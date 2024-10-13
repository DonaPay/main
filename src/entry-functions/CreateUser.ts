import { PUBLISHER_ADDRESS } from "@/constants";

export const CreateUser = async (name: string, photoUrl: string) => {
  try {
    const transaction = {
      data: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::createUser`,
        functionArguments: [name, photoUrl],
      },
    };

    return transaction;
  } catch (error) {
    console.error(error);
  }
};
