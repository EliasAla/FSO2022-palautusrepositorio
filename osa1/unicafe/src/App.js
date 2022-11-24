import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good"/>
      <Button handleClick={increaseNeutral} text="neutral"/>
      <Button handleClick={increaseBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <th scope="row">{text}</th> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  const calcAverage = (good + (-Math.abs(bad)) / 2)
  const calcPositive= ((good / total) * 100)
  if (total > 0) {
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={calcAverage}/>
          <StatisticLine text="positive" value={calcPositive}/>
        </tbody>
      </table>
    </div>
  ) } else {
    return (
      <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }
}

export default App