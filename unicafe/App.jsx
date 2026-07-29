import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.rating}</button>
  )
}
const StatisticLine = (props) => {
  if (props.text === "positive")
    return (
    <tr>
      <td>{props.text}</td> <td>{props.value}%</td>
    </tr>  
    ) 
  return(
    <tr>
     <td>{props.text}</td> <td>{props.value}</td>
    </tr>
  )

}

const Stats = (props) => {
  console.log(props)
  if (props.all === 0)
    return
  
  return(
    <table>
    <StatisticLine text="good" value={props.good}/>
    <StatisticLine text="neutral" value={props.neutral}/>
    <StatisticLine text="bad" value={props.bad}/>
    <StatisticLine text="all" value={props.all}/>
    <StatisticLine text="average" value={props.score/props.all}/>
    <StatisticLine text="positive" value={props.good/props.all*100}/>
    </table>
  )
}


const NoFeedback = (props) => {
  if (props.all === 0)
    return(
      <p>No feedback given</p>
    )
  return

}
const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setscore] = useState(0)
  
  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={
        () => {
        setGood(good + 1); 
        setscore(score + 1); 
        setAll(all + 1)}} 
        rating = "good" 
        all={all}/>

      <Button onClick={
        () => {
        setNeutral(neutral + 1); 
        setAll(all + 1)}} 
        rating = "neutral" 
        all={all}/>

      <Button onClick={
        () => {
        setBad(bad + 1); 
        setscore(score - 1); 
        setAll(all + 1)}} 
        rating = "bad" 
        all={all}/>  

      <Header text="statistics"/>
      <>
      <Stats good={good} neutral={neutral} bad={bad} all={all} score={score}/>
      </>
      <NoFeedback all={all}/>
    </div>

  )
}

export default App