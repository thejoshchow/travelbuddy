steps = [
    [
        """
        CREATE TABLE users (
            user_id INT REFERENCES accounts ON DELETE CASCADE NOT NULL,
            PRIMARY KEY (user_id),
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(10),
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            display_name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(200)
        );
        """,
        """
        DROP TABLE users;
        """
    ]
]