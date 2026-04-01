import "./App.css";
import DataSearch from "./ui/DataSearch";
import BarView from "./ui/BarView";
import AddButton from "./components/AddButton";
import Nav from "./ui/Nav";
import TotalExpenses from "./ui/TotalExpenses";
import TableView from "./ui/TableView";

function App() {
  const expenseData = {
    id: crypto.randomUUID(),
    amount: expenseAmount,
    type: expenseType,
    date: expenseDate,
  };

  const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const updatedExpenses = [...existingExpenses, expenseData]
  localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

  return (
    <>
      <Nav />
      {/* section for total expenses */}
      <section className="w-full h-auto p-4 mt-18">
        <div className="w-full h-auto flex justify-between items-center rounded-xl bg-[#800f2f] py-2 px-4">
          <TotalExpenses />
          {/* duration filter */}
          <AddButton />
        </div>
      </section>

      <section className="w-full h-auto p-4">
        <div className="w-full h-auto flex justify-center items-center gap-4">
          <TableView />
          <BarView />
        </div>
      </section>

      <section className="w-full h-auto p-4">
        <DataSearch />
      </section>
    </>
  );
}

export default App;
