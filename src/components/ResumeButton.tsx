'use client'

import { Button } from './ui/button'
import { FileDown } from 'lucide-react'
import { sendGAEvent } from '@next/third-parties/google'

const ResumeButton = () => {
    return (
        <Button onClick={() => sendGAEvent({event: "resumeButton" , value: "resumeButtonClicked"})} variant="outline">
            <span className="font-semibold">Resume</span>
            <FileDown className="ml-2 size-5" />
        </Button>
    )
}

export default ResumeButton