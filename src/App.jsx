import './App.css';
import { useState } from "react"
import BasicTextFields from "./components/InputFields.jsx"
import "./styles/Styles.css"
import Button from "./components/Button.jsx"

function App() {

  const [uniqSols, setUniqSols] = useState([])
  const [form, setForm] = useState({
    nums: "",
    targetNum: ""
  })

  const [bool, setBool] = useState(false)

  const sols = []
  const uniqSolsCheck = []

  const firstInput = {
    name: "Enter numbers",
    form: form,
    val: "nums",
    updateFunction: setForm,
  }

  const secondInput = {
    name: "Enter target number",
    form: form,
    val: "targetNum",
    updateFunction: setForm,
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
  return (
    <div className="container">
    {!bool && <div className="inner-container">
      <h3>Enter numbers as a single string</h3>
      <p>Eg 1234</p>
      <BasicTextFields props={firstInput} />
      <h3>Enter target number</h3>
      <p>Eg 10</p>
      <BasicTextFields props={secondInput} />

      <Button name="Submit" handleFunction={handleCalc} />

      {bool && <p>Solutions are</p>}
      {bool && uniqSols.map(e => (<p key={e}>{e}</p>))}
    </div>}

    {bool && <div>
      {bool && <p>Solutions are</p>}
      {bool && uniqSols.map(e => (<p key={e}>{e}</p>))}

      <Button name="Reset" handleFunction={handleReset} />
    </div>}
    </div>
  );

}

export default App;
