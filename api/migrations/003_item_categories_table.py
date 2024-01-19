steps = [
    [
        """
        CREATE TABLE item_categories (
  		    category_id SERIAL PRIMARY KEY,
            trip_id INT REFERENCES trips ON DELETE CASCADE,
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