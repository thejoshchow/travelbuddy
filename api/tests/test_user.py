from queries.users import UserRepo, UserOut, UserIn
from authentication.authentication import authenticator
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


class EmptyUserRepo:
    def update(self, user_form: UserIn, user_id: int):
        return UserOut(user_id=user_id, **user_form.dict())


def fake_user_account_data():
    return {"username": "string", "email": "string", "user_id": 1}


def test_update_user():
    # Arrange
    app.dependency_overrides[UserRepo] = EmptyUserRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_user_account_data
    )

    user = {
        "phone": "test",
        "first_name": "string",
        "last_name": "string",
        "display_name": "string",
        "picture_url": "string",
    }
    expected = {
        "phone": "test",
        "first_name": "string",
        "last_name": "string",
        "display_name": "string",
        "picture_url": "string",
        "user_id": 1,
    }

    # Act
    response = client.put("/api/user", json=user)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Clean up
    app.dependency_overrides = {}
