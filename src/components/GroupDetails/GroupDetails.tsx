import { Group, User } from '@/GlobalTypes'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { AddressDisplay } from '@/utils/addressUtility'
import { getUsersByArray } from '@/view-functions/getUsersByArray'
import Link from 'next/link'

const GroupDetails = ({ group }: { group: Group }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
    const [admins, setAdmins] = useState<User[]>([])
    const [groupMembers, setGroupMembers] = useState<User[]>([])
    const [groupJoinRequests, setGroupJoinRequests] = useState<User[]>([])

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const linkUrl = `${baseUrl}/app/?groupId=${group.id}`

    useEffect(() => {
        QRCode.toDataURL(linkUrl)
            .then(url => {
                setQrCodeUrl(url)
            })
            .catch(err => {
                console.error(err)
            })
        console.log(groupJoinRequests)
        const fetchData = async () => {
            const fetchedAdmins = await getUsersByArray(group.admins)
            console.log(fetchedAdmins)
            if (fetchedAdmins && fetchedAdmins.length > 0)
                setAdmins(fetchedAdmins as any)

            const fetchedMembers = await getUsersByArray(group.members)
            console.log(fetchedMembers)
            if (fetchedMembers && fetchedMembers.length > 0)
                setGroupMembers(fetchedMembers as any)

            const fetchedJoinRequests = await getUsersByArray(group.joinRequests)
            console.log(fetchedJoinRequests)
            if (fetchedJoinRequests && fetchedJoinRequests.length > 0)
                setGroupJoinRequests(fetchedJoinRequests as any)


        }
        fetchData()
    }, [group])

    return (
        <div className='w-full h-full p-4 flex flex-col gap-4 overflow-y-scroll'>
            <div className="w-full flex gap-4 flex-col md:grid md:grid-cols-[1fr,3fr]">
                {/* QR Code */}
                <div className='flex flex-col gap-2'>
                    <Link href={linkUrl}>
                        <Image src={qrCodeUrl} width={250} height={250} alt='Join Group QR Code' />
                    </Link>
                    <div>Scan QR Code to join {group.name}</div>
                </div>

                {/* Admins */}
                <div className='w-full flex flex-col gap-4'>
                    <div className='text-3xl font-bold'>
                        Group Admins
                    </div>
                    <div className='w-full grid grid-cols-[1fr,1fr] gap-4'>
                        {admins.length === 0 && (
                            <>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {admins.length > 0 && admins.map((admin, idx) => (
                        <div className="flex items-center gap-2 w-full" key={idx}>
                            <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                                <AvatarImage src={admin?.photoUrl} alt={admin.name} className='bg-gray-200 dark:bg-neutral-700' />
                                <AvatarFallback className='bg-gray-200 dark:bg-neutral-700'>
                                    {admin?.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-full font-light text-sm">
                                <div>{admin.name}</div>
                                <AddressDisplay address={admin.addr} maxLength={25} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full flex flex-col md:grid md:grid-cols-[1fr,1fr] gap-4'>
                
                {/* Members */}
                <div className='w-full flex flex-col gap-4'>
                    <div className='text-3xl font-bold'>
                        Group Members
                    </div>
                    <div className='w-full grid grid-cols-[1fr,1fr] gap-4'>
                        {groupMembers.length === 0 && (
                            <>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {groupMembers.length > 0 && groupMembers.map((groupMember, idx) => (
                        <div className="flex items-center gap-2 w-full" key={idx}>
                            <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                                <AvatarImage src={groupMember?.photoUrl} alt={groupMember.name} className='bg-gray-200 dark:bg-neutral-700' />
                                <AvatarFallback className='bg-gray-200 dark:bg-neutral-700'>
                                    {groupMember?.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-full font-light text-sm">
                                <div>{groupMember.name}</div>
                                <AddressDisplay address={groupMember.addr} maxLength={25} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* join Requests */}
                <div className='w-full flex flex-col gap-4'>
                    <div className='text-3xl font-bold'>
                        Join Requests
                    </div>
                    <div className='w-full grid grid-cols-[1fr,1fr] gap-4'>
                        {groupMembers.length === 0 && (
                            <>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center space-x-4 w-full">
                                        <Skeleton className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                            <Skeleton className="h-4 max-w-full bg-gray-200 dark:bg-neutral-700" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {groupMembers.length > 0 && groupMembers.map((groupMember, idx) => (
                        <div className="flex items-center gap-2 w-full" key={idx}>
                            <Avatar className="min-h-12 min-w-12 rounded-full bg-gray-200 dark:bg-neutral-700">
                                <AvatarImage src={groupMember?.photoUrl} alt={groupMember.name} className='bg-gray-200 dark:bg-neutral-700' />
                                <AvatarFallback className='bg-gray-200 dark:bg-neutral-700'>
                                    {groupMember?.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-full font-light text-sm">
                                <div>{groupMember.name}</div>
                                <AddressDisplay address={groupMember.addr} maxLength={25} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupDetails
