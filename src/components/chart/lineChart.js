import * as d3 from 'd3';
import { curveBasis, interpolateBasis, quantize } from 'd3';

export const LineChart = (data, {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    defined, // for gaps in data
    curve = d3.curveLinear, // method of interpolation between points
    marginTop = 48, // top margin, in pixels
    marginRight = 0, // right margin, in pixels
    marginBottom = 24, // bottom margin, in pixels
    marginLeft = 0, // left margin, in pixels
    width = 472, // outer width, in pixels
    height = 256, // outer height, in pixels
    xType = d3.scaleUtc, // the x-scale type
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // the y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // stroke color of line
    strokeLinecap = "round", // stroke line cap of the line
    strokeLinejoin = "round", // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
    percentage = false, // show percentage change
} = {}) => {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length);
    const O = d3.map(data, d => d);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X);
    // if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    if (yDomain === undefined) yDomain = d3.extent(Y);

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);

    const formatDate = xScale.tickFormat(null, "%b %-d, %Y");
    const formatValue = yScale.tickFormat(100, yFormat);
    const yValue = {
        'date': i => `${formatDate(X[i])}`,
        'value': i => `${formatValue(Y[i])}`
    }

    // Construct a line generator.
    const line = d3.line()
        .defined(i => D[i])
        .curve(curveBasis)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .on("pointerenter pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("touchstart", event => event.preventDefault());

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)

    svg.call(g => g.append("text")
        .attr("x", -marginLeft + 5)
        .attr("y", 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .style('font-family', 'Ubuntu')
        .style('font-weight', 'bolder')
        .style('font-size', '24px')
        .text(yLabel))


    if (percentage) {
        svg.call(g => g.append('rect')
            .attr("x", -marginLeft + 194)
            .attr("y", 2)
            .attr('fill', ' rgb(231, 229, 228)')
            .attr('width', 44)
            .attr('height', 20)
            .attr('rx', 4))
        svg.call(g => g.append('text')
            .attr("x", -marginLeft + 200)
            .attr("y", 16)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .style('font-family', 'Ubuntu')
            .style('font-weight', '600')
            .style('font-size', '0.875rem')
            .style('background', ' rgb(231, 229, 228)')
            .style('padding', '0 6px')
            .text('0.0% '))
    };

    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", line(I));

    svg.append('text')
        .attr('class', 'value')
        .attr('x', width - 10)
        .attr('y', 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .style('font-family', 'Ubuntu')
        .style('font-weight', 'bold')
        .style('font-size', '24px')
        .text(yValue.value(Y.length - 1))

    svg.append('text')
        .attr('class', 'date')
        .attr('x', width - 10)
        .attr('y', 36)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .style('font-family', 'monospace')
        .style('font-weight', 'bold')
        .style('font-size', '12px')
        .text(yValue.date(Y.length - 1))

    // svg.append('')

    const tooltip = svg.append("g")
        .style("pointer-events", "none");

    function pointermoved(event) {
        const i = d3.bisectCenter(X, xScale.invert(d3.pointer(event)[0]));
        tooltip.style("display", null);
        tooltip.attr("transform", `translate(${xScale(quantize(interpolateBasis(X), X.length)[i])},${yScale(quantize(interpolateBasis(Y), Y.length)[i])})`);

        tooltip.selectAll("circle")
            .data([])
            .join("circle")
            .attr('r', 4)
            .attr("fill", "black")
            .attr("stroke", "none");

        svg.select('.value').text(yValue.value(i));
        svg.select('.date').text(yValue.date(i));

        svg.property("value", O[i]).dispatch("input", { bubbles: true });
    }

    function pointerleft() {
        tooltip.style("display", "none");
        svg.select('.date').text(yValue.date(Y.length - 1));
        svg.select('.value').text(yValue.value(Y.length - 1));
        svg.node().value = null;
        svg.dispatch("input", { bubbles: true });
    }

    return svg.node();
}
