import { BarsProps } from "../types/bar";

const Bars = ({ data, height, scaleX, scaleY }: BarsProps) => {
    return (
        <>
            {data.map(({ value, label }) => (
                <rect
                    key={`bar-${label}`}
                    x={scaleX(label)}
                    y={scaleY(value)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(value)}
                    fill="teal"
                />
            ))}
        </>
    );
};

export default Bars;
