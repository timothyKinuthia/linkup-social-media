
import React from 'react'

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {

    return (
        <div>
            {
                result < 9 * (page - 1) ? '' : !load && <button onClick={handleLoadMore} className="mt-4 border py-2 px-4 focus:outline-none">Load more</button>
            }
        </div>
    )
}

export default LoadMoreBtn
