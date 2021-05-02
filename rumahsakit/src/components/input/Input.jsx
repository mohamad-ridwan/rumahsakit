import React from 'react'
import { NavLink } from 'react-router-dom'
import './Input.scss'

function Input({ title, label, placeholder, displayTitle, errorMessage, displayBtn, nameBtn, displayInput, nameInput, value, handleChange, data, displayModal, topModal, clickBtnInput, clickNameMenu, searchMenuInput, clickCloseModal, nameClass, displayWrapp, displayBintangWajib, cursorBtn, displayLabel }) {
    return (
        <>
            <div className="wrapp-input-card" style={{
                display: `${displayWrapp}`
            }}>
                <p className="title-form-online-rv" style={{
                    display: `${displayTitle}`
                }}>
                    {title}
                </p>

                <label htmlFor="label" className="label-form-online-rv" style={{
                    display: `${displayLabel}`
                }}>
                    {label} <p className="bintang-wajib"
                        style={{
                            display: `${displayBintangWajib}`
                        }}
                    >*</p>
                </label>

                <button className="btn-form-online-rv" id={'btn-form-online-rv'} style={{
                    display: `${displayBtn}`,
                    cursor: `${cursorBtn}`
                }}
                    onClick={clickBtnInput}
                >
                    {nameBtn}
                    <i className="fas fa-sort-down"></i>

                    <div className="modal-search-input" style={{
                        display: `${displayModal}`,
                        top: `${topModal}`
                    }}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <div className="btn-close-modal-search-input"
                            onClick={clickCloseModal}
                        >

                        </div>

                        <input type="text" className="input-search-menu" autoFocus={'autofocus'}
                            id={'input-search-menu'}
                            onChange={searchMenuInput}
                        />

                        <div className="container-scroll-list-menu">
                            <ul>
                                {data && data.length > 0 ?
                                    data.map((e, i) => {

                                        const join = e.split(' ').join('-')

                                        return (
                                            <li key={e._id}
                                                className={`list-menu-modal-input ${nameClass}`}
                                                id={join}
                                                onClick={() => {
                                                    clickNameMenu(e, i)
                                                }}
                                            >
                                                {e}
                                            </li>
                                        )
                                    }) : (
                                        <div></div>
                                    )}
                            </ul>
                        </div>
                    </div>
                </button>

                <input name={nameInput} value={value} type="text" className="input-form-online-rv" style={{
                    display: `${displayInput}`
                }}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                <p className="error-message-form-online-rv">
                    {errorMessage}
                </p>
            </div>
        </>
    )
}

export default Input;