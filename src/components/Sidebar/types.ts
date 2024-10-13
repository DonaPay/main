import { SetStateAction } from "react";

export type SideBarPropsType = {
  section: string;
  groupId: string;
  setGroupId: React.Dispatch<SetStateAction<string>>;
  setSection: React.Dispatch<SetStateAction<string>>;
};