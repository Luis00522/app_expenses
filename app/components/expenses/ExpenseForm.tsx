import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import React from "react";
import { Expense } from "~/types/interfaces";
import { useMatches, useParams } from "react-router-dom";

interface ValidationErrors {
  [key: string]: string;
}

const ExpenseForm: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();
  const isSubmitting = navigation.state !== "idle";

  const params = useParams();
  const matches = useMatches();

  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.expenses",
  );

  // Suposem que sempre hi haurà dades. Si no n'hi ha, posem valors per defecte.
  const expenseData = (matchedRoute?.data as Expense[])?.find(
    ({ id }) => id == params.id,
  ) || {
    title: "",
    amount: 0,
    date: today,
  };

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: new Date(expenseData.date).toISOString().slice(0, 10),
      }
    : {
        title: "",
        amount: 0,
        date: today,
      };

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="flex flex-col rounded-lg bg-gray-100 p-6 shadow-md"
      id="expense-form"
      //onSubmit={submitHandler}
    >
      <p className="mb-4">
        <label
          htmlFor="title"
          className="mb-2 block font-semibold text-gray-700"
        >
          Expense Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          maxLength={30}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <div className="form-row mb-4 flex flex-col md:flex-row md:space-x-4">
        <p className="mb-4 md:mb-0">
          <label
            htmlFor="amount"
            className="mb-2 block font-semibold text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            defaultValue={defaultValues?.amount}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </p>
        <p>
          <label
            htmlFor="date"
            className="mb-2 block font-semibold text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues?.date}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </p>
      </div>
      {validationErrors && (
        <ul className="mb-4 list-inside list-disc text-red-500">
          {Object.values(validationErrors).map((error: string) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
        <Link
          className="text-indigo-500 hover:underline"
          prefetch="none"
          //to="/expenses" // També podem posar ".." ja que això fa que vagi a la ruta superior, com quan fem cd ..
          to=".."
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
};

export default ExpenseForm;
