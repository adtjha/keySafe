import { autoType, csv, curveBasis, interpolate, interpolateBasis, quantize } from "d3";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { storage } from "../../firebase";
import { LineChart } from "./LineChart";

// export const Chart1 = ({ filename }) => {
//     const [chartData, setChartData] = useState();
//     const chartRef = useRef();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         getDownloadURL(ref(storage, filename))
//             .then((url) => {
//                 // Or inserted into an <img> element
//                 console.log(url);
//                 csv(url, autoType).then(setChartData);
//             })
//             .catch((error) => {
//                 // Handle any errors
//                 console.error(new Error(error));
//             });
//     }, []);

//     useEffect(() => {
//         if (chartData === undefined) return;
//         const chart = Plot.plot({
//             style: {
//                 backgroundColor: "transparent",
//                 color: "#1c1917",
//                 fontFamily: "monospace",
//                 fontSize: "12px",
//                 overflow: "visible"
//             },
//             // height: 256,
//             // width: 384,
//             marginLeft: 8,
//             marginRight: 8,
//             marginTop: 8,
//             marginBottom: 8,
//             insetTop: 0,
//             insetBottom: 0,
//             insetLeft: 0,
//             insetRight: 0,
//             x: { ticks: 0 },
//             y: { ticks: 0 },
//             // title: "Reqeusts over time",
//             marks: [
//                 // Plot.ruleX([0]),
//                 // Plot.ruleY([0]),
//                 Plot.line(chartData, Plot.windowY({ reduce: 'mean', k: 5 }, {
//                     x: "Date",
//                     y: "Low",
//                     stroke: "#1C1917",
//                     strokeWidth: 2.5,
//                     curve: "monotone-x",
//                 })),
//             ]
//         });



//         chartRef.current.append(chart);
//         setIsLoading(false)

//         return () => chart.remove();
//     }, [chartData]);
//     return isLoading ? (
//         <div
//             ref={chartRef}
//             className='w-96 h-64 bg-primary-light-30/40 rounded-2xl m-8 md:m-0 animate-pulse'></div>
//     ) : (
//         <div className="">
//             <div className="w-full flex flex-row items-center justify-start gap-2 p-1">
//                 <h1 className="h-auto w-max px-2 font-mono text-xl font-bold text-primary-text">Chart Title</h1>
//                 <span className="bg-gray-200 px-[6px] w-min rounded text-sm font-medium">0.0%</span>
//             </div>
//             <div
//                 ref={chartRef}
//                 className='w-full h-full overflow-hidden bg-primary-light-30/30 hover:bg-primary-light-30/50 border-2 border-primary-text rounded-2xl'></div>
//         </div>
//     );
// };

export const Chart = ({ filename }) => {
    const [chartData, setChartData] = useState();
    const chartRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDownloadURL(ref(storage, filename))
            .then((url) => {
                // Or inserted into an <img> element
                console.log(url);
                csv(url, autoType).then(setChartData);
            })
            .catch((error) => {
                // Handle any errors
                console.error(new Error(error));
            });
    }, []);

    useEffect(() => {
        if (chartData === undefined) return;
        const chart = LineChart(chartData, {
            x: d => d.date,
            y: d => d.close,
            yLabel: "↑ Daily close ($)",
            height: 256,
            width: 472,
            color: "#1c1917",
        })

        chartRef.current.append(chart);
        setIsLoading(false)

        return () => chart.remove();
    }, [chartData]);
    return isLoading ? (
        <div
            ref={chartRef}
            className='w-96 h-64 bg-primary-light-30/40 rounded-2xl m-8 md:m-0'>
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    ) : (
        <div
            ref={chartRef}
            className='w-full h-full overflow-hidden p-4 bg-primary-light-30/50 hover:bg-primary-light-30 rounded-lg'></div>
    );
};
