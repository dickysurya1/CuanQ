import React, { useState } from "react";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import SpendingPieChart from "../components/SpendingPieChart";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTransactions } from "../services/transactionService";
import moment from "moment";
import { getBalance } from "../services/accountService";

export default function Dashboard() {
  const [filter, setFilter] = useState("This Month");
  const [filterSpending, setFilterSpending] = useState("This Month");
  const [transactions, setTransactions] = useState([]);
  const [expensesThisMonth, setExpensesThisMonth] = useState(0);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);

        const bulanIni = new Date().getMonth();

        const totalExpense = data
          .filter(
            (tx) =>
              tx.type === "expense" &&
              new Date(tx.created_at).getMonth() === bulanIni
          )
          .reduce((acc, curr) => acc + Number(curr.amount), 0);

        setExpensesThisMonth(totalExpense);

        const getWalletBalance = await getBalance();
        setWallet(getWalletBalance.balance);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleChangeSpending = (e) => {
    setFilterSpending(e.target.value);
  };
  return (
    <div className=" ">
      <main className="flex-grow-1 p-4">
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="custom-card">
              <div className="custom-card-body">
                <h5 className="custom-card-title">Expenses Record</h5>

                {transactions.filter((tx) => tx.type === "expense").length ===
                0 ? (
                  <div className="text-center text-muted py-3">
                    <small>Belum ada catatan pengeluaran.</small>
                  </div>
                ) : (
                  transactions
                    .filter((tx) => tx.type === "expense")
                    .slice(0, 4)
                    .map((tx, i) => (
                      <div
                        key={i}
                        className="record-item d-flex justify-content-between"
                      >
                        <div>
                          <p className="mb-0 text-purple fw-bold">
                            {tx.category || "Others"}
                          </p>
                          <small>{`Rp ${Number(tx.amount).toLocaleString(
                            "id-ID"
                          )}`}</small>
                        </div>
                        <small>
                          {moment(tx.created_at).format("D/M/YYYY")}
                        </small>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-12 mb-3">
                <h5 className="mb-3">Budgeting</h5>
                <div className="row gap-2 justify-content-around">
                  <div className="col-md-5 col-12 custom-card">
                    <div className="custom-card-body">
                      <p className="text-danger mb-1">● This Month Expenses</p>
                      <h5 className="custom-card-title">
                        {`Rp ${expensesThisMonth.toLocaleString("id-ID")}`}
                      </h5>
                    </div>
                  </div>
                  <div className="col-md-5 col-12 custom-card">
                    <div className="custom-card-body">
                      <p className="text-success mb-1">● My Wallet</p>
                      <h5 className="custom-card-title">
                        {`Rp ${Number(wallet).toLocaleString("id-ID")}`}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <h5 className="mb-3">Quick Access</h5>
                <div className="custom-card">
                  <div className="custom-card-body">
                    <div className="row gap-2">
                      <Link
                        to="/add-transaction"
                        className="col text-center text-purple"
                      >
                        <i className="fas fa-plus me-2"></i> <br /> Add
                        Transaction
                      </Link>
                      <Link
                        to="/transaction-history"
                        className="col text-center text-purple"
                      >
                        <i className="fas fa-history me-2"></i> <br />{" "}
                        Transaction History
                      </Link>
                      <Link
                        to="/future-prediction"
                        className="col text-center text-purple"
                      >
                        <i className="fas fa-magic me-2"></i> <br /> Future
                        Prediction
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="custom-card text-white bg-chart">
              <div className="custom-card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="custom-card-title mb-0 text-white">
                    Income & Expense
                  </h5>
                  <div className="dropdown">
                    <select
                      className="form-select form-select-sm w-auto"
                      value={filter}
                      onChange={handleChange}
                      style={{ fontSize: "0.8rem" }}
                    >
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                  </div>
                </div>
                <div className="text-center" style={{ height: "300px" }}>
                  <IncomeExpenseChart filter={filter} data={transactions} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <div className="custom-card h-100">
              <div className="custom-card-body">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                  <h5 className="custom-card-title mb-0">Spending</h5>
                  <div className="dropdown">
                    <select
                      className="form-select form-select-sm w-auto"
                      value={filterSpending}
                      onChange={handleChangeSpending}
                    >
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                      <option value="This Year">This Year</option>
                    </select>
                  </div>
                </div>

                <SpendingPieChart filter={filterSpending} data={transactions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
