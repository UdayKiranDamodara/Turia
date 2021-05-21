import { createContext, useState } from "react";

export const PositionContext = createContext()

const PositionContextProvider = (props) => {
    const [position, setPosition] = useState({x: 0, y: -250 })

    return(
        <PositionContext.Provider value={[position, setPosition]}>
            {props.children}
        </PositionContext.Provider>
    )
}

export default PositionContextProvider