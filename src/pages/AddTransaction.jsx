import React, { useState } from "react";
import { toast } from "react-toastify";
import { addTransaction } from "../services/transactionService";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.warn("Deskripsi transaksi tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      await addTransaction(text);
      toast.success("Transaksi berhasil ditambahkan!");
      setText("");
    } catch (error) {
      toast.error("Gagal menambahkan transaksi");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h4>Add Transaction</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="transactionDesc" className="form-label">
            Type your transaction here <small className="text-danger">*</small>
          </label>
          <textarea
            id="transactionDesc"
            name="transactionDesc"
            className="form-control"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="w-25 btn-purple" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
