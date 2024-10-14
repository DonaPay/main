import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
import { Group } from "@/GlobalTypes";

export const getGroupStruct = async (id: number) => {
  try {
    const group = await aptosClient().view<[Group]>({
      payload: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::get_group`,
        typeArguments: [],
        functionArguments: [id],
      },
    });

    return group[0];
  } catch (error: any) {
    if (error.message.includes("4")) {
      console.error("Error: Group not found with the given ID.");
      alert("Error: Group not found with the given ID.");
      return null;
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
};
