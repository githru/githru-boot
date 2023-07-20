import React, { useEffect, useRef } from "react";
import { ScaleLinear, select, axisLeft } from "d3";

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

const AxisLeft = ({ scale }: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return <g ref={ref} />;
};

export default AxisLeft;
