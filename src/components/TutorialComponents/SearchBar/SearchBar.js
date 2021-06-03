import React, { useState } from "react"
import "./SearchBar.css"


const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("")

    const handleInputChange = (event) => {
        setSearchValue(event.target.value)
    }

    const shouldDisplayButton = searchValue.length > 0

    const filteredNames = props.items.filter((name) => {
        return name.includes(searchValue)
    })

    return (
        <div>
            <input type="text" value={searchValue} onChange={handleInputChange} />

            {shouldDisplayButton && <button>Clear</button>}

            {filteredNames.map((name) => {
                return <li key={name}>{name}</li>
            })}
        </div>
    )
}

export default SearchBar