import ReactDOM from "react-dom"
import "./App.css"
const rootEl = document.getElementById("root")

let states = {}

function _getM2(initialValue, key) {
  if (states[key] === undefined) {
    states[key] = initialValue
  }
  return states[key]
}

function _setM2(v, key) {
  states[key] = v
  ReactDOM.render(<Title />, rootEl)
}

let m = undefined
function _getM(initialValue) {
  if (m === undefined) {
    m = initialValue
  }
  return m
}

function _setM(value) {
  m = value
  ReactDOM.render(<App />, rootEl)
}

let prev
function _onM(callback, value) {
  if (value === prev) return
  callback()
  prev = value
}

function Changed({ count }) {
  let flag = 'N'
  _onM(() => { flag = "Y" }, count)
  return <span>{flag}</span>
}

// function Title() {
//   let countH = _getM2(0, 'H')
//   let countW = _getM2(0, 'W')
//   const onClickH = () => {
//     console.log('clickedH', countH)
//     countH = countH + 1
//     _setM2(countH, 'H')
//   }
//   const onClickW = () => {
//     console.log('clickedW', countW)
//     countW = countW + 1
//     _setM2(countW, 'W')
//   }
//   console.log('updatedH', countH)
//   console.log('updatedW', countW)
//   return (
//     <>
//       <button onClick={onClickH}>+</button>
//       <h1>Hello+{countH}</h1>
//       <Changed count={countH} />
//       <br />
//       <button onClick={onClickW}>+</button>
//       <h1>World+{countW}</h1>
//     </>
//   )
// }

const Nav = ({ items, selected, onSelect }) => {
  const isActive = item => item.key === selected
  const onClick = item => () => {
    onSelect(item.key)
  }

  return (
    <ul>
      {items.map(item => (
        <li
          key={item.key}
          className={isActive(item) ? 'active' : ''}
        >
          <button
            disabled={item.disabled}
            onClick={onClick(item)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}

const menus = [
  { key: 'home', label: 'Home' },
  { key: 'product', label: 'Product' },
  { key: 'about', label: 'About' },
  { key: 'secure', label: 'Secure', disabled: true },
]
const Route = ({ selected }) => {
  return (
    <div>
      {selected === 'home' && <Home />}
      {selected === 'product' && <Product />}
    </div>
  )
}

const Home = () => <h1>Home page</h1>
const Product = () => <h1>Product page</h1>

function Title() {
  const count = _getM(0)
  _onM(() => {
    fetch('./giveMeANumber').then(({ data = 100 }) => {
      _setM(data)
    })
  }, 0)
  console.log('u')
  return <h1>{count}</h1>
}

function App() {
  const selected = _getM("home")
  return (
    <div>
      <Nav
        items={menus}
        selected={selected}
        onSelect={_setM}
      />
      <Route selected={selected} />
    </div>
  )
}

export default App
