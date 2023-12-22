import { FC, useEffect, useRef } from 'react';
import { Legend } from '@/types/Types';
import { drawGridLegend } from '@/libs/legend';

const GridLegendControl: FC<{
    legend: Partial<Legend>;
}> = ({ legend }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if(canvas)
            drawGridLegend(canvas, legend);
    }, [
        legend.xTitle,
        legend.yTitle,
        legend.xValueMin,
        legend.xValueMax,
        legend.xColorMin,
        legend.xColorMax,
        legend.yValueMin,
        legend.yValueMax,
        legend.yColorMin,
        legend.yColorMax,
    ]);

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <canvas ref={canvasRef} width={256} height={256} />
            </div>
        </div>
    )
}

export default GridLegendControl;