'use client'

import { useState, useRef, useCallback } from "react"
import { useShallow } from "zustand/shallow"
import throttle from "throttleit"

import { useConfigStore } from "@/stores/configStore"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const ConfigPanel = () => {
    const { filterSize, setFilterSize, maxRange, setSource } = useConfigStore(useShallow(
        state => ({
            filterSize: state.filterSize,
            maxRange: state.maxRange,
            setFilterSize: state.setFilterSize,
            setSource: state.setSource
        })
    ))

    const [ dSize, setDSize ] = useState<number>(filterSize), // Displayed size
        [ isImmediateUpdate, setImmediateUpdate ] = useState(false) // Immediate update toggler
    const inputPickRef = useRef<HTMLInputElement>(null) // File picker

    // Image picker (manager)
    const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imgURL = URL.createObjectURL(file)
            setSource(imgURL)
        }
    }

    // Filter Size (radius) handler
    const handleFilterSizeChange = (e: any) => {
        setDSize(e[0]);
        if (isImmediateUpdate) setFilterSize(e[0])
    }

    // Image resetter
    const handleImageReset = () => {
        if (inputPickRef.current) {
            inputPickRef.current.value = ''
            setSource(null)
        }
    }

    return (
        <div className="config-menu">
            {/* Pixelization radius */}
            <div className="config-option">
                <span>Radius: {dSize || 'Unset'}</span>
                <Slider
                    onValueChange={handleFilterSizeChange}
                    onValueCommit={e => setFilterSize(e[0])}
                    defaultValue={[dSize]}
                    value={[dSize]}
                    max={maxRange}
                />
            </div>
            {/* Toggle: immediate udpate */}
            <div className="config-option my-3">
                <Checkbox id="toggleImmediateUpdate" checked={isImmediateUpdate} onClick={() => setImmediateUpdate(prev => !prev)} />
                <label htmlFor="toggleImmediateUpdate">
                    Immediate update
                </label>
            </div>
            {/* File selection */}
            <div className="config-option">
                <label htmlFor="imgPicker" className="text-nowrap">Image</label>
                <Input
                    id="imgPicker" type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImagePick}
                    ref={inputPickRef}
                />
                <Button onClick={handleImageReset}>Reset image</Button>
            </div>
        </div>
    )
}

export default ConfigPanel