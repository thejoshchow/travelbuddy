steps = [
    [
        """
        CREATE TABLE item_votes (
            vote_id SERIAL PRIMARY KEY NOT NULL,
            item_id INT REFERENCES items ON DELETE CASCADE NOT NULL,
            user_id INT REFERENCES users ON DELETE CASCADE NOT NULL
        );
        """,
        """
        DROP TABLE item_votes;
        """
    ]
]