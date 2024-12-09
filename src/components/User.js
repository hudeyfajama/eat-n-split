export function User({
  user,
  isLoading,
  onSelect,
  isSelected,
  balance,
  whoIsPaying,
  yourExpense
}) {
  const { name, image } = user;

  return (
    <div className={`user ${isSelected ? "user-selected" : ""}`}>
      <div className="user-header">
        {isLoading ? (
          <div className="user-icon" style={{ backgroundColor: "#e0e0e0" }} />
        ) : (
          <img src={image} alt="User" className="user-icon" />
        )}
        <div className="user-info">
          <h2>{name}</h2>
          <p>
            {balance === 0 
              ? `You and ${name} are even`
              : whoIsPaying === name 
                ? `You owe ${name} $${yourExpense}` 
                : `${name} owes you $${balance}`}
          </p>
        </div>
        <Button onClick={() => onSelect(user)}>
          <span>{isSelected ? "Close" : "Select"}</span>
        </Button>
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
