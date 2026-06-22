import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    const filteredEvents = filter === 'all' ? events : events.filter(event => event.location_id === parseInt(filter))

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>All Events</h2>
                    <div className='filter-buttons'>
                        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                        <button onClick={() => setFilter('1')} className={filter === '1' ? 'active' : ''}>Echo Lounge</button>
                        <button onClick={() => setFilter('2')} className={filter === '2' ? 'active' : ''}>House of Blues</button>
                        <button onClick={() => setFilter('3')} className={filter === '3' ? 'active' : ''}>The Pavilion</button>
                        <button onClick={() => setFilter('4')} className={filter === '4' ? 'active' : ''}>American Airlines Center</button>
                    </div>
                </div>
            </header>

            <main>
                {
                    filteredEvents && filteredEvents.length > 0 ? filteredEvents.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events