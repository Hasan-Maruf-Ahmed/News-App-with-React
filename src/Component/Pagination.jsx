import React from 'react'

export const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
    const disablePrev = currentPage === 1;
    const disableNext = currentPage === totalPages;
  return (
    <div className='join flex justify-center mt-4'>
        <button onClick={onPrev} className={`join-item btn ${disablePrev ? "btn-disabled" : ""}`}>Previous</button>
        <button className='join-item btn btn-disabled no-animation'>page {currentPage} of {totalPages}</button>
        <button onClick={onNext} className={`join-item btn ${disableNext ? "btn-disabled" : ""}`}>Next</button>
    </div>
  )
}
