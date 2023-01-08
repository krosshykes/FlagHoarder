import React from 'react'
import './Card.css'

const Card = ({ content }) => {
    return (
        <div className='card-grid'>
            <div className='card'>
                <div className='card-body'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Card