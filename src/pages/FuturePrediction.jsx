import React, { useEffect, useState } from "react";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import { getTransactions } from "../services/transactionService";
import { getPrediction } from "../services/predictionService";
import { getBalance } from "../services/accountService";

const FuturePrediction = () => {
  const [filteredExpense, setFilteredExpense] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [expensesThisMonth, setExpensesThisMonth] = useState(0);
  const [mainChartFilter, setMainChartFilter] = useState("This Week");

  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionData, setPredictionData] = useState([]);
  const [predictionFilter, setPredictionFilter] = useState("Next Week");
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);

        const getWalletBalance = await getBalance();
        setWallet(getWalletBalance.balance);
      } catch (err) {
        console.error("Gagal ambil data transaksi:", err);
      }
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    const total = calculateFilteredExpense(mainChartFilter, transactions);
    setFilteredExpense(total);
  }, [mainChartFilter, transactions]); 
  const fetchPrediction = async (period) => {
    try {
      const response = await getPrediction(period);

      const cleanedData = response.forecast
        .slice(0, period)
        .flatMap((item, index) => [
          {
            transaction_id: 100000 + index * 2,
            amount: item.yhat_expense.toFixed(2),
            description: "Prediction",
            type: "expense",
            created_at: item.ds,
            category: "PREDICTION",
          },
          {
            transaction_id: 100000 + index * 2 + 1,
            amount: item.yhat_income.toFixed(2),
            description: "Prediction",
            type: "income",
            created_at: item.ds,
            category: "PREDICTION",
          },
        ]);

      setPredictionData(cleanedData);
    } catch (error) {
      console.error("Gagal ambil data prediksi:", error);
    }
  };

  const calculateFilteredExpense = (filter, data) => {
    const now = new Date();

    return data
      .filter((tx) => {
        if (tx.type !== "expense") return false;

        const txDate = new Date(tx.created_at);

        if (filter === "This Week") {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Senin
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);

          return txDate >= startOfWeek && txDate <= endOfWeek;
        }

        if (filter === "This Month") {
          return (
            txDate.getMonth() === now.getMonth() &&
            txDate.getFullYear() === now.getFullYear()
          );
        }

        if (filter === "This Year") {
          return txDate.getFullYear() === now.getFullYear();
        }

        return false;
      })
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
  };

  const handleTogglePrediction = () => {
    if (showPrediction) {
      setShowPrediction(false);
      setPredictionData([]);
    } else {
      fetchPrediction(7);
      setPredictionFilter("Next Week");
      setShowPrediction(true);
    }
  };

  const handlePredictionFilterChange = (e) => {
    const selected = e.target.value;
    setPredictionFilter(selected);

    const dayMap = {
      "Next Week": 7,
      "Next Month": 31,
      "Next Year": 365,
    };

    fetchPrediction(dayMap[selected]);
  };

  const nextIncome = predictionData
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const nextExpense = predictionData
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div>
      <h4>Future Prediction</h4>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="p-4 custom-card">
            <h5>{mainChartFilter} Expenses</h5>
            <p className="fs-4 fw-bold text-danger">
              Rp {Number(filteredExpense).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 custom-card">
            <h5>My Wallet</h5>
            <p className="fs-4 fw-bold text-success">
              Rp {Number(wallet).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="custom-card text-white bg-chart">
            <div className="custom-card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="custom-card-title mb-0 text-white">
                  {mainChartFilter} Income & Expense
                </h5>
                <select
                  className="form-select form-select-sm w-auto"
                  value={mainChartFilter}
                  onChange={(e) => setMainChartFilter(e.target.value)}
                  style={{ fontSize: "0.8rem" }}
                >
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                  <option value="This Year">This Year</option>
                </select>
              </div>

              <div className="text-center" style={{ height: "300px" }}>
                <IncomeExpenseChart
                  filter={mainChartFilter}
                  data={transactions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="btn-purple w-25 mb-4" onClick={handleTogglePrediction}>
        {showPrediction ? "Hide Prediction" : "Show Prediction"}
      </button>

      {showPrediction && (
        <>
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="p-4 custom-card">
                <h5>{predictionFilter} Expenses</h5>
                <p className="fs-4 fw-bold text-danger">
                  Rp {Number(nextExpense).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 custom-card">
                <h5>{predictionFilter} Income</h5>
                <p className="fs-4 fw-bold text-success">
                  Rp {Number(nextIncome).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <div className="custom-card text-white bg-chart">
                <div className="custom-card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="custom-card-title mb-0 text-white">
                      {predictionFilter} Income & Expense Prediction
                    </h5>
                    <select
                      className="form-select form-select-sm w-auto"
                      value={predictionFilter}
                      onChange={handlePredictionFilterChange}
                      style={{ fontSize: "0.8rem" }}
                    >
                      <option value="Next Week">Next Week</option>
                      <option value="Next Month">Next Month</option>
                      <option value="Next Year">Next Year</option>
                    </select>
                  </div>
                  <div className="text-center" style={{ height: "300px" }}>
                    <IncomeExpenseChart
                      filter={predictionFilter}
                      data={predictionData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FuturePrediction;
