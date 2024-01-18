steps = [
    [
        """
        CREATE TABLE item_categories (
            category_id SERIAL PRIMARY KEY NOT NULL,
            trip_id INT REFERENCES trips (trip_id),
            category_name VARCHAR(50) NOT NULL
        );
        """,
        """
        DROP TABLE item_categories;
        """
    ],
    [
        """
        INSERT INTO item_categories (category_name)
        VALUES
            ('accommodations'),
            ('transportation'),
            ('dining'),
            ('activities'),
            ('miscellaneous');
        """,
        """
        """
    ]
]