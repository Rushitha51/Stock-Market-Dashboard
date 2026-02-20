const stocks = [
    { name: "Reliance", symbol: "RELIANCE", price: 2850, change: 0.9 },
    { name: "TCS", symbol: "TCS", price: 3800, change: -0.5 },
    { name: "Infosys", symbol: "INFY", price: 1600, change: 1.4 },
    { name: "HDFC Bank", symbol: "HDFCBANK", price: 1500, change: -0.8 },
    { name: "ICICI Bank", symbol: "ICICIBANK", price: 1050, change: 1.2 },
    { name: "Wipro", symbol: "WIPRO", price: 450, change: 0.6 },
    { name: "SBI", symbol: "SBIN", price: 620, change: -0.4 },
    { name: "Adani Ports", symbol: "ADANIPORTS", price: 900, change: 2.1 },
    { name: "HCL Tech", symbol: "HCLTECH", price: 1400, change: -1.3 },
    { name: "ITC", symbol: "ITC", price: 420, change: 0.7 }
];

const listDiv = document.getElementById("stockList");
const detailsDiv = document.getElementById("stockDetails");
const search = document.getElementById("search");
const enterBtn = document.getElementById("enterBtn");

let chart = null;

function showDetails(stock) {
    const colorClass = stock.change >= 0 ? "green" : "red";

    detailsDiv.innerHTML = `
        <h2>${stock.name} (${stock.symbol})</h2>
        <p>Price: ₹${stock.price}</p>
        <p class="${colorClass}">
            Change: ${stock.change}% 
            ${stock.change >= 0 ? "📈" : "📉"}
        </p>
    `;

    drawChart(stock);
}

function drawChart(stock) {
    const ctx = document.getElementById("stockChart").getContext("2d");

    if (chart) chart.destroy();

    const isProfit = stock.change >= 0;

    const weeklyData = Array.from({length:7}, () =>
        (Math.random() * 4 - 2).toFixed(2)
    );

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            datasets: [{
                label: "Profit / Loss %",
                data: weeklyData,
                borderColor: isProfit ? "#22c55e" : "#ef4444",
                borderWidth: 3,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            plugins: {
                legend: { labels: { color: "white" } }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Days",
                        color: "#3b82f6"
                    },
                    ticks: { color: "white" }
                },
                y: {
                    title: {
                        display: true,
                        text: "Profit / Loss %",
                        color: "#facc15"
                    },
                    ticks: {
                        color: "white",
                        callback: function(value) {
                            return value + "%";
                        }
                    }
                }
            }
        }
    });
}

function displayList(list) {
    listDiv.innerHTML = "";

    list.forEach(stock => {
        const item = document.createElement("div");
        item.className = "stock-item";
        item.innerText = stock.name + " (" + stock.symbol + ")";
        listDiv.appendChild(item);
    });
}

enterBtn.addEventListener("click", function() {
    const value = search.value.toLowerCase();

    const foundStock = stocks.find(s =>
        s.name.toLowerCase().includes(value) ||
        s.symbol.toLowerCase().includes(value)
    );

    if (foundStock) {
        showDetails(foundStock);
    } else {
        detailsDiv.innerHTML = "";
        if (chart) chart.destroy();
        alert("Stock not found!");
    }
});

window.onload = function () {
    displayList(stocks);
};
