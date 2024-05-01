import {Component} from 'react'

import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    list: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {list} = this.state
    const updatedList = list.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({
      list: updatedList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newtransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newtransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {list} = this.state
    let expensesAmount = 0

    list.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {list} = this.state
    let incomeAmount = 0
    list.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {list} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    list.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, list} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="heading">Hi,Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div>
          <form className="transaction-form" onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label className="tilecon" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={this.onChangeTitleInput}
              id="title"
              placeholder="TITEL"
            />
            <label className="tilecon" htmlFor="amount">
              Amount
            </label>
            <input
              type="text"
              value={amountInput}
              onChange={this.onChangeAmountInput}
              id="amount"
              placeholder="Amount"
            />
            <label className="tilecon" htmlFor="select">
              TYPE
            </label>
            <select
              id="select"
              className="input"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <div className="historycon">
            <h1>History</h1>
            <div className="table">
              <ul className="tr">
                <li>
                  <p className="dd">Title</p>
                  <p className="dd">Amount</p>
                  <p className="dd">Type</p>
                </li>
                {list.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    trasactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
// Write your code here
