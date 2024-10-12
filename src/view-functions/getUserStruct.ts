import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
// const aptos = new Aptos();

export const getUserStruct = async (address: string) => {
  const user = await aptosClient().view<[string]>({
    payload: {
      function: `${PUBLISHER_ADDRESS}::DonaPayCore::getUser`,
      typeArguments: [],
      functionArguments: [address],
    },
  });

  return user;
};
