steps = [
    [
        """
        CREATE TABLE itinerary_items (
            item_id INT REFERENCES items ON DELETE CASCADE NOT NULL,
            PRIMARY KEY (item_id),
            start_date DATE,
            end_date DATE,
            start_time TIME,
            end_time TIME,
            address VARCHAR(200),
            notes TEXT
        );
        """,
        """
        DROP TABLE itenerary_items;
        """
    ]
]