export const donapaycore_abi = {
  address: "0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d",
  name: "DonaPayCore",
  friends: [],
  exposed_functions: [
    {
      name: "createGroup",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String"],
      return: [],
    },
    {
      name: "createUser",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::string::String", "0x1::string::String"],
      return: [],
    },
    {
      name: "getUser",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["address"],
      return: ["0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::User"],
    },
  ],
  structs: [
    {
      name: "Group",
      is_native: false,
      is_event: false,
      abilities: ["copy", "drop", "store"],
      generic_type_params: [],
      fields: [
        {
          name: "id",
          type: "u64",
        },
        {
          name: "name",
          type: "0x1::string::String",
        },
        {
          name: "admins",
          type: "vector<address>",
        },
        {
          name: "members",
          type: "vector<0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::User>",
        },
      ],
    },
    {
      name: "Groups",
      is_native: false,
      is_event: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "allGroups",
          type: "0x1::table::Table<u64, 0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::Group>",
        },
        {
          name: "curr_id",
          type: "u64",
        },
      ],
    },
    {
      name: "User",
      is_native: false,
      is_event: false,
      abilities: ["copy", "drop", "store"],
      generic_type_params: [],
      fields: [
        {
          name: "addr",
          type: "address",
        },
        {
          name: "name",
          type: "0x1::string::String",
        },
        {
          name: "photoUrl",
          type: "0x1::string::String",
        },
        {
          name: "groups",
          type: "vector<u64>",
        },
      ],
    },
    {
      name: "Users",
      is_native: false,
      is_event: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        {
          name: "user",
          type: "0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::User",
        },
      ],
    },
  ],
};
