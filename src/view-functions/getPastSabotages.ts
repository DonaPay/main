import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
import {Sabotage } from "@/GlobalTypes";

export const getPastSabotages = async (grpId: number) => {
  try {
    const sabotages = await aptosClient().view<[Sabotage[]]>({
      payload: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::get_group_past_sabotages`,
        typeArguments: [],
        functionArguments: [grpId],
      },
    });

    return sabotages[0];
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
    return null;
  }
};
