steps = [
    [
        """
        CREATE TABLE accounts (
            user_id REFERENCES users ON DELETE CASCADE NOT NULL,
            username VARCHAR(100),
            hashed_password VARCHAR(256)
        )
        """,
        """
        DROP TABLE accounts;
        """
    ]
]