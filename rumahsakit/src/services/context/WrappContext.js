import { createContext } from "react";
import PathProvider from "./path/Path";

const WrappContext = createContext();

const WrappContextProvider = ({ children }) => {
    return (
        <PathProvider>
            <WrappContext.Provider>
                {children}
            </WrappContext.Provider>
        </PathProvider>
    )
}

export default WrappContextProvider;