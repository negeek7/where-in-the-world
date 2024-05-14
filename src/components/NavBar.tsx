import DarkModeToggle from './DarkModeToggle'

function NavBar() {
  return (
    <div className="py-2 sm:py-6 px-6 flex justify-between items-center dark:bg-dark-nav-color shadow-[0px_2px_4px_0px_#0000000E]">
      <h1 className="text-lg sm:text-2xl z-1 font-semibold dark:text-white">Where in the world?</h1>
      <DarkModeToggle />
    </div>
  )
}

export default NavBar