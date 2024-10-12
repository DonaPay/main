import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
// const aptos = new Aptos();

export const getGroupStruct = async (id: number) => {
  const group = await aptosClient().view<[string]>({
    payload: {
      function: `${PUBLISHER_ADDRESS}::DonaPayCore::get_group`,
      typeArguments: [],
      functionArguments: [id],
    },
  });

  return group;
};
