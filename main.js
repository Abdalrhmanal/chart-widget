document.addEventListener('DOMContentLoaded', function () {
    /**
     * Parses the sampleDataStructure string into a JavaScript object.
     * @param {string} dataStructureString - The string representation of the data structure.
     * @returns {any} The parsed data object.
     */
    function parseSampleDataStructure(dataStructureString) {
        // Remove 'const data = ' and trailing semicolon if present
        const cleanString = dataStructureString.replace(/const data = /, '').trim().replace(/;$/, '');
        try {
            // Use eval for simplicity given the controlled environment and known data format.
            // In a production environment with untrusted input, a more secure parser would be needed.
            return eval(`(${cleanString})`);
        } catch (e) {
            console.error("Error parsing sample data structure:", e);
            return []; // Return empty or default on error
        }
    }

    /**
     * Adds a legend to the chart container, below the SVG.
     * @param {HTMLElement} containerElement - The HTML container element where the chart SVG is.
     * @param {Array<string>} legendItems - Array of strings for legend labels.
     * @param {d3.ScaleOrdinal} colorScale - The D3 color scale used in the chart.
     */
    function addLegendBelowChart(containerElement, legendItems, colorScale) {
        const legendDiv = d3.select(containerElement).append("div")
            .attr("class", "chart-legend");

        legendItems.forEach((item, i) => {
            const legendItem = legendDiv.append("div")
                .attr("class", "legend-item");

            legendItem.append("div")
                .attr("class", "legend-color")
                .style("background-color", colorScale(item));

            legendItem.append("span")
                .text(item);
        });
    }

    // D3.js rendering functions
    function renderBarChart(containerId, chartData) {
        // Data structure: [{ label: 'Category A', value: 100, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html(''); // Clear previous content
        const margin = { top: 40, right: 80, bottom: 60, left: 60 }; // Increased margins for labels and legend
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Categorical scale
        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(exampleData.map(d => d.label));

        // Y-axis: Linear scale for values
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(exampleData, d => d.value) * 1.1]); // Add some padding to top

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", "10px"); // Smaller font for labels

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Category");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Bars
        svg.selectAll(".bar")
            .data(exampleData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.label))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value))
            .attr("fill", "#14b8a6"); // Tailwind teal-500

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Product Sales Comparison");

        // No legend needed for single-color bar chart
    }

    function renderGroupedBarChart(containerId, chartData) {
        // Data structure: [{ label: 'Q1', series: { 'Sales A': 30, 'Sales B': 20, 'Sales C': 15 }, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        // Dynamically get series keys from the 'series' object of the first data item
        const keys = Object.keys(exampleData[0].series);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Outer X scale for main categories (Q1, Q2, Q3)
        const x0 = d3.scaleBand()
            .domain(exampleData.map(d => d.label))
            .rangeRound([0, width])
            .paddingInner(0.1);

        // Inner X scale for series within each category (Sales A, Sales B, Sales C)
        const x1 = d3.scaleBand()
            .domain(keys)
            .rangeRound([0, x0.bandwidth()])
            .padding(0.05);

        // Y scale for values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.max(keys, key => d.series[key])) * 1.1])
            .rangeRound([height, 0]);

        // Color scale for series
        const color = d3.scaleOrdinal()
            .range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]); // Tailwind teal, blue, orange, purple

        // Append X0 axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x0));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Quarter");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Sales Value");

        // Create groups for each main category
        const category = svg.selectAll(".category")
            .data(exampleData)
            .enter().append("g")
            .attr("transform", d => `translate(${x0(d.label)},0)`);

        // Append bars for each series within categories
        category.selectAll("rect")
            .data(d => keys.map(key => ({ key: key, value: d.series[key] }))) // Access value from 'series' object
            .enter().append("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Product Sales by Quarter");

        // Legend
        addLegendBelowChart(container.node(), keys, color);
    }

    function renderLineChart(containerId, chartData) {
        // Data structure: [{ label: 'Jan', series: { 'Sales A': 30, 'Sales B': 20 }, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        const keys = Object.keys(exampleData[0].series); // Get series keys from 'series' object

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Point scale for time labels
        const x = d3.scalePoint()
            .range([0, width])
            .padding(0.5)
            .domain(exampleData.map(d => d.label));

        // Y-axis: Linear scale for values
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(exampleData, d => d3.max(keys, key => d.series[key])) * 1.1]); // Max across all series

        // Color scale for lines
        const color = d3.scaleOrdinal()
            .range(["#0d9488", "#3b82f6", "#f97316", "#a855f7"]); // Teal, Blue, Orange, Purple

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Month");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Profit");

        // Line generator for each series
        keys.forEach(key => {
            const line = d3.line()
                .x(d => x(d.label))
                .y(d => y(d.series[key])); // Access value from 'series' object

            svg.append("path")
                .datum(exampleData)
                .attr("fill", "none")
                .attr("stroke", color(key))
                .attr("stroke-width", 2)
                .attr("d", line);
        });

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Tracking Profit Over Time");

        // Legend
        addLegendBelowChart(container.node(), keys, color);
    }

    function renderDotPlot(containerId, chartData) {
        // Data structure: [{ label: 'Category A', value: 50, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Point scale for categorical labels
        const x = d3.scalePoint()
            .range([0, width])
            .padding(0.5)
            .domain(exampleData.map(d => d.label));

        // Y-axis: Linear scale for values
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(exampleData, d => d.value) * 1.1]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Category");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Dots
        svg.selectAll(".dot")
            .data(exampleData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.label))
            .attr("cy", d => y(d.value))
            .attr("r", 5)
            .attr("fill", "#f97316"); // Tailwind orange-500

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Comparing Values with Dots");

        // No legend needed for single-color dot plot
    }

    function renderRadarChart(containerId, chartData) {
        // Data structure: [{ label: 'Player A', Strength: 65, Speed: 59, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        // All keys except 'label' are axes
        const allAxis = Object.keys(exampleData[0]).filter(key => key !== 'label'); 
        
        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;
        const radius = Math.min(width, height) / 2 - 50; // More space for labels and legend

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`); // Centered group

        const total = allAxis.length;
        const angleSlice = Math.PI * 2 / total;

        const rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, d3.max(exampleData, d => d3.max(allAxis, axis => d[axis])) * 1.1]); // Dynamic max domain

        const radarLine = d3.lineRadial()
            .curve(d3.curveCardinalClosed)
            .radius(d => rScale(d.value))
            .angle((d, i) => i * angleSlice);

        // Draw circles for background (grid)
        svg.selectAll("circle")
            .data(d3.range(0, rScale.domain()[1], rScale.domain()[1] / 5)) // Create 5 circles
            .enter().append("circle")
            .attr("r", d => rScale(d))
            .style("fill", "none")
            .style("stroke", "#ccc")
            .style("stroke-dasharray", ("3,3"));

        // Draw axes
        const axis = svg.selectAll(".axis")
            .data(allAxis)
            .enter().append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(rScale.domain()[1]) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => rScale(rScale.domain()[1]) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1);

        // Axis labels
        axis.append("text")
            .attr("x", (d, i) => (rScale(rScale.domain()[1]) + 10) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => (rScale(rScale.domain()[1]) + 10) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "10px")
            .text(d => d);

        const color = d3.scaleOrdinal()
            .range(["rgba(20, 184, 166, 0.2)", "rgba(59, 130, 246, 0.2)", "rgba(249, 115, 22, 0.2)", "rgba(168, 85, 247, 0.2)"]);
        const strokeColor = d3.scaleOrdinal()
            .range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]);

        // Draw radar areas for each profile
        exampleData.forEach((d, i) => {
            const profileData = allAxis.map(axisName => ({ axis: axisName, value: d[axisName] }));
            svg.append("path")
                .datum(profileData)
                .attr("d", radarLine)
                .attr("fill", color(d.label || i)) // Use label or index for color
                .attr("stroke", strokeColor(d.label || i))
                .attr("stroke-width", 2);
        });

        // Chart Title
        svg.append("text")
            .attr("x", 0)
            .attr("y", -radius - 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Player Profiles Comparison");

        // Legend for profiles - positioned below the chart container
        const legendItems = exampleData.map(d => d.label);
        const legendColorScale = d3.scaleOrdinal()
            .domain(legendItems)
            .range(strokeColor.range()); // Use stroke colors for legend

        addLegendBelowChart(container.node(), legendItems, legendColorScale);
    }

    function renderPieChart(containerId, chartData) {
        // Data structure: [{ label: 'Marketing', value: 300, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;
        const radius = Math.min(width, height) / 2 - 50; // Space for title and legend

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`); // Centered group

        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(radius * 0.6) // For donut chart
            .outerRadius(radius);

        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        const color = d3.scaleOrdinal()
            .range(['#3b82f6', '#14b8a6', '#f97316', '#a855f7', '#ef4444']); // Tailwind colors

        const arcs = svg.selectAll(".arc")
            .data(pie(exampleData))
            .enter().append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.label));

        arcs.append("text")
            .attr("transform", d => `translate(${outerArc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => `${d.data.label} (${(d.data.value / d3.sum(exampleData, v => v.value) * 100).toFixed(1)}%)`)
            .style("font-size", "10px");

        // Chart Title
        svg.append("text")
            .attr("x", 0)
            .attr("y", -radius - 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Department Budget Distribution");

        // Legend - positioned below the chart container
        const legendItems = exampleData.map(d => d.label);
        const legendColorScale = d3.scaleOrdinal()
            .domain(legendItems)
            .range(color.range());

        addLegendBelowChart(container.node(), legendItems, legendColorScale);
    }

    function renderStackedBarChart(containerId, chartData) {
        // Data structure: [{ label: 'Q1', series: { 'Product A': 30, 'Product B': 20, 'Product C': 15 }, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        const keys = Object.keys(exampleData[0].series); // Get series keys from 'series' object

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Band scale for categories (Q1, Q2, Q3)
        const x = d3.scaleBand()
            .domain(exampleData.map(d => d.label))
            .rangeRound([0, width])
            .paddingInner(0.1);

        // Y-axis: Linear scale for stacked values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.sum(keys, key => d.series[key])) * 1.1]) // Max of total stacked value
            .rangeRound([height, 0]);

        // Color scale for series
        const color = d3.scaleOrdinal()
            .range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]); // Tailwind teal, blue, orange, purple

        // Stack generator
        const stack = d3.stack()
            .keys(keys)
            .value((d, key) => d.series[key]); // Access values from 'series' object

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Quarter");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Sales Value");

        // Create stacked bars
        svg.selectAll(".series")
            .data(stack(exampleData))
            .enter().append("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.label))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth());
        
        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Sales Composition by Product per Quarter");

        // Legend
        addLegendBelowChart(container.node(), keys, color);
    }

    function renderStackedAreaChart(containerId, chartData) {
        // Data structure: [{ label: 'Jan', series: { 'Category A': 10, 'Category B': 20 }, ... }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        const keys = Object.keys(exampleData[0].series); // Get series keys from 'series' object

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Point scale for time labels
        const x = d3.scalePoint()
            .domain(exampleData.map(d => d.label))
            .range([0, width])
            .padding(0.5);

        // Y-axis: Linear scale for stacked values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.sum(keys, key => d.series[key])) * 1.1])
            .range([height, 0]);

        // Color scale for areas (with opacity)
        const color = d3.scaleOrdinal()
            .range(["rgba(20, 184, 166, 0.5)", "rgba(59, 130, 246, 0.5)", "rgba(249, 115, 22, 0.5)", "rgba(168, 85, 247, 0.5)"]);

        // Stack generator
        const stack = d3.stack()
            .keys(keys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone)
            .value((d, key) => d.series[key]); // Access values from 'series' object

        // Area generator
        const area = d3.area()
            .x(d => x(d.data.label))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]));

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Month");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Create stacked areas
        svg.selectAll(".layer")
            .data(stack(exampleData))
            .enter().append("path")
            .attr("class", "layer")
            .attr("d", area)
            .attr("fill", d => color(d.key))
            .attr("stroke", d => d3.color(color(d.key)).darker(0.5)) // Darker stroke for definition
            .attr("stroke-width", 1);
        
        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Monthly Sales Composition");

        // Legend
        addLegendBelowChart(container.node(), keys, d3.scaleOrdinal().range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]).domain(keys));
    }

    function renderHistogram(containerId, chartData) {
        // Data structure: [{ group: 'All Data', values: [12, 19, 33, ...] }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        const rawValues = exampleData[0].values; // Assuming single group or first group's values

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Linear scale for data values
        const x = d3.scaleLinear()
            .domain([d3.min(rawValues) - 5, d3.max(rawValues) + 5]) // Extend domain slightly
            .range([0, width]);

        // Histogram generator
        const histogram = d3.histogram()
            .value(d => d)
            .domain(x.domain())
            .thresholds(x.ticks(10)); // 10 bins for better granularity

        const bins = histogram(rawValues);

        // Y-axis: Linear scale for frequency
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(bins, d => d.length) * 1.1]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Frequency");

        // Bars (bins)
        svg.selectAll("rect")
            .data(bins)
            .enter().append("rect")
            .attr("x", 1)
            .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
            .attr("width", d => x(d.x1) - x(d.x0) - 1)
            .attr("height", d => height - y(d.length))
            .attr("fill", "#3b82f6aa") // Tailwind blue-500 with opacity
            .attr("stroke", "#2563eb"); // Tailwind blue-600

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Customer Age Distribution");

        // No legend needed for single-color histogram
    }

    function renderDensityPlot(containerId, chartData) {
        // Data structure: [{ group: 'All Data', values: [...] }]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        const rawValues = exampleData[0].values; // Assuming single group or first group's values

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Linear scale for data values
        const x = d3.scaleLinear()
            .domain([d3.min(rawValues) * 0.9, d3.max(rawValues) * 1.1])
            .range([0, width]);

        // Compute kernel density estimate
        const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(100)); // Bandwidth 7, 100 points
        const density = kde(rawValues);

        // Y-axis: Linear scale for density
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(density, d => d[1]) * 1.1]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Density");

        // Density curve
        svg.append("path")
            .datum(density)
            .attr("fill", "rgba(20, 184, 166, 0.3)")
            .attr("stroke", "#14b8a6")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(d => x(d[0]))
                .y(d => y(d[1])));
        
        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Data Density Estimate");

        // Helper functions for KDE
        function kernelDensityEstimator(kernel, X) {
            return function(sample) {
                return X.map(x => [x, d3.mean(sample, s => kernel(x - s))]);
            };
        }

        function kernelEpanechnikov(k) {
            return u => Math.abs(u /= k) <= 1 ? 0.75 * (1 - u * u) / k : 0;
        }
    }

    function renderBoxPlot(containerId, chartData) {
        // Data structure: [{ group: 'Group A', values: [...] }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const groups = exampleData.map(d => d.group);

        // X-axis: Band scale for groups
        const x = d3.scaleBand()
            .range([0, width])
            .domain(groups)
            .paddingInner(1)
            .paddingOuter(0.5);

        // Y-axis: Linear scale for values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.max(d.values)) * 1.1]) // Dynamic max domain
            .range([height, 0]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Group");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Calculate box plot statistics
        const boxPlotData = exampleData.map(d => {
            const sorted = d.values.sort(d3.ascending);
            const q1 = d3.quantile(sorted, 0.25);
            const median = d3.quantile(sorted, 0.5);
            const q3 = d3.quantile(sorted, 0.75);
            const iqr = q3 - q1;
            const lowerWhisker = d3.max([d3.min(sorted), q1 - 1.5 * iqr]);
            const upperWhisker = d3.min([d3.max(sorted), q3 + 1.5 * iqr]);
            return { group: d.group, q1, median, q3, min: lowerWhisker, max: upperWhisker, values: sorted };
        });

        const color = d3.scaleOrdinal()
            .domain(groups)
            .range(["#a855f755", "#3b82f655", "#14b8a655"]); // Colors for each group

        // Draw boxes
        svg.selectAll(".box")
            .data(boxPlotData)
            .enter().append("rect")
            .attr("x", d => x(d.group) - x.bandwidth() / 4) // Center the box
            .attr("y", d => y(d.q3))
            .attr("width", x.bandwidth() / 2)
            .attr("height", d => y(d.q1) - y(d.q3))
            .attr("fill", d => color(d.group))
            .attr("stroke", d => d3.color(color(d.group)).darker(0.5))
            .attr("stroke-width", 1);

        // Draw median lines
        svg.selectAll(".median-line")
            .data(boxPlotData)
            .enter().append("line")
            .attr("x1", d => x(d.group) - x.bandwidth() / 4)
            .attr("x2", d => x(d.group) + x.bandwidth() / 4)
            .attr("y1", d => y(d.median))
            .attr("y2", d => y(d.median))
            .attr("stroke", "#8b5cf6")
            .attr("stroke-width", 2);

        // Draw whiskers
        svg.selectAll(".whisker")
            .data(boxPlotData)
            .enter().append("line")
            .attr("x1", d => x(d.group))
            .attr("x2", d => x(d.group))
            .attr("y1", d => y(d.min))
            .attr("y2", d => y(d.max))
            .attr("stroke", "#8b5cf6")
            .attr("stroke-width", 1);

        // Draw min/max caps
        svg.selectAll(".min-max-cap")
            .data(boxPlotData)
            .enter().append("line")
            .attr("x1", d => x(d.group) - x.bandwidth() / 8)
            .attr("x2", d => x(d.group) + x.bandwidth() / 8)
            .attr("y1", d => y(d.min))
            .attr("y2", d => y(d.min))
            .attr("stroke", "#8b5cf6")
            .attr("stroke-width", 1);

        svg.selectAll(".min-max-cap-top")
            .data(boxPlotData)
            .enter().append("line")
            .attr("x1", d => x(d.group) - x.bandwidth() / 8)
            .attr("x2", d => x(d.group) + x.bandwidth() / 8)
            .attr("y1", d => y(d.max))
            .attr("y2", d => y(d.max))
            .attr("stroke", "#8b5cf6")
            .attr("stroke-width", 1);

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Comparing Result Distributions");

        // Legend
        addLegendBelowChart(container.node(), groups, d3.scaleOrdinal().range(["#a855f7", "#3b82f6", "#14b8a6"]).domain(groups));
    }

    function renderScatterPlot(containerId, chartData) {
        // Data structure: [{ x: 10, y: 200, id: 'Point_1', metadata: { type: 'A' } }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Linear scale for x values
        const x = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.x) * 1.1])
            .range([0, width]);

        // Y-axis: Linear scale for y values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.y) * 1.1])
            .range([height, 0]);

        // Color scale based on 'metadata.type' if available, otherwise default
        const types = Array.from(new Set(exampleData.map(d => d.metadata?.type || 'Default')));
        const color = d3.scaleOrdinal()
            .domain(types)
            .range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        // X-axis label
        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Price (USD)");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Units Sold");

        // Dots
        svg.selectAll(".dot")
            .data(exampleData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 5)
            .attr("fill", d => color(d.metadata?.type || 'Default')); // Use color scale

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Product Price vs. Units Sold");
        
        // Legend if multiple types exist
        if (types.length > 1 || types[0] !== 'Default') {
            addLegendBelowChart(container.node(), types, color);
        }
    }

    function renderBubbleChart(containerId, chartData) {
        // Data structure: [{ x: 20, y: 30, size: 15, id: 'Point_1', metadata: { type: 'A' } }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Linear scale for x values
        const x = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.x) * 1.1])
            .range([0, width]);

        // Y-axis: Linear scale for y values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.y) * 1.1])
            .range([height, 0]);

        // Radius scale for bubble size
        const rScale = d3.scaleSqrt()
            .domain([0, d3.max(exampleData, d => d.size) * 1.5]) // Scale radius based on 'size' property
            .range([0, 20]); // Max visual radius

        // Color scale based on 'metadata.type' if available, otherwise default
        const types = Array.from(new Set(exampleData.map(d => d.metadata?.type || 'Default')));
        const color = d3.scaleOrdinal()
            .domain(types)
            .range(["#f9731699", "#3b82f699", "#14b8a699", "#a855f799"]); // Tailwind colors with opacity

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        // X-axis label
        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("X-Axis Value (e.g., GDP)");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Y-Axis Value (e.g., Life Expectancy)");

        // Bubbles
        svg.selectAll(".bubble")
            .data(exampleData)
            .enter().append("circle")
            .attr("class", "bubble")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", d => rScale(d.size))
            .attr("fill", d => color(d.metadata?.type || 'Default'))
            .attr("stroke", d => d3.color(color(d.metadata?.type || 'Default')).darker(0.5))
            .attr("stroke-width", 1);

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("GDP (X), Life Expectancy (Y), Population (Bubble Size)");
        
        // Legend if multiple types exist
        if (types.length > 1 || types[0] !== 'Default') {
            addLegendBelowChart(container.node(), types, d3.scaleOrdinal().range(["#f97316", "#3b82f6", "#14b8a6", "#a855f7"]).domain(types));
        }
    }

    function renderBulletChart(containerId, chartData) {
        // Data structure: { value: 75, target: 80, ranges: [60, 70, 90], label: 'KPI Performance' }
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Linear scale for values (performance, target, ranges)
        const x = d3.scaleLinear()
            .domain([0, d3.max(exampleData.ranges) * 1.1]) // Assuming ranges define max domain
            .range([0, width]);

        // Background ranges (e.g., Poor, Satisfactory, Good)
        svg.selectAll(".range")
            .data(exampleData.ranges)
            .enter().append("rect")
            .attr("class", "range")
            .attr("x", 0)
            .attr("width", d => x(d))
            .attr("y", height / 4)
            .attr("height", height / 2)
            .attr("fill", (d, i) => {
                // Assuming ranges are ordered: poor, satisfactory, good
                if (i === 0) return "#fbd7d4"; // Light red for poor
                if (i === 1) return "#fef0c7"; // Light yellow for satisfactory
                return "#d4edda"; // Light green for good
            });

        // Performance bar
        svg.append("rect")
            .attr("class", "measure")
            .attr("x", 0)
            .attr("width", x(exampleData.value))
            .attr("y", height / 4 + height / 8) // Thinner bar
            .attr("height", height / 4)
            .attr("fill", "#14b8a6"); // Tailwind teal-500

        // Target line
        svg.append("line")
            .attr("class", "target")
            .attr("x1", x(exampleData.target))
            .attr("x2", x(exampleData.target))
            .attr("y1", height / 4)
            .attr("y2", height / 4 + height / 2)
            .attr("stroke", "#dc2626") // Tailwind red-600
            .attr("stroke-width", 2);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text(exampleData.label || "Performance vs. Target"); // Use label from data

        // Legend for ranges and target
        const legendItems = [
            { label: 'Good', color: '#d4edda' },
            { label: 'Satisfactory', color: '#fef0c7' },
            { label: 'Poor', color: '#fbd7d4' },
            { label: 'Actual Value', color: '#14b8a6' },
            { label: 'Target', color: '#dc2626' }
        ];
        const legendColorScale = d3.scaleOrdinal()
            .domain(legendItems.map(d => d.label))
            .range(legendItems.map(d => d.color));

        addLegendBelowChart(container.node(), legendItems.map(d => d.label), legendColorScale);
    }

    function renderSlopegraph(containerId, chartData) {
        // Data structure: [{ category: 'Dept A', before: 10, after: 15, change: 5 }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 80 }; // Increased left/right for labels
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Y-axis: Linear scale for values
        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => Math.max(d.before, d.after)) * 1.1])
            .range([height, 0]);

        // Draw 'Before' axis
        svg.append("g")
            .call(d3.axisLeft(y));
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");
        
        svg.append("text")
            .attr("x", 0)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "start")
            .style("font-weight", "bold")
            .style("font-size", "12px")
            .text("Before");

        // Draw 'After' axis
        svg.append("g")
            .attr("transform", `translate(${width},0)`)
            .call(d3.axisRight(y));
        svg.append("text")
            .attr("x", width)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "end")
            .style("font-weight", "bold")
            .style("font-size", "12px")
            .text("After");

        // Draw lines and circles
        exampleData.forEach(d => {
            const lineColor = d.before < d.after ? "#14b8a6" : (d.before > d.after ? "#dc2626" : "#4b5563"); // Green for increase, Red for decrease, Gray for no change
            svg.append("line")
                .attr("x1", 0)
                .attr("y1", y(d.before))
                .attr("x2", width)
                .attr("y2", y(d.after))
                .attr("stroke", lineColor)
                .attr("stroke-width", 2);

            svg.append("circle")
                .attr("cx", 0)
                .attr("cy", y(d.before))
                .attr("r", 4)
                .attr("fill", lineColor);

            svg.append("circle")
                .attr("cx", width)
                .attr("cy", y(d.after))
                .attr("r", 4)
                .attr("fill", lineColor);

            svg.append("text")
                .attr("x", -5)
                .attr("y", y(d.before))
                .attr("text-anchor", "end")
                .attr("alignment-baseline", "middle")
                .style("font-size", "10px")
                .text(`${d.category}: ${d.before}`);
            
            svg.append("text")
                .attr("x", width + 5)
                .attr("y", y(d.after))
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "middle")
                .style("font-size", "10px")
                .text(`${d.category}: ${d.after}`);
        });

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Change Between Two Points");

        // Legend for change types
        const legendItems = [
            { label: 'Increase', color: '#14b8a6' },
            { label: 'Decrease', color: '#dc2626' },
            { label: 'No Change', color: '#4b5563' }
        ];
        const legendColorScale = d3.scaleOrdinal()
            .domain(legendItems.map(d => d.label))
            .range(legendItems.map(d => d.color));

        addLegendBelowChart(container.node(), legendItems.map(d => d.label), legendColorScale);
    }

    function renderTreemap(containerId, chartData) {
        // Data structure: { name: "Root", children: [{ name: "Category A", value: 100, children: [...] }, ...] }
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 10, bottom: 10, left: 10 }; // Increased top margin for title
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const treemap = d3.treemap()
            .size([width, height])
            .padding(1);

        const root = d3.hierarchy(exampleData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        treemap(root);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const cell = svg.selectAll("g")
            .data(root.leaves())
            .enter().append("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        cell.append("rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => color(d.parent.data.name))
            .attr("stroke", "#fff");

        cell.append("text")
            .attr("x", 4)
            .attr("y", 14)
            .text(d => d.data.name)
            .style("font-size", "10px")
            .attr("fill", "white")
            .call(wrapText, d => d.x1 - d.x0 - 8); // Custom function to wrap text

        // Chart Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -15)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Hierarchical Data Visualization");

        // Helper function for text wrapping
        function wrapText(text, width) {
            text.each(function() {
                let text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy") || 0),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }

        // Legend for top-level categories
        const topLevelCategories = root.children.map(d => d.data.name);
        addLegendBelowChart(container.node(), topLevelCategories, color);
    }

    function renderWaffleChart(containerId, chartData) {
        // Data structure: { label: 'Progress', value: 75 }
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        const percentage = exampleData.value; // Assuming value holds the percentage

        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;

        const numRows = 10;
        const numCols = 10;
        const totalCells = numRows * numCols;
        const cellSize = Math.min(width / numCols, height / numRows) - 2; // Subtract padding

        const data = d3.range(totalCells).map(i => ({
            id: i,
            filled: i < (percentage / 100) * totalCells
        }));

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", (d, i) => (i % numCols) * (cellSize + 2) + (width - (numCols * (cellSize + 2))) / 2) // Center horizontally
            .attr("y", (d, i) => Math.floor(i / numCols) * (cellSize + 2) + (height - (numRows * (cellSize + 2))) / 2) // Center vertically
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", d => d.filled ? "#14b8a6" : "#e5e7eb") // Teal for filled, light gray for empty
            .attr("rx", 2) // Rounded corners
            .attr("ry", 2);

        // Chart Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text(`Progress: ${percentage}%`);

        // No legend needed for single percentage waffle chart
    }

    function renderViolinPlot(containerId, chartData) {
        // Data structure: [{ group: 'Group A', values: [...] }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const groups = exampleData.map(d => d.group);

        // X-axis: Band scale for groups
        const x = d3.scaleBand()
            .range([0, width])
            .domain(groups)
            .padding(0.1);

        const allValues = exampleData.flatMap(d => d.values);
        // Y-axis: Linear scale for values
        const y = d3.scaleLinear()
            .domain([d3.min(allValues) * 0.9, d3.max(allValues) * 1.1]) // Dynamic domain
            .range([height, 0]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Group");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Value");

        const color = d3.scaleOrdinal()
            .domain(groups)
            .range(["#a855f7aa", "#3b82f6aa", "#14b8a6aa"]); // Purple, Blue, Teal with opacity

        // Helper functions for KDE (Kernel Density Estimation)
        function kernelDensityEstimator(kernel, X) {
            return function(sample) {
                return X.map(x => [x, d3.mean(sample, s => kernel(x - s))]);
            };
        }

        function kernelEpanechnikov(k) {
            return u => Math.abs(u /= k) <= 1 ? 0.75 * (1 - u * u) / k : 0;
        }

        exampleData.forEach((d) => {
            const kde = kernelDensityEstimator(kernelEpanechnikov(7), y.ticks(20)); // Estimate density for Y values
            const density = kde(d.values);

            // Scale for the width of the violin
            const xViolin = d3.scaleLinear()
                .range([0, x.bandwidth() / 2]) // Max width of half the band
                .domain([0, d3.max(density, p => p[1])]);

            // Area generator for the violin shape
            const area = d3.area()
                .curve(d3.curveBasis)
                .x0(p => x(d.group) + x.bandwidth() / 2 - xViolin(p[1]))
                .x1(p => x(d.group) + x.bandwidth() / 2 + xViolin(p[1]))
                .y(p => y(p[0]));

            svg.append("path")
                .datum(density)
                .attr("fill", color(d.group))
                .attr("stroke", d3.color(color(d.group)).darker(0.5))
                .attr("stroke-width", 1)
                .attr("d", area);
        });

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Comparing Distribution Shapes");

        // Legend
        addLegendBelowChart(container.node(), groups, d3.scaleOrdinal().range(["#a855f7", "#3b82f6", "#14b8a6"]).domain(groups));
    }

    function renderHeatmap(containerId, chartData) {
        // Data structure: [{ x: 'A', y: 'P1', value: 10, type: 'High' }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 80, bottom: 60, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xLabels = Array.from(new Set(exampleData.map(d => d.x)));
        const yLabels = Array.from(new Set(exampleData.map(d => d.y)));

        // X-axis: Band scale for x categories
        const x = d3.scaleBand()
            .range([0, width])
            .domain(xLabels)
            .padding(0.05);

        // Y-axis: Band scale for y categories
        const y = d3.scaleBand()
            .range([height, 0])
            .domain(yLabels)
            .padding(0.05);

        // Color scale for values
        const colorScale = d3.scaleSequential(d3.interpolateViridis)
            .domain([0, d3.max(exampleData, d => d.value)]);

        // Append X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("X Category");

        // Append Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text("Y Category");

        // Heatmap cells
        svg.selectAll(".cell")
            .data(exampleData)
            .enter().append("rect")
            .attr("x", d => x(d.x))
            .attr("y", d => y(d.y))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .attr("fill", d => colorScale(d.value))
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Categorical Heatmap");

        // Simple color bar legend for continuous scale (manual for now)
        // This legend is part of the SVG, so it won't be moved by addLegendBelowChart
        const legendSvg = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width + 20}, ${height / 2 - 50})`); // Position right of chart

        const legendHeight = 100;
        const legendWidth = 15;

        const legendYScale = d3.scaleLinear()
            .domain(colorScale.domain())
            .range([legendHeight, 0]);

        legendSvg.append("g")
            .attr("class", "axis")
            .call(d3.axisRight(legendYScale).ticks(5));

        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%");

        linearGradient.selectAll("stop")
            .data(colorScale.ticks(10).map((t, i, a) => ({ offset: `${100*i/a.length}%`, color: colorScale(t) })))
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        legendSvg.append("rect")
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#linear-gradient)");

        legendSvg.append("text")
            .attr("x", legendWidth / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .text("Value");
    }

    function renderParallelCoordinatesPlot(containerId, chartData) {
        // Data structure: [{ var1: 10, var2: 50, ..., item: 'Item 1' }, ...]
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);
        // All keys except 'item' (if present) are dimensions
        const dimensions = Object.keys(exampleData[0]).filter(key => key !== 'item' && key !== 'group'); // Exclude 'group' too

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 60, right: 80, bottom: 60, left: 80 }; // Increased margins
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const yScales = {};
        dimensions.forEach(d => {
            yScales[d] = d3.scaleLinear()
                .domain(d3.extent(exampleData, p => p[d]))
                .range([height, 0]);
        });

        const x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions);

        const line = d3.line();

        // Color scale for lines based on 'item' or 'group' if available
        let colorKey = 'item';
        if (!exampleData[0].hasOwnProperty(colorKey) && exampleData[0].hasOwnProperty('group')) {
            colorKey = 'group';
        }
        const categories = Array.from(new Set(exampleData.map(d => d[colorKey]).filter(Boolean)));
        const color = d3.scaleOrdinal()
            .domain(categories)
            .range(d3.schemeCategory10); // D3's built-in category colors

        // Draw lines for each data point
        svg.selectAll("path")
            .data(exampleData)
            .enter().append("path")
            .attr("d", d => line(dimensions.map(p => [x(p), yScales[p](d[p])])))
            .style("fill", "none")
            .style("stroke", d => color(d[colorKey] || 'Default')) // Color by item/group if available
            .style("stroke-width", 1.5)
            .style("opacity", 0.7);

        // Draw axes
        const g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", d => `translate(${x(d)},0)`);

        g.append("g")
            .each(function(d) { d3.select(this).call(d3.axisLeft(yScales[d])); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -15)
            .style("font-size", "10px")
            .text(d => d)
            .style("fill", "#333");

        // Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", -margin.top + 15)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Multi-dimensional Data Comparison");

        // Legend if categories exist
        if (categories.length > 0) {
            addLegendBelowChart(container.node(), categories, color);
        }
    }

    function renderNodeLinkDiagram(containerId, chartData) {
        // Data structure: { nodes: [{ id: 'A', name: 'Node A', type: 'Source' }], links: [{ source: 'A', target: 'B', value: 10 }] }
        const exampleData = parseSampleDataStructure(chartData.sampleDataStructure);

        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // Use D3 force simulation for a dynamic layout
        const simulation = d3.forceSimulation(exampleData.nodes)
            .force("link", d3.forceLink(exampleData.links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300)) // Repel nodes
            .force("center", d3.forceCenter(width / 2, height / 2)); // Center the graph

        // Color scale for node types if available
        const nodeTypes = Array.from(new Set(exampleData.nodes.map(d => d.type).filter(Boolean)));
        const color = d3.scaleOrdinal()
            .domain(nodeTypes)
            .range(d3.schemeCategory10);

        // Draw links
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(exampleData.links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value || 1)); // Use link value for width

        // Draw nodes
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(exampleData.nodes)
            .join("circle")
            .attr("r", 10)
            .attr("fill", d => color(d.type || 'Default'))
            .call(d3.drag() // Enable dragging
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Node labels
        const label = svg.append("g")
            .selectAll("text")
            .data(exampleData.nodes)
            .join("text")
            .text(d => d.name)
            .attr("font-size", 10)
            .attr("dx", 12)
            .attr("dy", "0.35em");

        // Update positions on each tick of the simulation
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });

        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Chart Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Network Diagram (Drag Nodes)");

        // Legend for node types
        if (nodeTypes.length > 0) {
            addLegendBelowChart(container.node(), nodeTypes, color);
        }
    }

    const intents = [
        { id: 'comparison', name: 'Comparison', icon: '⚖️', description: 'Show differences or similarities between items.' },
        { id: 'composition', name: 'Composition', icon: '🥧', description: 'Illustrate how a whole is made up of parts.' },
        { id: 'distribution', name: 'Distribution', icon: '📊', description: 'Display how data points are spread and their frequency.' },
        { id: 'relationship', name: 'Relationship', icon: '🔗', description: 'Explore how variables relate to each other.' },
        { id: 'evolution', name: 'Evolution', icon: '📈', description: 'Track changes in data over a continuous time dimension.' },
        { id: 'flow', name: 'Flow/Process', icon: '🌊', description: 'Illustrate movement, sequences, or stages within a process.' },
        { id: 'hierarchy', name: 'Hierarchy', icon: '🌳', description: 'Visualize parent-child relationships in data.' },
    ];

    const dataTypes = [
        // Added 'category' property to link to unified data structures
        { id: 'categorical_quantitative', name: 'Categorical & Quantitative', validFor: ['comparison', 'distribution', 'composition'], category: 'single_cat_quant' },
        { id: 'time_series', name: 'Time-Series', validFor: ['evolution', 'comparison'], category: 'multi_cat_quant' }, // Line/Stacked Area can use multi-series
        { id: 'two_quantitative', name: 'Two Quantitative Variables', validFor: ['relationship', 'distribution'], category: 'quant_pair_data' },
        { id: 'three_quantitative', name: 'Three Quantitative Variables', validFor: ['relationship'], category: 'quant_pair_data' },
        { id: 'univariate_quantitative', name: 'Single Quantitative Variable', validFor: ['distribution', 'comparison'], category: 'distribution_data' }, // Bullet can use this
        { id: 'univariate_categorical', name: 'Single Categorical Variable', validFor: ['comparison', 'composition'], category: 'single_cat_quant' }, // Waffle can use this
        { id: 'two_categorical', name: 'Two Categorical Variables', validFor: ['relationship'], category: 'specific_data_structures' }, // Heatmap
        { id: 'hierarchical_data', name: 'Hierarchical Data', validFor: ['composition', 'hierarchy'], category: 'tree_hierarchy_data' },
        { id: 'flow_data', name: 'Flow Data', validFor: ['flow'], category: 'network_hierarchy_data' },
        { id: 'network_data', name: 'Network Data', validFor: ['relationship'], category: 'network_hierarchy_data' },
        { id: 'multivariate_quantitative', name: 'Multivariate Quantitative', validFor: ['comparison', 'relationship', 'distribution'], category: 'specific_data_structures' } // Radar, Parallel Coordinates
    ];

    const charts = [
        {
            id: 'bar',
            name: 'Bar/Column Chart',
            description: 'The quintessential tool for comparing values across discrete categories.',
            intent: ['comparison', 'distribution'],
            dataType: ['categorical_quantitative', 'univariate_categorical'],
            dimensionality: 'Bivariate (1 Cat, 1 Quant) or Univariate (1 Cat)',
            groupingSupport: 'Stacked, Grouped',
            dataConstraints: 'Requires categorical data on one axis and quantitative data on the other. Value axis must start at zero.',
            typicalUseCases: 'Comparing sales by product, number of students by major, showing frequencies for categories.',
            strengths: 'Clear, intuitive comparison of magnitudes across discrete categories. Highly effective when the axis starts from zero.',
            weaknesses: 'Becomes cluttered and unreadable with >15 categories. Starting from a non-zero axis dramatically exaggerates differences misleadingly.',
            compatibleDataCategory: 'single_cat_quant', // New property
            xAxisInfo: {
                label: 'Category (e.g., Product Name)',
                scaleType: 'd3.scaleBand',
                config: 'Maps discrete categories to bands along the X-axis. Uses `domain` for categories and `range` for pixel span. `padding` controls spacing between bars.'
            },
            yAxisInfo: {
                label: 'Value (e.g., Sales Quantity)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` defines min/max data values, `range` defines pixel span. Typically starts at zero for accurate comparison.'
            },
            sampleDataStructure: `const data = [
    { label: 'Product A', value: 65, details: { region: 'North', status: 'Active' } },
    { label: 'Product B', value: 59, details: { region: 'South', status: 'Inactive' } },
    { label: 'Product C', value: 80, details: { region: 'East', status: 'Active' } },
    { label: 'Product D', value: 81, details: { region: 'West', status: 'Active' } },
    { label: 'Product E', value: 45, details: { region: 'North', status: 'Inactive' } }
];`,
            renderFunction: renderBarChart
        },
        {
            id: 'grouped_bar',
            name: 'Grouped Bar Chart',
            description: 'Allows comparison of multiple data series within each category.',
            intent: ['comparison'],
            dataType: ['categorical_quantitative'],
            dimensionality: 'Multivariate (2 Cat, 1 Quant)',
            groupingSupport: 'Grouped',
            dataConstraints: 'Requires two categorical variables and one quantitative variable.',
            typicalUseCases: 'Comparing product sales across different regions, student performance in multiple subjects by gender.',
            strengths: 'Effective for comparing values both within and across categories.',
            weaknesses: 'Can become visually complex with too many series or categories.',
            compatibleDataCategory: 'multi_cat_quant', // New property
            xAxisInfo: {
                label: 'Main Category (e.g., Quarter)',
                scaleType: 'd3.scaleBand (outer), d3.scaleBand (inner)',
                config: 'Outer band scale for main categories, inner band scale for series within each category. `paddingInner` and `padding` control spacing.'
            },
            yAxisInfo: {
                label: 'Value (e.g., Sales Value)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum value across all series.'
            },
            sampleDataStructure: `const data = [
    { label: 'Q1', series: { 'Sales A': 30, 'Sales B': 20, 'Sales C': 15 }, total: 65 },
    { label: 'Q2', series: { 'Sales A': 40, 'Sales B': 25, 'Sales C': 10 }, total: 75 },
    { label: 'Q3', series: { 'Sales A': 20, 'Sales B': 35, 'Sales C': 25 }, total: 80 },
    { label: 'Q4', series: { 'Sales A': 50, 'Sales B': 30, 'Sales C': 20 }, total: 100 }
];`,
            renderFunction: renderGroupedBarChart
        },
        {
            id: 'bullet',
            name: 'Bullet Chart',
            description: 'A specialized and highly effective chart for comparing a single performance measure against a target or benchmark.',
            intent: ['comparison'],
            dataType: ['univariate_quantitative'],
            dimensionality: 'Univariate (1 Quant)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires a single performance value, a target, and qualitative ranges (optional).',
            typicalUseCases: 'Monitoring performance against goals, dashboards, progress reports.',
            strengths: 'Space-efficient alternative to dashboard gauges, clearly shows performance against target and qualitative ranges.',
            weaknesses: 'Specific to a narrow use case (one measure vs. target). Does not show full data distribution.',
            compatibleDataCategory: 'specific_data_structures', // New property
            xAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range. `domain` is typically derived from the maximum range value.'
            },
            yAxisInfo: {
                label: 'N/A',
                scaleType: 'N/A',
                config: 'This chart typically does not have a traditional Y-axis for data mapping; height is fixed or proportional.'
            },
            sampleDataStructure: `const data = {
    value: 75, // Current value
    target: 80, // Target value
    ranges: [60, 70, 90], // Performance ranges (poor, satisfactory, good)
    label: 'KPI Performance'
};`,
            renderFunction: renderBulletChart
        },
        {
            id: 'line',
            name: 'Line Chart',
            description: 'Ideal for tracking trends and changes in data over a continuous time dimension.',
            intent: ['evolution', 'comparison'],
            dataType: ['time_series', 'two_quantitative'],
            dimensionality: 'Bivariate (Time, Quant) or (Quant, Quant)',
            groupingSupport: 'Multiple Lines',
            dataConstraints: 'Requires time data on one axis (usually X) and quantitative data on the other. Ideal for sequential data.',
            typicalUseCases: 'Tracking stock prices, population growth, monthly temperatures.',
            strengths: 'Excellent for showing trends and changes over time. Handles many data points well. Does not require a zero baseline.',
            weaknesses: 'Can be highly misleading if used for non-sequential categorical data, as it falsely implies a continuous relationship.',
            compatibleDataCategory: 'multi_cat_quant', // New property
            xAxisInfo: {
                label: 'Time (e.g., Month)',
                scaleType: 'd3.scalePoint',
                config: 'Maps discrete time points to positions along the X-axis. `padding` controls spacing.'
            },
            yAxisInfo: {
                label: 'Value (e.g., Profit)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum value across all series.'
            },
            sampleDataStructure: `const data = [
    { label: 'Jan', series: { 'Sales A': 30, 'Sales B': 20, 'Sales C': 15 } },
    { label: 'Feb', series: { 'Sales A': 45, 'Sales B': 25, 'Sales C': 10 } },
    { label: 'Mar', series: { 'Sales A': 42, 'Sales B': 35, 'Sales C': 25 } },
    { label: 'Apr', series: { 'Sales A': 55, 'Sales B': 30, 'Sales C': 20 } },
    { label: 'May', series: { 'Sales A': 60, 'Sales B': 40, 'Sales C': 30 } },
    { label: 'Jun', series: { 'Sales A': 58, 'Sales B': 38, 'Sales C': 28 } }
];`,
            renderFunction: renderLineChart
        },
        {
            id: 'dot_plot',
            name: 'Dot Plot',
            description: 'An effective alternative to bar charts, using dot position to represent values and reduce visual clutter.',
            intent: ['comparison'],
            dataType: ['categorical_quantitative'],
            dimensionality: 'Bivariate (1 Cat, 1 Quant)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires categorical and quantitative data. Effective when a zero baseline is not necessary.',
            typicalUseCases: 'Comparing performance across groups, showing change between two time points.',
            strengths: 'Reduces visual clutter compared to bar charts, effective when a zero baseline is not meaningful.',
            weaknesses: 'Can become cluttered with too many categories or very similar values.',
            compatibleDataCategory: 'single_cat_quant', // New property
            xAxisInfo: {
                label: 'Category',
                scaleType: 'd3.scalePoint',
                config: 'Maps discrete categories to points along the X-axis. `padding` controls spacing between points.'
            },
            yAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` defines min/max data values.'
            },
            sampleDataStructure: `const data = [
    { label: 'Category A', value: 50, details: { region: 'North' } },
    { label: 'Category B', value: 70, details: { region: 'South' } },
    { label: 'Category C', value: 45, details: { region: 'East' } },
    { label: 'Category D', value: 60, details: { region: 'West' } }
];`,
            renderFunction: renderDotPlot
        },
        {
            id: 'radar',
            name: 'Radar (Spider) Chart',
            description: 'Used for multivariate comparison, plotting quantitative values for multiple variables on axes radiating from a central point.',
            intent: ['comparison'],
            dataType: ['multivariate_quantitative'],
            dimensionality: 'Multivariate (3+ Quant)',
            groupingSupport: 'N/A (Compares profiles)',
            dataConstraints: 'Requires multiple quantitative variables for the same entities.',
            typicalUseCases: 'Evaluating products across a range of features, comparing student performance profiles.',
            strengths: 'Useful for comparing the profiles of different items across a range of features.',
            weaknesses: 'Effectiveness diminishes rapidly as the number of variables increases, as the chart can become a confusing web of overlapping polygons.',
            compatibleDataCategory: 'specific_data_structures', // New property
            xAxisInfo: {
                label: 'Axes (e.g., Strength, Speed)',
                scaleType: 'Angular (implicit)',
                config: 'Axes radiate from the center, each representing a different quantitative variable. Angle is derived from the number of axes.'
            },
            yAxisInfo: {
                label: 'Value (along axis)',
                scaleType: 'd3.scaleLinear (radial)',
                config: 'Maps quantitative values to a radial distance from the center. `domain` is based on the maximum value across all axes and profiles.'
            },
            sampleDataStructure: `const data = [
    { label: 'Player A', Strength: 65, Speed: 59, Intelligence: 90, Agility: 81, Stamina: 56, Shooting: 70 },
    { label: 'Player B', Strength: 28, Speed: 48, Intelligence: 40, Agility: 19, Stamina: 96, Shooting: 35 },
    { label: 'Player C', Strength: 80, Speed: 75, Intelligence: 60, Agility: 70, Stamina: 65, Shooting: 85 }
];`,
            renderFunction: renderRadarChart
        },
        {
            id: 'slopegraph',
            name: 'Slopegraph',
            description: 'Excels at comparing change between two points (e.g., "before" and "after" states) for multiple categories efficiently.',
            intent: ['comparison', 'evolution'],
            dataType: ['categorical_quantitative', 'time_series'],
            dimensionality: 'Bivariate (Category, Quant) across two time points',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires values for the same categories at two distinct time points.',
            typicalUseCases: 'Tracking changes in rankings, comparing results before and after an. intervention.',
            strengths: 'Clearly and efficiently highlights which categories have increased, decreased, or stayed the same, and by how much.',
            weaknesses: 'Becomes cluttered with too many categories or if changes are very small.',
            compatibleDataCategory: 'specific_data_structures', // New property
            xAxisInfo: {
                label: 'Time Point (Before/After)',
                scaleType: 'Implicit (two fixed points)',
                config: 'Represents two discrete time points (e.g., "Before" and "After") on the X-axis. No D3 scale is explicitly defined for this axis.'
            },
            yAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max values across both time points.'
            },
            sampleDataStructure: `const data = [
    { category: 'Dept A', before: 10, after: 15, change: 5, status: 'Improved' },
    { category: 'Dept B', before: 20, after: 18, change: -2, status: 'Declined' },
    { category: 'Dept C', before: 5, after: 25, change: 20, status: 'Improved' },
    { category: 'Dept D', before: 12, after: 12, change: 0, status: 'No Change' }
];`,
            renderFunction: renderSlopegraph
        },
        {
            id: 'pie',
            name: 'Pie/Donut Chart',
            description: 'The most widely recognized composition charts, representing the whole as a circle divided into slices.',
            intent: ['composition'],
            dataType: ['categorical_quantitative'],
            dimensionality: 'Univariate (1 Cat, 1 Quant for proportions)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires data representing parts of a whole, with very few categories (ideally 5 or fewer).',
            typicalUseCases: 'Budget allocation, market share, simple survey results.',
            strengths: 'Simple, intuitive display of part-to-whole proportions for few categories.',
            weaknesses: 'Humans are poor at judging angles accurately. Becomes totally ineffective with too many slices. Often misused for comparing values between different pies.',
            compatibleDataCategory: 'single_cat_quant', // New property
            xAxisInfo: {
                label: 'N/A',
                scaleType: 'N/A',
                config: 'This chart uses angles and areas to represent proportions, not a linear X-axis.'
            },
            yAxisInfo: {
                label: 'N/A',
                scaleType: 'N/A',
                config: 'This chart uses angles and areas to represent proportions, not a linear Y-axis.'
            },
            sampleDataStructure: `const data = [
    { label: 'Marketing', value: 300, department_id: 'MKT001' },
    { label: 'Sales', value: 500, department_id: 'SAL002' },
    { label: 'Development', value: 1000, department_id: 'DEV003' },
    { label: 'Support', value: 200, department_id: 'SUP004' }
];`,
            renderFunction: renderPieChart
        },
        {
            id: 'stacked_bar',
            name: 'Stacked Bar Chart',
            description: 'Shows composition within another dimension, such as categories or time.',
            intent: ['composition', 'comparison'],
            dataType: ['categorical_quantitative'],
            dimensionality: 'Multivariate (2 Cat, 1 Quant)',
            groupingSupport: 'Stacked, 100% Stacked',
            dataConstraints: 'Requires a quantitative variable broken down by two categorical variables (or one category and time).',
            typicalUseCases: 'Sales composition by product per quarter, population distribution by age group and gender.',
            strengths: 'Shows part-to-whole composition within each category while allowing comparison of totals.',
            weaknesses: 'Difficult to compare individual segment sizes across bars unless they are at the base. Can become complex with many segments.',
            compatibleDataCategory: 'multi_cat_quant', // New property
            xAxisInfo: {
                label: 'Category (e.g., Quarter)',
                scaleType: 'd3.scaleBand',
                config: 'Maps discrete categories to bands along the X-axis. `paddingInner` controls spacing between bars.'
            },
            yAxisInfo: {
                label: 'Value (e.g., Sales Value)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum total stacked value for each category.'
            },
            sampleDataStructure: `const data = [
    { label: 'Q1', series: { 'Product A': 30, 'Product B': 20, 'Product C': 15 }, total: 65 },
    { label: 'Q2', series: { 'Sales A': 40, 'Sales B': 25, 'Sales C': 10 }, total: 75 },
    { label: 'Q3', series: { 'Sales A': 20, 'Sales B': 35, 'Sales C': 25 }, total: 80 },
    { label: 'Q4', series: { 'Sales A': 50, 'Sales B': 30, 'Sales C': 20 }, total: 100 }
];`,
            renderFunction: renderStackedBarChart
        },
        {
            id: 'stacked_area',
            name: 'Stacked Area Chart',
            description: 'Shows how the composition of a total changes over a continuous axis (usually time), with areas stacked on top of each other.',
            intent: ['composition', 'evolution'],
            dataType: ['time_series', 'categorical_quantitative'],
            dimensionality: 'Multivariate (Time, Category, Quant)',
            groupingSupport: 'Stacked, 100% Stacked',
            dataConstraints: 'Requires time data on the X-axis, and multiple quantitative variables representing parts of a whole.',
            typicalUseCases: 'Evolution of market share over time, composition of government spending over years.',
            strengths: 'Combines displaying evolution over time with composition, showing how parts of a whole change.',
            weaknesses: 'Can be difficult to read lower lines accurately. Can be misleading if ordering is not logical.',
            compatibleDataCategory: 'multi_cat_quant', // New property
            xAxisInfo: {
                label: 'Time (e.g., Month)',
                scaleType: 'd3.scalePoint',
                config: 'Maps discrete time points to positions along the X-axis. `padding` controls spacing.'
            },
            yAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum total stacked value for each time point.'
            },
            sampleDataStructure: `const data = [
    { label: 'Jan', series: { 'Category A': 10, 'Category B': 20, 'Category C': 5 } },
    { label: 'Feb', series: { 'Category A': 15, 'Category B': 18, 'Category C': 7 } },
    { label: 'Mar', series: { 'Category A': 12, 'Category B': 25, 'Category C': 8 } },
    { label: 'Apr', series: { 'Category A': 18, 'Category B': 22, 'Category C': 10 } },
    { label: 'May', series: { 'Category A': 20, 'Category B': 28, 'Category C': 12 } },
    { label: 'Jun', series: { 'Category A': 25, 'Category B': 30, 'Category C': 15 } }
];`,
            renderFunction: renderStackedAreaChart
        },
        {
            id: 'treemap',
            name: 'Treemap',
            description: 'A powerful and space-efficient method for visualizing hierarchical part-to-whole relationships.',
            intent: ['composition', 'hierarchy'],
            dataType: ['hierarchical_data', 'quantitative'],
            dimensionality: 'Multivariate (Hierarchy + 1 Quant)',
            groupingSupport: 'Nested',
            dataConstraints: 'Requires data with a clear parent-child hierarchical structure and a quantitative value for each node.',
            typicalUseCases: 'Budget allocation, file sizes on a hard drive, company organizational structure.',
            strengths: 'Space-efficient display of large, hierarchical part-to-whole data. Shows the relative size of each element.',
            weaknesses: 'Difficult to precisely compare areas. Can become unreadable with very deep hierarchies or many small items.',
            compatibleDataCategory: 'tree_hierarchy_data', // New property
            xAxisInfo: {
                label: 'N/A',
                scaleType: 'Implicit (positional)',
                config: 'Uses X-position to encode hierarchy and size. No traditional linear X-axis.'
            },
            yAxisInfo: {
                label: 'N/A',
                scaleType: 'Implicit (positional)',
                config: 'Uses Y-position to encode hierarchy and size. No traditional linear Y-axis.'
            },
            sampleDataStructure: `const data = {
    name: "Root",
    children: [
        { name: "Category A", value: 100, children: [
            { name: "Sub A1", value: 60, status: 'Completed' },
            { name: "Sub A2", value: 40, status: 'Pending' }
        ]},
        { name: "Category B", value: 200, children: [
            { name: "Sub B1", value: 70, status: 'Active' },
            { name: "Sub B2", value: 130, children: [
                { name: "Sub B2-1", value: 50, status: 'Active' },
                { name: "Sub B2-2", value: 80, status: 'Completed' }
            ]}
        ]},
        { name: "Category C", value: 50, children: [] }
    ]
};`,
            renderFunction: renderTreemap
        },
        {
            id: 'waffle',
            name: 'Waffle Chart',
            description: 'Uses a grid of discrete units (squares or icons) to represent proportions, making them highly intuitive and engaging.',
            intent: ['composition'],
            dataType: ['univariate_categorical', 'quantitative'],
            dimensionality: 'Univariate (Percentage)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires a single percentage or multiple percentages that sum to 100%.',
            typicalUseCases: 'Illustrating progress towards a goal, representing percentages in reports.',
            strengths: 'Highly intuitive and visually engaging for concretely communicating percentages.',
            weaknesses: 'Not suitable for a large number of categories. Does not show precise details.',
            compatibleDataCategory: 'single_cat_quant', // New property
            xAxisInfo: {
                label: 'N/A',
                scaleType: 'Implicit (grid position)',
                config: 'X-axis position is determined by grid layout (column index). No explicit D3 scale.'
            },
            yAxisInfo: {
                label: 'N/A',
                scaleType: 'Implicit (grid position)',
                config: 'Y-axis position is determined by grid layout (row index). No explicit D3 scale.'
            },
            sampleDataStructure: `const data = { label: 'Project Completion', value: 75, unit: '%' };`, // Single percentage for simplicity
            renderFunction: renderWaffleChart
        },
        {
            id: 'histogram',
            name: 'Histogram',
            description: 'The standard chart for visualizing the distribution of a single continuous variable.',
            intent: ['distribution'],
            dataType: ['univariate_quantitative'],
            dimensionality: 'Univariate (1 Quant)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires a continuous quantitative variable. Relies on "bins" to group data.',
            typicalUseCases: 'Distribution of customer ages, test scores, income distribution.',
            strengths: 'Clearly shows the frequency distribution of a single continuous variable. Crucial in exploratory data analysis.',
            weaknesses: 'Shape is highly dependent on the choice of bin width. Not for categorical data.',
            compatibleDataCategory: 'distribution_data', // New property
            xAxisInfo: {
                label: 'Value (e.g., Age)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps continuous quantitative values to a linear range. Data is grouped into `bins` on this axis.'
            },
            yAxisInfo: {
                label: 'Frequency',
                scaleType: 'd3.scaleLinear',
                config: 'Maps the count of data points in each bin to a linear range. `domain` is based on the maximum frequency.'
            },
            sampleDataStructure: `const data = [
    { group: 'All Data', values: [12, 19, 33, 25, 8, 15, 22, 28, 35, 40, 42, 48, 50, 55, 58, 62, 65, 70, 75, 80, 85, 90, 95, 100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150] }
];`,
            renderFunction: renderHistogram
        },
        {
            id: 'density_plot',
            name: 'Density Plot',
            description: 'A smoothed version of a histogram, providing a continuous curve that estimates the underlying probability distribution of the data.',
            intent: ['distribution'],
            dataType: ['univariate_quantitative'],
            dimensionality: 'Univariate (1 Quant)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires a continuous quantitative variable.',
            typicalUseCases: 'Understanding the shape of data distribution, identifying hidden patterns.',
            strengths: 'Provides a clearer view of the underlying shape of data distribution compared to a histogram, especially with large datasets.',
            weaknesses: 'May obscure fine details of the distribution compared to a raw histogram.',
            compatibleDataCategory: 'distribution_data', // New property
            xAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps continuous quantitative values to a linear range. Represents the data values for which density is estimated.'
            },
            yAxisInfo: {
                label: 'Density',
                scaleType: 'd3.scaleLinear',
                config: 'Maps the estimated probability density to a linear range. `domain` is based on the maximum density value.'
            },
            sampleDataStructure: `const data = [
    { group: 'All Data', values: Array.from({length: 200}, (_, i) => Math.random() * 80 + 20) } // More data points
];`,
            renderFunction: renderDensityPlot
        },
        {
            id: 'box',
            name: 'Box Plot (Box-and-Whisker Plot)',
            description: 'A compact and powerful tool for summarizing the distribution of a dataset through a five-number summary.',
            intent: ['distribution', 'comparison'],
            dataType: ['categorical_quantitative'],
            dimensionality: 'Bivariate (1 Cat, 1 Quant)',
            groupingSupport: 'Faceted',
            dataConstraints: 'Requires a quantitative variable and a categorical variable for grouping.',
            typicalUseCases: 'Comparing distributions of variables across multiple groups, identifying outliers.',
            strengths: 'Compactly summarizes and compares distributions across multiple groups; highlights outliers effectively.',
            weaknesses: 'Hides the underlying shape of the distribution (e.g., bimodality).',
            compatibleDataCategory: 'distribution_data', // New property
            xAxisInfo: {
                label: 'Group',
                scaleType: 'd3.scaleBand',
                config: 'Maps discrete groups to bands along the X-axis. `paddingInner` and `paddingOuter` control spacing.'
            },
            yAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max values across all groups.'
            },
            sampleDataStructure: `const data = [
    { group: 'Group A', values: [10, 20, 30, 40, 50, 60, 70, 80, 15, 25, 35, 45, 55, 65, 75, 85, 90, 95, 100, 5, 12, 18, 22, 28] },
    { group: 'Group B', values: [15, 25, 35, 45, 55, 65, 75, 85, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100, 105, 110, 115, 120, 125, 130] },
    { group: 'Group C', values: [20, 30, 40, 50, 60, 70, 80, 90, 25, 35, 45, 55, 65, 75, 85, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150] }
];`,
            renderFunction: renderBoxPlot
        },
        {
            id: 'violin',
            name: 'Violin Plot',
            description: 'A more sophisticated chart that combines the features of a box plot and a density plot, revealing the shape of the distribution.',
            intent: ['distribution', 'comparison'],
            dataType: ['categorical_quantitative'],
            dimensionality: 'Bivariate (1 Cat, 1 Quant)',
            groupingSupport: 'Faceted',
            dataConstraints: 'Requires a quantitative variable and a categorical variable for grouping.',
            typicalUseCases: 'Understanding the full distribution of data across groups, identifying multi-modal distributions.',
            strengths: 'Provides a much richer understanding than a standard box plot, as it reveals the shape of the distribution.',
            weaknesses: 'More complex to interpret than a simple box plot. Can become cluttered with many groups.',
            compatibleDataCategory: 'distribution_data', // New property
            xAxisInfo: {
                label: 'Group',
                scaleType: 'd3.scaleBand',
                config: 'Maps discrete groups to bands along the X-axis. `padding` controls spacing between violins.'
            },
            yAxisInfo: {
                label: 'Value',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max values across all groups.'
            },
            sampleDataStructure: `const data = [
    { group: 'Group A', values: [10, 12, 15, 20, 22, 25, 30, 32, 35, 40, 42, 45, 50, 55, 58, 60, 62, 65, 70, 75, 80, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100] },
    { group: 'Group B', values: [15, 18, 20, 25, 28, 30, 33, 38, 40, 45, 48, 50, 52, 55, 60, 62, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130] },
    { group: 'Group C', values: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 92, 95, 98, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150] }
];`,
            renderFunction: renderViolinPlot
        },
        {
            id: 'scatter',
            name: 'Scatter Plot',
            description: 'The default and most powerful chart for exploring the relationship between two continuous, quantitative variables.',
            intent: ['relationship', 'distribution'],
            dataType: ['two_quantitative'],
            dimensionality: 'Bivariate (2 Quant)',
            groupingSupport: 'Color/Shape Coding',
            dataConstraints: 'Requires two continuous quantitative variables.',
            typicalUseCases: 'Revealing correlations, identifying clusters and outliers, understanding patterns.',
            strengths: 'The gold standard for showing correlation and relationship between two continuous variables. Reveals form, direction, and strength of a relationship.',
            weaknesses: 'Can suffer from overplotting with very large datasets, making individual points indistinguishable.',
            compatibleDataCategory: 'quant_pair_data', // New property
            xAxisInfo: {
                label: 'X-Axis Value (e.g., Price)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the X-axis. `domain` covers the min/max of X values.'
            },
            yAxisInfo: {
                label: 'Y-Axis Value (e.g., Units Sold)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max of Y values.'
            },
            sampleDataStructure: `const data = [
    { x: 10, y: 200, id: 'Point_1', metadata: { type: 'A', status: 'active' } },
    { x: 12, y: 180, id: 'Point_2', metadata: { type: 'B', status: 'inactive' } },
    { x: 15, y: 150, id: 'Point_3', metadata: { type: 'A', status: 'active' } },
    { x: 18, y: 140, id: 'Point_4', metadata: { type: 'C', status: 'active' } },
    { x: 20, y: 120, id: 'Point_5', metadata: { type: 'B', status: 'inactive' } },
    { x: 22, y: 100, id: 'Point_6', metadata: { type: 'A', status: 'active' } },
    { x: 25, y: 80, id: 'Point_7', metadata: { type: 'C', status: 'active' } },
    { x: 8, y: 210, id: 'Point_8', metadata: { type: 'B', status: 'active' } },
    { x: 28, y: 70, id: 'Point_9', metadata: { type: 'A', status: 'inactive' } },
    { x: 17, y: 160, id: 'Point_10', metadata: { type: 'C', status: 'active' } }
];`,
            renderFunction: renderScatterPlot
        },
        {
            id: 'bubble',
            name: 'Bubble Chart',
            description: 'A multivariate extension of a scatter plot, adding a third quantitative dimension by varying the size (area) of the bubbles.',
            intent: ['relationship', 'comparison'],
            dataType: ['three_quantitative'],
            dimensionality: 'Multivariate (3 Quant)',
            groupingSupport: 'Color Coding',
            dataConstraints: 'Requires three quantitative variables.',
            typicalUseCases: 'Analyzing GDP, life expectancy, and population; comparing companies by revenue, profit, and employee count.',
            strengths: 'Extends a scatter plot to encode a third dimension using bubble size.',
            weaknesses: 'Human perception of area is less precise than position, making the 3rd variable harder to judge.',
            compatibleDataCategory: 'quant_pair_data', // New property
            xAxisInfo: {
                label: 'X-Axis Value (e.g., GDP)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the X-axis. `domain` covers the min/max of X values.'
            },
            yAxisInfo: {
                label: 'Y-Axis Value (e.g., Life Expectancy)',
                scaleType: 'd3.scaleLinear',
                config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max of Y values.'
            },
            sampleDataStructure: `const data = [
    { x: 20, y: 30, size: 15, id: 'Country A', metadata: { type: 'Developed', continent: 'Europe' } },
    { x: 40, y: 10, size: 25, id: 'Country B', metadata: { type: 'Developing', continent: 'Asia' } },
    { x: 32, y: 50, size: 18, id: 'Country C', metadata: { type: 'Developed', continent: 'North America' } },
    { x: 15, y: 25, size: 22, id: 'Country D', metadata: { type: 'Developing', continent: 'Africa' } },
    { x: 50, y: 40, size: 10, id: 'Country E', metadata: { type: 'Developed', continent: 'Europe' } }
];`,
            renderFunction: renderBubbleChart
        },
        {
            id: 'heatmap',
            name: 'Heatmap',
            description: 'A grid-based visualization where value is represented by color, useful for showing correlations or density.',
            intent: ['relationship', 'distribution'],
            dataType: ['two_categorical', 'two_quantitative'], // Can be 2 categorical or 2 quantitative (for 2D hist)
            dimensionality: 'Bivariate (2 Cat) or (2 Quant)',
            groupingSupport: 'Grid',
            dataConstraints: 'Requires two variables (categorical or quantitative) where the relationship or density is represented by color.',
            typicalUseCases: 'Correlation matrices, cross-tabulations, density maps for very large datasets.',
            strengths: 'Efficiently shows relationships between two categorical variables or density in large datasets. Good for identifying patterns in tabular data.',
            weaknesses: 'Can be difficult to interpret precise values without labels. Highly dependent on color scale choice.',
            compatibleDataCategory: 'specific_data_structures', // New property
            xAxisInfo: {
                label: 'X Category',
                scaleType: 'd3.scaleBand',
                config: 'Maps discrete categories to bands along the X-axis. `padding` controls spacing between cells.'
            },
            yAxisInfo: {
                label: 'Y Category',
                scaleType: 'd3.scaleBand',
                config: 'Maps discrete categories to bands along the Y-axis. `padding` controls spacing between cells.'
            },
            sampleDataStructure: `const data = [
    { x: 'Region A', y: 'Product 1', value: 10, type: 'High' }, { x: 'Region A', y: 'Product 2', value: 20, type: 'Medium' }, { x: 'Region A', y: 'Product 3', value: 15, type: 'Low' },
    { x: 'Region B', y: 'Product 1', value: 25, type: 'High' }, { x: 'Region B', y: 'Product 2', value: 5, type: 'Low' }, { x: 'Region B', y: 'Product 3', value: 30, type: 'High' },
    { x: 'Region C', y: 'Product 1', value: 18, type: 'Medium' }, { x: 'Region C', y: 'Product 2', value: 12, type: 'Low' }, { x: 'Region C', y: 'Product 3', value: 22, type: 'Medium' }
];`,
            renderFunction: renderHeatmap
        },
        {
            id: 'sankey',
            name: 'Sankey Diagram',
            description: 'Designed to illustrate movement, sequences, or stages within a process, with a focus on flow magnitude.',
            intent: ['flow', 'composition'],
            dataType: ['flow_data'],
            dimensionality: 'Multivariate (From, To, Weight)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires flow data (source, target, quantity/weight).',
            typicalUseCases: 'Energy flow, customer conversion funnels, money flow, user paths.',
            strengths: 'Excellent for visualizing the magnitude of flows through a multi-stage process. Highlights bottlenecks or main pathways.',
            weaknesses: 'Requires specific data structure. Can become cluttered with too many flows or complex stages.',
            compatibleDataCategory: 'network_hierarchy_data', // New property
            xAxisInfo: {
                label: 'Stages/Nodes',
                scaleType: 'Implicit (positional)',
                config: 'Nodes are positioned along the X-axis to represent stages in a flow. No explicit D3 scale.'
            },
            yAxisInfo: {
                label: 'Flow Magnitude',
                scaleType: 'Implicit (positional)',
                config: 'Flows (links) are positioned along the Y-axis based on their value. No explicit D3 scale.'
            },
            sampleDataStructure: `const data = {
    nodes: [ // List of nodes/stages
        { id: 'Source_1', name: 'Source 1', type: 'Input' }, { id: 'Source_2', name: 'Source 2', type: 'Input' },
        { id: 'Stage_A', name: 'Stage A', type: 'Process' }, { id: 'Stage_B', name: 'Stage B', type: 'Process' },
        { id: 'Dest_1', name: 'Destination 1', type: 'Output' }, { id: 'Dest_2', name: 'Destination 2', type: 'Output' }
    ],
    links: [ // List of links/flows
        { source: 'Source_1', target: 'Stage_A', value: 100, flow_type: 'Material' },
        { source: 'Source_2', target: 'Stage_A', value: 50, flow_type: 'Material' },
        { source: 'Stage_A', target: 'Stage_B', value: 120, flow_type: 'Product' },
        { source: 'Stage_B', target: 'Dest_1', value: 70, flow_type: 'Final Product' },
        { source: 'Stage_B', target: 'Dest_2', value: 50, flow_type: 'Waste' }
    ]
};`,
            renderFunction: null // Complex D3.js implementation, often requires specific layouts or libraries
        },
        {
            id: 'node_link',
            name: 'Node-Link Diagram',
            description: 'Represents hierarchies or networks by drawing nodes for each item and lines (links or edges) to connect them.',
            intent: ['hierarchy', 'relationship'],
            dataType: ['hierarchical_data', 'network_data'],
            dimensionality: 'Multivariate (Nodes, Links)',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires data with interconnected relationships (parent-child or network connections).',
            typicalUseCases: 'Organizational charts, social networks, website maps, file categorization.',
            strengths: 'Visually represents complex relationships between entities. Can clearly show hierarchies or connections.',
            weaknesses: 'Can become messy and unreadable with many nodes or links. Difficult to discern patterns in large networks.',
            compatibleDataCategory: 'network_hierarchy_data', // New property
            xAxisInfo: {
                label: 'N/A (Force-directed layout)',
                scaleType: 'Implicit (positional)',
                config: 'Node X-positions are determined by a force simulation to minimize overlaps and reveal clusters. No explicit D3 scale.'
            },
            yAxisInfo: {
                label: 'N/A (Force-directed layout)',
                scaleType: 'Implicit (positional)',
                config: 'Node Y-positions are determined by a force simulation. No explicit D3 scale.'
            },
            sampleDataStructure: `const data = {
    nodes: [ // List of nodes
        { id: 'A', name: 'Node A', type: 'Person', department: 'HR' },
        { id: 'B', name: 'Node B', type: 'Person', department: 'Finance' },
        { id: 'C', name: 'Node C', type: 'Project', status: 'Active' },
        { id: 'D', name: 'Node D', type: 'Person', department: 'HR' }
    ],
    links: [ // List of links
        { source: 'A', target: 'B', relationship: 'Collaborates' },
        { source: 'B', target: 'C', relationship: 'Manages' },
        { source: 'A', target: 'D', relationship: 'Reports To' }
    ]
};`,
            renderFunction: renderNodeLinkDiagram
        },
        {
            id: 'parallel_coordinates',
            name: 'Parallel Coordinates Plot',
            description: 'Represents each data point as a line that passes through parallel axes, with each axis representing a different variable.',
            intent: ['relationship', 'distribution'],
            dataType: ['multivariate_quantitative'],
            dimensionality: 'Multivariate (Many Quantities)',
            groupingSupport: 'Color Coding',
            dataConstraints: 'Requires many quantitative variables.',
            typicalUseCases: 'Discovering patterns in high-dimensional data, comparing entity profiles.',
            strengths: 'Allows visualization of many dimensions at once. Good for identifying clusters and patterns in multivariate data.',
            weaknesses: 'Can become cluttered with many data points or variables. Difficult to read precise values.',
            compatibleDataCategory: 'specific_data_structures', // New property
            xAxisInfo: {
                label: 'Variables/Dimensions',
                scaleType: 'd3.scalePoint',
                config: 'Maps each variable (dimension) to a distinct vertical axis position along the X-axis. `padding` controls spacing.'
            },
            yAxisInfo: {
                label: 'Value (for each variable)',
                scaleType: 'd3.scaleLinear (per axis)',
                config: 'Each vertical axis has its own linear scale mapping the range of values for that specific variable. `domain` is based on the extent of values for each variable.'
            },
            sampleDataStructure: `const data = [
    { var1: 10, var2: 50, var3: 20, var4: 80, item: 'Item 1', group: 'G1' },
    { var1: 20, var2: 40, var3: 25, var4: 70, item: 'Item 2', group: 'G2' },
    { var1: 15, var2: 55, var3: 18, var4: 90, item: 'Item 3', group: 'G1' },
    { var1: 25, var2: 45, var3: 30, var4: 60, item: 'Item 4', group: 'G2' },
    { var1: 30, var2: 35, var3: 15, var4: 75, item: 'Item 5', group: 'G1' }
];`,
            renderFunction: renderParallelCoordinatesPlot
        }
    ];

    const intentSelector = document.getElementById('intent-selector');
    const dataTypeSection = document.getElementById('data-type-section');
    const dataTypeSelector = document.getElementById('data-type-selector');
    const recommendationsContainer = document.getElementById('chart-recommendations');
    const recommendationsSubtitle = document.getElementById('recommendations-subtitle');
    const fullGalleryContainer = document.getElementById('full-gallery');
    const detailedChartPropertiesTableBody = document.querySelector('#detailed-chart-properties-table tbody');

    let selectedIntent = null;
    let selectedDataType = null;

    /**
     * Calls the Gemini API to get a pro-tip for a given chart.
     * @param {Object} chartData - The data for the chart.
     * @param {HTMLElement} proTipBoxElement - The HTML element to display the tip.
     * @param {HTMLElement} buttonElement - The button that triggered the call.
     */
    async function getProTip(chartData, proTipBoxElement, buttonElement) {
        proTipBoxElement.innerHTML = '<div class="loading-spinner"></div> Generating Pro-Tip...';
        buttonElement.disabled = true; // Disable button during loading

        const prompt = `Given the following chart details, generate a concise 'Pro-Tip' for effectively using this chart type. Focus on a key aspect that leverages its strengths or mitigates its weaknesses.

