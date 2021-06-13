
import React from 'react'

const Avatar = ({src, alt, width, height}) => {
    return (
        <div>
            <img className={`w-${width} h-${height} object-cover rounded-full ring-1 ring-lightblue-400`} src={src} alt={alt} />
        </div>
    )
}

export default Avatar;
