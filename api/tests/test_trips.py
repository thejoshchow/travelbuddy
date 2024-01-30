from fastapi.testclient import TestClient
from main import app
from queries.trips import TripRepo

client = TestClient(app)  # pull from api/testing docs


class EmptyTripRepo:
    def get_all(self, user_id: int):
        return {"trips": []}


def test_get_all_trips():
    # Arrange
    app.dependency_overrides[TripRepo] = EmptyTripRepo

    # Act
    response = client.get(
        "/api/trip", params={"user_id": 1}
    )  # response var will obtain what is being called through api

    # Assert
    assert response.status_code == 200
    assert response.json() == {"trips": []}

    # Clean up
    app.dependency_overrides = {}


def test_init():
    assert 1 == 1


# install pytest in requirements.txt
# command to run in docker terminal is python -m pytest
# go to fastapi docs for testing - grab test client and import
# testclient = create instance of fastapi and pass it through
    # a variable to Testclient
# don't want to connect to the db but we want to simulate the
    # db = dependency override
# creating fake instances of a class that connect to db and
    # return what we expencted = fake version of class returns what is
    # being expected
# import db for trips
# set up Arrange, Act, Assert
# override tripRepo with a fake class that would get all trips
    # record (return empty list)
# Dependency injection - things we need to work so we have to over
    # ride these dependencies which will allow us to simulate this
# ACT - create an instance and see if it returns what we wanted
# good practice to create empty dictionary clears everything
    # we set after being called
# Assert gets what we wanted
