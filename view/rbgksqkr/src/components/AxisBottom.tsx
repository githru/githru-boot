import { ScaleBand, select, axisBottom } from "d3";
import { useEffect, useRef } from "react";

interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g ref={ref} transform={transform} />;
};

export default AxisBottom;
