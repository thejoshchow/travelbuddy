steps = [
    [
        """
        CREATE TABLE item_votes (
        item_id INT REFERENCES items(item_id),
        id INT REFERENCES users(id)
        );
        """,
        
        """
        DROP TABLE item_votes;
        """
    ]
    

]