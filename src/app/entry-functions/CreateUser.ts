import { PUBLISHER_ADDRESS } from "@/constants";

export const CreateUser = async (name, photoUrl) => {
  try {
    //                      NOT WORKING WITH aptosClient
    // const transaction = await aptosClient().transaction.build.simple({
    //   sender: account.address,
    //   data: {
    //     // The Move entry-function
    //     function: `${PUBLISHER_ADDRESS}::DonaPayCore::createUser`,
    //     functionArguments: ["New Name", "https://newAccount.com"],
    //   },
    // });

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
