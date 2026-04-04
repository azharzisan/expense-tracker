import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { GraphContext } from "../context/context";
import { useContext } from "react";
import { Temporal } from "@js-temporal/polyfill";

const CircleChart = () => {
  const { thisDay, thisMonth, btnStates, thisYear } = useContext(GraphContext);
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

  const getWeekRange = (date = Temporal.Now.plainDateISO()) => {
    const startOfWeek = date.subtract({ days: date.dayOfWeek - 1 });
    const endOfWeek = date.add({ days: 7 - date.dayOfWeek });
    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getWeekRange();
  const weekFilter = expenses.filter((item) => {
    if (!item.date) return false
    const itemDate = Temporal.PlainDate.from(item.date);
    return (
      Temporal.PlainDate.compare(itemDate, startOfWeek) >= 0 &&
      Temporal.PlainDate.compare(itemDate, endOfWeek) <= 0
    );
  });

  const monthFilter = expenses.filter((item) => {
    if (!item.date) return false
    const itemDate = Temporal.PlainDate.from(item.date)
    return itemDate.month === thisMonth && itemDate.year === thisYear
  })
  console.log(monthFilter)

  let labels;
  let amounts;
  if (btnStates === "thisDay") {
    labels = merged
      .flatMap((item) => item.entries.filter(() => item.date === thisDay))
      .map((it) => it.type);
    amounts = merged
      .flatMap((item) => item.entries.filter(() => item.date === thisDay))
      .map((it) => it.amount);
  } else if (btnStates === "thisWeek") {
    const allEntries = weekFilter.flatMap((item) => item.entries)

    const weekMerge = allEntries.reduce((acc, item) => {
      const existing = acc.find((i) => i.type === item.type)

      if (existing) {
        existing.amount = Number(existing.amount) + Number(item.amount)
      } else {
        acc.push({...item})
      }
      return acc;
    }, [])
    labels = weekMerge.map((i) => i.type)
    amounts = weekMerge.map((i) => i.amount)

  } else if (btnStates === "thisMonth") {
    const allEntries = monthFilter.flatMap((item) => item.entries)
    const monthMerge = allEntries.reduce((acc, item) => {
      const existing = acc.find((i) => i.type === item.type)
      if (existing) {
        existing.amount = Number(existing.amount) + Number(item.amount)
      } else {
        acc.push({...item})
      }
      return acc;
    }, [])
    labels = monthMerge.map((i) => i.type)
    amounts = monthMerge.map((i) => i.amount)
  } else {
    labels = merged.flatMap((item) => item.entries.map((i) => i.type));
    amounts = merged.flatMap((item) => item.entries.map((i) => i.amount));
  }

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
