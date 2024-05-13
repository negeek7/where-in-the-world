function DarkModeToggle() {


  function toggleDarkMode(){
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      <button onClick={toggleDarkMode}>Dark Mode</button>
    </>
  )
}

export default DarkModeToggle