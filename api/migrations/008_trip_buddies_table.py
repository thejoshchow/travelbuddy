steps = [
    [
        """
        CREATE TABLE buddies (
            trip_id INT REFERENCES trips ON DELETE CASCADE NOT NULL,
            user_id INT REFERENCES users ON DELETE CASCADE NOT NULL,
            buddy BOOLEAN DEFAULT FALSE,
            admin BOOLEAN DEFAULT FALSE,
            PRIMARY KEY (trip_id, user_id)
        );
        """,
        """
        DROP TABLE buddies;
        """,
    ]
]
