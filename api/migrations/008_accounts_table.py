steps = [
    [
        """
        CREATE TABLE accounts (
            user_id INT REFERENCES users ON DELETE CASCADE NOT NULL,
            PRIMARY KEY (user_id),
            username VARCHAR(100),
            hashed_password VARCHAR(256)
        )
        """,
        """
        DROP TABLE accounts;
        """
    ]
]