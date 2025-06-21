'use client'

import { useRef, useEffect } from "react"
import { useConfigStore } from "@/stores/configStore"
import { useShallow } from "zustand/shallow"

type TCanvasProps = React.HTMLProps<HTMLCanvasElement>

const setupCanvas = (ctx: CanvasRenderingContext2D, p_size: number, img: HTMLImageElement) => {
    // Generating the canvas
    ctx.canvas.width = img.naturalWidth
    ctx.canvas.height = img.naturalHeight

    ctx.drawImage(img, 0, 0)
    if (p_size <= 1) return

    const fullData = ctx.getImageData(0, 0, img.width, img.height).data

    // Actual filter render
    for (let xc = 0; xc < img.width; xc += p_size) {
        for (let yc = 0; yc < img.height; yc += p_size) {
            const i = ((yc * img.width) + xc) * 4// [r, g, b, a]
            const r = fullData[i], g = fullData[i + 1], b = fullData[i + 2]

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(xc, yc, p_size, p_size)
        }
    }
}

// Canvas component
const Canvas = (rest: TCanvasProps) => {
    const cvRef = useRef<HTMLCanvasElement>(null),
        imgRef = useRef<HTMLImageElement>(null)

    const { filterSize, source } = useConfigStore(useShallow(
        state => ({
            filterSize: state.filterSize,
            source: state.source
        })
    ))
    
    useEffect(() => {
        const cv = cvRef.current
        if (cv) {
            const ctx = cv.getContext('2d')
            if (!ctx) return
            
            if (!imgRef.current || imgRef.current.src !== source) {
                // Preparing a new image
                const img = new Image()
                img.src = source || '/assets/imgs/demo.jpg'
                img.onload = () => {
                    imgRef.current = img
                    setupCanvas(ctx, filterSize, img)
                }
            } else setupCanvas(ctx, filterSize, imgRef.current)
        }
    }, [ filterSize, source ])
    
    return <canvas {...rest} ref={cvRef} />
}

export default Canvas