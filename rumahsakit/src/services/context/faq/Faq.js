import React, { createContext, useState } from 'react'

export const FaqContext = createContext();

const FaqProvider = ({ children }) => {

    const [titleMenuFaq, setTitleMenuFaq] = useState()
    const [indexActiveFaqGlobal, setIndexActiveFaqGlobal] = useState(0)

    return (
        <FaqContext.Provider value={[titleMenuFaq, setTitleMenuFaq, indexActiveFaqGlobal, setIndexActiveFaqGlobal]}>
            {children}
        </FaqContext.Provider>
    )
}

export default FaqProvider;