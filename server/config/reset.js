import dotenv from 'dotenv'
dotenv.config()

import { pool } from './database.js'

const createTables = async () => {
    const createLocationsTable = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(200) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image VARCHAR(500)
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            date VARCHAR(50) NOT NULL,
            time VARCHAR(50) NOT NULL,
            image VARCHAR(500),
            location_id INT REFERENCES locations(id)
        );
    `

    const seedLocations = `
        INSERT INTO locations (name, address, city, state, zip, image) VALUES
        ('Echo Lounge', '551 Flat Shoals Ave SE', 'Atlanta', 'GA', '30316', 'https://images.unsplash.com/photo-1501386761578-eaa54b915c37?w=800'),
        ('House of Blues', '1055 Elliott Ave W', 'Seattle', 'WA', '98119', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'),
        ('The Pavilion', '2407 N Harbor Dr', 'San Diego', 'CA', '92101', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800'),
        ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800');
    `

    const seedEvents = `
        INSERT INTO events (title, date, time, image, location_id) VALUES
        ('Jazz Night', '2025-08-15', '08:00 PM', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800', 1),
        ('Indie Rock Fest', '2025-09-01', '07:00 PM', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800', 1),
        ('Open Mic Night', '2025-07-20', '06:00 PM', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800', 1),
        ('Blues Brothers Tribute', '2025-08-22', '09:00 PM', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', 2),
        ('Electronic Dance Night', '2025-09-10', '10:00 PM', 'https://images.unsplash.com/photo-1571266028027-e4a1c5b8c421?w=800', 2),
        ('Acoustic Sessions', '2025-07-28', '05:00 PM', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800', 2),
        ('Summer Concert Series', '2025-08-05', '07:30 PM', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', 3),
        ('Hip Hop Showcase', '2025-09-15', '08:00 PM', 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800', 3),
        ('Classical Evening', '2025-07-25', '06:30 PM', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800', 3),
        ('NBA Finals Watch Party', '2025-08-30', '07:00 PM', 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800', 4),
        ('Country Music Night', '2025-09-20', '08:00 PM', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 4),
        ('New Years Eve Bash', '2025-12-31', '09:00 PM', 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800', 4);
    `

    await pool.query(createLocationsTable)
    await pool.query(seedLocations)
    await pool.query(seedEvents)
    console.log('Tables created and seeded successfully!')
    pool.end()
}

createTables()