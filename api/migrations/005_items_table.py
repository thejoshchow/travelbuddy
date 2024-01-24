steps = [
    [
        """
        CREATE TABLE items(
            item_id SERIAL PRIMARY KEY NOT NULL,
            trip_id INT REFERENCES trips ON DELETE CASCADE NOT NULL,
            author INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
            category_id INT DEFAULT 5 REFERENCES item_categories ON DELETE SET DEFAULT,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            scheduled BOOLEAN,
            url VARCHAR(200),
            picture_url VARCHAR(200),
            cost NUMERIC(10,2),
            cost_per_person BOOLEAN,
            notes TEXT
        );
        """,
        """
        DROP TABLE items;
        """,
    ]
]
