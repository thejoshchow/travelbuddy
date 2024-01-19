steps = [
  [
  
    """
    CREATE TABLE items(
    item_id SERIAL PRIMARY KEY NOT NULL,
    trip_id INT REFERENCES trips(trip_id) NOT NULL,
    author INT REFERENCES users(id) NOT NULL,
    category INT REFERENCES item_categories(category_id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    scheduled BOOLEAN,
    url VARCHAR(200),
    picture_url VARCHAR(200),
    cost MONEY,
    cost_per_person BOOLEAN,
    cost_per_group BOOLEAN,
    notes TEXT 
    );

    """,
    """
    DROP TABLE items;
    """
    ]

]