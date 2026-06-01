import './App.css';
import { useState } from "react"
import Input from "./components/Input.jsx"
import "./styles/Styles.css"
import Button from "./components/Button.jsx"
import ErrorBox from './components/ErrorBox.jsx'

function App() {
  const [uniqSols, setUniqSols] = useState([])
  const sols = []
  const uniqSolsCheck = []
  const [bool, setBool] = useState(false)

  const [strHasErr, setStrHasErr] = useState({
    bool: false,
    errMsg: "",
  })
  const [targHasErr, setTargHasErr] = useState({
    bool: false,
    errMsg: "",
  })
  const [form, setForm] = useState({
    nums: "",
    targetNum: ""
  })
  const firstInput = {
    name: "Enter numbers",
    form: form,
    val: "nums",
    updateFunction: setForm,
    hasErr: strHasErr.bool,
  }
  const secondInput = {
    name: "Enter target number",
    form: form,
    val: "targetNum",
    updateFunction: setForm,
    hasErr: targHasErr.bool,
  }

  /////////////////////////////////////////////////////////////
  function getUniqPerms(){
    let arr = form.nums.split("")
    let res = [[]]
    for (let num of arr) {
      let temp = []
      for (let arr of res) {
        for (let i = 0; i <= arr.length; i++) {
          const newArr = [...arr]
          newArr.splice(i, 0, num)
          temp.push(newArr)
        }
      }
      res = temp
    }
    res = res.map(inner => inner.map(Number))

    res = Array.from(
      new Map(res.map(a => [JSON.stringify(a), a])).values()
    );

    return res
  }

  /////////////////////////////////////////////////////////////
  function recurse(arr, score, pos, curSol) {
    if (pos === arr.length) {
      if (score === Number(form.targetNum)) {
        sols.push(curSol)
      }
      return
    }

    // Add
    recurse(arr, score + arr[pos], pos + 1, curSol + ` +${arr[pos]}`)
    // Subtract
    recurse(arr, score - arr[pos], pos + 1, curSol + ` -${arr[pos]}`)
    // Multiply
    recurse(arr, score * arr[pos], pos + 1, curSol + ` *${arr[pos]}`)
    // Divide
    if (arr[pos] !== 0) {
      recurse(arr, score / arr[pos], pos + 1, curSol + ` /${arr[pos]}`)
    }

    return
  }

  /////////////////////////////////////////////////////////////
  function getUniqSols() {
    for (let el of sols) {
//       console.log(typeof(el))
      let arrCurSol = el.split(" ")
      arrCurSol[0] = `+${arrCurSol[0]}`
      arrCurSol = arrCurSol.sort()

      const exists = uniqSolsCheck.some(
        inner => inner.length === arrCurSol.length &&
        inner.every((val, i) => val === arrCurSol[i])
      );

      if (!exists) {
        uniqSolsCheck.push(arrCurSol)
        uniqSols.push(el.replace(/ /g,""))
        setUniqSols(uniqSols)
      }
    }
  }

  /////////////////////////////////////////////////////////////
  function handleCalc() {
    setStrHasErr({
      bool: false,
      errMsg: "",
    })

    setTargHasErr({
      bool: false,
      errMsg: "",
    })

    if (hasErrors()) {
      return
    }

    setBool(true)
    const res = getUniqPerms()

    for (let el of res) {
      let score = el[0]
      let pos = 1
      let curSol = `${el[0]}`
      recurse(el, score, pos, curSol)
    }

    getUniqSols()

  }

  /////////////////////////////////////////////////////////////
  function handleReset() {
    setBool(false)
    setUniqSols([])
    let updateForm = {
      nums: "",
      targetNum: ""
    }
    setForm(updateForm)
  }

  /////////////////////////////////////////////////////////////
  function hasErrors() {
    let returnVal = false

    // Potential errors for string
    if (form.nums.length === 0) {
      const err = {
        bool: true,
        errMsg: "You must enter a string of numbers",
      }
      setStrHasErr(err)
      returnVal = true
    } else if (!/^\d+$/.test(form.nums)) {
      const err = {
        bool: true,
        errMsg: "The string should only contain integers",
      }
      setStrHasErr(err)
      returnVal = true
    } else if (form.nums.length === 1) {
      const err = {
        bool: true,
        errMsg: "The string length is too short",
      }
      setStrHasErr(err)
      returnVal = true
    }

    // Potential errors for target number
    if (form.targetNum.length === 0) {
      const err = {
        bool: true,
        errMsg: "You must enter a target number",
      }
      setTargHasErr(err)
      returnVal = true
    } else if (!/^\d+$/.test(form.targetNum)) {
      const err = {
        bool: true,
        errMsg: "The target number must be an integer",
      }
      setTargHasErr(err)
      returnVal = true
    }

    return returnVal
  }

  /////////////////////////////////////////////////////////////
  return (
    <div className="container">
    {!bool && <div className="inner-container">
      <h1>Train Game Solver</h1>
      <h3>Enter numbers as a single string</h3>
      <p className="examples-style">Eg 1234</p>
      <Input props={firstInput} />
      {strHasErr.bool && <ErrorBox errMsg={strHasErr.errMsg} />}

      <h3>Enter target number</h3>
      <p className="examples-style">Eg 10</p>
      <Input props={secondInput} />
      {targHasErr.bool && <ErrorBox errMsg={targHasErr.errMsg} />}

      <Button name="Submit" handleFunction={handleCalc} />
    </div>}

    {bool && <div className="inner-container">
      <h1>Train Game Solver</h1>
      <h3>Solutions are</h3>
      <div className="sols-container">
        {uniqSols.map(e => (<p key={e}>{e}</p>))}
      </div>
      <Button name="Reset" handleFunction={handleReset} />
    </div>
    }
    </div>
  );

}

export default App;
