import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function IncomeExpenseChart({ filter, data }) {
  const now = moment();

  const filteredData = useMemo(() => {
    return data.filter((tx) => {
      const txDate = moment(tx.created_at);

      if (filter === "This Week") {
        return txDate.isSame(now, "week");
      } else if (filter === "Next Week") {
        const nextWeekStart = moment().add(1, "week").startOf("week");
        const nextWeekEnd = moment().add(1, "week").endOf("week");
        return txDate.isBetween(nextWeekStart, nextWeekEnd, null, "[]");
      } else if (filter === "This Month") {
        return txDate.isSame(now, "month");
      } else if (filter === "Next Month") {
        return txDate.isSame(moment().add(1, "month"), "month");
      } else if (filter === "This Year") {
        return txDate.isSame(now, "year");
      } else if (filter === "Next Year") {
        return txDate.isSame(moment().add(1, "year"), "year");
      }

      return true;
    });
  }, [data, filter]);

  const groupedData = useMemo(() => {
    const income = {};
    const expense = {};
    const labelsSet = new Set();

    // Default label set for consistent chart labels
    if (filter === "This Week" || filter === "Next Week") {
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((d) => labelsSet.add(d));
    }

    filteredData.forEach((tx) => {
      const date = moment(tx.created_at);
      let key;

      if (filter === "This Week" || filter === "Next Week") {
        key = date.format("ddd");
      } else if (filter === "This Month" || filter === "Next Month") {
        key = `W${date.week() - date.clone().startOf("month").week() + 1}`;
      } else if (filter === "This Year" || filter === "Next Year") {
        key = date.format("MMM");
      } else {
        key = date.format("YYYY-MM-DD"); // fallback
      }

      labelsSet.add(key);

      if (tx.type === "income") {
        income[key] = (income[key] || 0) + Number(tx.amount);
      } else {
        expense[key] = (expense[key] || 0) + Number(tx.amount);
      }
    });

    const labels = Array.from(labelsSet).sort((a, b) => {
      if (filter === "This Week" || filter === "Next Week") {
        const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return order.indexOf(a) - order.indexOf(b);
      } else if (filter === "This Month" || filter === "Next Month") {
        return parseInt(a.slice(1)) - parseInt(b.slice(1)); // W1, W2...
      } else if (filter === "This Year" || filter === "Next Year") {
        return moment(a, "MMM").month() - moment(b, "MMM").month();
      } else {
        return a.localeCompare(b);
      }
    });

    const incomeArr = labels.map((l) => income[l] || 0);
    const expenseArr = labels.map((l) => expense[l] || 0);

    return { labels, incomeArr, expenseArr };
  }, [filteredData, filter]);

  const chartData = {
    labels: groupedData.labels,
    datasets: [
      {
        label: "Income",
        data: groupedData.incomeArr,
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
      {
        label: "Expense",
        data: groupedData.expenseArr,
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#ffffff" },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#ffffff" },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
