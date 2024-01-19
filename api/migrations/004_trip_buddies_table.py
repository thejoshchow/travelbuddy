steps = [
    [

        """
        CREATE TABLE buddies (
            trip_id INT REFERENCES trips(trip_id),
            user_id INT REFERENCES users(id),
            buddy BOOLEAN
        );
        """,
        """
        DROP TABLE buddies;
        """

    ]
]
