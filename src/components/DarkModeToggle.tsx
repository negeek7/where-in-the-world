import { Moon, Sun } from "@phosphor-icons/react"
import { useState } from "react"

function DarkModeToggle() {

  const [darkMode, setDarkMode] = useState(false)

  function toggleDarkMode() {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      <button onClick={toggleDarkMode} className="border-none !outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg p-2 dark:text-white">
        <div className="flex items-center gap-2">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? 'Light Mode' : 'Dark Mode'}
        </div>
      </button>
    </>
  )
}

export default DarkModeToggle