export interface Expense {
    id?: string;
    title: string;
    amount: number;
    date: Date;
  }
  
  export type ValidationErrors = {
    title?: string;
    amount?: string;
    date?: string;
  };
  
  export interface SignupInput {
    email: string;
    password: string;
  }
  
