steps = [
    [
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
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