import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FileUpload } from '../ui/file-upload'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { uploadToArweave } from '@/utils/UploadToArweave'
import { createGroup } from '@/entry-functions/CreateGroup'

const CreateGroup = () => {
    const [groupImage, setGroupImage] = useState<File | null>(null)
    const [name, setEmail] = useState<string>('')

    const { account, signAndSubmitTransaction } = useWallet()


    const handleFileChange = (f: File | null) => {
        setGroupImage(f)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleCreateProfile = async () => {
        try {
            if (groupImage) {
                const hash = await uploadToArweave(groupImage)
                const imageUrl = `https://akrd.net/${hash}`
                console.log("url", imageUrl)
                const trxObject = await createGroup(name, imageUrl)
                if (trxObject) {
                    const txn = await signAndSubmitTransaction(trxObject as any);
                    console.log("create Group txn", txn)
                }
            }
            else console.log("no image")
        } catch (error) {

        }
    }

    return (
        <div className='w-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white h-full flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                <div className="w-full max-w-3xl mx-auto min-h-80 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                    <FileUpload onChange={handleFileChange}
                        heading='Upload Your Image'
                        subheading=' Drag or drop your Image here or click to upload' />
                </div>
                <p className='w-full max-w-3xl mx-auto font-light text-sm text-right'>Group's profile photo gets securely stored on the Arweave Network.</p>
            </div>

            <div className="max-w-3xl mx-auto grid w-full items-center gap-1.5">
                {/* Name input */}
                <Label htmlFor="name">Group Name</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Full name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            {account && account.address && <div className="max-w-3xl text-wrap break-words mx-auto w-full">
                Wallet address : <p className='text-sm font-light'>{account?.address}</p>
            </div>}
            <HoverBorderGradient
                containerClassName="rounded-full max-w-xl mx-auto"
                as="button"
                className="text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                onClick={handleCreateProfile}
            >
                <span>Create Group</span>
            </HoverBorderGradient>
        </div>
    )
}

export default CreateGroup
