import React, { useState } from "react";

const AddExpenses = () => {
  const [TypeInputValue, setTypeInputValue] = useState("");
  const [addTypeOptions, setAddTypeOptions] = useState([]);

  const handleTypeInputValueFocus = (e) => {
    setTypeInputValue(e.target.value);
  };

  const handleAddTypeOptions = () => {
    setAddTypeOptions([
      ...addTypeOptions,
      { id: crypto.randomUUID(), type: TypeInputValue },
    ]);
    setTypeInputValue("");
  };
  console.log(addTypeOptions.length);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center gap-4 flex-col">
        <h1 className="text-xl font-bold text-[#a4133c]">Add Your Expenses</h1>
        <div className="w-auto h-auto flex flex-col justify-center items-center gap-1 rounded-xl bg-[#ffccd5] p-4">
          <label htmlFor="" className="w-full text-sm text-left text-[#a4133c]">
            Amount
          </label>
          <input
            type="number"
            id="expenseAmount"
            placeholder="Enter Amount ($)"
            className="w-full border-2 border-[#a4133c] bg-[#fff0f3] p-2 rounded outline-none text-[#a4133c]"
          />
          <label
            htmlFor="expenseType"
            className="w-full text-sm text-left text-[#a4133c]"
          >
            Type
          </label>
          <select
            id="expenseType"
            className="w-full border-2 border-[#a4133c] bg-[#fff0f3] p-2 rounded outline-none text-[#a4133c]"
          >
            {addTypeOptions.length === 0 ? (
              <option value="null" defaultValue disabled>
                No Types Added
              </option>
            ) : (
              addTypeOptions.map((item) => {
                <option key={item.id} value={item.type}>{item.type}</option>;
              })
            )}
          </select>
          <label
            htmlFor="expenseDate"
            className="w-full text-sm text-left text-[#a4133c]"
          >
            Date
          </label>
          <input
            type="date"
            id="expenseDate"
            className="w-full border-2 border-[#a4133c] bg-[#fff0f3] p-2 rounded outline-none text-[#a4133c]"
          />
          <button
            type="submit"
            className="w-full bg-[#a4133c] hover:bg-[#ffb3c1] p-2 rounded mt-4 text-[#fff0f3] hover:text-[#a4133c]"
          >
            Add Expense
          </button>
          <input
            type="text"
            id="expenseAddTypes"
            placeholder="Add a Type"
            value={TypeInputValue}
            onChange={handleTypeInputValueFocus}
            className="w-full border-2 border-[#a4133c] bg-[#fff0f3] p-2 rounded outline-none text-[#a4133c] mt-3"
          />
          <button onClick={handleAddTypeOptions} className="w-full p-2 bg-[#ff8fa3] hover:bg-[#ffb3c1] border border-[#800f2f] mt-1 rounded text-[#800f2f]">
            Add Types
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;
