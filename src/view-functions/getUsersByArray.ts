import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";

export const getUsersByArray = async (addresses: string[]) => {
  try {
    const users = await aptosClient().view<[string[]]>({
      payload: {
        function: `${PUBLISHER_ADDRESS}::DonaPayCore::getUsersByArray`,
        typeArguments: [],
        functionArguments: [addresses],
      },
    });

    return users[0];
  } catch (error: any) {
    const errorMessage = error?.message || "An error occurred";
    if (errorMessage.includes("Failed to borrow global resource")) {
      alert("One or more addresses that you passed may not be valid. Try again");
    } else {
      console.error("Error fetching users:", errorMessage);
      alert("Failed to fetch users. Please try again later.");
    }

    return null;
  }
};
