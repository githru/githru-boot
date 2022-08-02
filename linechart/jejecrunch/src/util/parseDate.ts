import * as d3 from "d3";

export default function parseDate(d: string) {
    return d3.timeParse("%Y-%m-%d")(d);
}
