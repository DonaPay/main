"use client"
import { Skeleton } from '../ui/skeleton'
import { useGlobalContext } from '@/GlobalProvider'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Sidebar = () => {
    const {user, loading} = useGlobalContext()
    return (
        <div className='bg-gray-200 dark:bg-neutral-900 text-black dark:text-white fixed left-0 top-0 bottom-0  
            min-w-[20%] flex flex-col p-4 md:p-6 gap-4'>

            {/* header  */}

            <div className='flex justify-between items-center'>
                <div className='text-lg font-extralight'>
                    Groups
                </div>
                <div className='rounded-xl bg-black p-2 px-3 text-sm font-extralight'>
                    {/* {user?.addr} */}
                    0x123456sd2442
                </div>
            </div>

            {/* groups  */}
            <div className='h-full flex flex-col gap-4'>
                {loading && Array.from({ length: 5 }, (_, index) => (
                    <div className="flex items-center space-x-4 w-full" key={index}>
                        <Skeleton className="min-h-12 min-w-12 rounded-full" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 max-w-full" />
                            <Skeleton className="h-4 max-w-full" />
                        </div>
                    </div>))}
            </div>
            
            
            {/* Footer  */}

            <div className='w-full flex'>
                {user && <div className="flex items-center space-x-4 w-full">
                    <Avatar className="min-h-12 min-w-12 rounded-full">
                        <AvatarImage src={user?.photoUrl} alt="@shadcn" />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                   <div className="w-full font-light text-sm">
                        <div>{user.name}</div>
                        <AddressDisplay address={user.addr} maxLength={20}/>
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
const AddressDisplay = ({ address, maxLength }: { address: string, maxLength :number}) => {
    return (
        <p>
            {truncateAddress(address, maxLength)}
        </p>
    );
};

export default Sidebar