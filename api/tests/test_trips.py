from fastapi.testclient import TestClient
from main import app
from queries.trips import TripRepo, TripOut
from authentication.authentication import authenticator

client = TestClient(app)


class EmptyTripRepo:
    def get_all(self, user_id: int):
        return {"trips": []}

    def create(self, trip_form, user_id: int):
        result = {"trip_id": 1}
        result.update(trip_form)
        return TripOut(**result)

    def add_buddy(self, user_id: int, trip_id: int, buddy=True):
        return True


def fake_user_account_data():
    return {"username": "string", "email": "string", "user_id": 1}


def test_get_all_trips():
    # Arrange
    app.dependency_overrides[TripRepo] = EmptyTripRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_user_account_data
    )

    # Act
    response = client.get("/api/trip", params={"user_id": 1})

    # Assert
    assert response.status_code == 200
    assert response.json() == {"trips": []}

    # Clean up
    app.dependency_overrides = {}


def test_create_trip():
    # Arrange
    app.dependency_overrides[TripRepo] = EmptyTripRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_user_account_data
    )

    trip = {
        "name": "Bob",
        "location": "Gob",
        "start_date": "2024-01-30",
        "end_date": "2024-01-30",
        "picture_url": "string",
    }
    expected = {
        "name": "Bob",
        "location": "Gob",
        "start_date": "2024-01-30",
        "end_date": "2024-01-30",
        "picture_url": "string",
        "trip_id": 1,
    }

    # Act
    response = client.post("/api/trip", json=trip)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Clean up
    app.dependency_overrides = {}
