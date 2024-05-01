// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table">
      <p className="inside-lists">{title}</p>
      <p className="inside-lists">Rs {amount}</p>
      <p className="inside-lists">{type}</p>
      <div className="del-container">
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteTransaction}
          data-testid="delete"
        >
          <img
            className="delimage"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
