document.addEventListener('DOMContentLoaded', function () {
    // D3.js rendering functions
    // Note: For simplicity and to avoid complex data parsing/evaluation from string,
    // exampleData is hardcoded within each D3 function, mirroring the sampleDataStructure.
    // In a real application, you would parse the sampleDataStructure string or pass actual data.

    function renderBarChart(containerId) {
        const exampleData = [
            { category: 'Product A', value: 65 },
            { category: 'Product B', value: 59 },
            { category: 'Product C', value: 80 },
            { category: 'Product D', value: 81 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html(''); // Clear previous content
        const margin = { top: 20, right: 20, bottom: 40, left: 60 }; // Increased bottom/left for labels
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(exampleData.map(d => d.category));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(exampleData, d => d.value) * 1.1]); // Add some padding to top

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(exampleData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.category))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value))
            .attr("fill", "#14b8a6"); // Tailwind teal-500

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Product Sales Comparison");
    }

    function renderGroupedBarChart(containerId) {
        const exampleData = [
            { category: 'Q1', 'Product A': 30, 'Product B': 20 },
            { category: 'Q2', 'Product A': 40, 'Product B': 25 },
            { category: 'Q3', 'Product A': 20, 'Product B': 35 }
        ];
        const keys = ['Product A', 'Product B']; // Data series

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x0 = d3.scaleBand()
            .domain(exampleData.map(d => d.category))
            .rangeRound([0, width])
            .paddingInner(0.1);

        const x1 = d3.scaleBand()
            .domain(keys)
            .rangeRound([0, x0.bandwidth()])
            .padding(0.05);

        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.max(keys, key => d[key])) * 1.1])
            .rangeRound([height, 0]);

        const color = d3.scaleOrdinal()
            .range(["#14b8a6", "#3b82f6"]); // Tailwind teal-500, blue-500

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x0));

        svg.append("g")
            .call(d3.axisLeft(y));

        const category = svg.selectAll(".category")
            .data(exampleData)
            .enter().append("g")
            .attr("transform", d => `translate(${x0(d.category)},0)`);

        category.selectAll("rect")
            .data(d => keys.map(key => ({ key: key, value: d[key] })))
            .enter().append("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Product Sales by Quarter");
    }

    function renderLineChart(containerId) {
        const exampleData = [
            { date: 'Jan', value: 30 },
            { date: 'Feb', value: 45 },
            { date: 'Mar', value: 42 },
            { date: 'Apr', value: 55 },
            { date: 'May', value: 60 },
            { date: 'Jun', value: 58 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint() // Use scalePoint for categorical labels
            .range([0, width])
            .padding(0.5)
            .domain(exampleData.map(d => d.date));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(exampleData, d => d.value) * 1.1]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        svg.append("path")
            .datum(exampleData)
            .attr("fill", "none")
            .attr("stroke", "#0d9488") // Tailwind teal-700
            .attr("stroke-width", 2)
            .attr("d", line);

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Tracking Profit Over Time");
    }

    function renderDotPlot(containerId) {
        const exampleData = [
            { category: 'Category A', value: 50 },
            { category: 'Category B', value: 70 },
            { category: 'Category C', value: 45 },
            { category: 'Category D', value: 60 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint()
            .range([0, width])
            .padding(0.5)
            .domain(exampleData.map(d => d.category));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(exampleData, d => d.value) * 1.1]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll(".dot")
            .data(exampleData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.category))
            .attr("cy", d => y(d.value))
            .attr("r", 5)
            .attr("fill", "#f97316"); // Tailwind orange-500

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Comparing Values with Dots");
    }

    function renderRadarChart(containerId) {
        const exampleData = [
            { axis: 'Strength', value: 65 },
            { axis: 'Speed', value: 59 },
            { axis: 'Intelligence', value: 90 },
            { axis: 'Agility', value: 81 },
            { axis: 'Stamina', value: 56 }
        ];
        const exampleData2 = [
            { axis: 'Strength', value: 28 },
            { axis: 'Speed', value: 48 },
            { axis: 'Intelligence', value: 40 },
            { axis: 'Agility', value: 19 },
            { axis: 'Stamina', value: 96 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;
        const radius = Math.min(width, height) / 2 - 30;

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const allAxis = exampleData.map(d => d.axis);
        const total = allAxis.length;
        const angleSlice = Math.PI * 2 / total;

        const rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, 100]); // Assuming max value is 100

        const radarLine = d3.lineRadial()
            .curve(d3.curveCardinalClosed)
            .radius(d => rScale(d.value))
            .angle((d, i) => i * angleSlice);

        // Draw circles for background
        svg.selectAll("circle")
            .data([10, 25, 50, 75, 100])
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
            .attr("x2", (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1);

        axis.append("text")
            .attr("x", (d, i) => (rScale(100) + 10) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => (rScale(100) + 10) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("text-anchor", "middle")
            .text(d => d);

        // Draw radar areas
        svg.append("path")
            .datum(exampleData)
            .attr("d", radarLine)
            .attr("fill", "rgba(20, 184, 166, 0.2)") // Tailwind teal-500 with opacity
            .attr("stroke", "#14b8a6")
            .attr("stroke-width", 2);
        
        svg.append("path")
            .datum(exampleData2)
            .attr("d", radarLine)
            .attr("fill", "rgba(59, 130, 246, 0.2)") // Tailwind blue-500 with opacity
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 2);

        svg.append("text")
            .attr("x", 0)
            .attr("y", -radius - 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Player Profiles Comparison");
    }

    function renderPieChart(containerId) {
        const exampleData = [
            { label: 'Marketing', value: 300 },
            { label: 'Sales', value: 500 },
            { label: 'Development', value: 1000 },
            { label: 'Support', value: 200 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;
        const radius = Math.min(width, height) / 2 - 20;

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

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
            .range(['#3b82f6', '#14b8a6', '#f97316', '#a855f7']); // Tailwind colors

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

        svg.append("text")
            .attr("x", 0)
            .attr("y", -radius - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Department Budget Distribution");
    }

    function renderStackedBarChart(containerId) {
        const exampleData = [
            { category: 'Q1', 'Product A': 30, 'Product B': 20, 'Product C': 15 },
            { category: 'Q2', 'Product A': 40, 'Product B': 25, 'Product C': 10 },
            { category: 'Q3', 'Product A': 20, 'Product B': 35, 'Product C': 25 }
        ];
        const keys = ['Product A', 'Product B', 'Product C'];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(exampleData.map(d => d.category))
            .rangeRound([0, width])
            .paddingInner(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.sum(keys, key => d[key])) * 1.1])
            .rangeRound([height, 0]);

        const color = d3.scaleOrdinal()
            .range(["#14b8a6", "#3b82f6", "#f97316"]); // Tailwind teal, blue, orange

        const stack = d3.stack().keys(keys);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll(".series")
            .data(stack(exampleData))
            .enter().append("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.category))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth());
        
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Sales Composition by Product per Quarter");
    }

    function renderStackedAreaChart(containerId) {
        const exampleData = [
            { date: 'Jan', 'Category A': 10, 'Category B': 20 },
            { date: 'Feb', 'Category A': 15, 'Category B': 18 },
            { date: 'Mar', 'Category A': 12, 'Category B': 25 },
            { date: 'Apr', 'Category A': 18, 'Category B': 22 },
            { date: 'May', 'Category A': 20, 'Category B': 28 },
            { date: 'Jun', 'Category A': 25, 'Category B': 30 }
        ];
        const keys = ['Category A', 'Category B'];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint()
            .domain(exampleData.map(d => d.date))
            .range([0, width])
            .padding(0.5);

        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d3.sum(keys, key => d[key])) * 1.1])
            .range([height, 0]);

        const color = d3.scaleOrdinal()
            .range(["rgba(20, 184, 166, 0.5)", "rgba(59, 130, 246, 0.5)"]); // Tailwind teal, blue with opacity

        const stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);

        const area = d3.area()
            .x(d => x(d.data.date))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]));

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll(".layer")
            .data(stack(exampleData))
            .enter().append("path")
            .attr("class", "layer")
            .attr("d", area)
            .attr("fill", d => color(d.key))
            .attr("stroke", d => d3.color(color(d.key)).darker(0.5)) // Darker stroke for definition
            .attr("stroke-width", 1);
        
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Monthly Sales Composition");
    }

    function renderHistogram(containerId) {
        const exampleData = [12, 19, 33, 25, 8, 15, 22, 28, 35, 40, 42, 48, 50, 55, 58]; // Raw data for bins

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([d3.min(exampleData) - 5, d3.max(exampleData) + 5]) // Extend domain slightly
            .range([0, width]);

        const histogram = d3.histogram()
            .value(d => d)
            .domain(x.domain())
            .thresholds(x.ticks(5)); // 5 bins

        const bins = histogram(exampleData);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(bins, d => d.length) * 1.1]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("rect")
            .data(bins)
            .enter().append("rect")
            .attr("x", 1)
            .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
            .attr("width", d => x(d.x1) - x(d.x0) - 1)
            .attr("height", d => height - y(d.length))
            .attr("fill", "#3b82f6aa") // Tailwind blue-500 with opacity
            .attr("stroke", "#2563eb"); // Tailwind blue-600

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Customer Age Distribution");
    }

    function renderDensityPlot(containerId) {
        const exampleData = Array.from({length: 100}, (_, i) => Math.random() * 60 + 10); // Random data for density

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([d3.min(exampleData) * 0.9, d3.max(exampleData) * 1.1])
            .range([0, width]);

        // Compute kernel density estimate
        const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(100));
        const density = kde(exampleData);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(density, d => d[1]) * 1.1]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(density)
            .attr("fill", "rgba(20, 184, 166, 0.3)")
            .attr("stroke", "#14b8a6")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(d => x(d[0]))
                .y(d => y(d[1])));
        
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

    function renderBoxPlot(containerId) {
        const exampleData = [
            { group: 'Group A', values: [10, 20, 30, 40, 50, 60, 70, 80] },
            { group: 'Group B', values: [15, 25, 35, 45, 55, 65, 75, 85] },
            { group: 'Group C', values: [20, 30, 40, 50, 60, 70, 80, 90] }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(exampleData.map(d => d.group))
            .paddingInner(1)
            .paddingOuter(0.5);

        const y = d3.scaleLinear()
            .domain([0, 100]) // Assuming values from 0 to 100
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        // Calculate box plot statistics
        const boxPlotData = exampleData.map(d => {
            const sorted = d.values.sort(d3.ascending);
            const q1 = d3.quantile(sorted, 0.25);
            const median = d3.quantile(sorted, 0.5);
            const q3 = d3.quantile(sorted, 0.75);
            const min = sorted[0];
            const max = sorted[sorted.length - 1];
            return { group: d.group, q1, median, q3, min, max };
        });

        // Draw boxes
        svg.selectAll(".box")
            .data(boxPlotData)
            .enter().append("rect")
            .attr("x", d => x(d.group) - x.bandwidth() / 4) // Center the box
            .attr("y", d => y(d.q3))
            .attr("width", x.bandwidth() / 2)
            .attr("height", d => y(d.q1) - y(d.q3))
            .attr("fill", "#a855f755") // Tailwind purple-500 with opacity
            .attr("stroke", "#8b5cf6")
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

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Comparing Result Distributions");
    }


    function renderScatterPlot(containerId) {
        const exampleData = [
            { x: 10, y: 200 }, { x: 12, y: 180 }, { x: 15, y: 150 },
            { x: 18, y: 140 }, { x: 20, y: 120 }, { x: 22, y: 100 },
            { x: 25, y: 80 }, { x: 8, y: 210 }, { x: 28, y: 70 }, { x: 17, y: 160 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.x) * 1.1])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.y) * 1.1])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        svg.selectAll(".dot")
            .data(exampleData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 5)
            .attr("fill", "#14b8a6"); // Tailwind teal-500

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Product Price vs. Units Sold");
        
        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
            .style("text-anchor", "middle")
            .text("Price (USD)");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .text("Units Sold");
    }

    function renderBubbleChart(containerId) {
        const exampleData = [
            { x: 20, y: 30, r: 15, label: 'Country A' },
            { x: 40, y: 10, r: 25, label: 'Country B' },
            { x: 32, y: 50, r: 18, label: 'Country C' },
            { x: 15, y: 25, r: 22, label: 'Country D' }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.x) * 1.1])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(exampleData, d => d.y) * 1.1])
            .range([height, 0]);

        const rScale = d3.scaleSqrt()
            .domain([0, d3.max(exampleData, d => d.r) * 1.5]) // Scale radius based on max r
            .range([0, 20]); // Max visual radius

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        svg.selectAll(".bubble")
            .data(exampleData)
            .enter().append("circle")
            .attr("class", "bubble")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", d => rScale(d.r))
            .attr("fill", "#f9731699") // Tailwind orange-500 with opacity
            .attr("stroke", "#ea580c")
            .attr("stroke-width", 1);

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("GDP (X), Life Expectancy (Y), Population (Bubble Size)");
        
        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
            .style("text-anchor", "middle")
            .text("GDP");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 15)
            .attr("x", 0 - (height / 2))
            .attr("text-anchor", "middle")
            .text("Life Expectancy");
    }

    // New D3.js rendering functions for previously missing charts

    function renderBulletChart(containerId) {
        const exampleData = { value: 75, target: 80, ranges: [60, 70, 90] };

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 20, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, 100]) // Assuming a max of 100 for performance
            .range([0, width]);

        // Background ranges
        svg.selectAll(".range")
            .data(exampleData.ranges)
            .enter().append("rect")
            .attr("class", "range")
            .attr("x", 0)
            .attr("width", d => x(d))
            .attr("y", height / 4)
            .attr("height", height / 2)
            .attr("fill", (d, i) => {
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

        // Axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Performance vs. Target");
    }

    function renderSlopegraph(containerId) {
        const exampleData = [
            { category: 'A', before: 10, after: 15 },
            { category: 'B', before: 20, after: 18 },
            { category: 'C', before: 5, after: 25 },
            { category: 'D', before: 12, after: 12 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 20, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

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
            .text("Value");
        
        svg.append("text")
            .attr("x", 0)
            .attr("y", height + 30)
            .attr("text-anchor", "start")
            .style("font-weight", "bold")
            .text("Before");

        // Draw 'After' axis
        svg.append("g")
            .attr("transform", `translate(${width},0)`)
            .call(d3.axisRight(y));
        svg.append("text")
            .attr("x", width)
            .attr("y", height + 30)
            .attr("text-anchor", "end")
            .style("font-weight", "bold")
            .text("After");

        // Draw lines and circles
        exampleData.forEach(d => {
            svg.append("line")
                .attr("x1", 0)
                .attr("y1", y(d.before))
                .attr("x2", width)
                .attr("y2", y(d.after))
                .attr("stroke", d.before < d.after ? "#14b8a6" : (d.before > d.after ? "#dc2626" : "#4b5563")) // Green for increase, Red for decrease, Gray for no change
                .attr("stroke-width", 2);

            svg.append("circle")
                .attr("cx", 0)
                .attr("cy", y(d.before))
                .attr("r", 4)
                .attr("fill", "#3b82f6");

            svg.append("circle")
                .attr("cx", width)
                .attr("cy", y(d.after))
                .attr("r", 4)
                .attr("fill", "#3b82f6");

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

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Change Between Two Points");
    }

    function renderTreemap(containerId) {
        const exampleData = {
            name: "Root",
            children: [
                { name: "Category A", value: 100, children: [
                    { name: "Sub A1", value: 60 },
                    { name: "Sub A2", value: 40 }
                ]},
                { name: "Category B", value: 200, children: [
                    { name: "Sub B1", value: 70 },
                    { name: "Sub B2", value: 130, children: [
                        { name: "Sub B2-1", value: 50 },
                        { name: "Sub B2-2", value: 80 }
                    ]}
                ]},
                { name: "Category C", value: 50 }
            ]
        };

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 10, right: 10, bottom: 10, left: 10 };
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

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
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
    }

    function renderWaffleChart(containerId) {
        const exampleData = { percentage: 75 }; // Single percentage for simplicity

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
            filled: i < (exampleData.percentage / 100) * totalCells
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

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text(`Progress: ${exampleData.percentage}%`);
    }

    function renderViolinPlot(containerId) {
        // Simplified Violin Plot: Representing density curves for multiple groups.
        // A full Violin Plot requires complex statistical calculations (KDE) and drawing,
        // which is beyond a simple D3 example without external libraries.
        // This will show smoothed density distributions.
        const exampleData = [
            { group: 'Group A', values: [10, 12, 15, 20, 22, 25, 30, 32, 35, 40, 42, 45, 50, 55, 58, 60, 62, 65, 70, 75, 80] },
            { group: 'Group B', values: [15, 18, 20, 25, 28, 30, 33, 38, 40, 45, 48, 50, 52, 55, 60, 62, 65, 70, 75, 80, 85] },
            { group: 'Group C', values: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 92, 95, 98, 100] }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(exampleData.map(d => d.group))
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, 100]) // Assuming values from 0 to 100
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        const color = d3.scaleOrdinal()
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

        exampleData.forEach((d, i) => {
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

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Comparing Distribution Shapes");
    }

    function renderHeatmap(containerId) {
        const exampleData = [
            { x: 'A', y: 'P1', value: 10 }, { x: 'A', y: 'P2', value: 20 }, { x: 'A', y: 'P3', value: 15 },
            { x: 'B', y: 'P1', value: 25 }, { x: 'B', y: 'P2', value: 5 }, { x: 'B', y: 'P3', value: 30 },
            { x: 'C', y: 'P1', value: 18 }, { x: 'C', y: 'P2', value: 12 }, { x: 'C', y: 'P3', value: 22 }
        ];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 30, right: 20, bottom: 40, left: 60 };
        const width = container.node().clientWidth - margin.left - margin.right;
        const height = container.node().clientHeight - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xLabels = Array.from(new Set(exampleData.map(d => d.x)));
        const yLabels = Array.from(new Set(exampleData.map(d => d.y)));

        const x = d3.scaleBand()
            .range([0, width])
            .domain(xLabels)
            .padding(0.05);

        const y = d3.scaleBand()
            .range([height, 0])
            .domain(yLabels)
            .padding(0.05);

        const colorScale = d3.scaleSequential(d3.interpolateViridis)
            .domain([0, d3.max(exampleData, d => d.value)]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

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

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Categorical Heatmap");
    }

    function renderParallelCoordinatesPlot(containerId) {
        const exampleData = [
            { id: 1, var1: 10, var2: 50, var3: 20, var4: 80 },
            { id: 2, var1: 20, var2: 40, var3: 25, var4: 70 },
            { id: 3, var1: 15, var2: 55, var3: 18, var4: 90 },
            { id: 4, var1: 25, var2: 45, var3: 30, var4: 60 }
        ];
        const dimensions = ['var1', 'var2', 'var3', 'var4'];

        const container = d3.select(`#${containerId}`);
        container.html('');
        const margin = { top: 40, right: 20, bottom: 20, left: 20 };
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

        // Draw lines for each data point
        svg.selectAll("path")
            .data(exampleData)
            .enter().append("path")
            .attr("d", d => line(dimensions.map(p => [x(p), yScales[p](d[p])])))
            .style("fill", "none")
            .style("stroke", "#3b82f6aa") // Tailwind blue-500 with opacity
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
            .text(d => d)
            .style("fill", "#333");

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", -margin.top + 15)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Multi-dimensional Data Comparison");
    }

    function renderNodeLinkDiagram(containerId) {
        const exampleData = {
            nodes: [
                { id: 'A', name: 'Node A' },
                { id: 'B', name: 'Node B' },
                { id: 'C', name: 'Node C' },
                { id: 'D', name: 'Node D' },
                { id: 'E', name: 'Node E' }
            ],
            links: [
                { source: 'A', target: 'B' },
                { source: 'A', target: 'C' },
                { source: 'B', target: 'D' },
                { source: 'C', target: 'E' },
                { source: 'D', target: 'E' }
            ]
        };

        const container = d3.select(`#${containerId}`);
        container.html('');
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;

        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // For a static layout, manually assign positions or use a simple grid/circle layout
        // Here, we'll use a simple circular layout for demonstration
        const numNodes = exampleData.nodes.length;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;

        exampleData.nodes.forEach((node, i) => {
            const angle = (i / numNodes) * 2 * Math.PI;
            node.x = centerX + radius * Math.cos(angle);
            node.y = centerY + radius * Math.sin(angle);
        });

        // Draw links
        const link = svg.selectAll(".link")
            .data(exampleData.links)
            .enter().append("line")
            .attr("class", "link")
            .attr("x1", d => exampleData.nodes.find(n => n.id === d.source).x)
            .attr("y1", d => exampleData.nodes.find(n => n.id === d.source).y)
            .attr("x2", d => exampleData.nodes.find(n => n.id === d.target).x)
            .attr("y2", d => exampleData.nodes.find(n => n.id === d.target).y)
            .attr("stroke", "#9ca3af") // Tailwind gray-400
            .attr("stroke-width", 2);

        // Draw nodes
        const node = svg.selectAll(".node")
            .data(exampleData.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        node.append("circle")
            .attr("r", 15)
            .attr("fill", "#3b82f6") // Tailwind blue-500
            .attr("stroke", "#2563eb")
            .attr("stroke-width", 1.5);

        node.append("text")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .style("font-size", "10px")
            .style("fill", "white")
            .text(d => d.name);
        
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Basic Node-Link Diagram");
    }

    const intents = [
        { id: 'comparison', name: 'Comparison', icon: '⚖️', description: 'Show differences or similarities between items.' },
        { id: 'composition', name: 'Composition', icon: '🥧', description: 'Illustrate how a whole is made up of parts.' },
        { id: 'distribution', name: 'Distribution', icon: '📊', description: 'Display how data points are spread and their frequency.' },
        { id: 'relationship', name: 'Relationship', icon: '🔗', description: 'Explore how variables relate to each other.' },
        { id: 'evolution', name: 'Evolution', icon: '📈', description: 'Track changes in data over a continuous time dimension.' },
        { id: 'flow', name: 'Flow/Process', icon: '�', description: 'Illustrate movement, sequences, or stages within a process.' },
        { id: 'hierarchy', name: 'Hierarchy', icon: '🌳', description: 'Visualize parent-child relationships in data.' },
    ];

    const dataTypes = [
        { id: 'categorical_quantitative', name: 'Categorical & Quantitative', validFor: ['comparison', 'distribution', 'composition'] },
        { id: 'time_series', name: 'Time-Series', validFor: ['evolution', 'comparison'] },
        { id: 'two_quantitative', name: 'Two Quantitative Variables', validFor: ['relationship', 'distribution'] },
        { id: 'three_quantitative', name: 'Three Quantitative Variables', validFor: ['relationship'] },
        { id: 'univariate_quantitative', name: 'Single Quantitative Variable', validFor: ['distribution'] },
        { id: 'univariate_categorical', name: 'Single Categorical Variable', validFor: ['comparison'] },
        { id: 'two_categorical', name: 'Two Categorical Variables', validFor: ['relationship'] },
        { id: 'hierarchical_data', name: 'Hierarchical Data', validFor: ['composition', 'hierarchy'] },
        { id: 'flow_data', name: 'Flow Data', validFor: ['flow'] },
        { id: 'network_data', name: 'Network Data', validFor: ['relationship'] },
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
            sampleDataStructure: `const data = [
    { category: 'Category A', value: 150 },
    { category: 'Category B', value: 200 },
    { category: 'Category C', value: 120 }
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
            sampleDataStructure: `const data = {
    labels: ['Category 1', 'Category 2', 'Category 3'], // Main categories or time points
    datasets: [{
        label: 'Series A',
        data: [30, 40, 20]
    }, {
        label: 'Series B',
        data: [20, 25, 35]
    }]
};`,
            renderFunction: renderGroupedBarChart
        },
        {
            id: 'bullet',
            name: 'Bullet Chart',
            description: 'A specialized and highly effective chart for comparing a single performance measure against a target or benchmark.',
            intent: ['comparison'],
            dataType: ['univariate_quantitative'],
            dimensionality: 'Univariate',
            groupingSupport: 'N/A',
            dataConstraints: 'Requires a single performance value, a target, and qualitative ranges (optional).',
            typicalUseCases: 'Monitoring performance against goals, dashboards, progress reports.',
            strengths: 'Space-efficient alternative to dashboard gauges, clearly shows performance against target and qualitative ranges.',
            weaknesses: 'Specific to a narrow use case (one measure vs. target). Does not show full data distribution.',
            sampleDataStructure: `const data = {
    value: 75, // Current value
    target: 80, // Target value
    ranges: [60, 70, 90] // Performance ranges (poor, satisfactory, good)
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
            sampleDataStructure: `const data = {
    labels: ['Category 1', 'Category 2', 'Category 3'], // Main categories or time points
    datasets: [{
        label: 'Series A',
        data: [30, 40, 20]
    }, {
        label: 'Series B',
        data: [20, 25, 35]
    }]
};`,
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
            sampleDataStructure: `const data = {
    labels: ['Category A', 'Category B', 'Category C'], // Categories
    datasets: [{
        label: 'Values',
        data: [{x: 'Category A', y: 50}, {x: 'Category B', y: 70}, {x: 'Category C', y: 45}] // Points (category, value)
    }]
};`,
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
            sampleDataStructure: `const data = {
    labels: ['Feature 1', 'Feature 2', 'Feature 3'], // Axis/feature names
    datasets: [{
        label: 'Product A',
        data: [65, 59, 90] // Values for Product A per feature
    }, {
        label: 'Product B',
        data: [28, 48, 40] // Values for Product B per feature
    }]
};`,
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
            typicalUseCases: 'Tracking changes in rankings, comparing results before and after an intervention.',
            strengths: 'Clearly and efficiently highlights which categories have increased, decreased, or stayed the same, and by how much.',
            weaknesses: 'Becomes cluttered with too many categories or if changes are very small.',
            sampleDataStructure: `const data = [
    { category: 'Category A', before: 10, after: 15 },
    { category: 'Category B', before: 20, after: 18 },
    { category: 'Category C', before: 5, after: 25 }
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
            sampleDataStructure: `const data = {
    labels: ['Part 1', 'Part 2', 'Part 3'], // Names of the parts
    datasets: [{
        data: [30, 50, 20] // Values for each part (sum should represent the whole)
    }]
};`,
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
            sampleDataStructure: `const data = {
    labels: ['Category 1', 'Category 2', 'Category 3'], // Main categories or time points
    datasets: [{
        label: 'Series A',
        data: [30, 40, 20]
    }, {
        label: 'Series B',
        data: [20, 25, 35]
    }]
};`,
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
            sampleDataStructure: `const data = {
    labels: ['Category 1', 'Category 2', 'Category 3'], // Main categories or time points
    datasets: [{
        label: 'Series A',
        data: [30, 40, 20]
    }, {
        label: 'Series B',
        data: [20, 25, 35]
    }]
};`,
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
            sampleDataStructure: `const data = {
    name: "Root",
    children: [
        { name: "Category A", value: 100, children: [
            { name: "Sub A1", value: 60 },
            { name: "Sub A2", value: 40 }
        ]},
        { name: "Category B", value: 200 }
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
            sampleDataStructure: `const data = {
    percentage: 75 // A single percentage
};
// Or for multiple categories:
// const data = [
//     { category: 'Completed', percentage: 75 },
//     { category: 'Remaining', percentage: 25 }
// ];`,
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
            sampleDataStructure: `const data = [
    10, 12, 15, 20, 22, 25, 30, 32, 35, 40, 42, 45, 50, 55, 58 // List of raw values
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
            sampleDataStructure: `const data = [
    10, 12, 15, 20, 22, 25, 30, 32, 35, 40, 42, 45, 50, 55, 58 // List of raw values
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
            sampleDataStructure: `const data = {
    labels: ['Group A', 'Group B'], // Group names
    datasets: [{
        label: 'Values',
        data: [
            [10, 20, 30, 40, 50], // [Min, Q1, Median, Q3, Max] for Group A
            [15, 25, 35, 45, 55]  // for Group B
        ]
    }]
};`,
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
            sampleDataStructure: `const data = {
    labels: ['Group A', 'Group B'], // Group names
    datasets: [{
        label: 'Values',
        data: [
            [10, 12, 15, 20, 22, 25, 30, 32, 35, 40, 42, 45, 50, 55, 58], // Raw values for Group A
            [15, 18, 20, 25, 28, 30, 33, 38, 40, 45, 48, 50, 52, 55, 60]  // Raw values for Group B
        ]
    }]
};`,
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
            sampleDataStructure: `const data = {
    datasets: [{
        label: 'Points',
        data: [
            {x: 10, y: 200},
            {x: 12, y: 180},
            {x: 15, y: 150}
        ] // Array of {x, y} objects
    }]
};`,
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
            sampleDataStructure: `const data = {
    datasets: [{
        label: 'Bubble Points',
        data: [
            {x: 20, y: 30, r: 15}, // x, y, bubble radius
            {x: 40, y: 10, r: 25}
        ] // Array of {x, y, r} objects
    }]
};`,
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
            sampleDataStructure: `const data = [
    { x: 'Category A', y: 'Property 1', value: 10 },
    { x: 'Category A', y: 'Property 2', value: 20 },
    { x: 'Category B', y: 'Property 1', value: 15 },
    { x: 'Category B', y: 'Property 2', value: 25 }
]; // Array of {x, y, value} objects for a categorical grid`,
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
            sampleDataStructure: `const data = {
    nodes: [ // List of nodes/stages
        { id: 'Source 1' }, { id: 'Source 2' },
        { id: 'Stage A' }, { id: 'Stage B' },
        { id: 'Destination 1' }, { id: 'Destination 2' }
    ],
    links: [ // List of links/flows
        { source: 'Source 1', target: 'Stage A', value: 100 },
        { source: 'Source 2', target: 'Stage A', value: 50 },
        { source: 'Stage A', target: 'Stage B', value: 120 },
        { source: 'Stage B', target: 'Destination 1', value: 70 },
        { source: 'Stage B', target: 'Destination 2', value: 50 }
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
            sampleDataStructure: `const data = {
    nodes: [ // List of nodes
        { id: 'A', name: 'Node A' },
        { id: 'B', name: 'Node B' },
        { id: 'C', name: 'Node C' }
    ],
    links: [ // List of links
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' }
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
            sampleDataStructure: `const data = [
    { var1: 10, var2: 50, var3: 20 },
    { var1: 20, var2: 40, var3: 25 },
    { var1: 15, var2: 55, var3: 18 }
]; // Array of objects, each property representing a variable`,
            renderFunction: renderParallelCoordinatesPlot
        }
    ];

    const intentSelector = document.getElementById('intent-selector');
    const dataTypeSection = document.getElementById('data-type-section');
    const dataTypeSelector = document.getElementById('data-type-selector');
    const recommendationsContainer = document.getElementById('chart-recommendations');
    const recommendationsSubtitle = document.getElementById('recommendations-subtitle');
    const fullGalleryContainer = document.getElementById('full-gallery');
    const groupedDataStructureTableBody = document.querySelector('#grouped-data-structure-table tbody');

    let selectedIntent = null;
    let selectedDataType = null;
    // No need for activeCharts array to destroy Chart.js instances anymore
    // D3.js charts are rendered by clearing the container HTML.

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
        if (selectedDataType) {
             filteredCharts = filteredCharts.filter(c => c.dataType.includes(selectedDataType));
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
            </div>
        `;
        container.appendChild(chartWrapper);

        // Call the D3.js rendering function if available
        if (chartData.renderFunction) {
            // Use a timeout to ensure the container is rendered and has dimensions
            setTimeout(() => {
                chartData.renderFunction(chartContainerId);
            }, 0);
        }
    }

    function renderGroupedDataStructures() {
        const groupedCharts = {};
        charts.forEach(chart => {
            const structure = chart.sampleDataStructure;
            if (!groupedCharts[structure]) {
                groupedCharts[structure] = [];
            }
            groupedCharts[structure].push(chart.name);
        });

        for (const structure in groupedCharts) {
            const row = groupedDataStructureTableBody.insertRow();
            const chartNamesCell = row.insertCell();
            const dataStructureCell = row.insertCell();

            chartNamesCell.className = 'py-3 px-4';
            dataStructureCell.className = 'py-3 px-4';

            chartNamesCell.textContent = groupedCharts[structure].join(', ');
            dataStructureCell.innerHTML = `<pre><code class="language-javascript">${structure}</code></pre>`;
        }
    }
    
    renderIntents();
    renderFullGallery();
    renderRecommendations();
    renderGroupedDataStructures(); // Call the new function to render the table
});
