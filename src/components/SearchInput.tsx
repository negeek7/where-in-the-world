import { MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

interface InputProps {
    placeholder: string,
    handleSearchValue: Function
}

function SearchInput({placeholder, handleSearchValue}: InputProps) {

    const [inputText, setInputText] = useState('')
    const [timeoutId, setTimeoutId] = useState<number>()
    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        if(!initialRender){
            clearTimeout(timeoutId)
            setTimeoutId(setTimeout(() => {
                performSearch()
            }, 2000))
        } else {
            setInitialRender(false)
        }
    }, [inputText])

    const performSearch = () => {
        handleSearchValue(inputText)
    }

    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }


  return (
    <div className="flex gap-2 items-center px-2 shadow-lg bg-black bg-opacity-0 rounded-md w-5/6 sm:w-auto">
        <MagnifyingGlass size={20} className="dark:text-white text-gray-800"/>
        <input 
            placeholder={placeholder}
            type="text"
            className="p-2 w-72 focus:ring-0 outline-none dark:bg-dark-main-color dark:text-white"
            value={inputText}
            onChange={handleInputText}
            onInput={handleInputText}
        />
    </div>
  )
}

export default SearchInput