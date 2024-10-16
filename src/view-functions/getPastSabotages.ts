import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
import { Group } from "@/GlobalTypes";

export const getPastSabotages = async (grpId: number) => {
  try {
    const group = await aptosClient().view<[Group]>({
      payload: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::get_group_past_sabotages`,
        typeArguments: [],
        functionArguments: [grpId],
      },
    });

    return group[0];
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
    return null;
  }
};
