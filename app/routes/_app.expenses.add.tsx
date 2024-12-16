import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { ActionFunctionArgs } from "@remix-run/node";
import { addExpense } from "../data/expenses.server";
import { validateExpenseInput } from "../data/validation.server";


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

export async function action({ request }: ActionFunctionArgs) {
  const formdata = await request.formData();

  const expenseData = {
    title: formdata.get("title") as string,
    amount: parseFloat(formdata.get("amount") as string),
    date: new Date(formdata.get("date") as string),
  };

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  // console.log(formdata, expenseData);

  await addExpense(expenseData);

  return redirect("/expenses");
}