Chart Name: ${chartData.name}
Description: ${chartData.description}
Strengths: ${chartData.strengths}
Weaknesses: ${chartData.weaknesses}
Typical Use Cases: ${chartData.typicalUseCases}
Data Structure Constraints: ${chartData.dataConstraints}

Pro-Tip:`;

        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                proTipBoxElement.innerHTML = `<strong>✨ Pro-Tip:</strong> ${text}`;
            } else {
                proTipBoxElement.innerHTML = 'Error: Could not generate pro-tip. Please try again.';
                console.error('Gemini API response structure unexpected:', result);
            }
        } catch (error) {
            proTipBoxElement.innerHTML = 'Error: Failed to connect to Gemini API.';
            console.error('Error calling Gemini API:', error);
        } finally {
            buttonElement.disabled = false; // Re-enable button
        }
    }


    function renderIntents() {
        intents.forEach(intent => {
            const card = document.createElement('div');
            card.className = 'intent-card bg-white p-4 rounded-lg shadow-md border-2 border-transparent hover:shadow-xl hover:border-teal-500 transition duration-300 cursor-pointer flex flex-col items-center justify-center';
            card.dataset.intent = intent.id;
            card.innerHTML = `
                <div class="text-4xl mb-2">${intent.icon}</div>
                <h4 class="font-bold text-lg">${intent.name}</h4>
                <p class="text-sm text-stone-500 mt-1">${intent.description}</p>
            `;
            card.addEventListener('click', () => handleIntentSelection(intent.id, card));
            intentSelector.appendChild(card);
        });
    }

    function handleIntentSelection(intentId, card) {
        selectedIntent = intentId;
        selectedDataType = null; 

        document.querySelectorAll('.intent-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        renderDataTypes(intentId);
        dataTypeSection.classList.remove('hidden');
        renderRecommendations();
    }

    function renderDataTypes(intentId) {
        dataTypeSelector.innerHTML = '';
        const relevantDataTypes = dataTypes.filter(dt => dt.validFor.includes(intentId));
        relevantDataTypes.forEach(dt => {
            const btn = document.createElement('button');
            btn.className = 'datatype-btn bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 px-4 rounded-full transition duration-300';
            btn.textContent = dt.name;
            btn.dataset.type = dt.id;
            btn.addEventListener('click', () => handleDataTypeSelection(dt.id, btn));
            dataTypeSelector.appendChild(btn);
        });
    }
    
    function handleDataTypeSelection(dataTypeId, btn) {
        selectedDataType = dataTypeId;
        document.querySelectorAll('.datatype-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        renderRecommendations();
    }

    function renderRecommendations() {
        recommendationsContainer.innerHTML = '';

        let filteredCharts = charts;
        if (selectedIntent) {
            filteredCharts = filteredCharts.filter(c => c.intent.includes(selectedIntent));
        }
        
        // New logic for dynamic data structure selection
        if (selectedDataType) {
            const selectedDataTypeCategory = dataTypes.find(dt => dt.id === selectedDataType)?.category;
            if (selectedDataTypeCategory) {
                // Filter charts that are compatible with the selected data category
                filteredCharts = filteredCharts.filter(c => c.compatibleDataCategory === selectedDataTypeCategory);
            } else {
                // If a dataType is selected but has no category, filter by its direct dataType
                filteredCharts = filteredCharts.filter(c => c.dataType.includes(selectedDataType));
            }
        }
        
        if (!selectedIntent) {
            recommendationsSubtitle.textContent = 'Select a goal above to start exploring recommended charts.';
        } else if (filteredCharts.length === 0 && selectedIntent && selectedDataType) {
            recommendationsSubtitle.textContent = 'No direct recommendations for this combination. Try a different set.';
        } else if (filteredCharts.length > 0) {
            recommendationsSubtitle.textContent = `Best options for "${intents.find(i=>i.id===selectedIntent).name}"${selectedDataType ? ` and data type "${dataTypes.find(d=>d.id===selectedDataType).name}"` : ''}.`;
        } else {
            recommendationsSubtitle.textContent = 'Now select your data type to narrow down recommendations.';
        }


        filteredCharts.forEach(chartData => {
            createChartCard(chartData, recommendationsContainer);
        });
    }
    
    function renderFullGallery() {
        charts.forEach(chartData => {
             createChartCard(chartData, fullGalleryContainer);
        });
    }
    
    function createChartCard(chartData, container) {
        const chartWrapper = document.createElement('div');
        chartWrapper.className = 'bg-white p-4 md:p-6 rounded-xl shadow-lg border border-stone-200 flex flex-col';
        
        const chartContainerId = `chart-viz-${chartData.id}-${container.id}`; // Unique ID for the D3 container
        const proTipBoxId = `pro-tip-box-${chartData.id}-${container.id}`; // Unique ID for the pro-tip box

        let chartContentHtml = '';
        if (chartData.renderFunction) {
            chartContentHtml = `<div id="${chartContainerId}" class="chart-container mb-4"></div>`;
        } else {
            chartContentHtml = `<div class="chart-container mb-4 flex items-center justify-center bg-stone-100 rounded-lg text-stone-500 text-center p-4">No direct visual example available for this chart type.<br>Please refer to the description for its use.</div>`;
        }

        chartWrapper.innerHTML = `
            <h4 class="text-xl font-bold mb-3 text-teal-700">${chartData.name}</h4>
            <p class="text-stone-700 text-sm mb-3">${chartData.description}</p>
            ${chartContentHtml}
            <div class="space-y-2 mt-auto text-sm">
                <div>
                    <h5 class="font-semibold text-stone-800">Dimensionality:</h5>
                    <p class="text-stone-600">${chartData.dimensionality}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Grouping Support:</h5>
                    <p class="text-stone-600">${chartData.groupingSupport}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Data Structure Constraints:</h5>
                    <p class="text-stone-600">${chartData.dataConstraints}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">X-Axis Details:</h5>
                    <p class="text-stone-600"><strong>Label:</strong> ${chartData.xAxisInfo.label}</p>
                    <p class="text-stone-600"><strong>Scale Type:</strong> <code>${chartData.xAxisInfo.scaleType}</code></p>
                    <p class="text-stone-600"><strong>Configuration:</strong> ${chartData.xAxisInfo.config}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Y-Axis Details:</h5>
                    <p class="text-stone-600"><strong>Label:</strong> ${chartData.yAxisInfo.label}</p>
                    <p class="text-stone-600"><strong>Scale Type:</strong> <code>${chartData.yAxisInfo.scaleType}</code></p>
                    <p class="text-stone-600"><strong>Configuration:</strong> ${chartData.yAxisInfo.config}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Typical Use Cases:</h5>
                    <p class="text-stone-600">${chartData.typicalUseCases}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Strengths:</h5>
                    <p class="text-stone-600">${chartData.strengths}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Weaknesses:</h5>
                    <p class="text-stone-600">${chartData.weaknesses}</p>
                </div>
                <div>
                    <h5 class="font-semibold text-stone-800">Required Data Structure:</h5>
                    <pre><code class="language-javascript">${chartData.sampleDataStructure}</code></pre>
                </div>
                <button id="pro-tip-btn-${chartData.id}-${container.id}" >
                    
                </button>
                <div id="${proTipBoxId}" class="pro-tip-box hidden"></div>
            </div>
        `;
        container.appendChild(chartWrapper);

        // Call the D3.js rendering function if available
        if (chartData.renderFunction) {
            // Use a timeout to ensure the container is rendered and has dimensions
            setTimeout(() => {
                chartData.renderFunction(chartContainerId, chartData); // Pass chartData to render function
            }, 0);
        }

        // Add event listener for the Pro-Tip button
        const proTipButton = document.getElementById(`pro-tip-btn-${chartData.id}-${container.id}`);
        const proTipBox = document.getElementById(proTipBoxId);
        proTipButton.addEventListener('click', () => {
            proTipBox.classList.remove('hidden'); // Show the box
            getProTip(chartData, proTipBox, proTipButton);
        });
    }

    // Updated function to render the detailed chart properties table
    function renderDetailedChartPropertiesTable() {
        detailedChartPropertiesTableBody.innerHTML = ''; // Clear existing content

        charts.forEach(chart => {
            const row = detailedChartPropertiesTableBody.insertRow();
            
            row.insertCell().textContent = chart.name;
            row.insertCell().textContent = chart.description;
            row.insertCell().textContent = chart.dimensionality;
            row.insertCell().textContent = chart.groupingSupport;
            row.insertCell().textContent = chart.typicalUseCases;
            row.insertCell().textContent = chart.strengths;
            row.insertCell().textContent = chart.weaknesses;
            row.insertCell().textContent = chart.dataConstraints;
            
            const dataStructureCell = row.insertCell();
            dataStructureCell.innerHTML = `<pre><code class="language-javascript">${chart.sampleDataStructure}</code></pre>`;
        });
    }
    
    renderIntents();
    renderFullGallery();
    renderRecommendations();
    renderDetailedChartPropertiesTable(); // Call the new function to render the detailed table
});