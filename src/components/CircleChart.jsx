import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { GraphContext } from "../context/context";
import { useContext } from "react";

const CircleChart = () => {
  const { thisDay, thisMonth, btnStates } =
    useContext(GraphContext);
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const merged = expenses.map((item) => {
    const mergedEntries = item.entries.reduce((acc, item) => {
      const sameType = acc.find((i) => i.type === item.type);

      if (sameType) {
        sameType.amount = Number(sameType.amount) + Number(item.amount);
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    return { date: item.date, entries: mergedEntries };
  });
  // console.log(merged)

  const getWeekRange = (date = Temporal.Now.plainDateISO()) => {
    const startOfWeek = date.subtract({ days: date.dayOfWeek - 1 });
    const endOfWeek = date.add({ days: 7 - date.dayOfWeek });
    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getWeekRange();
  const weekFilter = merged.filter((item) => {
    const itemDate = Temporal.PlainDate.from(item.date);
    Temporal.PlainDate.compare(itemDate, startOfWeek) >= 0 &&
      Temporal.PlainDate.compare(itemDate, endOfWeek) <= 0;
  });

  let labels;
  let amounts;
  if (btnStates === "thisDay") {
    labels = merged
      .flatMap((item) => item.entries.filter(() => item.date === thisDay))
      .map((it) => it.type);
    amounts = merged
      .flatMap((item) => item.entries.filter(() => item.date === thisDay))
      .map((it) => it.amount);
  } else if(btnStates === "thisWeek") {
    labels = weekFilter.flatMap((item) => item.entries.filter((it) => it.type))
    amounts = weekFilter.flatMap((item) => item.entries.filter((it) => it.amount))
  } else if (btnStates === "thisMonth") {
    labels = merged
      .flatMap((item) =>
        item.entries.filter(
          () => item.date.slice(5, 7) === String(thisMonth).padStart(2, "0"),
        ),
      )
      .map((it) => it.type);
    amounts = merged
      .flatMap((item) =>
        item.entries.filter(
          () => item.date.slice(5, 7) === String(thisMonth).padStart(2, "0"),
        ),
      )
      .map((it) => it.amount);
  } else {
    labels = merged.flatMap((item) => item.entries.map((i) => i.type));
    amounts = merged.flatMap((item) => item.entries.map((i) => i.amount));
  }
  console.log(labels, amounts);

  return (
    <Doughnut
      data={{
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: amounts,
            borderColor: "#c9184a",
            pointStyle: false,
            fill: true,
            backgroundColor: "#ffb3c1",
            label: " ",
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff0f3",
            titleColor: "#a4133c",
            titleAlign: "center",
            bodyColor: "#a4133c",
            bodyAlign: "center",
            displayColors: false,
            padding: 12,
            callbacks: {
              label: (context) => {
                const value = context.parsed;
                return `Amount: $${value.toLocaleString()}`;
              },
            },
          },
        },
        responsive: true,
      }}
    />
  );
};

export default CircleChart;
