steps = [
    [
        """
        CREATE TABLE item_votes (
        vote_id SERIAL PRIMARY KEY NOT NULL,
        item_id INT REFERENCES items(item_id) NOT NULL,
        id INT REFERENCES users(id) NOT NULL
        );
        """,
        """
        DROP TABLE item_votes;
        """
    ]
]