import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import moment from "moment";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingPieChart({ data, filter }) {
  const now = moment();

  const { grouped, total } = useMemo(() => {
    const filtered = data.filter((tx) => {
      const txDate = moment(tx.created_at);
      if (tx.type !== "expense") return false;

      if (filter === "This Week") return txDate.isSame(now, "week");
      if (filter === "This Month") return txDate.isSame(now, "month");
      if (filter === "This Year") return txDate.isSame(now, "year");

      return true;
    });

    const group = {};
    let totalExpense = 0;

    filtered.forEach((tx) => {
      const cat = tx.category || "Others";
      group[cat] = (group[cat] || 0) + Number(tx.amount);
      totalExpense += Number(tx.amount);
    });

    return { grouped: group, total: totalExpense };
  }, [data, filter]);

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        data: Object.values(grouped),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="row align-items-center mb-3">
        <div className="col-md-5 col-12 ">
          <Pie data={chartData} />
        </div>
        <div className="col-md-7 col-12">
          <table className="table table-sm table-borderless mb-0">
            <tbody>
              {Object.entries(grouped).map(([cat, amount]) => {
                const percent = ((Number(amount) / total) * 100).toFixed(1);
                return (
                  <tr key={cat} style={{ fontSize: "12px" }}>
                    <td className="py-1 px-2">{percent}%</td>
                    <td className="py-1 px-2">{cat}</td>
                    <td className="py-1 px-2 text-end">
                      IDR {Number(amount).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="fw-semibold text-center d-block mt-2">
        <strong>IDR {total.toLocaleString()}</strong> is your total expense{" "}
        {filter.toLowerCase()}
      </p>
    </>
  );
}
