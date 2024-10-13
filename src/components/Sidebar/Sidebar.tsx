"use client"
import { Skeleton } from '../ui/skeleton'
import { useGlobalContext } from '@/GlobalProvider'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, UsersRound } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SideBarPropsType } from './types'
import { Group } from '@/GlobalTypes'



const Sidebar = ({ section, setSection, setGroupId, groupId }: SideBarPropsType) => {

    const { user, loading, groups } = useGlobalContext()

    const handleAddGroup = () => {
        setSection("add-group")
    }
    const handleJoinGroup = () => {
        setSection("join-group")
    }

    return (
        <div className='h-full flex gap-4 flex-col justify-between text-black dark:text-white'>
            {/* header  */}

            <div className='flex justify-between items-center'>
                <div className='text-lg '>
                    Groups
                </div>
                <div className='flex gap-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Plus onClick={handleAddGroup} className='bg-transparent rounded-full' height={20} width={20} />
                            </TooltipTrigger>
                            <TooltipContent className='text-[12px]'>
                                <p className=''>Create Group</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <UsersRound onClick={handleJoinGroup} className='bg-transparent rounded-full' height={20} width={20} />
                            </TooltipTrigger>
                            <TooltipContent className='text-[12px]'>
                                <p className=''>Join Group</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* groups  */}
            <div className='flex flex-grow flex-col gap-4 overflow-y-scroll'>
                {groups.length == 0 && Array.from({ length: 6 }, (_, index) => (
                    <div className="flex items-center space-x-4 w-full" key={index}>
                        <Skeleton className="min-h-12 min-w-12 rounded-full" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 max-w-full" />
                            <Skeleton className="h-4 max-w-full" />
                        </div>
                    </div>))}
                {groups && !loading && (
                    groups.map((group: Group) => {
                        return (
                            <div key={group.id} className={`flex items-center gap-2 w-full rounded-md 
                                ${section == "group" && groupId == group.id ? "bg-gray-100 dark:bg-neutral-800" :"" }`} 
                            onClick={() => {
                                setSection("group");
                                setGroupId(group.id)
                                }}>
                                <Avatar className="min-h-12 min-w-12 rounded-full">
                                    <AvatarImage src={group?.photo} alt={group?.name} />
                                    <AvatarFallback>{group?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="w-full font-light text-sm">
                                    <div>{group.name}</div>
                                    <div>{group.members.length} members</div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer  */}

            <div className='w-full'>
                {!user && <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center space-x-4 w-full">
                        <Skeleton className="min-h-12 min-w-12 rounded-full" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 max-w-full" />
                            <Skeleton className="h-4 max-w-full" />
                        </div>
                    </div>
                </div>}
                {user && <div className="flex items-center gap-2 w-full">
                    <Avatar className="min-h-12 min-w-12 rounded-full">
                        <AvatarImage src={user?.photoUrl} alt="@shadcn" />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full font-light text-sm">
                        <div>{user.name}</div>
                        <AddressDisplay address={user.addr} maxLength={20} />
                    </div>
                </div>}
            </div>
        </div>

    )
}
const truncateAddress = (address: string, maxLength: number) => {
    if (address.length <= maxLength) {
        return address; // Return the full address if it's shorter than the maximum length
    }

    const charsToShow = maxLength - 5; // 5 accounts for '0x...' and the ellipsis ('...')
    const front = Math.floor(charsToShow / 2); // Show half characters from the front
    const back = Math.ceil(charsToShow / 2); // Show the remaining characters from the back

    return `${address.slice(0, front)}...${address.slice(-back)}`;
};

// Example usage in a React component
const AddressDisplay = ({ address, maxLength }: { address: string, maxLength: number }) => {
    return (
        <p>
            {truncateAddress(address, maxLength)}
        </p>
    );
};

export default Sidebar