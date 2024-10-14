"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Group, User } from "./GlobalTypes";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getUserStruct } from "./view-functions/getUserStruct";
import { getUserGroupStruct } from "./view-functions/getUserGroupStruct";

interface GlobalContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  section: string;
  setSection: (val: string) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  setUser: () => {},
  groups: [],
  setGroups: () => {},
  loading: true,
  setLoading: () => {},
  section: "",
  setSection: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [section, setSection] = useState<string>("");
  const { account, connected } = useWallet();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!connected || !account) {
        console.error("Wallet not connected or account missing");
        return;
      }

      setLoading(true);

      try {
        // Fetch user data
        const fetchedUser = await getUserStruct(account.address);

        if (fetchedUser && fetchedUser[0]) {
          setUser(fetchedUser[0] as User);

          // Fetch groups only if user is fetched successfully
          const fetchedGroups = await getUserGroupStruct(account.address);

          if (fetchedGroups) {
            setGroups(fetchedGroups as Group[]);
          } else {
            console.error("No groups data found");
            setGroups([]);
          }
        } else {
          console.error("No user data found");
          setUser(null);
          setGroups([]);
        }
      } catch (error) {
        console.error("Error fetching user or groups data:", error);
        setUser(null);
        setGroups([]);
      } finally {
        setLoading(false); // Set loading to false after both user and groups fetch complete
      }
    };

    fetchUserData();
  }, [connected, account]);

  return (
    <GlobalContext.Provider value={{ user, setUser, groups, setGroups, loading, setLoading, section, setSection }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
