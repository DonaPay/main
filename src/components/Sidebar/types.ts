import { Group } from "@/GlobalTypes";
import { SetStateAction } from "react";

export type SideBarPropsType = {
  section: string;
  group: Group | null;
  setGroup: React.Dispatch<SetStateAction<Group | null>>;
  setSection: React.Dispatch<SetStateAction<string>>;
};