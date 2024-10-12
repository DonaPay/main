import { aptosClient } from "@/utils/aptosClient";
// const aptos = new Aptos();

export const getUserStruct = async (address: string) => {
  const user = await aptosClient().view<[string]>({
    payload: {
      function: "0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::getUser",
      typeArguments: [],
      functionArguments: [address],
    },
  });

  return user;
};
