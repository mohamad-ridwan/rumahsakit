import React from 'react'
import './IndicatorAnswer.scss'

function IndicatorAnswer({ answer, clickAnswer, classAnswer, bgColorAnswer, borderAnswer, displayWrapp }) {
    return (
        <>
            <div className={`column-group-indicator-answer`} style={{
                display: `${displayWrapp}`
            }}>
                <div className={`indicator-online-rv ${classAnswer}`}
                    onClick={clickAnswer}
                    style={{
                        backgroundColor: `${bgColorAnswer}`,
                        border: `${borderAnswer}`
                    }}
                >

                </div>
                <p className="answer-online-rv"
                    onClick={clickAnswer}
                >
                    {answer}
                </p>
            </div>
        </>
    )
}

export default IndicatorAnswer;