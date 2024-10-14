import { Group } from "@/GlobalTypes"
import { SetStateAction } from "react";

export type SectionHeaderPropsType = {
  group: Group | null;
  heading?: string;
  section: string;
  setSection: React.Dispatch<SetStateAction<string>>;
};