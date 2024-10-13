import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";

export const getUsersByArray = async (addresses: string[]) => {
  const users = await aptosClient().view<[string]>({
    payload: {
      function: `${PUBLISHER_ADDRESS}::DonaPayCore::getUsersByArray`,
      typeArguments: [],
      functionArguments: [addresses],
    },
  });

  return users[0];
};
