// /expenses -> Shared Layout

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     title: "First Expense",
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "e2",
//     title: "Second Expense",
//     amount: 16.99,
//     date: new Date().toISOString(),
//   },
// ];

export async function loader({ request }: LoaderFunctionArgs) {
 const userId =  await requireUserSession(request);
  return getExpenses(userId);
}

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";
import { FaPlus, FaDownload } from "react-icons/fa";
import { Expense } from "../types/interfaces";
import { getExpenses } from "../data/expenses.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "../data/auth.server";

export default function ExpensesLayout() {
  const expenses: Expense[] = useLoaderData() as Expense[];
  return (
    <>
      <Outlet />
      <main>
        <section className="my-4 flex justify-center">
          <Link
            to="add"
            className="flex items-center rounded bg-gray-100 p-2 text-blue-500 shadow-md hover:text-blue-700"
          >
            <FaPlus />
            <span className="ml-2">Add Expense</span>
          </Link>
          <a
            href="/expenses/raw"
            className="ml-4 flex items-center rounded bg-gray-100 p-2 text-blue-500 shadow-md hover:text-blue-700"
          >
            <FaDownload />
            <span className="ml-2">Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}
