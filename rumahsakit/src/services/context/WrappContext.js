import { createContext } from "react";
import FaqProvider from "./faq/Faq";
import PathProvider from "./path/Path";

const WrappContext = createContext();

const WrappContextProvider = ({ children }) => {
    return (
        <FaqProvider>
            <PathProvider>
                <WrappContext.Provider>
                    {children}
                </WrappContext.Provider>
            </PathProvider>
        </FaqProvider>
    )
}

export default WrappContextProvider;