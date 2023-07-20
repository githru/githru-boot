import { useEffect, useRef } from "react";
import { select, axisLeft } from "d3";
import { AxisLeftProps } from "../types/bar";

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
