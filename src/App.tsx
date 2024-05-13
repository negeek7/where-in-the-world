import './App.css'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  return (
    <div className="border-2 border-red-700 dark:bg-slate-900 dark:text-gray-300">
      Main Page
      <DarkModeToggle />
    </div>
  )
}

export default App
