"use client"

import Canvas from "@/components/canvas"
import ConfigPanel from "@/components/configPanel"

const App = () => {
  return (
    <section className="w-screen h-screen overflow-hidden relative">
      <ConfigPanel />
      <div className="w-auto h-full grid place-items-center">
        <Canvas
          width={window.innerWidth - (window.innerWidth * 0.1)}
          height={window.innerHeight - (window.innerWidth * 0.1)}
          className="border-2 border-blue-400 h-[80dvh]"
        />
      </div>
    </section>
  )
}

export default App