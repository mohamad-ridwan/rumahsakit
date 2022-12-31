import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Input.scss'

function Input({ title, label, placeholder, displayTitle, errorMessage, displayBtn, nameBtn, displayInput, nameInput, value, handleChange, data, displayModal, topModal, clickBtnInput, clickNameMenu, searchMenuInput, clickCloseModal, nameClass, displayWrapp, displayBintangWajib, cursorBtn, displayLabel, borderBtn, cursorInputForm, idInputForm, typeInput, marginBtn, marginInputForm, renderCustomHeader, displayWrappCalendar, idCalendar, selectedCalendar, changeDateOfCalendar, isOpenTanggalKunjungan, selectedDateKunjungan, changeDateKunjungan, filterDateKunjungan, displayLoadBtn, minDateKunjungan, maxDateKunjungan}) {
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
                    cursor: `${cursorBtn}`,
                    border: `${borderBtn}`,
                    margin: `${marginBtn}`
                }}
                    onClick={clickBtnInput}
                >
                    {nameBtn}
                    <i className="fas fa-sort-down"></i>
                    <div className="circle-loading-btn" style={{display: displayLoadBtn}}></div>

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

                {isOpenTanggalKunjungan && (
                    <DatePicker selected={selectedDateKunjungan} onChange={changeDateKunjungan} filterDate={filterDateKunjungan} minDate={minDateKunjungan} maxDate={maxDateKunjungan} inline />
                )}

                <input name={nameInput} value={value} type={typeInput} className="input-form-online-rv" id={idInputForm} style={{
                    display: `${displayInput}`,
                    cursor: `${cursorInputForm}`,
                    margin: marginInputForm
                }}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                <div className="wrapp-calendar" style={{
                    display: displayWrappCalendar
                }}>
                    <DatePicker renderCustomHeader={renderCustomHeader} id={idCalendar} selected={selectedCalendar} onChange={changeDateOfCalendar}/>
                </div>

                <p className="error-message-form-online-rv">
                    {errorMessage}
                </p>
            </div>
        </>
    )
}

export default Input;