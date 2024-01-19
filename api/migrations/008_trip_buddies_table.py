steps = [
    [
        """
        CREATE TABLE buddies (
            trip_id INT REFERENCES trips ON DELETE CASCADE NOT NULL,
            user_id INT REFERENCES users ON DELETE CASCADE NOT NULL,
            buddy BOOLEAN DEFAULT FALSE
        );
        """,
        """
        DROP TABLE buddies;
        """
    ]
]
