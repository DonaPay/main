import React from 'react'
import { GroupChatPropstype } from './types'

const GroupChat = ({ groupId }: GroupChatPropstype) => {
    return (
        <div className='w-full h-full'>
            GroupChat {groupId}
        </div>
    )
}

export default GroupChat