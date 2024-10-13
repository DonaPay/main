import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
import { User } from "@/GlobalTypes";
// const aptos = new Aptos();

export const getUserStruct = async (address: string) => {
  const user = await aptosClient().view({
    payload: {
      function: `${PUBLISHER_ADDRESS}::DonaPayCore::getUser`,
      typeArguments: [],
      functionArguments: [address],
    },
  });
  if(user[0])
  return user[0] as User;
  else return null
};
