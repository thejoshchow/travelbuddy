steps = [
    [
        """
        CREATE TABLE accounts (
            user_id INT REFERENCES users ON DELETE CASCADE NOT NULL,
            PRIMARY KEY (user_id),
            username VARCHAR(100)NOT NULL,
            hashed_password VARCHAR(256) NOT NULL
        )
        """,
        """
        DROP TABLE accounts;
        """
    ]
]