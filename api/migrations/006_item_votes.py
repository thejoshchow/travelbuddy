steps = [
    [
        """
        CREATE TABLE item_votes (
            item_id INT REFERENCES items ON DELETE CASCADE NOT NULL,
            user_id INT REFERENCES users ON DELETE CASCADE NOT NULL,
            PRIMARY KEY (item_id, user_id)
        );
        """,
        """
        DROP TABLE item_votes;
        """,
    ]
]
