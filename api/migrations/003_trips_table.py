steps = [
    [
        """
        CREATE TABLE trips (
            trip_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(20) NOT NULL,
            location VARCHAR(100) NOT NULL,
            start_date DATE,
            end_date DATE,
            picture_url VARCHAR (200),
            owner INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL
        );
        """,
        """
        DROP TABLE trips;
        """,
    ]
]
