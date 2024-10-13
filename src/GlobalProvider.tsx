"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from './GlobalTypes';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { getUserStruct } from './view-functions/getUserStruct';

interface Group {
    id: string;
    name: string;
}

interface GlobalContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    groups: Group[];
    setGroups: (groups: Group[]) => void;
    loading: boolean;
    setLoading: (val: boolean) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
    user: null,
    setUser: () => { },
    groups: [],
    setGroups: () => { },
    loading: true,
    setLoading: () => { }
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { account, connected } = useWallet();

    useEffect(() => {
        const fetchData = async () => {
            if (!connected || !account) {
                console.error("Wallet not connected or account missing");
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const fetchedUser = await getUserStruct(account.address);
                console.log("User", fetchedUser);

                if (fetchedUser && fetchedUser) {
                    setUser(fetchedUser);
                } else {
                    console.error("No user data found");
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null);
            } finally {
                // setLoading(false);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, [connected, account]); // Add 'connected' and 'account' as dependencies

    return (
        <GlobalContext.Provider value={{ user, setUser, groups, setGroups, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
