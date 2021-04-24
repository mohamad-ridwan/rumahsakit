import React from 'react'
import './Headers.scss'

function Headers({ header1, arrow, header2, cursor1, colorHeader2, cursor2, arrow2, header3, colorHeader3, cursor3, click1, click2 }) {
    return (
        <>
            <div className="wrapp-headers">
                <button className="btn-headers-group" style={{
                    cursor: `${cursor1}`
                }}
                    onClick={click1}
                >
                    {header1} <p className="arrow">
                        {arrow}
                    </p>
                </button>

                <button className="btn-headers-group" style={{
                    color: `${colorHeader2}`,
                    cursor: `${cursor2}`
                }}
                    onClick={click2}
                >
                    {header2}<p className="arrow">
                        {arrow2}
                    </p>
                </button>

                <button className="btn-headers-group" style={{
                    color: `${colorHeader3}`,
                    cursor: `${cursor3}`
                }}>
                    {header3}
                </button>
            </div>
        </>
    )
}

export default Headers;