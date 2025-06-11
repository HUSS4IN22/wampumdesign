import React, { useState, useEffect, useRef, useCallback} from 'react';
import Bead from './Bead';

const wampumDimensions = {
    rows: 10,
    columns: 150,
};

const BEAD_WIDTH_PX = 8;
const BEAD_HEIGHT_PX = 24;
const BEAD_ROW_GAP_PX = 3;
const BEAD_COLUMN_GAP_PX = 1.5;

const BEAD_COLORS = {
    'white': 'bead-gradient-white border-wampum-white-border',
    'purple': 'bead-gradient-purple border-wampum-purple-border',
    'light-purple': 'bg-wampum-light-purple border-wampum-light-purple-border',
    'dark-purple': 'bg-wampum-dark-purple border-wampum-dark-purple-border',
};

export default function WampumBuilder() {
    const [beads, setBeads] = useState(
        Array(wampumDimensions.rows * wampumDimensions.columns).fill('white')
    );
    const [isDragging, setIsDragging] = useState(false);
    const [brushMode, setBrushMode] = useState('paint');
    const [statusMessage, setStatusMessage] = useState('');

    const gridRef = useRef(null);
    const beadsRef = useRef(beads);

    useEffect(() => {
        beadsRef.current = beads;
    }, [beads]);

    useEffect(() => {
        try {
            const savedBeadsJson = localStorage.getItem('wampumBelt');
            if (savedBeadsJson) {
                const savedData = JSON.parse(savedBeadsJson);
                if (savedData.beads && savedData.dimensions &&
                    savedData.beads.length === wampumDimensions.rows * wampumDimensions.columns &&
                    savedData.dimensions.rows === wampumDimensions.rows &&
                    savedData.dimensions.columns === wampumDimensions.columns) {
                    setBeads(savedData.beads);
                    setStatusMessage("Belt loaded from your browser's storage!");
                } else {
                    setBeads(Array(wampumDimensions.rows * wampumDimensions.columns).fill('white'));
                    setStatusMessage("Loaded belt had different dimensions or invalid data. Starting fresh.");
                }
            } else {
                setStatusMessage("No saved belt found in browser. Start drawing!");
            }
        } catch (e) {
            console.error("Error loading from local storage on mount:", e);
            setStatusMessage(`Error loading belt: ${e.message}.`);
        }
    }, []); 

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.style.setProperty('--grid-rows', wampumDimensions.rows);
            gridRef.current.style.setProperty('--grid-cols', wampumDimensions.columns);
            gridRef.current.style.setProperty('--bead-width', `${BEAD_WIDTH_PX}px`);
            gridRef.current.style.setProperty('--bead-height', `${BEAD_HEIGHT_PX}px`);
            gridRef.current.style.setProperty('--bead-row-gap', `${BEAD_ROW_GAP_PX}px`);
            gridRef.current.style.setProperty('--bead-column-gap', `${BEAD_COLUMN_GAP_PX}px`);
        }
    }, []);

    const getActiveColor = useCallback(() => {
        return brushMode === 'paint' ? 'purple':'white';
    }, [brushMode]);

    const saveBeadsToLocalStorage = useCallback(() => {
        try {
            const dataToSave = {
                beads: beadsRef.current,
                dimensions: wampumDimensions,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('wampumBelt', JSON.stringify(dataToSave));
            setStatusMessage("Belt saved automatically to your browser!");
        } catch (e) {
            console.error("Error saving to local storage:", e);
            setStatusMessage(`Error saving: ${e.message}. Storage might be full.`);
        }
    }, []);

    const colorBead = useCallback((startIndex) => {
        setBeads(prevBeads => {
            const newBeads = [...prevBeads];
            const colorToApply = getActiveColor();

            if (newBeads[startIndex] !== colorToApply) {
                newBeads[startIndex] = colorToApply;
                return newBeads
            }
            return prevBeads;
        })
    }, [getActiveColor]);


    const handleMouseDown = useCallback(()=> {
        setIsDragging(true);
    }, []);

    const handleMouseUp = useCallback(()=> {
        setIsDragging(false);
        saveBeadsToLocalStorage();
    }, [saveBeadsToLocalStorage]);

    const handleMouseLeave = useCallback(()=> {
        if (isDragging) {
            setIsDragging(false);
            saveBeadsToLocalStorage();
        }
    }, [isDragging, saveBeadsToLocalStorage]);


    const handleBeadClick = useCallback((index) => {
        colorBead(index);
        setTimeout(() => {
            saveBeadsToLocalStorage();
        }, 0);
    }, [colorBead, saveBeadsToLocalStorage]);


    const handleBeadMouseEnter = useCallback((index) => {
        if (isDragging) {
            colorBead(index);
        }
    }, [colorBead, isDragging]);

    const getButtonClasses = (mode) => {
        return `py-2 px-4 rounded-full font-semibold transition-colors duration-200 ease-in-out ${brushMode === mode ? 'bg-[#effad1] text-[#051923] shadow-md border-2 border-[#effad1]' : 'bg-[#082637] text-[#effad1] hover:bg-[#effad1] hover:text-[#082637] text-xs'}`
    }

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.style.setProperty('--grid-rows', wampumDimensions.rows);
            gridRef.current.style.setProperty('--grid-cols', wampumDimensions.columns);
            gridRef.current.style.setProperty('--bead-width', `${BEAD_WIDTH_PX}px`);
            gridRef.current.style.setProperty('--bead-height', `${BEAD_HEIGHT_PX}px`);
            gridRef.current.style.setProperty('--bead-row-gap', `${BEAD_ROW_GAP_PX}px`);
            gridRef.current.style.setProperty('--bead-column-gap', `${BEAD_COLUMN_GAP_PX}px`);
        }
    }, []);

    const handleSaveButtonClick = useCallback(() => {
        saveBeadsToLocalStorage(); 
        setStatusMessage("Belt explicitly saved!"); 
    }, [saveBeadsToLocalStorage]); 

    const handleLoadButtonClick = useCallback(() => {
        try {
            const savedBeadsJson = localStorage.getItem('wampumBelt');
            if (savedBeadsJson) {
                const savedData = JSON.parse(savedBeadsJson);
                if (savedData.beads && savedData.dimensions &&
                    savedData.beads.length === wampumDimensions.rows * wampumDimensions.columns &&
                    savedData.dimensions.rows === wampumDimensions.rows &&
                    savedData.dimensions.columns === wampumDimensions.columns) {
                    setBeads(savedData.beads);
                    setStatusMessage("Belt reloaded from browser storage!");
                } else {
                    setStatusMessage("No compatible belt found to reload.");
                }
            } else {
                setStatusMessage("No saved belt found in browser to reload.");
            }
        } catch (e) {
            console.error("Error reloading from local storage via button:", e);
            setStatusMessage(`Error reloading belt: ${e.message}.`);
        }
    }, []);


    return (
        <div id="wampum-builder-section" className="w-full flex flex-col items-center bg-[#051923] text-theme-text px-2 pb-8">
            <h2 className="text-sm xs:text-md sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-6 text-theme-deep-blue text-center">
                Create Your Wampum Belt Designs
            </h2>

            <div className="mb-4 flex flex-wrap justify-center space-x-2 sm:space-x-4">
                <div className='flex space-x-4 px-3 py-2 border-2 border-[#effad1] rounded-full'>
                    <button
                        onClick={() => setBrushMode('paint')}
                        className={getButtonClasses('paint')}
                    >
                        Paint (Purple)
                    </button>
                    <button
                        onClick={() => setBrushMode('erase')}
                        className={getButtonClasses('erase')}
                    >
                        Erase (White)
                    </button>
                </div>
                <button
                    onClick={() => setBeads(Array(wampumDimensions.rows * wampumDimensions.columns).fill('white'))}
                    className="py-2 px-4 rounded-md font-semibold bg-[#B01C2D] text-[#effad1] hover:bg-[#effad1] hover:text-[#B01C2D] transition-colors duration-200 ease-in-out"
                >
                    Reset Belt
                </button>
                <button
                    onClick={handleSaveButtonClick}
                    className="py-2 px-4 rounded-md font-semibold bg-[#bbd8b3] text-[#051923] hover:bg-[#051923] hover:text-[#bbd8b3] hover:border-2 hover:border-[#effad1] transition-colors duration-200 ease-in-out"
                >
                    Save Belt
                </button>
                <button
                    onClick={handleLoadButtonClick}
                    className="py-2 px-4 rounded-md font-semibold bg-[#42858c] text-[#effad1] hover:bg-[#effad1] hover:text-[#42858c] hover:border-2 hover:border-[#effad1] transition-colors duration-200 ease-in-out"
                >
                    Load Belt
                </button>
            </div>

            {statusMessage && (
                <div className="text-sm mb-3 text-gray-400">
                    {statusMessage}
                </div>
            )}

            <div className="w-full max-w-full overflow-x-auto p-2 border border-[#23061b] rounded-lg bg-[#340928] shadow-lg">
                <div
                    className="wampum-grid grid gap-px border-2 border-[#23061b] bg-[#9b6a6c] p-0.5 select-none"
                    ref={gridRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    {beads.map((color, index) => (
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






// import { useState, useRef, useEffect } from "react"
// import Bead from "./Bead"


// const wampumDimensions = {
//     rows:10,
//     columns: 200,
// }

// const BEAD_WIDTH_PX = 3;
// const BEAD_HEIGHT_PX = 25;
// const BEAD_GAP_PX = 0.5;


// const BEAD_COLORS = {
//     'white': 'bg-wampum-white border-wampum-white-border',
//     'purple': 'bg-wampum-purple border-wampum-purple-border',
//     'light-purple': 'bg-wampum-light-purple border-wampum-light-purple-border',
//     'dark-purple': 'bg-wampum-dark-purple border-wampum-dark-purple-border',
// };

// export default function WampumBuilder() {
 
// const [beadsGrid, setBeadsGrid]= useState(Array(wampumDimensions.rows*wampumDimensions.columns).fill('white'))

// const gridRef = useRef(null)

// useEffect( () => {
//     if (gridRef.current) {
//         gridRef.current.style.setProperty('--grid-rows', wampumDimensions.rows)
//         gridRef.current.style.setProperty('--grid-cols', wampumDimensions.columns)
//         gridRef.current.style.setProperty('--bead-width', BEAD_WIDTH_PX)
//         gridRef.current.style.setProperty('--bead-height', BEAD_HEIGHT_PX)
//         gridRef.current.style.setProperty('--bead-gap', BEAD_GAP_PX)
//     }
// }, [])

// const handleBeadClick = (index) => {
//     
// }

// const handleBeadMouseEnter = (index) => {
//     
// }


//     return (
//         <div className="w-full min-h-screen flex flex-col items-center justify-center bg-theme-light-bg text-theme-text p-8">
//             <h2 className="text-3xl md:text-4xl font-light mb-6 text-theme-deep-blue">
//                 Weave Your Understanding: Create Wampum Belt Designs
//             </h2>

//             <div className="w-full max-w-full overflow-x-auto p-2 border border-gray-300 rounded-lg bg-white shadow-lg">
//                 <div
//                     className={`wampum-grid grid gap-px border-2 border-gray-700 bg-gray-400 p-1.5`}
//                     ref={gridRef}
//                 >
//                     {beadsGrid.map((color, index) => (
//                         <Bead
//                             key={index}
//                             beadClasses={BEAD_COLORS[color]}
//                             onClick={() => handleBeadClick(index)}
//                             onMouseEnter={() => handleBeadMouseEnter(index)}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }



//Good colors:
// #c2948a
// #9b6a6c
// #b09398
// #e9d6ec

