import { FC, useEffect, useRef } from 'react';
import { Legend } from './MapContext';
import { drawLinearLegend } from '@/libs/legend';

const LinearLegendControl: FC<{
    legend: Partial<Legend>;
}> = ({ legend }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if(canvas)
            drawLinearLegend(canvas, legend);
    }, [
        legend.title,
        legend.valueMin,
        legend.valueMax,
        legend.colorMin,
        legend.colorMax,
    ]);

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <canvas ref={canvasRef} width={320} height={128} />
            </div>
        </div>
    )
}

export default LinearLegendControl;