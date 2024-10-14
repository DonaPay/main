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
import { AddressDisplay } from '@/utils/addressUtility'



const Sidebar = ({ section, setSection, setGroup, group }: SideBarPropsType) => {

    const { user, loading, groups } = useGlobalContext()

    return (
        <div className='h-full flex gap-4 flex-col justify-between text-black dark:text-white'>
            {/* header  */}

            <div className='flex justify-between items-center'>
                <div className='text-lg '>
                    Groups
                </div>
                {user && <div className='flex gap-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Plus onClick={() => setSection("create-group")} className='bg-transparent rounded-full' height={20} width={20} />
                            </TooltipTrigger>
                            <TooltipContent className='text-[12px]'>
                                <p className=''>Create Group</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <UsersRound onClick={() => setSection("join-group")} 
                                className='bg-transparent rounded-full' height={20} width={20} />
                            </TooltipTrigger>
                            <TooltipContent className='text-[12px]'>
                                <p className=''>Join Group</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>}
            </div>

            {/* groups  */}
            <div className='flex flex-grow flex-col gap-4 overflow-y-scroll'>
                {groups.length == 0 && Array.from({ length: 6 }, (_, index) => (
                    <div className="flex items-center space-x-4 w-full " key={index}>
                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                        </div>
                    </div>))}
                {groups && !loading && (
                    groups.map((_group: Group) => {
                        return (
                            <div key={_group.id} className={`flex items-center gap-2 w-full rounded-md 
                                ${section == "group" && _group == group ? "bg-gray-100 dark:bg-neutral-800" :"" }`} 
                            onClick={() => {
                                setSection("group");
                                setGroup(_group)
                                }}>
                                <Avatar className="min-h-12 min-w-12 rounded-full">
                                    <AvatarImage src={_group?.photo} alt={_group?.name} className='bg-gray-200 dark:bg-neutral-700'/>
                                    <AvatarFallback className='bg-gray-200 dark:bg-neutral-700'>{_group?.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="w-full font-light text-sm">
                                    <div>{_group.name} </div>
                                    <div className='text-neutral-800 dark:text-neutral-400'>{_group.members.length} members</div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer  */}

            <div className='w-full'>
                {user == null && loading && <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center space-x-4 w-full">
                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                        </div>
                    </div>
                </div>}
                {user && <div className="flex items-center gap-2 w-full">
                    <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                        <AvatarImage src={user?.photoUrl} alt={user.name} className='bg-gray-200 dark:bg-neutral-700'/>
                        <AvatarFallback className='bg-gray-200 dark:bg-neutral-700'>{user?.name.charAt(0)}</AvatarFallback>
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


export default Sidebar