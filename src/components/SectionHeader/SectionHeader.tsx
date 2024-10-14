import { SectionHeaderPropsType } from './types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Ellipsis } from 'lucide-react'

const SectionHeader = ({ group, section, setSection }: SectionHeaderPropsType) => {
    return (
        <div className='bg-gray-200 dark:bg-neutral-900 text-black
       dark:text-white flex justify-between items-center w-full min-h-[10vh] border px-4 py-2'>
            {(section === "group" || section === "group-details") && group && (
                <div
                    className="flex items-center gap-2 w-full rounded-md"
                    onClick={() => setSection("group-details")}
                >
                    <Avatar className="min-h-11 min-w-11 rounded-full">
                        <AvatarImage
                            src={group?.photo}
                            alt={group?.name}
                            className="bg-gray-200 dark:bg-neutral-700"
                        />
                        <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">
                            {group?.name.charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="w-full font-light text-sm">
                        <div>{group.name}</div>
                        <div className="text-neutral-800 dark:text-neutral-400">
                            {group.members.length} members
                        </div>
                    </div>

                    <div className="justify-self-end">
                        <Ellipsis />
                    </div>
                </div>
            )}
            {section === "join-group" && (
                <div className="flex items-center gap-2 w-full rounded-md">
                    Join Group
                </div>
            )}

        </div>
    )
}

export default SectionHeader