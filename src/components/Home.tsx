import CountryCard from "./CountryCard"


// Interface is used to define structure of an object, 
// in this case for props.
interface propsInfo{
    data: Array<Object>
}

function Home({data}: propsInfo) {
  return (
    <div className="flex flex-row flex-wrap border-2 h-dvh p-14 gap-12 justify-center">
        {
            data.map(item => (
                <CountryCard country={item}/>
            ))
        }
    </div>
  )
}

export default Home