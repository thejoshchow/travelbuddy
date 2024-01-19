steps = [
    [

        """
        CREATE TABLE buddies (
            trip_id INT REFERENCES trips(trip_id),
            id INT REFERENCES users(id),
            buddy BOOLEAN
        );
        """,
        """
        DROP TABLE buddies;
        """

    ]
]
