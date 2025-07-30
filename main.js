document.addEventListener('DOMContentLoaded', function () {

        // --- Unified Data Structures Definition ---
        const unifiedDataStructures = {
            'single_cat_quant': {
                description: 'Categorical & Quantitative (Single Value) - For charts like Bar Chart, Pie Chart, Dot Plot, Waffle Chart. Example: Total Sales/Profit per Product or Region.',
                sampleData: [
                    { label: 'Smartphones', sales: 120000, purchases: 80000, profit: 40000, unitsSold: 1200 },
                    { label: 'Laptops', sales: 85000, purchases: 55000, profit: 30000, unitsSold: 500 },
                    { label: 'Headphones', sales: 60000, purchases: 35000, profit: 25000, unitsSold: 2500 },
                    { label: 'Smartwatches', sales: 35000, purchases: 20000, profit: 15000, unitsSold: 700 },
                    { label: 'Cameras', sales: 45000, purchases: 30000, profit: 15000, unitsSold: 300 }
                ],
                sampleDataString: `const data = [
    { label: 'Smartphones', sales: 120000, purchases: 80000, profit: 40000, unitsSold: 1200 },
    { label: 'Laptops', sales: 85000, purchases: 55000, profit: 30000, unitsSold: 500 },
    { label: 'Headphones', sales: 60000, purchases: 35000, profit: 25000, unitsSold: 2500 },
    { label: 'Smartwatches', sales: 35000, purchases: 20000, profit: 15000, unitsSold: 700 },
    { label: 'Cameras', sales: 45000, purchases: 30000, profit: 15000, unitsSold: 300 }
];`
            },
            'multi_cat_quant': {
                description: 'Categorical & Quantitative (Multiple Series) - For charts like Grouped Bar Chart, Stacked Bar Chart, Stacked Area Chart, Line Chart (Multiple Lines). Example: Quarterly Sales/Profit by Product Category.',
                sampleData: [
                    { label: 'Q1 2024', series: { 'Electronics': 30000, 'Home Appliances': 25000, 'Clothing': 18000 }, total: 73000 },
                    { label: 'Q2 2024', series: { 'Electronics': 35000, 'Home Appliances': 28000, 'Clothing': 22000 }, total: 85000 },
                    { label: 'Q3 2024', series: { 'Electronics': 28000, 'Home Appliances': 32000, 'Clothing': 25000 }, total: 85000 },
                    { label: 'Q4 2024', series: { 'Electronics': 40000, 'Home Appliances': 30000, 'Clothing': 20000 }, total: 90000 }
                ],
                sampleDataString: `const data = [
    { label: 'Q1 2024', series: { 'Electronics': 30000, 'Home Appliances': 25000, 'Clothing': 18000 }, total: 73000 },
    { label: 'Q2 2024', series: { 'Electronics': 35000, 'Home Appliances': 28000, 'Clothing': 22000 }, total: 85000 },
    { label: 'Q3 2024', series: { 'Electronics': 28000, 'Home Appliances': 32000, 'Clothing': 25000 }, total: 85000 },
    { label: 'Q4 2024', series: { 'Electronics': 40000, 'Home Appliances': 30000, 'Clothing': 20000 }, total: 90000 }
];`
            },
            'distribution_data': {
                description: 'Distribution Data (Single/Multiple Groups) - For charts like Histogram, Density Plot, Box Plot, Violin Plot. Example: Distribution of Individual Transaction Profits, or Product Profit Margins.',
                sampleData: {
                    'Transaction Profits': { group: 'Transaction Profits', values: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250] },
                    'Product Profit Margins (%)': { group: 'Product Profit Margins (%)', values: [15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75] },
                    'Purchase Costs': { group: 'Purchase Costs', values: [50, 75, 100, 120, 150, 180, 200, 220, 250, 280, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000] },
                    'Electronics Profits': { group: 'Electronics Profits', values: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120] },
                    'Home Appliances Profits': { group: 'Home Appliances Profits', values: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110] },
                    'Clothing Profits': { group: 'Clothing Profits', values: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60] },
                },
                sampleDataString: `const data = {
    'Transaction Profits': { group: 'Transaction Profits', values: [10, 12, ..., 250] },
    'Product Profit Margins (%)': { group: 'Product Profit Margins (%)', values: [15, 18, ..., 75] },
    'Purchase Costs': { group: 'Purchase Costs', values: [50, 75, ..., 1000] },
    'Electronics Profits': { group: 'Electronics Profits', values: [20, 25, ..., 120] },
    'Home Appliances Profits': { group: 'Home Appliances Profits', values: [15, 20, ..., 110] },
    'Clothing Profits': { group: 'Clothing Profits', values: [10, 12, ..., 60] },
};`
            },
            'quant_pair_data': {
                description: 'Quantitative Pair Data (2 or 3 Variables) - For charts like Scatter Plot, Bubble Chart. Example: Sales vs. Profit per Product, with Units Sold as Size.',
                sampleData: [
                    { x: 120000, y: 40000, size: 1200, id: 'Smartphones', category: 'Electronics', profitMargin: 0.33 },
                    { x: 85000, y: 30000, size: 500, id: 'Laptops', category: 'Electronics', profitMargin: 0.35 },
                    { x: 60000, y: 25000, size: 2500, id: 'Headphones', category: 'Accessories', profitMargin: 0.42 },
                    { x: 35000, y: 15000, size: 700, id: 'Smartwatches', category: 'Wearables', profitMargin: 0.43 },
                    { x: 45000, y: 15000, size: 300, id: 'Cameras', category: 'Electronics', profitMargin: 0.33 },
                    { x: 70000, y: 28000, size: 800, id: 'Tablets', category: 'Electronics', profitMargin: 0.40 },
                    { x: 20000, y: 8000, size: 1500, id: 'Mice', category: 'Accessories', profitMargin: 0.40 }
                ],
                sampleDataString: `const data = [
    { x: 120000, y: 40000, size: 1200, id: 'Smartphones', category: 'Electronics', profitMargin: 0.33 },
    { x: 85000, y: 30000, size: 500, id: 'Laptops', category: 'Electronics', profitMargin: 0.35 },
    { x: 60000, y: 25000, size: 2500, id: 'Headphones', category: 'Accessories', profitMargin: 0.42 },
    { x: 35000, y: 15000, size: 700, id: 'Smartwatches', category: 'Wearables', profitMargin: 0.43 },
    { x: 45000, y: 15000, size: 300, id: 'Cameras', category: 'Electronics', profitMargin: 0.33 },
    { x: 70000, y: 28000, size: 800, id: 'Tablets', category: 'Electronics', profitMargin: 0.40 },
    { x: 20000, y: 8000, size: 1500, id: 'Mice', category: 'Accessories', profitMargin: 0.40 }
];`
            },
            'network_hierarchy_data': {
                description: 'Network & Hierarchical Data (Nodes & Links, Nested Structures) - For charts like Sankey Diagram, Node-Link Diagram, Dendrogram, Circle Packing. Example: Product Supply Chain Flow, Company Organizational Chart, Product Category Hierarchy.',
                sampleData: {
                    sankey: {
                        nodes: [
                            { id: 'Supplier A', name: 'Supplier A' }, { id: 'Supplier B', name: 'Supplier B' },
                            { id: 'Warehouse', name: 'Warehouse' }, { id: 'Online Sales', name: 'Online Sales' },
                            { id: 'Retail Stores', name: 'Retail Stores' }, { id: 'Customers', name: 'Customers' },
                            { id: 'Returns', name: 'Returns' }
                        ],
                        links: [
                            { source: 'Supplier A', target: 'Warehouse', value: 50000, flowType: 'Electronics Supply' },
                            { source: 'Supplier B', target: 'Warehouse', value: 30000, flowType: 'Apparel Supply' },
                            { source: 'Warehouse', target: 'Online Sales', value: 40000, flowType: 'Distribution to Online' },
                            { source: 'Warehouse', target: 'Retail Stores', value: 35000, flowType: 'Distribution to Retail' },
                            { source: 'Online Sales', target: 'Customers', value: 38000, flowType: 'Online Sales' },
                            { source: 'Retail Stores', target: 'Customers', value: 32000, flowType: 'Retail Sales' },
                            { source: 'Online Sales', target: 'Returns', value: 2000, flowType: 'Online Returns' },
                            { source: 'Retail Stores', target: 'Returns', value: 3000, flowType: 'Retail Returns' },
                            { source: 'Returns', target: 'Warehouse', value: 4000, flowType: 'Returned to Stock' }
                        ]
                    },
                    nodeLink: {
                        nodes: [
                            { id: 'CEO', name: 'CEO', type: 'Executive' },
                            { id: 'Sales Director', name: 'Sales Director', type: 'Management' },
                            { id: 'Marketing Director', name: 'Marketing Director', type: 'Management' },
                            { id: 'Operations Director', name: 'Operations Director', type: 'Management' },
                            { id: 'Sales Manager East', name: 'Sales Manager (East)', type: 'Team Lead' },
                            { id: 'Sales Manager West', name: 'Sales Manager (West)', type: 'Team Lead' },
                            { id: 'Marketing Specialist', name: 'Marketing Specialist', type: 'Individual Contributor' },
                            { id: 'Logistics Manager', name: 'Logistics Manager', type: 'Team Lead' },
                            { id: 'Warehouse Staff', name: 'Warehouse Staff', type: 'Individual Contributor' }
                        ],
                        links: [
                            { source: 'CEO', target: 'Sales Director', relationship: 'Reports To' },
                            { source: 'CEO', target: 'Marketing Director', relationship: 'Reports To' },
                            { source: 'CEO', target: 'Operations Director', relationship: 'Reports To' },
                            { source: 'Sales Director', target: 'Sales Manager East', relationship: 'Manages' },
                            { source: 'Sales Director', target: 'Sales Manager West', relationship: 'Manages' },
                            { source: 'Marketing Director', target: 'Marketing Specialist', relationship: 'Manages' },
                            { source: 'Operations Director', target: 'Logistics Manager', relationship: 'Manages' },
                            { source: 'Logistics Manager', target: 'Warehouse Staff', relationship: 'Manages' }
                        ]
                    },
                    dendrogram: {
                        name: "Product Categories",
                        children: [
                            {
                                name: "Electronics", children: [
                                    { name: "Smartphones", value: 120000 },
                                    { name: "Laptops", value: 85000 },
                                    { name: "Cameras", value: 45000 }
                                ]
                            },
                            {
                                name: "Home Appliances", children: [
                                    { name: "Refrigerators", value: 70000 },
                                    { name: "Washing Machines", value: 60000 },
                                    { name: "Microwaves", value: 25000 }
                                ]
                            },
                            {
                                name: "Clothing", children: [
                                    { name: "Men's Wear", value: 50000 },
                                    { name: "Women's Wear", value: 75000 }
                                ]
                            }
                        ]
                    },
                    circlePacking: {
                        name: "Company Revenue Breakdown",
                        children: [
                            {
                                name: "Product Sales", value: 300000, children: [
                                    { name: "Electronics Sales", value: 180000 },
                                    { name: "Home Appliances Sales", value: 90000 },
                                    { name: "Clothing Sales", value: 30000 }
                                ]
                            },
                            {
                                name: "Service Revenue", value: 50000, children: [
                                    { name: "Extended Warranty", value: 30000 },
                                    { name: "Installation Services", value: 20000 }
                                ]
                            },
                            {
                                name: "Other Income", value: 10000, children: [
                                    { name: "Advertising", value: 6000 },
                                    { name: "Rentals", value: 4000 }
                                ]
                            }
                        ]
                    }
                },
                sampleDataString: `const data = {
    sankey: {
        nodes: [{ id: 'Supplier A', name: 'Supplier A' }, /* ... */],
        links: [{ source: 'Supplier A', target: 'Warehouse', value: 50000, flowType: 'Electronics Supply' }, /* ... */]
    },
    nodeLink: {
        nodes: [{ id: 'CEO', name: 'CEO', type: 'Executive' }, /* ... */],
        links: [{ source: 'CEO', target: 'Sales Director', relationship: 'Reports To' }, /* ... */]
    },
    dendrogram: {
        name: "Product Categories",
        children: [{ name: "Electronics", children: [{ name: "Smartphones", value: 120000 }, /* ... */] }, /* ... */]
    },
    circlePacking: {
        name: "Company Revenue Breakdown",
        children: [{ name: "Product Sales", value: 300000, children: [{ name: "Electronics Sales", value: 180000 }, /* ... */] }, /* ... */]
    }
};`
            },
            'specific_data_structures': {
                description: 'Specific Data Structures - For charts like Treemap, Bullet Chart, Slopegraph, Heatmap, Parallel Coordinates Plot, Radar Chart, Violin Plot. Example: Product Performance Metrics, Regional Sales Heatmap.',
                sampleData: {
                    treemap: {
                        name: "Sales by Product Category",
                        children: [
                            {
                                name: "Electronics", value: 250000, children: [
                                    { name: "Smartphones", value: 120000, status: 'High Profit' },
                                    { name: "Laptops", value: 85000, status: 'Stable' },
                                    { name: "Cameras", value: 45000, status: 'Growing' }
                                ]
                            },
                            {
                                name: "Home Appliances", value: 155000, children: [
                                    { name: "Refrigerators", value: 70000, status: 'Stable' },
                                    { name: "Washing Machines", value: 60000, status: 'High Profit' },
                                    { name: "Microwaves", value: 25000, status: 'Low Profit' }
                                ]
                            },
                            { name: "Clothing", value: 125000, children: [
                                { name: "Men's Wear", value: 50000, status: 'Stable' },
                                { name: "Women's Wear", value: 75000, status: 'High Growth' }
                            ] }
                        ]
                    },
                    bullet: { value: 78000, target: 80000, ranges: [60000, 70000, 90000], label: 'Q2 2024 Sales Performance' },
                    slopegraph: [
                        { category: 'Smartphones', before: 100000, after: 120000, change: 20000 },
                        { category: 'Laptops', before: 90000, after: 85000, change: -5000 },
                        { category: 'Headphones', before: 50000, after: 60000, change: 10000 },
                        { category: 'Cameras', before: 40000, after: 45000, change: 5000 },
                        { category: 'Tablets', before: 60000, after: 70000, change: 10000 }
                    ],
                    heatmap: [
                        { x: 'North', y: 'Smartphones', value: 30000, type: 'High Sales' }, { x: 'North', y: 'Laptops', value: 20000, type: 'Medium Sales' },
                        { x: 'South', y: 'Smartphones', value: 25000, type: 'Medium Sales' }, { x: 'South', y: 'Laptops', value: 18000, type: 'Medium Sales' },
                        { x: 'East', y: 'Smartphones', value: 40000, type: 'Very High Sales' }, { x: 'East', y: 'Laptops', value: 30000, type: 'High Sales' },
                        { x: 'West', y: 'Smartphones', value: 25000, type: 'Medium Sales' }, { x: 'West', y: 'Laptops', value: 17000, type: 'Low Sales' }
                    ],
                    parallel_coordinates: [
                        { product: 'Smartphones', price: 800, profitMargin: 33, unitsSold: 1200, customerRating: 4.5 },
                        { product: 'Laptops', price: 1500, profitMargin: 35, unitsSold: 500, customerRating: 4.2 },
                        { product: 'Headphones', price: 60, profitMargin: 42, unitsSold: 2500, customerRating: 4.8 },
                        { product: 'Smartwatches', price: 200, profitMargin: 43, unitsSold: 700, customerRating: 4.0 },
                        { product: 'Cameras', price: 700, profitMargin: 33, unitsSold: 300, customerRating: 4.1 }
                    ],
                    radar: [
                        { label: 'Smartphones', SalesVolume: 90, Profitability: 85, CustomerSatisfaction: 95, MarketShare: 80, GrowthRate: 75, InventoryTurnover: 70 },
                        { label: 'Laptops', SalesVolume: 70, Profitability: 80, CustomerSatisfaction: 90, MarketShare: 65, GrowthRate: 60, InventoryTurnover: 80 },
                        { label: 'Headphones', SalesVolume: 95, Profitability: 90, CustomerSatisfaction: 85, MarketShare: 70, GrowthRate: 80, InventoryTurnover: 90 }
                    ],
                    violin: [
                        { group: 'Electronics', values: [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500] },
                        { group: 'Home Appliances', values: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600] },
                        { group: 'Clothing', values: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300] }
                    ]
                },
                sampleDataString: `const data = {
    treemap: {
        name: "Sales by Product Category",
        children: [{ name: "Electronics", value: 250000, children: [{ name: "Smartphones", value: 120000, status: 'High Profit' }, /* ... */] }, /* ... */]
    },
    bullet: { value: 78000, target: 80000, ranges: [60000, 70000, 90000], label: 'Q2 2024 Sales Performance' },
    slopegraph: [
        { category: 'Smartphones', before: 100000, after: 120000, change: 20000 },
        { category: 'Laptops', before: 90000, after: 85000, change: -5000 },
        { category: 'Headphones', before: 50000, after: 60000, change: 10000 },
        { category: 'Cameras', before: 40000, after: 45000, change: 5000 },
        { category: 'Tablets', before: 60000, after: 70000, change: 10000 }
    ],
    heatmap: [
        { x: 'North', y: 'Smartphones', value: 30000, type: 'High Sales' }, { x: 'North', y: 'Laptops', value: 20000, type: 'Medium Sales' },
        { x: 'South', y: 'Smartphones', value: 25000, type: 'Medium Sales' }, { x: 'South', y: 'Laptops', value: 18000, type: 'Medium Sales' },
        { x: 'East', y: 'Smartphones', value: 40000, type: 'Very High Sales' }, { x: 'East', y: 'Laptops', value: 30000, type: 'High Sales' },
        { x: 'West', y: 'Smartphones', value: 25000, type: 'Medium Sales' }, { x: 'West', y: 'Laptops', value: 17000, type: 'Low Sales' }
    ],
    parallel_coordinates: [
        { product: 'Smartphones', price: 800, profitMargin: 33, unitsSold: 1200, customerRating: 4.5 },
        { product: 'Laptops', price: 1500, profitMargin: 35, unitsSold: 500, customerRating: 4.2 },
        { product: 'Headphones', price: 60, profitMargin: 42, unitsSold: 2500, customerRating: 4.8 },
        { product: 'Smartwatches', price: 200, profitMargin: 43, unitsSold: 700, customerRating: 4.0 },
        { product: 'Cameras', price: 700, profitMargin: 33, unitsSold: 300, customerRating: 4.1 }
    ],
    radar: [
        { label: 'Smartphones', SalesVolume: 90, Profitability: 85, CustomerSatisfaction: 95, MarketShare: 80, GrowthRate: 75, InventoryTurnover: 70 },
        { label: 'Laptops', SalesVolume: 70, Profitability: 80, CustomerSatisfaction: 90, MarketShare: 65, GrowthRate: 60, InventoryTurnover: 80 },
        { label: 'Headphones', SalesVolume: 95, Profitability: 90, CustomerSatisfaction: 85, MarketShare: 70, GrowthRate: 80, InventoryTurnover: 90 }
    ],
    violin: [
        { group: 'Electronics', values: [200, 250, ..., 1500] },
        { group: 'Home Appliances', values: [100, 120, ..., 600] },
        { group: 'Clothing', values: [50, 60, ..., 300] }
    ]
};`
            }
        };

        // --- Chart Definitions (Single Source of Truth) ---
        const chartsDefinitions = [
            {
                id: 'bar',
                name: 'Bar/Column Chart',
                description: 'The quintessential tool for comparing values across discrete categories. Example: Total Sales by Product.',
                intent: ['comparison', 'distribution'],
                dataType: ['categorical_quantitative', 'univariate_categorical'],
                dimensionality: 'Bivariate (1 Cat, 1 Quant) or Univariate (1 Cat)',
                groupingSupport: 'Stacked, Grouped',
                dataConstraints: 'Requires categorical data on one axis and quantitative data on the other. Value axis must start at zero.',
                typicalUseCases: 'Comparing sales by product, number of students by major, showing frequencies for categories.',
                strengths: 'Clear, intuitive comparison of magnitudes across discrete categories. Highly effective when the axis starts from zero.',
                weaknesses: 'Becomes cluttered and unreadable with >15 categories. Starting from a non-zero axis dramatically exaggerates differences misleadingly.',
                compatibleDataCategory: 'single_cat_quant',
                xAxisInfo: { label: 'Product Name', scaleType: 'd3.scaleBand', config: 'Maps discrete categories (product names) to bands along the X-axis. Uses `domain` for categories and `range` for pixel span. `padding` controls spacing between bars.' },
                yAxisInfo: { label: 'Total Sales (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values (sales) to a linear range on the Y-axis. `domain` defines min/max data values, `range` defines pixel span. Typically starts at zero for accurate comparison.' },
                dataKey: null, // No specific key needed from unifiedDataStructures.sampleData
                renderFunction: renderBarChart
            },
            {
                id: 'grouped_bar',
                name: 'Grouped Bar Chart',
                description: 'Allows comparison of multiple data series within each category. Example: Quarterly Sales by Product Category.',
                intent: ['comparison'],
                dataType: ['categorical_quantitative'],
                dimensionality: 'Multivariate (2 Cat, 1 Quant)',
                groupingSupport: 'Grouped',
                dataConstraints: 'Requires two categorical variables and one quantitative variable.',
                typicalUseCases: 'Comparing product sales across different regions, student performance in multiple subjects by gender.',
                strengths: 'Effective for comparing values both within and across categories.',
                weaknesses: 'Can become visually complex with too many series or categories.',
                compatibleDataCategory: 'multi_cat_quant',
                xAxisInfo: { label: 'Quarter', scaleType: 'd3.scaleBand (outer), d3.scaleBand (inner)', config: 'Outer band scale for main categories (quarters), inner band scale for series (product categories) within each quarter. `paddingInner` and `padding` control spacing.' },
                yAxisInfo: { label: 'Sales Value (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum value across all series.' },
                dataKey: null,
                renderFunction: renderGroupedBarChart
            },
            {
                id: 'bullet',
                name: 'Bullet Chart',
                description: 'A specialized and highly effective chart for comparing a single performance measure against a target or benchmark. Example: Quarterly Sales Performance vs. Target.',
                intent: ['comparison'],
                dataType: ['univariate_quantitative'],
                dimensionality: 'Univariate (1 Quant)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires a single performance value, a target, and qualitative ranges (optional).',
                typicalUseCases: 'Monitoring performance against goals, dashboards, progress reports.',
                strengths: 'Space-efficient alternative to dashboard gauges, clearly shows performance against target and qualitative ranges.',
                weaknesses: 'Specific to a narrow use case (one measure vs. target). Does not show full data distribution.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'Sales Value (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range. `domain` is typically derived from the maximum range value.' },
                yAxisInfo: { label: 'N/A', scaleType: 'N/A', config: 'This chart typically does not have a traditional Y-axis for data mapping; height is fixed or proportional.' },
                dataKey: 'bullet',
                renderFunction: renderBulletChart
            },
            {
                id: 'line',
                name: 'Line Chart',
                description: 'Ideal for tracking trends and changes in data over a continuous time dimension. Example: Monthly Profit Trends by Product Category.',
                intent: ['evolution', 'comparison'],
                dataType: ['time_series', 'two_quantitative'],
                dimensionality: 'Bivariate (Time, Quant) or (Quant, Quant)',
                groupingSupport: 'Multiple Lines',
                dataConstraints: 'Requires time data on one axis (usually X) and quantitative data on the other. Ideal for sequential data.',
                typicalUseCases: 'Tracking stock prices, population growth, monthly temperatures.',
                strengths: 'Excellent for showing trends and changes over time. Handles many data points well. Does not require a zero baseline.',
                weaknesses: 'Can be highly misleading if used for non-sequential categorical data, as it falsely implies a continuous relationship.',
                compatibleDataCategory: 'multi_cat_quant',
                xAxisInfo: { label: 'Quarter', scaleType: 'd3.scalePoint', config: 'Maps discrete time points (quarters) to positions along the X-axis. `padding` controls spacing.' },
                yAxisInfo: { label: 'Profit (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum value across all series.' },
                dataKey: null,
                renderFunction: renderLineChart
            },
            {
                id: 'dot_plot',
                name: 'Dot Plot',
                description: 'An effective alternative to bar charts, using dot position to represent values and reduce visual clutter. Example: Profit per Product.',
                intent: ['comparison'],
                dataType: ['categorical_quantitative'],
                dimensionality: 'Bivariate (1 Cat, 1 Quant)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires categorical and quantitative data. Effective when a zero baseline is not necessary.',
                typicalUseCases: 'Comparing performance across groups, showing change between two time points.',
                strengths: 'Reduces visual clutter compared to bar charts, effective when a zero baseline is not meaningful.',
                weaknesses: 'Can become cluttered with too many categories or very similar values.',
                compatibleDataCategory: 'single_cat_quant',
                xAxisInfo: { label: 'Product Name', scaleType: 'd3.scalePoint', config: 'Maps discrete categories (product names) to points along the X-axis. `padding` controls spacing between points.' },
                yAxisInfo: { label: 'Profit (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values (profit) to a linear range on the Y-axis. `domain` defines min/max data values.' },
                dataKey: null,
                renderFunction: renderDotPlot
            },
            {
                id: 'radar',
                name: 'Radar (Spider) Chart',
                description: 'Used for multivariate comparison, plotting quantitative values for multiple variables on axes radiating from a central point. Example: Product Performance Profile.',
                intent: ['comparison'],
                dataType: ['multivariate_quantitative'],
                dimensionality: 'Multivariate (3+ Quant)',
                groupingSupport: 'N/A (Compares profiles)',
                dataConstraints: 'Requires multiple quantitative variables for the same entities.',
                typicalUseCases: 'Evaluating products across a range of features, comparing student performance profiles.',
                strengths: 'Useful for comparing the profiles of different items across a range of features.',
                weaknesses: 'Effectiveness diminishes rapidly as the number of variables increases, as the chart can become a confusing web of overlapping polygons.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'Performance Metrics (e.g., Sales Volume, Profitability)', scaleType: 'Angular (implicit)', config: 'Axes radiate from the center, each representing a different quantitative variable. Angle is derived from the number of axes.' },
                yAxisInfo: { label: 'Score (along axis)', scaleType: 'd3.scaleLinear (radial)', config: 'Maps quantitative values to a radial distance from the center. `domain` is based on the maximum value across all axes and profiles.' },
                dataKey: 'radar',
                renderFunction: renderRadarChart
            },
            {
                id: 'slopegraph',
                name: 'Slopegraph',
                description: 'Excels at comparing change between two points (e.g., "before" and "after" states) for multiple categories efficiently. Example: Product Sales Change between Two Quarters.',
                intent: ['comparison', 'evolution'],
                dataType: ['categorical_quantitative', 'time_series'],
                dimensionality: 'Bivariate (Category, Quant) across two time points',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires values for the same categories at two distinct time points.',
                typicalUseCases: 'Tracking changes in rankings, comparing results before and after an. intervention.',
                strengths: 'Clearly and efficiently highlights which categories have increased, decreased, or stayed the same, and by how much.',
                weaknesses: 'Becomes cluttered with too many categories or if changes are very small.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'Time Point (e.g., Q1 2024 / Q2 2024)', scaleType: 'Implicit (two fixed points)', config: 'Represents two discrete time points (e.g., "Before" and "After") on the X-axis. No D3 scale is explicitly defined for this axis.' },
                yAxisInfo: { label: 'Sales Value (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max values across both time points.' },
                dataKey: 'slopegraph',
                renderFunction: renderSlopegraph
            },
            {
                id: 'pie',
                name: 'Pie/Donut Chart',
                description: 'The most widely recognized composition charts, representing the whole as a circle divided into slices. Example: Market Share by Product Category.',
                intent: ['composition'],
                dataType: ['categorical_quantitative'],
                dimensionality: 'Univariate (1 Cat, 1 Quant for proportions)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires data representing parts of a whole, with very few categories (ideally 5 or fewer).',
                typicalUseCases: 'Budget allocation, market share, simple survey results.',
                strengths: 'Simple, intuitive display of part-to-whole proportions for few categories.',
                weaknesses: 'Humans are poor at judging angles accurately. Becomes totally ineffective with too many slices. Often misused for comparing values between different pies.',
                compatibleDataCategory: 'single_cat_quant',
                xAxisInfo: { label: 'N/A', scaleType: 'N/A', config: 'This chart uses angles and areas to represent proportions, not a linear X-axis.' },
                yAxisInfo: { label: 'N/A', scaleType: 'N/A', config: 'This chart uses angles and areas to represent proportions, not a linear Y-axis.' },
                dataKey: null,
                renderFunction: renderPieChart
            },
            {
                id: 'stacked_bar',
                name: 'Stacked Bar Chart',
                description: 'Shows composition within another dimension, such as categories or time. Example: Quarterly Sales Composition by Product Category.',
                intent: ['composition', 'comparison'],
                dataType: ['categorical_quantitative'],
                dimensionality: 'Multivariate (2 Cat, 1 Quant)',
                groupingSupport: 'Stacked, 100% Stacked',
                dataConstraints: 'Requires a quantitative variable broken down by two categorical variables (or one category and time).',
                typicalUseCases: 'Sales composition by product per quarter, population distribution by age group and gender.',
                strengths: 'Shows part-to-whole composition within each category while allowing comparison of totals.',
                weaknesses: 'Difficult to compare individual segment sizes across bars unless they are at the base. Can become complex with many segments.',
                compatibleDataCategory: 'multi_cat_quant',
                xAxisInfo: { label: 'Quarter', scaleType: 'd3.scaleBand', config: 'Maps discrete categories (quarters) to bands along the X-axis. `paddingInner` controls spacing between bars.' },
                yAxisInfo: { label: 'Total Sales (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum total stacked value for each category.' },
                dataKey: null,
                renderFunction: renderStackedBarChart
            },
            {
                id: 'stacked_area',
                name: 'Stacked Area Chart',
                description: 'Shows how the composition of a total changes over a continuous axis (usually time), with areas stacked on top of each other. Example: Evolution of Product Category Sales over Quarters.',
                intent: ['composition', 'evolution'],
                dataType: ['time_series', 'categorical_quantitative'],
                dimensionality: 'Multivariate (Time, Category, Quant)',
                groupingSupport: 'Stacked, 100% Stacked',
                dataConstraints: 'Requires time data on the X-axis, and multiple quantitative variables representing parts of a whole.',
                typicalUseCases: 'Evolution of market share over time, composition of government spending over years.',
                strengths: 'Combines displaying evolution over time with composition, showing how parts of a whole change.',
                weaknesses: 'Can be difficult to read lower lines accurately. Can be misleading if ordering is not logical.',
                compatibleDataCategory: 'multi_cat_quant',
                xAxisInfo: { label: 'Quarter', scaleType: 'd3.scalePoint', config: 'Maps discrete time points (quarters) to positions along the X-axis. `padding` controls spacing.' },
                yAxisInfo: { label: 'Total Sales (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` is based on the maximum total stacked value for each time point.' },
                dataKey: null,
                renderFunction: renderStackedAreaChart
            },
            {
                id: 'treemap',
                name: 'Treemap',
                description: 'A powerful and space-efficient method for visualizing hierarchical part-to-whole relationships. Example: Sales by Product Category and Sub-Category.',
                intent: ['composition', 'hierarchy'],
                dataType: ['hierarchical_data', 'quantitative'],
                dimensionality: 'Multivariate (Hierarchy + 1 Quant)',
                groupingSupport: 'Nested',
                dataConstraints: 'Requires data with a clear parent-child hierarchical structure and a quantitative value for each node.',
                typicalUseCases: 'Budget allocation, file sizes on a hard drive, company organizational structure.',
                strengths: 'Space-efficient display of large, hierarchical part-to-whole data. Shows the relative size of each element.',
                weaknesses: 'Difficult to precisely compare areas. Can become unreadable with very deep hierarchies or many small items.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'N/A', scaleType: 'Implicit (positional)', config: 'Uses X-position to encode hierarchy and size. No traditional linear X-axis.' },
                yAxisInfo: { label: 'N/A', scaleType: 'Implicit (positional)', config: 'Uses Y-position to encode hierarchy and size. No traditional linear Y-axis.' },
                dataKey: 'treemap',
                renderFunction: renderTreemap
            },
            {
                id: 'waffle',
                name: 'Waffle Chart',
                description: 'Uses a grid of discrete units (squares or icons) to represent proportions, making them highly intuitive and engaging. Example: Percentage of Total Sales by Top Products.',
                intent: ['composition'],
                dataType: ['univariate_categorical', 'quantitative'],
                dimensionality: 'Univariate (Percentage)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires a single percentage or multiple percentages that sum to 100%.',
                typicalUseCases: 'Illustrating progress towards a goal, representing percentages in reports.',
                strengths: 'Highly intuitive and visually engaging for concretely communicating percentages.',
                weaknesses: 'Not suitable for a large number of categories. Does not show precise details.',
                compatibleDataCategory: 'single_cat_quant',
                xAxisInfo: { label: 'N/A', scaleType: 'Implicit (grid position)', config: 'X-axis position is determined by grid layout (column index). No explicit D3 scale.' },
                yAxisInfo: { label: 'N/A', scaleType: 'Implicit (grid position)', config: 'Y-axis position is determined by grid layout (row index). No explicit D3 scale.' },
                dataKey: null,
                renderFunction: renderWaffleChart
            },
            {
                id: 'histogram',
                name: 'Histogram',
                description: 'The standard chart for visualizing the distribution of a single continuous variable. Example: Distribution of Individual Transaction Profits.',
                intent: ['distribution'],
                dataType: ['univariate_quantitative'],
                dimensionality: 'Univariate (1 Quant)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires a continuous quantitative variable. Relies on "bins" to group data.',
                typicalUseCases: 'Distribution of customer ages, test scores, income distribution.',
                strengths: 'Clearly shows the frequency distribution of a single continuous variable. Crucial in exploratory data analysis.',
                weaknesses: 'Shape is highly dependent on the choice of bin width. Not for categorical data.',
                compatibleDataCategory: 'distribution_data',
                xAxisInfo: { label: 'Transaction Profit (USD)', scaleType: 'd3.scaleLinear', config: 'Maps continuous quantitative values to a linear range. Data is grouped into `bins` on this axis.' },
                yAxisInfo: { label: 'Frequency (Number of Transactions)', scaleType: 'd3.scaleLinear', config: 'Maps the count of data points in each bin to a linear range. `domain` is based on the maximum frequency.' },
                dataKey: 'Transaction Profits', // Specific key for histogram data within distribution_data
                renderFunction: renderHistogram
            },
            {
                id: 'density_plot',
                name: 'Density Plot',
                description: 'A smoothed version of a histogram, providing a continuous curve that estimates the underlying probability distribution of the data. Example: Distribution of Product Profit Margins.',
                intent: ['distribution'],
                dataType: ['univariate_quantitative'],
                dimensionality: 'Univariate (1 Quant)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires a continuous quantitative variable.',
                typicalUseCases: 'Understanding the shape of data distribution, identifying hidden patterns.',
                strengths: 'Provides a clearer view of the underlying shape of data distribution compared to a histogram, especially with large datasets.',
                weaknesses: 'May obscure fine details of the distribution compared to a raw histogram.',
                compatibleDataCategory: 'distribution_data',
                xAxisInfo: { label: 'Profit Margin (%)', scaleType: 'd3.scaleLinear', config: 'Maps continuous quantitative values to a linear range. Represents the data values for which density is estimated.' },
                yAxisInfo: { label: 'Density', scaleType: 'd3.scaleLinear', config: 'Maps the estimated probability density to a linear range. `domain` is based on the maximum density value.' },
                dataKey: 'Product Profit Margins (%)', // Specific key for density plot data
                renderFunction: renderDensityPlot
            },
            {
                id: 'box',
                name: 'Box Plot (Box-and-Whisker Plot)',
                description: 'A compact and powerful tool for summarizing the distribution of a dataset through a five-number summary. Example: Profit Distribution by Product Category.',
                intent: ['distribution', 'comparison'],
                dataType: ['categorical_quantitative'],
                dimensionality: 'Bivariate (1 Cat, 1 Quant)',
                groupingSupport: 'Faceted',
                dataConstraints: 'Requires a quantitative variable and a categorical variable for grouping.',
                typicalUseCases: 'Comparing distributions of variables across multiple groups, identifying outliers.',
                strengths: 'Compactly summarizes and compares distributions across multiple groups; highlights outliers effectively.',
                weaknesses: 'Hides the underlying shape of the distribution (e.g., bimodality).',
                compatibleDataCategory: 'distribution_data',
                xAxisInfo: { label: 'Product Category', scaleType: 'd3.scaleBand', config: 'Maps discrete groups (product categories) to bands along the X-axis. `paddingInner` and `paddingOuter` control spacing.' },
                yAxisInfo: { label: 'Profit (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max values across all groups.' },
                dataKey: ['Electronics Profits', 'Home Appliances Profits', 'Clothing Profits'], // Array of keys for groups
                renderFunction: renderBoxPlot
            },
            {
                id: 'violin',
                name: 'Violin Plot',
                description: 'A more sophisticated chart that combines the features of a box plot and a density plot, revealing the shape of the distribution. Example: Distribution of Sales Values by Product Category.',
                intent: ['distribution', 'comparison'],
                dataType: ['categorical_quantitative'],
                dimensionality: 'Bivariate (1 Cat, 1 Quant)',
                groupingSupport: 'Faceted',
                dataConstraints: 'Requires a quantitative variable and a categorical variable for grouping.',
                typicalUseCases: 'Understanding the full distribution of data across groups, identifying multi-modal distributions.',
                strengths: 'Provides a much richer understanding than a standard box plot, as it reveals the shape of the distribution.',
                weaknesses: 'More complex to interpret than a simple box plot. Can become cluttered with many groups.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'Product Category', scaleType: 'd3.scaleBand', config: 'Maps discrete groups (product categories) to bands along the X-axis. `padding` controls spacing between violins.' },
                yAxisInfo: { label: 'Sales Value (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max values across all groups.' },
                dataKey: 'violin',
                renderFunction: renderViolinPlot
            },
            {
                id: 'scatter',
                name: 'Scatter Plot',
                description: 'The default and most powerful chart for exploring the relationship between two continuous, quantitative variables. Example: Sales vs. Profit per Product.',
                intent: ['relationship', 'distribution'],
                dataType: ['two_quantitative'],
                dimensionality: 'Bivariate (2 Quant)',
                groupingSupport: 'Color/Shape Coding',
                dataConstraints: 'Requires two continuous quantitative variables.',
                typicalUseCases: 'Revealing correlations, identifying clusters and outliers, understanding patterns.',
                strengths: 'The gold standard for showing correlation and relationship between two continuous variables. Reveals form, direction, and strength of a relationship.',
                weaknesses: 'Can suffer from overplotting with very large datasets, making individual points indistinguishable.',
                compatibleDataCategory: 'quant_pair_data',
                xAxisInfo: { label: 'Total Sales (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the X-axis. `domain` covers the min/max of X values.' },
                yAxisInfo: { label: 'Total Profit (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max of Y values.' },
                dataKey: null,
                renderFunction: renderScatterPlot
            },
            {
                id: 'bubble',
                name: 'Bubble Chart',
                description: 'A multivariate extension of a scatter plot, adding a third quantitative dimension by varying the size (area) of the bubbles. Example: Sales vs. Profit per Product, by Units Sold.',
                intent: ['relationship', 'comparison'],
                dataType: ['three_quantitative'],
                dimensionality: 'Multivariate (3 Quant)',
                groupingSupport: 'Color Coding',
                dataConstraints: 'Requires three quantitative variables.',
                typicalUseCases: 'Analyzing GDP, life expectancy, and population; comparing companies by revenue, profit, and employee count.',
                strengths: 'Extends a scatter plot to encode a third dimension using bubble size.',
                weaknesses: 'Human perception of area is less precise than position, making the 3rd variable harder to judge.',
                compatibleDataCategory: 'quant_pair_data',
                xAxisInfo: { label: 'Total Sales (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the X-axis. `domain` covers the min/max of X values.' },
                yAxisInfo: { label: 'Total Profit (USD)', scaleType: 'd3.scaleLinear', config: 'Maps quantitative values to a linear range on the Y-axis. `domain` covers the min/max of Y values.' },
                dataKey: null,
                renderFunction: renderBubbleChart
            },
            {
                id: 'heatmap',
                name: 'Heatmap',
                description: 'A grid-based visualization where value is represented by color, useful for showing correlations or density. Example: Sales Performance by Region and Product.',
                intent: ['relationship', 'distribution'],
                dataType: ['two_categorical', 'two_quantitative'],
                dimensionality: 'Bivariate (2 Cat) or (2 Quant)',
                groupingSupport: 'Grid',
                dataConstraints: 'Requires two variables (categorical or quantitative) where the relationship or density is represented by color.',
                typicalUseCases: 'Correlation matrices, cross-tabulations, density maps for very large datasets.',
                strengths: 'Efficiently shows relationships between two categorical variables or density in large datasets. Good for identifying patterns in tabular data.',
                weaknesses: 'Can be difficult to interpret precise values without labels. Highly dependent on color scale choice.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'Region', scaleType: 'd3.scaleBand', config: 'Maps discrete categories (regions) to bands along the X-axis. `padding` controls spacing between cells.' },
                yAxisInfo: { label: 'Product', scaleType: 'd3.scaleBand', config: 'Maps discrete categories (products) to bands along the Y-axis. `padding` controls spacing between cells.' },
                dataKey: 'heatmap',
                renderFunction: renderHeatmap
            },
            {
                id: 'sankey',
                name: 'Sankey Diagram',
                description: 'Designed to illustrate movement, sequences, or stages within a process, with a focus on flow magnitude. Example: Product Supply Chain Flow.',
                intent: ['flow', 'composition'],
                dataType: ['flow_data'],
                dimensionality: 'Multivariate (From, To, Weight)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires flow data (source, target, quantity/weight).',
                typicalUseCases: 'Energy flow, customer conversion funnels, money flow, user paths.',
                strengths: 'Excellent for visualizing the magnitude of flows through a multi-stage process. Highlights bottlenecks or main pathways.',
                weaknesses: 'Requires specific data structure. Can become cluttered with too many flows or complex stages.',
                compatibleDataCategory: 'network_hierarchy_data',
                xAxisInfo: { label: 'Stages/Nodes (e.g., Supplier, Warehouse)', scaleType: 'Implicit (positional)', config: 'Nodes are positioned along the X-axis to represent stages in a flow. No explicit D3 scale.' },
                yAxisInfo: { label: 'Flow Magnitude (USD)', scaleType: 'Implicit (positional)', config: 'Flows (links) are positioned along the Y-axis based on their value. No explicit D3 scale.' },
                dataKey: 'sankey',
                renderFunction: renderSankeyDiagram
            },
            {
                id: 'node_link',
                name: 'Node-Link Diagram',
                description: 'Represents hierarchies or networks by drawing nodes for each item and lines (links or edges) to connect them. Example: Company Organizational Chart.',
                intent: ['hierarchy', 'relationship'],
                dataType: ['hierarchical_data', 'network_data'],
                dimensionality: 'Multivariate (Nodes, Links)',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires data with interconnected relationships (parent-child or network connections).',
                typicalUseCases: 'Organizational charts, social networks, website maps, file categorization.',
                strengths: 'Visually represents complex relationships between entities. Can clearly show hierarchies or connections.',
                weaknesses: 'Can become messy and unreadable with many nodes or links. Difficult to discern patterns in large networks.',
                compatibleDataCategory: 'network_hierarchy_data',
                xAxisInfo: { label: 'N/A (Force-directed layout)', scaleType: 'Implicit (positional)', config: 'Node X-positions are determined by a force simulation to minimize overlaps and reveal clusters. No explicit D3 scale.' },
                yAxisInfo: { label: 'N/A (Force-directed layout)', scaleType: 'Implicit (positional)', config: 'Node Y-positions are determined by a force simulation. No explicit D3 scale.' },
                dataKey: 'nodeLink',
                renderFunction: renderNodeLinkDiagram
            },
            {
                id: 'parallel_coordinates',
                name: 'Parallel Coordinates Plot',
                description: 'Represents each data point as a line that passes through parallel axes, with each axis representing a different variable. Example: Product Feature Comparison.',
                intent: ['relationship', 'distribution'],
                dataType: ['multivariate_quantitative'],
                dimensionality: 'Multivariate (Many Quantities)',
                groupingSupport: 'Color Coding',
                dataConstraints: 'Requires many quantitative variables.',
                typicalUseCases: 'Discovering patterns in high-dimensional data, comparing entity profiles.',
                strengths: 'Allows visualization of many dimensions at once. Good for identifying clusters and patterns in multivariate data.',
                weaknesses: 'Can become cluttered with many data points or variables. Difficult to read precise values.',
                compatibleDataCategory: 'specific_data_structures',
                xAxisInfo: { label: 'Product Attributes (e.g., Price, Profit Margin)', scaleType: 'd3.scalePoint', config: 'Maps each variable (dimension) to a distinct vertical axis position along the X-axis. `padding` controls spacing.' },
                yAxisInfo: { label: 'Value (for each attribute)', scaleType: 'd3.scaleLinear (per axis)', config: 'Each vertical axis has its own linear scale mapping the range of values for that specific variable. `domain` is based on the extent of values for each variable.' },
                dataKey: 'parallel_coordinates',
                renderFunction: renderParallelCoordinatesPlot
            },
            {
                id: 'dendrogram',
                name: 'Dendrogram',
                description: 'Visualizes hierarchical relationships as a tree structure, often used to show clusters or classifications. Example: Product Categorization Hierarchy.',
                intent: ['hierarchy'],
                dataType: ['hierarchical_data'],
                dimensionality: 'Hierarchical',
                groupingSupport: 'N/A',
                dataConstraints: 'Requires hierarchical data with parent-child relationships.',
                typicalUseCases: 'Phylogenetic trees, organizational charts, cluster analysis results.',
                strengths: 'Clearly shows hierarchical relationships and clustering. Good for understanding nested structures.',
                weaknesses: 'Can become very wide or tall with large hierarchies, making it hard to read. Overlapping labels can be an issue.',
                compatibleDataCategory: 'network_hierarchy_data',
                xAxisInfo: { label: 'N/A (Positional)', scaleType: 'Implicit', config: 'Nodes are positioned based on their depth in the hierarchy.' },
                yAxisInfo: { label: 'N/A (Positional)', scaleType: 'Implicit', config: 'Nodes are positioned based on their order within the hierarchy.' },
                dataKey: 'dendrogram',
                renderFunction: renderDendrogram
            },
            {
                id: 'circle_packing',
                name: 'Circle Packing',
                description: 'A space-filling visualization for hierarchical data, where nested circles represent the hierarchy and their size represents a quantitative value. Example: Company Revenue Breakdown by Department/Product.',
                intent: ['hierarchy', 'composition'],
                dataType: ['hierarchical_data', 'quantitative'],
                dimensionality: 'Multivariate (Hierarchy + 1 Quant)',
                groupingSupport: 'Nested',
                dataConstraints: 'Requires hierarchical data with a quantitative value for each node.',
                typicalUseCases: 'Visualizing file systems, product categories by sales volume, population demographics.',
                strengths: 'Visually appealing and space-efficient for showing hierarchical structures and relative sizes. Good for identifying dominant categories.',
                weaknesses: 'Precise comparison of sizes can be difficult. Can become cluttered with many small circles.',
                compatibleDataCategory: 'network_hierarchy_data',
                xAxisInfo: { label: 'N/A (Positional)', scaleType: 'Implicit', config: 'Circles are packed to fill space, positions are derived from the packing algorithm.' },
                yAxisInfo: { label: 'N/A (Positional)', scaleType: 'Implicit', config: 'Circles are packed to fill space, positions are derived from the packing algorithm.' },
                dataKey: 'circlePacking',
                renderFunction: renderCirclePacking
            }
        ];

        // --- Global Elements and Tooltip Setup ---
        const intentSelector = document.getElementById('intent-selector');
        const dataTypeSection = document.getElementById('data-type-section');
        const dataTypeSelector = document.getElementById('data-type-selector');
        const recommendationsContainer = document.getElementById('chart-recommendations');
        const recommendationsSubtitle = document.getElementById('recommendations-subtitle');
        const fullGalleryContainer = document.getElementById('full-gallery');
        const detailedChartPropertiesTableBody = document.querySelector('#detailed-chart-properties-table tbody');
        const unifiedDataCategorySelector = document.getElementById('unified-data-category-selector');
        const unifiedChartsDisplay = document.getElementById('unified-charts-display');
        const unifiedDataStructureCode = document.getElementById('unified-data-structure-code');
        const unifiedDataStructureCodeDisplay = document.getElementById('unified-data-structure-code-display');

        let selectedIntent = null;
        let selectedDataType = null;

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");

        // --- Helper Functions ---

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

        /**
         * Initializes SVG and common chart elements.
         * @param {string} containerId - The ID of the HTML container element.
         * @returns {Object} Contains svg element, width, height, and margins.
         */
        function setupChart(containerId) {
            const container = d3.select(`#${containerId}`);
            container.html(''); // Clear previous content
            const margin = { top: 40, right: 80, bottom: 60, left: 60 }; // Increased margins for labels and legend
            const containerWidth = container.node().clientWidth;
            const width = containerWidth - margin.left - margin.right;
            const height = 350 - margin.top - margin.bottom; // Fixed height for consistency

            const svg = container.append("svg")
                .attr("class", "chart-svg")
                .attr("viewBox", `0 0 ${containerWidth} 350`)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            return { svg, width, height, margin, container };
        }

        /**
         * Helper function for Kernel Density Estimation (for Violin Plot and Density Plot)
         */
        function kernelDensityEstimator(kernel, X) {
            return function (V) {
                return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
            };
        }

        function epanechnikovKernel(bandwidth) {
            return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }

        // --- D3.js Chart Rendering Functions ---
        // Each function now takes chartDefinition and extracts data based on compatibleDataCategory and dataKey

        function renderBarChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin } = setupChart(containerId);

            const x = d3.scaleBand()
                .domain(data.map(d => d.label))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.sales)]).nice() // Using 'sales' for bar chart
                .range([height, 0]);

            svg.append("g")
                .attr("class", "x-axis axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end")
                .style("font-size", "10px");

            svg.append("g")
                .attr("class", "y-axis axis")
                .call(d3.axisLeft(y));

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.label))
                .attr("y", d => y(d.sales))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.sales))
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.label}</strong><br>Sales: ${d.sales}<br>Profit: ${d.profit}<br>Purchases: ${d.purchases}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Product Name");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Sales (USD)");
        }

        function renderGroupedBarChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin, container } = setupChart(containerId);

            const keys = Object.keys(data[0].series);

            const x0 = d3.scaleBand()
                .domain(data.map(d => d.label))
                .rangeRound([0, width])
                .paddingInner(0.1);

            const x1 = d3.scaleBand()
                .domain(keys)
                .rangeRound([0, x0.bandwidth()])
                .padding(0.05);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d3.max(keys, key => d.series[key]))]).nice()
                .rangeRound([height, 0]);

            const color = d3.scaleOrdinal()
                .range(d3.schemePaired);

            svg.append("g")
                .attr("class", "x-axis axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x0))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Quarter");

            svg.append("g")
                .attr("class", "y-axis axis")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Sales Value (USD)");

            const group = svg.selectAll(".group")
                .data(data)
                .enter().append("g")
                .attr("transform", d => `translate(${x0(d.label)},0)`);

            group.selectAll("rect")
                .data(d => keys.map(key => ({ key: key, value: d.series[key], label: d.label })))
                .enter().append("rect")
                .attr("x", d => x1(d.key))
                .attr("y", d => y(d.value))
                .attr("width", x1.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", d => color(d.key))
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.label} - ${d.key}</strong><br>Value: ${d.value}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            addLegendBelowChart(container.node(), keys, color);
        }

        function renderLineChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin, container } = setupChart(containerId);

            const keys = Object.keys(data[0].series);

            const x = d3.scalePoint()
                .domain(data.map(d => d.label))
                .range([0, width])
                .padding(0.5);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d3.max(keys, key => d.series[key]))]).nice()
                .range([height, 0]);

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const line = d3.line()
                .x(d => x(d.label))
                .y(d => y(d.value));

            svg.append("g")
                .attr("class", "x-axis axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Quarter");

            svg.append("g")
                .attr("class", "y-axis axis")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Profit (USD)");

            keys.forEach(key => {
                const lineData = data.map(d => ({ label: d.label, value: d.series[key] }));
                svg.append("path")
                    .datum(lineData)
                    .attr("class", "line")
                    .attr("d", line)
                    .attr("stroke", color(key));

                svg.selectAll(`.dot-${key}`)
                    .data(lineData)
                    .enter().append("circle")
                    .attr("class", `dot dot-${key}`)
                    .attr("cx", d => x(d.label))
                    .attr("cy", d => y(d.value))
                    .attr("r", 4)
                    .attr("fill", color(key))
                    .on("mouseover", (event, d) => {
                        tooltip.html(`<strong>${key} - ${d.label}</strong><br>Value: ${d.value}`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px")
                            .style("opacity", 1);
                    })
                    .on("mouseout", () => {
                        tooltip.style("opacity", 0);
                    });
            });

            addLegendBelowChart(container.node(), keys, color);
        }

        function renderDotPlot(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin } = setupChart(containerId);

            const x = d3.scaleBand()
                .domain(data.map(d => d.label))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.profit)]).nice() // Using 'profit' for dot plot
                .range([height, 0]);

            svg.append("g")
                .attr("class", "x-axis axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "1rem")
                .text("Product Name");

            svg.append("g")
                .attr("class", "y-axis axis")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 20)
                .attr("x", -height / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "1rem")
                .text("Profit (USD)");

            svg.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", d => x(d.label) + x.bandwidth() / 2)
                .attr("cy", d => y(d.profit))
                .attr("r", 5)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.label}</strong><br>Profit: ${d.profit}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });
        }

        function renderRadarChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { container } = setupChart(containerId); // Custom setup for radar
            container.html(''); // Clear previous content
            const width = container.node().clientWidth;
            const height = container.node().clientHeight;
            const radius = Math.min(width, height) / 2 - 50;

            const svg = container.append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            const allAxis = Object.keys(data[0]).filter(key => key !== 'label');
            const total = allAxis.length;
            const angleSlice = Math.PI * 2 / total;

            const rScale = d3.scaleLinear()
                .range([0, radius])
                .domain([0, d3.max(data, d => d3.max(allAxis, axis => d[axis])) * 1.1]);

            svg.selectAll("circle")
                .data(d3.range(0, rScale.domain()[1], rScale.domain()[1] / 5))
                .enter().append("circle")
                .attr("r", d => rScale(d))
                .style("fill", "none")
                .style("stroke", "#ccc")
                .style("stroke-dasharray", ("3,3"));

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

            data.forEach((d, i) => {
                const profileData = allAxis.map(axisName => ({ axis: axisName, value: d[axisName] }));
                svg.append("path")
                    .datum(profileData)
                    .attr("d", d3.lineRadial().curve(d3.curveCardinalClosed).radius(p => rScale(p.value)).angle((p, idx) => idx * angleSlice))
                    .attr("fill", color(d.label || i))
                    .attr("stroke", strokeColor(d.label || i))
                    .attr("stroke-width", 2)
                    .on("mouseover", (event, pathData) => {
                        let tooltipContent = `<strong>${d.label}</strong><br>`;
                        pathData.forEach(item => {
                            tooltipContent += `${item.axis}: ${item.value}<br>`;
                        });
                        tooltip.html(tooltipContent)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px")
                            .style("opacity", 1);
                    })
                    .on("mouseout", () => {
                        tooltip.style("opacity", 0);
                    });
            });

            const legendItems = data.map(d => d.label);
            const legendColorScale = d3.scaleOrdinal()
                .domain(legendItems)
                .range(strokeColor.range());

            addLegendBelowChart(container.node(), legendItems, legendColorScale);
        }

        function renderPieChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { container } = setupChart(containerId); // Custom setup for pie
            container.html('');
            const width = container.node().clientWidth;
            const height = container.node().clientHeight;
            const radius = Math.min(width, height) / 2 - 50;

            const svg = container.append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            const pie = d3.pie()
                .value(d => d.sales) // Using 'sales' for pie chart
                .sort(null);

            const arc = d3.arc()
                .innerRadius(radius * 0.6)
                .outerRadius(radius);

            const outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9);

            const color = d3.scaleOrdinal()
                .range(['#3b82f6', '#14b8a6', '#f97316', '#a855f7', '#ef4444']);

            const arcs = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            arcs.append("path")
                .attr("d", arc)
                .attr("fill", d => color(d.data.label))
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.data.label}</strong><br>Sales: ${d.data.sales}<br>Percentage: ${(d.data.sales / d3.sum(data, v => v.sales) * 100).toFixed(1)}%`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            arcs.append("text")
                .attr("transform", d => `translate(${outerArc.centroid(d)})`)
                .attr("text-anchor", "middle")
                .text(d => `${(d.data.sales / d3.sum(data, v => v.sales) * 100).toFixed(1)}%`)
                .style("font-size", "10px");

            const legendItems = data.map(d => d.label);
            const legendColorScale = d3.scaleOrdinal()
                .domain(legendItems)
                .range(color.range());

            addLegendBelowChart(container.node(), legendItems, legendColorScale);
        }

        function renderStackedBarChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin, container } = setupChart(containerId);

            const keys = Object.keys(data[0].series);

            const x = d3.scaleBand()
                .domain(data.map(d => d.label))
                .rangeRound([0, width])
                .paddingInner(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.total)]).nice()
                .rangeRound([height, 0]);

            const color = d3.scaleOrdinal()
                .range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]);

            const stack = d3.stack()
                .keys(keys)
                .value((d, key) => d.series[key]);

            svg.append("g")
                .attr("class", "x-axis axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Quarter");

            svg.append("g")
                .attr("class", "y-axis axis")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Sales (USD)");

            svg.selectAll(".series")
                .data(stack(data))
                .enter().append("g")
                .attr("fill", d => color(d.key))
                .selectAll("rect")
                .data(d => d)
                .enter().append("rect")
                .attr("x", d => x(d.data.label))
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .attr("width", x.bandwidth())
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.data.label} - ${d.series.key}</strong><br>Value: ${d.data.series[d.series.key]}<br>Total: ${d.data.total}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            addLegendBelowChart(container.node(), keys, color);
        }

        function renderStackedAreaChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin, container } = setupChart(containerId);

            const keys = Object.keys(data[0].series);

            const x = d3.scalePoint()
                .domain(data.map(d => d.label))
                .range([0, width])
                .padding(0.5);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.total)]).nice()
                .range([height, 0]);

            const color = d3.scaleOrdinal()
                .range(["rgba(20, 184, 166, 0.5)", "rgba(59, 130, 246, 0.5)", "rgba(249, 115, 22, 0.5)", "rgba(168, 85, 247, 0.5)"]);

            const stack = d3.stack()
                .keys(keys)
                .order(d3.stackOrderNone)
                .offset(d3.stackOffsetNone)
                .value((d, key) => d.series[key]);

            const area = d3.area()
                .x(d => x(d.data.label))
                .y0(d => y(d[0]))
                .y1(d => y(d[1]));

            svg.append("g")
                .attr("class", "x-axis axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Quarter");

            svg.append("g")
                .attr("class", "y-axis axis")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Sales (USD)");

            svg.selectAll(".layer")
                .data(stack(data))
                .enter().append("path")
                .attr("class", "area")
                .attr("d", area)
                .attr("fill", d => color(d.key))
                .attr("stroke", d => d3.color(color(d.key)).darker(0.5))
                .attr("stroke-width", 1)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.key}</strong><br>Quarter: ${d.data[0].data.label}<br>Value: ${d.data[0].data.series[d.key]}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            addLegendBelowChart(container.node(), keys, d3.scaleOrdinal().range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]).domain(keys));
        }

        function renderHistogram(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey].values;
            const { svg, width, height, margin } = setupChart(containerId);

            const x = d3.scaleLinear()
                .domain([d3.min(data) - 5, d3.max(data) + 5])
                .range([0, width]);

            const histogram = d3.histogram()
                .value(d => d)
                .domain(x.domain())
                .thresholds(x.ticks(10));

            const bins = histogram(data);

            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(bins, d => d.length) * 1.1]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Transaction Profit (USD)");

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Frequency (Number of Transactions)");

            svg.selectAll("rect")
                .data(bins)
                .enter().append("rect")
                .attr("x", 1)
                .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
                .attr("width", d => x(d.x1) - x(d.x0) - 1)
                .attr("height", d => height - y(d.length))
                .attr("fill", "#3b82f6aa")
                .attr("stroke", "#2563eb")
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>Range: [${d.x0.toFixed(1)}, ${d.x1.toFixed(1)})</strong><br>Frequency: ${d.length}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });
        }

        function renderDensityPlot(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey].values;
            const { svg, width, height, margin } = setupChart(containerId);

            const x = d3.scaleLinear()
                .domain([d3.min(data) * 0.9, d3.max(data) * 1.1])
                .range([0, width]);

            const kde = kernelDensityEstimator(epanechnikovKernel(1), x.ticks(100)); // Adjusted bandwidth
            const density = kde(data);

            const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(density, d => d[1]) * 1.1]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Profit Margin (%)");

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Density");

            svg.append("path")
                .datum(density)
                .attr("fill", "rgba(20, 184, 166, 0.3)")
                .attr("stroke", "#14b8a6")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(d => x(d[0]))
                    .y(d => y(d[1])))
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>Density Plot</strong><br>Distribution of Product Profit Margins`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });
        }

        function renderBoxPlot(containerId, chartDefinition) {
            const dataKeys = chartDefinition.dataKey; // Array of keys
            const data = dataKeys.map(key => unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[key]);
            const { svg, width, height, margin, container } = setupChart(containerId);

            const groups = data.map(d => d.group);

            const x = d3.scaleBand()
                .range([0, width])
                .domain(groups)
                .paddingInner(1)
                .paddingOuter(0.5);

            const allValues = data.flatMap(d => d.values);
            const y = d3.scaleLinear()
                .domain([0, d3.max(allValues) * 1.1])
                .range([height, 0]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Product Category");

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Profit (USD)");

            const boxPlotData = data.map(d => {
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
                .range(["#a855f755", "#3b82f655", "#14b8a655"]);

            svg.selectAll(".box")
                .data(boxPlotData)
                .enter().append("rect")
                .attr("x", d => x(d.group) - x.bandwidth() / 4)
                .attr("y", d => y(d.q3))
                .attr("width", x.bandwidth() / 2)
                .attr("height", d => y(d.q1) - y(d.q3))
                .attr("fill", d => color(d.group))
                .attr("stroke", d => d3.color(color(d.group)).darker(0.5))
                .attr("stroke-width", 1)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.group}</strong><br>Min: ${d.min.toFixed(1)}<br>Q1: ${d.q1.toFixed(1)}<br>Median: ${d.median.toFixed(1)}<br>Q3: ${d.q3.toFixed(1)}<br>Max: ${d.max.toFixed(1)}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            svg.selectAll(".median-line")
                .data(boxPlotData)
                .enter().append("line")
                .attr("x1", d => x(d.group) - x.bandwidth() / 4)
                .attr("x2", d => x(d.group) + x.bandwidth() / 4)
                .attr("y1", d => y(d.median))
                .attr("y2", d => y(d.median))
                .attr("stroke", "#8b5cf6")
                .attr("stroke-width", 2);

            svg.selectAll(".whisker")
                .data(boxPlotData)
                .enter().append("line")
                .attr("x1", d => x(d.group))
                .attr("x2", d => x(d.group))
                .attr("y1", d => y(d.min))
                .attr("y2", d => y(d.max))
                .attr("stroke", "#8b5cf6")
                .attr("stroke-width", 1);

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

            addLegendBelowChart(container.node(), groups, d3.scaleOrdinal().range(["#a855f7", "#3b82f6", "#14b8a6"]).domain(groups));
        }

        function renderViolinPlot(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin, container } = setupChart(containerId);

            const groups = data.map(d => d.group);

            const x = d3.scaleBand()
                .range([0, width])
                .domain(groups)
                .padding(0.1);

            const allValues = data.flatMap(d => d.values);
            const y = d3.scaleLinear()
                .domain([d3.min(allValues) * 0.9, d3.max(allValues) * 1.1])
                .range([height, 0]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Product Category");

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Sales Value (USD)");

            const color = d3.scaleOrdinal()
                .domain(groups)
                .range(["#a855f7aa", "#3b82f6aa", "#14b8a6aa"]);

            const kde = kernelDensityEstimator(epanechnikovKernel(20), y.ticks(20)); // Adjusted bandwidth

            data.forEach((d) => {
                const densities = kde(d.values);

                const xViolin = d3.scaleLinear()
                    .range([0, x.bandwidth() / 2])
                    .domain([0, d3.max(densities, p => p[1])]);

                const area = d3.area()
                    .curve(d3.curveBasis)
                    .x0(p => x(d.group) + x.bandwidth() / 2 - xViolin(p[1]))
                    .x1(p => x(d.group) + x.bandwidth() / 2 + xViolin(p[1]))
                    .y(p => y(p[0]));

                svg.append("path")
                    .datum(densities)
                    .attr("fill", color(d.group))
                    .attr("stroke", d3.color(color(d.group)).darker(0.5))
                    .attr("stroke-width", 1)
                    .on("mouseover", (event, pathData) => {
                        tooltip.html(`<strong>${d.group}</strong><br>Distribution shown`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px")
                            .style("opacity", 1);
                    })
                    .on("mouseout", () => {
                        tooltip.style("opacity", 0);
                    });
            });

            addLegendBelowChart(container.node(), groups, d3.scaleOrdinal().range(["#a855f7", "#3b82f6", "#14b8a6"]).domain(groups));
        }

        function renderScatterPlot(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin, container } = setupChart(containerId);

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.x) * 1.1])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.y) * 1.1])
                .range([height, 0]);

            const categories = Array.from(new Set(data.map(d => d.category || 'Default')));
            const color = d3.scaleOrdinal()
                .domain(categories)
                .range(["#14b8a6", "#3b82f6", "#f97316", "#a855f7"]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(5));

            svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Sales (USD)");

            svg.append("g")
                .call(d3.axisLeft(y).ticks(5));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Profit (USD)");

            svg.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", 5)
                .attr("fill", d => color(d.category || 'Default'))
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.id}</strong><br>Sales: ${d.x}<br>Profit: ${d.y}<br>Category: ${d.category || 'N/A'}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            if (categories.length > 1 || categories[0] !== 'Default') {
                addLegendBelowChart(container.node(), categories, color);
            }
        }

        function renderBubbleChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { svg, width, height, margin, container } = setupChart(containerId);

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.x) * 1.1])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.y) * 1.1])
                .range([height, 0]);

            const rScale = d3.scaleSqrt()
                .domain([0, d3.max(data, d => d.size) * 1.5])
                .range([0, 20]);

            const categories = Array.from(new Set(data.map(d => d.category || 'Default')));
            const color = d3.scaleOrdinal()
                .domain(categories)
                .range(["#f9731699", "#3b82f699", "#14b8a699", "#a855f799"]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(5));

            svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Sales (USD)");

            svg.append("g")
                .call(d3.axisLeft(y).ticks(5));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Total Profit (USD)");

            svg.selectAll(".bubble")
                .data(data)
                .enter().append("circle")
                .attr("class", "bubble")
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", d => rScale(d.size))
                .attr("fill", d => color(d.category || 'Default'))
                .attr("stroke", d => d3.color(color(d.category || 'Default')).darker(0.5))
                .attr("stroke-width", 1)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.id}</strong><br>Sales: ${d.x}<br>Profit: ${d.y}<br>Units Sold: ${d.size}<br>Category: ${d.category || 'N/A'}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            if (categories.length > 1 || categories[0] !== 'Default') {
                addLegendBelowChart(container.node(), categories, d3.scaleOrdinal().range(["#f97316", "#3b82f6", "#14b8a6", "#a855f7"]).domain(categories));
            }
        }

        function renderBulletChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin, container } = setupChart(containerId);

            const x = d3.scaleLinear()
                .domain([0, d3.max(data.ranges) * 1.1])
                .range([0, width]);

            svg.selectAll(".range")
                .data(data.ranges)
                .enter().append("rect")
                .attr("class", "range")
                .attr("x", 0)
                .attr("width", (d, i) => x(d))
                .attr("y", height / 4)
                .attr("height", height / 2)
                .attr("fill", (d, i) => {
                    if (i === 0) return "#fbd7d4";
                    if (i === 1) return "#fef0c7";
                    return "#d4edda";
                })
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>Range:</strong> ${d}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            svg.append("rect")
                .attr("class", "measure")
                .attr("x", 0)
                .attr("width", x(data.value))
                .attr("y", height / 4 + height / 8)
                .attr("height", height / 4)
                .attr("fill", "#14b8a6")
                .on("mouseover", (event) => {
                    tooltip.html(`<strong>Actual Value:</strong> ${data.value}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            svg.append("line")
                .attr("class", "target")
                .attr("x1", x(data.target))
                .attr("x2", x(data.target))
                .attr("y1", height / 4)
                .attr("y2", height / 4 + height / 2)
                .attr("stroke", "#dc2626")
                .attr("stroke-width", 2)
                .on("mouseover", (event) => {
                    tooltip.html(`<strong>Target:</strong> ${data.target}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(5));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Sales Value (USD)");

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

        function renderSlopegraph(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin, container } = setupChart(containerId);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => Math.max(d.before, d.after)) * 1.1])
                .range([height, 0]);

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
                .text("Sales Value (USD)");

            svg.append("text")
                .attr("x", 0)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "start")
                .style("font-weight", "bold")
                .style("font-size", "12px")
                .text("Q1 2024");

            svg.append("g")
                .attr("transform", `translate(${width},0)`)
                .call(d3.axisRight(y));
            svg.append("text")
                .attr("x", width)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "end")
                .style("font-weight", "bold")
                .style("font-size", "12px")
                .text("Q2 2024");

            data.forEach(d => {
                const lineColor = d.before < d.after ? "#14b8a6" : (d.before > d.after ? "#dc2626" : "#4b5563");
                svg.append("line")
                    .attr("x1", 0)
                    .attr("y1", y(d.before))
                    .attr("x2", width)
                    .attr("y2", y(d.after))
                    .attr("stroke", lineColor)
                    .attr("stroke-width", 2)
                    .on("mouseover", (event) => {
                        tooltip.html(`<strong>${d.category}</strong><br>Q1 Sales: ${d.before}<br>Q2 Sales: ${d.after}<br>Change: ${d.change}`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px")
                            .style("opacity", 1);
                    })
                    .on("mouseout", () => {
                        tooltip.style("opacity", 0);
                    });

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

        function renderTreemap(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin, container } = setupChart(containerId);

            const treemap = d3.treemap()
                .size([width, height])
                .padding(1);

            const root = d3.hierarchy(data)
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
                .attr("stroke", "#fff")
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.data.name}</strong><br>Sales: ${d.value}<br>Category: ${d.parent.data.name}<br>Status: ${d.data.status}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            cell.append("text")
                .attr("x", 4)
                .attr("y", 14)
                .text(d => d.data.name)
                .style("font-size", "10px")
                .attr("fill", "white")
                .call(wrapText, d => d.x1 - d.x0 - 8);

            function wrapText(text, width) {
                text.each(function () {
                    let text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1,
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

            const topLevelCategories = root.children.map(d => d.data.name);
            addLegendBelowChart(container.node(), topLevelCategories, color);
        }

        function renderWaffleChart(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData;
            const { container } = setupChart(containerId); // Custom setup for waffle
            container.html('');
            const width = container.node().clientWidth;
            const height = container.node().clientHeight;

            const numRows = 10;
            const numCols = 10;
            const cellSize = Math.min(width / numCols, height / numRows) - 2;
            const totalCells = numRows * numCols;

            const totalValue = d3.sum(data, d => d.sales); // Using 'sales' for waffle chart
            let currentCellCount = 0;
            const cellsData = data.flatMap(d => {
                const percentage = d.sales / totalValue;
                const numCells = Math.round(percentage * totalCells);
                const cells = [];
                for (let i = 0; i < numCells; i++) {
                    cells.push({
                        category: d.label,
                        value: d.sales,
                        percentage: percentage,
                        index: currentCellCount + i
                    });
                }
                currentCellCount += numCells;
                return cells;
            });

            while (cellsData.length < totalCells) {
                cellsData.push({ category: 'Other', value: 0, percentage: 0, index: cellsData.length });
            }
            while (cellsData.length > totalCells) {
                cellsData.pop();
            }

            const svg = container.append("svg")
                .attr("width", width)
                .attr("height", height);

            const color = d3.scaleOrdinal(d3.schemeCategory10)
                .domain(data.map(d => d.label));

            svg.selectAll("rect")
                .data(cellsData)
                .enter().append("rect")
                .attr("x", (d, i) => (d.index % numCols) * (cellSize + 2) + (width - (numCols * (cellSize + 2))) / 2)
                .attr("y", (d, i) => Math.floor(d.index / numCols) * (cellSize + 2) + (height - (numRows * (cellSize + 2))) / 2)
                .attr("width", cellSize)
                .attr("height", cellSize)
                .attr("fill", d => color(d.category))
                .attr("rx", 2)
                .attr("ry", 2)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.category}</strong><br>Percentage: ${(d.percentage * 100).toFixed(1)}%`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            const legend = container.append("div")
                .attr("class", "chart-legend")
                .style("margin-top", "20px");

            legend.selectAll(".legend-item")
                .data(data)
                .enter().append("div")
                .attr("class", "legend-item")
                .each(function (d) {
                    d3.select(this).append("div")
                        .attr("class", "legend-color")
                        .style("background-color", color(d.label));
                    d3.select(this).append("span")
                        .text(`${d.label} (${(d.sales / totalValue * 100).toFixed(1)}%)`);
                });
        }

        function renderHeatmap(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin } = setupChart(containerId);

            const xLabels = Array.from(new Set(data.map(d => d.x)));
            const yLabels = Array.from(new Set(data.map(d => d.y)));

            const x = d3.scaleBand()
                .range([0, width])
                .domain(xLabels)
                .padding(0.05);

            const y = d3.scaleBand()
                .range([height, 0])
                .domain(yLabels)
                .padding(0.05);

            const colorScale = d3.scaleSequential(d3.interpolateViridis)
                .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Region");

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 15)
                .attr("x", 0 - (height / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text("Product");

            svg.selectAll(".cell")
                .data(data)
                .enter().append("rect")
                .attr("class", "cell-heatmap")
                .attr("x", d => x(d.x))
                .attr("y", d => y(d.y))
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .attr("fill", d => colorScale(d.value))
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>Region: ${d.x}, Product: ${d.y}</strong><br>Sales: ${d.value}<br>Type: ${d.type}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            const legendSvg = svg.append("g")
                .attr("class", "legend")
                .attr("transform", `translate(${width + 20}, ${height / 2 - 50})`);

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
                .data(colorScale.ticks(10).map((t, i, a) => ({ offset: `${100 * i / a.length}%`, color: colorScale(t) })))
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
                .text("Sales");
        }

        function renderParallelCoordinatesPlot(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin, container } = setupChart(containerId);

            const dimensions = Object.keys(data[0]).filter(key => key !== 'product');

            const yScales = {};
            dimensions.forEach(d => {
                yScales[d] = d3.scaleLinear()
                    .domain(d3.extent(data, p => p[d]))
                    .range([height, 0]);
            });

            const x = d3.scalePoint()
                .range([0, width])
                .padding(1)
                .domain(dimensions);

            const line = d3.line();

            function path(d) {
                return line(dimensions.map(p => [x(p), yScales[p](d[p])]));
            }

            const colorKey = 'product'; // Always use 'product' for coloring
            const categories = Array.from(new Set(data.map(d => d[colorKey]).filter(Boolean)));
            const color = d3.scaleOrdinal()
                .domain(categories)
                .range(d3.schemeCategory10);

            svg.append("g")
                .attr("class", "foreground")
                .selectAll("path")
                .data(data)
                .enter().append("path")
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", d => color(d[colorKey] || 'Default'))
                .style("stroke-width", 1.5)
                .style("opacity", 0.7)
                .on("mouseover", (event, d) => {
                    let tooltipContent = `<strong>${d.product}</strong><br>`;
                    dimensions.forEach(dim => {
                        tooltipContent += `${dim}: ${d[dim]}<br>`;
                    });
                    tooltip.html(tooltipContent)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            const g = svg.selectAll(".dimension")
                .data(dimensions)
                .enter().append("g")
                .attr("class", "dimension")
                .attr("transform", d => `translate(${x(d)},0)`);

            g.append("g")
                .each(function (d) { d3.select(this).call(d3.axisLeft(yScales[d])); })
                .append("text")
                .style("text-anchor", "middle")
                .attr("y", -15)
                .style("font-size", "10px")
                .text(d => d)
                .style("fill", "#333");

            if (categories.length > 0) {
                addLegendBelowChart(container.node(), categories, color);
            }
        }

        function renderSankeyDiagram(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin } = setupChart(containerId);

            const sankey = d3.sankey()
                .nodeWidth(15)
                .nodePadding(10)
                .extent([[1, 1], [width - 1, height - 6]])
                .nodeId(d => d.id);

            const { nodes, links } = sankey({
                nodes: data.nodes.map(d => ({ ...d })),
                links: data.links.map(d => ({ ...d }))
            });

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const link = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-opacity", 0.5)
                .selectAll("g")
                .data(links)
                .enter().append("g")
                .sort((a, b) => b.width - a.width);

            link.append("path")
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("stroke", d => color(d.source.name))
                .attr("stroke-width", d => Math.max(1, d.width))
                .attr("class", "link-sankey")
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.source.name} → ${d.target.name}</strong><br>Value: ${d.value}<br>Flow Type: ${d.flowType}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            const node = svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .selectAll("g")
                .data(nodes)
                .enter().append("g");

            node.append("rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => d.y1 - d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("fill", d => color(d.name))
                .attr("stroke", "#000")
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.name}</strong><br>Total Value: ${d.value}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            node.append("text")
                .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
                .attr("y", d => (d.y1 + d.y0) / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
                .text(d => d.name);
        }

        function renderNodeLinkDiagram(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin } = setupChart(containerId);

            const simulation = d3.forceSimulation(data.nodes)
                .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 2, height / 2));

            const link = svg.append("g")
                .attr("class", "links")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(data.links)
                .enter().append("line")
                .attr("stroke-width", d => Math.sqrt(d.value || 1))
                .attr("class", "link")
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.source.name || d.source.id} → ${d.target.name || d.target.id}</strong><br>Relationship: ${d.relationship || 'N/A'}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            const node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(data.nodes)
                .enter().append("circle")
                .attr("r", 8)
                .attr("fill", "#3b82f6")
                .attr("stroke", "#1e40af")
                .attr("stroke-width", 1.5)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.name || d.id}</strong><br>Type: ${d.type || 'N/A'}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            node.append("title")
                .text(d => d.name || d.id);

            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });

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
        }

        function renderDendrogram(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin } = setupChart(containerId);

            const treeLayout = d3.tree().size([height, width]);

            const root = d3.hierarchy(data);
            treeLayout(root);

            svg.selectAll(".link-dendro")
                .data(root.links())
                .enter().append("path")
                .attr("class", "link-dendro")
                .attr("d", d3.linkVertical()
                    .x(d => d.x)
                    .y(d => d.y));

            const node = svg.selectAll(".node-dendro")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", d => `node-dendro ${d.children ? "node--internal" : "node--leaf"}`)
                .attr("transform", d => `translate(${d.x},${d.y})`);

            node.append("circle")
                .attr("r", 4.5)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.data.name}</strong><br>Level: ${d.depth}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            node.append("text")
                .attr("dy", "0.31em")
                .attr("x", d => d.children ? -6 : 6)
                .attr("text-anchor", d => d.children ? "end" : "start")
                .text(d => d.data.name);
        }

        function renderCirclePacking(containerId, chartDefinition) {
            const data = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleData[chartDefinition.dataKey];
            const { svg, width, height, margin } = setupChart(containerId);

            const pack = d3.pack().size([width, height]).padding(2);

            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);

            pack(root);

            const node = svg.selectAll(".node-circle-pack")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", d => `node-circle-pack ${d.children ? "node--internal" : "node--leaf"}`)
                .attr("transform", d => `translate(${d.x},${d.y})`);

            node.append("circle")
                .attr("r", d => d.r)
                .on("mouseover", (event, d) => {
                    tooltip.html(`<strong>${d.data.name}</strong><br>Value: ${d.value || 'N/A'}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .style("opacity", 1);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
                });

            node.append("text")
                .filter(d => !d.children && d.r > 10)
                .attr("dy", "0.3em")
                .text(d => d.data.name);
        }

        // --- Core Application Logic ---

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
            { id: 'categorical_quantitative', name: 'Categorical & Quantitative', validFor: ['comparison', 'distribution', 'composition'], category: 'single_cat_quant' },
            { id: 'time_series', name: 'Time-Series', validFor: ['evolution', 'comparison'], category: 'multi_cat_quant' },
            { id: 'two_quantitative', name: 'Two Quantitative Variables', validFor: ['relationship', 'distribution'], category: 'quant_pair_data' },
            { id: 'three_quantitative', name: 'Three Quantitative Variables', validFor: ['relationship'], category: 'quant_pair_data' },
            { id: 'univariate_quantitative', name: 'Single Quantitative Variable', validFor: ['distribution', 'comparison'], category: 'distribution_data' },
            { id: 'univariate_categorical', name: 'Single Categorical Variable', validFor: ['comparison', 'composition'], category: 'single_cat_quant' },
            { id: 'two_categorical', name: 'Two Categorical Variables', validFor: ['relationship'], category: 'specific_data_structures' },
            { id: 'hierarchical_data', name: 'Hierarchical Data', validFor: ['composition', 'hierarchy'], category: 'network_hierarchy_data' },
            { id: 'flow_data', name: 'Flow Data', validFor: ['flow'], category: 'network_hierarchy_data' },
            { id: 'network_data', name: 'Network Data', validFor: ['relationship'], category: 'network_hierarchy_data' },
            { id: 'multivariate_quantitative', name: 'Multivariate Quantitative', validFor: ['comparison', 'relationship', 'distribution'], category: 'specific_data_structures' }
        ];

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

            let filteredCharts = chartsDefinitions;
            if (selectedIntent) {
                filteredCharts = filteredCharts.filter(c => c.intent.includes(selectedIntent));
            }

            if (selectedDataType) {
                const selectedDataTypeCategory = dataTypes.find(dt => dt.id === selectedDataType)?.category;
                if (selectedDataTypeCategory) {
                    filteredCharts = filteredCharts.filter(c => c.compatibleDataCategory === selectedDataTypeCategory);
                } else {
                    filteredCharts = filteredCharts.filter(c => c.dataType.includes(selectedDataType));
                }
            }

            if (!selectedIntent) {
                recommendationsSubtitle.textContent = 'Select a goal above to start exploring recommended charts.';
            } else if (filteredCharts.length === 0 && selectedIntent && selectedDataType) {
                recommendationsSubtitle.textContent = 'No direct recommendations for this combination. Try a different set.';
            } else if (filteredCharts.length > 0) {
                recommendationsSubtitle.textContent = `Best options for "${intents.find(i => i.id === selectedIntent).name}"${selectedDataType ? ` and data type "${dataTypes.find(d => d.id === selectedDataType).name}"` : ''}.`;
            } else {
                recommendationsSubtitle.textContent = 'Now select your data type to narrow down recommendations.';
            }

            filteredCharts.forEach(chartData => {
                createChartCard(chartData, recommendationsContainer);
            });
        }

        function renderFullGallery() {
            chartsDefinitions.forEach(chartData => {
                createChartCard(chartData, fullGalleryContainer);
            });
        }

        function createChartCard(chartDefinition, container) {
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'bg-white p-4 md:p-6 rounded-xl shadow-lg border border-stone-200 flex flex-col';

            const chartContainerId = `chart-viz-${chartDefinition.id}-${container.id}`;
            const proTipBoxId = `pro-tip-box-${chartDefinition.id}-${container.id}`;

            let chartContentHtml = '';
            if (chartDefinition.renderFunction) {
                chartContentHtml = `<div id="${chartContainerId}" class="chart-container mb-4"></div>`;
            } else {
                chartContentHtml = `<div class="chart-container mb-4 flex items-center justify-center bg-stone-100 rounded-lg text-stone-500 text-center p-4">No direct visual example available for this chart type.<br>Please refer to the description for its use.</div>`;
            }

            // Determine the correct sample data string to display
            let sampleDataDisplayString = '';
            if (chartDefinition.dataKey && unifiedDataStructures[chartDefinition.compatibleDataCategory] && unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleDataString) {
                // If it's a specific key within a complex object (like treemap, sankey)
                sampleDataDisplayString = `// Data for '${chartDefinition.dataKey}' within the category's sample data\n` + unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleDataString;
            } else if (unifiedDataStructures[chartDefinition.compatibleDataCategory]) {
                // If it's a direct array/object for the category
                sampleDataDisplayString = unifiedDataStructures[chartDefinition.compatibleDataCategory].sampleDataString;
            } else {
                sampleDataDisplayString = '// No specific sample data structure defined for this chart.';
            }


            chartWrapper.innerHTML = `
                <h4 class="text-xl font-bold mb-3 text-teal-700">${chartDefinition.name}</h4>
                <p class="text-stone-700 text-sm mb-3">${chartDefinition.description}</p>
                ${chartContentHtml}
                <div class="space-y-2 mt-auto text-sm">
                    <div>
                        <h5 class="font-semibold text-stone-800">Dimensionality:</h5>
                        <p class="text-stone-600">${chartDefinition.dimensionality}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Grouping Support:</h5>
                        <p class="text-stone-600">${chartDefinition.groupingSupport}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Data Structure Constraints:</h5>
                        <p class="text-stone-600">${chartDefinition.dataConstraints}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">X-Axis Details:</h5>
                        <p class="text-stone-600"><strong>Label:</strong> ${chartDefinition.xAxisInfo.label}</p>
                        <p class="text-stone-600"><strong>Scale Type:</strong> <code>${chartDefinition.xAxisInfo.scaleType}</code></p>
                        <p class="text-stone-600"><strong>Configuration:</strong> ${chartDefinition.xAxisInfo.config}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Y-Axis Details:</h5>
                        <p class="text-stone-600"><strong>Label:</strong> ${chartDefinition.yAxisInfo.label}</p>
                        <p class="text-stone-600"><strong>Scale Type:</strong> <code>${chartDefinition.yAxisInfo.scaleType}</code></p>
                        <p class="text-stone-600"><strong>Configuration:</strong> ${chartDefinition.yAxisInfo.config}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Typical Use Cases:</h5>
                        <p class="text-stone-600">${chartDefinition.typicalUseCases}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Strengths:</h5>
                        <p class="text-stone-600">${chartDefinition.strengths}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Weaknesses:</h5>
                        <p class="text-stone-600">${chartDefinition.weaknesses}</p>
                    </div>
                    <div>
                        <h5 class="font-semibold text-stone-800">Required Data Structure:</h5>
                        <pre><code class="language-javascript">${sampleDataDisplayString}</code></pre>
                    </div>
                    <button id="pro-tip-btn-${chartDefinition.id}-${container.id}" class="mt-4 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition duration-300">
                        Get Pro-Tip
                    </button>
                    <div id="${proTipBoxId}" class="pro-tip-box hidden"></div>
                </div>
            `;
            container.appendChild(chartWrapper);

            if (chartDefinition.renderFunction) {
                setTimeout(() => {
                    chartDefinition.renderFunction(chartContainerId, chartDefinition);
                }, 0);
            }

            const proTipButton = document.getElementById(`pro-tip-btn-${chartDefinition.id}-${container.id}`);
            const proTipBox = document.getElementById(proTipBoxId);
            proTipButton.addEventListener('click', () => {
                proTipBox.classList.remove('hidden');
                getProTip(chartDefinition, proTipBox, proTipButton);
            });
        }

        function renderDetailedChartPropertiesTable() {
            detailedChartPropertiesTableBody.innerHTML = '';

            chartsDefinitions.forEach(chart => {
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
                let sampleDataDisplayString = '';
                if (chart.dataKey && unifiedDataStructures[chart.compatibleDataCategory] && unifiedDataStructures[chart.compatibleDataCategory].sampleDataString) {
                    sampleDataDisplayString = `// Data for '${chart.dataKey}' within the category's sample data\n` + unifiedDataStructures[chart.compatibleDataCategory].sampleDataString;
                } else if (unifiedDataStructures[chart.compatibleDataCategory]) {
                    sampleDataDisplayString = unifiedDataStructures[chart.compatibleDataCategory].sampleDataString;
                } else {
                    sampleDataDisplayString = '// No specific sample data structure defined for this chart.';
                }
                dataStructureCell.innerHTML = `<pre><code class="language-javascript">${sampleDataDisplayString}</code></pre>`;
            });
        }

        function renderUnifiedDataStructureSection() {
            unifiedDataCategorySelector.innerHTML = '';
            unifiedChartsDisplay.innerHTML = '';
            unifiedDataStructureCode.classList.add('hidden');

            Object.keys(unifiedDataStructures).forEach(categoryKey => {
                const category = unifiedDataStructures[categoryKey];
                const btn = document.createElement('button');
                btn.className = 'unified-category-btn px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300';
                btn.textContent = category.description.split(' - ')[0]; // Use first part of description as button text
                btn.dataset.category = categoryKey;
                btn.addEventListener('click', () => handleUnifiedCategorySelection(categoryKey, btn));
                unifiedDataCategorySelector.appendChild(btn);
            });
        }

        function handleUnifiedCategorySelection(categoryKey, btn) {
            document.querySelectorAll('.unified-category-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            unifiedChartsDisplay.innerHTML = '';
            unifiedDataStructureCode.classList.remove('hidden');
            unifiedDataStructureCodeDisplay.textContent = unifiedDataStructures[categoryKey].sampleDataString;

            const compatibleCharts = chartsDefinitions.filter(chart => chart.compatibleDataCategory === categoryKey);

            compatibleCharts.forEach(chartDefinition => {
                createChartCard(chartDefinition, unifiedChartsDisplay);
            });
        }

        // --- Initial Render Calls ---
        renderIntents();
        renderFullGallery();
        renderRecommendations();
        renderDetailedChartPropertiesTable();
        renderUnifiedDataStructureSection();
    });