import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = ({ id, title, date, time, image }) => {

    const [remaining, setRemaining] = useState('')
    const [isPast, setIsPast] = useState(false)

    useEffect(() => {
        const calculateRemaining = () => {
            const eventDate = new Date(`${date} ${time}`)
            const now = new Date()
            const diff = eventDate - now

            if (diff < 0) {
                setIsPast(true)
                const absDiff = Math.abs(diff)
                const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))
                setRemaining(`Event passed ${days}d ${hours}h ${minutes}m ago`)
            } else {
                setIsPast(false)
                const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                setRemaining(`${days}d ${hours}h ${minutes}m remaining`)
            }
        }

        calculateRemaining()
        const interval = setInterval(calculateRemaining, 60000)
        return () => clearInterval(interval)
    }, [date, time])

    return (
        <article className={`event-information ${isPast ? 'event-past' : ''}`}>
            <img src={image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                    <p id={`remaining-${id}`} className={isPast ? 'past-label' : 'future-label'}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event