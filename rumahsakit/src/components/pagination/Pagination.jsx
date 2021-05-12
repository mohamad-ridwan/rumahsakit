import React, { useState } from 'react'
import './Pagination.scss'

function Pagination({ perPage, totalData, clickBtn, indexPaginate }) {

    const pageNumber = []

    for (let i = 1; i < Math.ceil(totalData / perPage + 1); i++) {
        pageNumber.push(i)
    }

    function mouseEnter(number) {
        const element = document.getElementsByClassName('btn-paginate')

        for (let i = 0; i < element.length; i++) {
            element[i].style.backgroundColor = '#f8eff2'
            element[i].style.color = '#b04579'
        }
        element[indexPaginate - 1].style.backgroundColor = '#b04579'
        element[indexPaginate - 1].style.color = '#fff'

        element[number].style.backgroundColor = '#b04579'
        element[number].style.color = '#fff'
    }

    function mouseLeave() {
        const element = document.getElementsByClassName('btn-paginate')

        for (let i = 0; i < element.length; i++) {
            element[i].style.backgroundColor = '#f8eff2'
            element[i].style.color = '#b04579'
        }

        element[indexPaginate - 1].style.backgroundColor = '#b04579'
        element[indexPaginate - 1].style.color = '#fff'
    }

    return (
        <>
            <div className="wrapp-pagination">
                {pageNumber.map((e, i) => {

                    return (
                        <li key={i} className={'btn-paginate'} onClick={() => {
                            clickBtn(e)
                        }} style={{
                            backgroundColor: `${e === indexPaginate ? '#b04579' : '#f8eff2'}`,
                            color: `${e === indexPaginate ? '#fff' : '#b04579'}`
                        }}
                            onMouseEnter={() => mouseEnter(i)}
                            onMouseLeave={mouseLeave}
                        >
                            {e}
                        </li>
                    )
                })}
            </div>
        </>
    )
}

export default Pagination;
