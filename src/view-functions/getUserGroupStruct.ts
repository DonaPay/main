import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";

export const getUserGroupStruct = async (address: string) => {
  const userGroups = await aptosClient().view({
    payload: {
      function: `${PUBLISHER_ADDRESS}::DonaPayCore::get_user_groups`,
      typeArguments: [],
      functionArguments: [address],
    },
  });
  if (userGroups[0]) return userGroups[0];
  else return null;
};
