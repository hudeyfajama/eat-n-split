import { useReducer } from "react";

export function BankAccount() {
  const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
    isLoanActive: false,
  };

  const [balance, dispatch] = useReducer(reducer, initialState);

  function reducer(balance, action) {
    switch (action.type) {
      case "openAccount":
        return { ...balance, balance: 500, isActive: true };
      case "deposit":
        return { ...balance, balance: balance.balance + 50 };
      case "withdraw":
        return { ...balance, balance: balance.balance - 50 };
      case "loanRequest":
        return {
          ...balance,
          balance: balance.balance + 5000,
          loan: balance.loan + 5000,
          isLoanActive: true,
        };
      case "payLoan":
        return { ...balance, loan: balance.loan - 5000, isLoanActive: false };
      case "closeAccount":
        return initialState;
      default:
        return balance;
    }
  }

  return (
    <div className="account">
      <h2>UserReducer Bank Account</h2>
      <p>Current balance: ${balance.balance}</p>
      <p>Loan: ${balance.loan}</p>

      <div className="account-buttons">
        <Button
          dispatch={dispatch}
          type="openAccount"
          disabled={balance.isActive}
        >
          Open Account
        </Button>
        <Button dispatch={dispatch} type="deposit" disabled={!balance.isActive}>
          Deposit
        </Button>
        <Button
          dispatch={dispatch}
          type="withdraw"
          disabled={!balance.isActive}
        >
          Withdraw
        </Button>
        <Button
          dispatch={dispatch}
          type="loanRequest"
          disabled={!balance.isActive || balance.isLoanActive}
        >
          Loan Request
        </Button>
        <Button
          dispatch={dispatch}
          type="payLoan"
          disabled={!balance.isActive || !balance.isLoanActive}
        >
          Pay Loan
        </Button>
        <Button
          dispatch={dispatch}
          type="closeAccount"
          disabled={!balance.isActive}
        >
          Close Account
        </Button>
      </div>
    </div>
  );
}

function Button({ dispatch, type, children, disabled }) {
  return (
    <button onClick={() => dispatch({ type })} disabled={disabled}>
      {children}
    </button>
  );
}
