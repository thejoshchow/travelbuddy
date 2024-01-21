steps = [
    [
        """
        CREATE TABLE accounts (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            hashed_password VARCHAR(256) NOT NULL
        )
        """,
        """
        DROP TABLE accounts;
        """
    ]
]