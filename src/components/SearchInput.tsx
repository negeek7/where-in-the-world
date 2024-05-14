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
        console.log("this ran")
        handleSearchValue(inputText)
    }

    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, "ADAD")
        setInputText(e.target.value)
    }


  return (
    <div className="flex gap-2 items-center px-2">
        <MagnifyingGlass size={20} className="text-gray-800"/>
        <input 
            placeholder={placeholder}
            type="text"
            className="p-2 w-72 focus:ring-0 outline-none"
            value={inputText}
            onChange={handleInputText}
        />
    </div>
  )
}

export default SearchInput