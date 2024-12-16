import Modal from "../components/util/Modal";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { useNavigate } from "@remix-run/react";
// import { getExpense } from "../data/expenses.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export default function ExpensesAddPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // No volem navegar amb Link en aquest cas ("navigate programmatically")No fem servir Link perquè
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({ params }: LoaderFunctionArgs) {
//   const expenseId = params.id;
//   if (!expenseId) {
//     throw new Error("Expense ID is required");
//   }
//   const expense = await getExpense(expenseId);
//   return expense;
// }
