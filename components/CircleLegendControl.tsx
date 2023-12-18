import { FC, useEffect, useRef } from 'react';
import { Legend } from './MapContext';
import { drawCircleLegend } from '@/libs/legend';

const CircleLegendControl: FC<{
    legend: Partial<Legend>;
}> = ({ legend }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if(canvas)
            drawCircleLegend(canvas, legend);
    }, [
        legend.title,
        legend.valueMin,
        legend.valueMax,
        legend.colorMin,
        legend.colorMax,
        legend.sizeMin,
        legend.sizeMax,
    ]);

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <canvas ref={canvasRef} width={256} height={256} />
            </div>
        </div>
    )
}

export default CircleLegendControl;