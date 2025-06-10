import { useState, useRef, useEffect } from "react"
import Bead from "./Bead"


const wampumDimensions = {
    rows:10,
    columns: 200,
}

const BEAD_WIDTH_PX = 3;
const BEAD_HEIGHT_PX = 25;
const BEAD_GAP_PX = 0.5;


const BEAD_COLORS = {
    'white': 'bg-wampum-white border-wampum-white-border',
    'purple': 'bg-wampum-purple border-wampum-purple-border',
    'light-purple': 'bg-wampum-light-purple border-wampum-light-purple-border',
    'dark-purple': 'bg-wampum-dark-purple border-wampum-dark-purple-border',
};

export default function WampumBuilder() {
 
const [beadsGrid, setBeadsGrid]= useState(Array(wampumDimensions.rows*wampumDimensions.columns).fill('white'))

const gridRef = useRef(null)

useEffect( () => {
    if (gridRef.current) {
        gridRef.current.style.setProperty('--grid-rows', wampumDimensions.rows)
        gridRef.current.style.setProperty('--grid-cols', wampumDimensions.columns)
        gridRef.current.style.setProperty('--bead-width', BEAD_WIDTH_PX)
        gridRef.current.style.setProperty('--bead-height', BEAD_HEIGHT_PX)
        gridRef.current.style.setProperty('--bead-gap', BEAD_GAP_PX)
    }
}, [])

const handleBeadClick = (index) => {
    console.log(`Clicked bead at index: ${index}`)
}

const handleBeadMouseEnter = (index) => {
    console.log(`Mouse entered bead at index: ${index}`)
}


    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-theme-light-bg text-theme-text p-8">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-theme-deep-blue">
                Weave Your Understanding: Create Wampum Belt Designs
            </h2>

            <div className="w-full max-w-full overflow-x-auto p-2 border border-gray-300 rounded-lg bg-white shadow-lg">
                <div
                    className={`wampum-grid grid gap-px border-2 border-gray-700 bg-gray-400 p-1.5`}
                    ref={gridRef}
                >
                    {beadsGrid.map((color, index) => (
                        <Bead
                            key={index}
                            beadClasses={BEAD_COLORS[color]}
                            onClick={() => handleBeadClick(index)}
                            onMouseEnter={() => handleBeadMouseEnter(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



//Good colors:
// #c2948a
// #9b6a6c
// #b09398
// #e9d6ec

