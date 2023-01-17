import { autoType, csv } from "d3";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../firebase";
import { LineChart } from "./lineChart";

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
  }, [filename]);

  useEffect(() => {
    if (chartData === undefined) return;
    const chart = LineChart(chartData, {
      x: (d) => d.date,
      y: (d) => d.close,
      yLabel: "↑ Daily close ($)",
      height: 128,
      width: 472,
      color: "#1c1917",
    });

    chartRef.current.append(chart);
    setIsLoading(false);

    return () => chart.remove();
  }, [chartData]);
  return isLoading ? (
    <div ref={chartRef} className='z-10 w-full h-32 bg-primary-light-30/40 rounded-2xl m-8 md:m-0 flex items-center justify-center self-center animate-pulse'>
      <svg class='animate-spin -ml-1 mr-3 h-5 w-5 text-primary-text' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
        <circle class='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle>
        <path class='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
      </svg>
    </div>
  ) : (
    <div
      ref={chartRef}
      className='w-full h-32 outline-2 outline-dashed hover:outline-double outline-primary-text/40 hover:outline-primary-text hover:outline-offset-4 transition-all rounded-lg overflow-hidden py-4 group-hover:bg-white cursor-pointer'></div>
  );
};
