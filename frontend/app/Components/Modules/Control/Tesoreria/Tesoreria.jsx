"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import IngresoForm from "./IngresoForm";
import GastoForm from "./GastoForm";

import {
  getBalance,
  getIncomesByMonth,
  getExpensesByMonth,
  getMonthlyReport,
} from "../Servicio/Servicio";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const mapMonthName = (data) =>
  data.map((item) => ({
    ...item,
    monthLabel: `${MONTH_NAMES[item.MONTH_ - 1]} ${item.YEAR_}`,
    TOTAL_INCOMES: Number(item.TOTAL_INCOMES || 0),
    TOTAL_Expenses: Number(item.TOTAL_Expenses || 0),
  }));

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-lg border border-gray-300">
        <p className="text-black font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-black">
            {entry.name}: ${entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Tesoreria() {
  const [showIngreso, setShowIngreso] = useState(false);
  const [showGasto, setShowGasto] = useState(false);

  const [balance, setBalance] = useState(null);
  const [incomesByMonth, setIncomesByMonth] = useState([]);
  const [expensesByMonth, setExpensesByMonth] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  const userID = useSelector((state) => state.token.userID);

  const closeForms = () => {
    setShowIngreso(false);
    setShowGasto(false);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [
          balanceData,
          incomesData,
          expensesData,
          reportData,
        ] = await Promise.all([
          getBalance(),
          getIncomesByMonth(),
          getExpensesByMonth(),
          getMonthlyReport(),
        ]);

        setBalance(balanceData);
        setIncomesByMonth(mapMonthName(incomesData));
        setExpensesByMonth(mapMonthName(expensesData));
        setMonthlyReport(
          reportData.map((item) => ({
            ...item,
            monthLabel: `${MONTH_NAMES[item.Month_ - 1]} ${item.Year_}`,
            Total_Incomes: Number(item.Total_Incomes || 0),
            Total_Expenses: Number(item.Total_Expenses || 0),
          }))
        );
      } catch (err) {
        console.error("Error cargando datos de tesorería", err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      
      <div className="mb-6">
        <Link
          href="/Ministery"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Volver al panel del Ministerio
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-white">Módulo de Tesorería</h1>

      
      {balance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-black">Total Ingresos</h3>
            <p className="text-2xl font-bold text-black">${balance.Total_incomes}</p>
          </div>

          <div className="bg-red-100 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-black">Total Gastos</h3>
            <p className="text-2xl font-bold text-black">${balance.Total_expenses}</p>
          </div>

          <div className="bg-blue-900 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white">Saldo</h3>
            <p className="text-2xl font-bold text-white">
              ${balance.Total_incomes - balance.Total_expenses}
            </p>
          </div>
        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => {
            setShowIngreso(true);
            setShowGasto(false);
          }}
          className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition"
        >
          ➕ Registrar Ingreso
        </button>

        <button
          onClick={() => {
            setShowGasto(true);
            setShowIngreso(false);
          }}
          className="bg-red-600 text-white p-6 rounded-xl hover:bg-red-700 transition"
        >
          ➖ Registrar Gasto
        </button>
      </div>

      
      <div className="bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-black">Ingresos por mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomesByMonth}>
            <XAxis dataKey="monthLabel" stroke="#111" tick={{ fill: '#111' }} />
            <YAxis stroke="#111" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="TOTAL_INCOMES"
              stroke="#16a34a"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <div className="bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-black">Gastos por mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expensesByMonth}>
            <XAxis dataKey="monthLabel" stroke="#111" tick={{ fill: '#111' }} />
            <YAxis stroke="#111" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="TOTAL_Expenses"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div className="bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Reporte mensual (Ingresos vs Gastos)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyReport}>
            <XAxis dataKey="monthLabel" stroke="#111" tick={{ fill: '#111' }} />
            <YAxis stroke="#111" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="Total_Incomes"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="Total_Expenses"
              fill="#dc2626"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      {showIngreso && <IngresoForm userId={userID} onClose={closeForms} />}
      {showGasto && <GastoForm userId={userID} onClose={closeForms} />}
    </div>
  );
}
