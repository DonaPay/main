import { aptosClient } from "@/utils/aptosClient";
import { PUBLISHER_ADDRESS } from "@/constants";
import { User } from "@/GlobalTypes";;
import { toast } from "sonner";

export const getUsersByArray = async (addresses: string[]) => {
  try {
    const users = await aptosClient().view<[User[]]>({
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
      toast.error("One or more addresses that you passed may not be valid. Try again");
    } else {
      console.error("Error fetching users:", errorMessage);
      toast.error("Failed to fetch users. Please try again later.");
    }

    return null;
  }
};
