import React from 'react'
import { GroupChatPropstype } from './types'

const GroupChat = ({ group }: GroupChatPropstype) => {
    return (
        <div className='w-full h-full p-4'>
            {group.name}
        </div>
    )
}

export default GroupChat