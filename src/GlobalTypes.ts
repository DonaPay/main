export type User = {
  addr: string;
  name: string;
  photoUrl: string;
  groups: number[];
};

export type Group = {
  id: string;
  name: string;
  photo: string;
  admins: string[];
  members: string[];
  joinRequests: string[];
};
