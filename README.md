# Module3 Project Gamma
Travel Buddy

Travel Buddy is a web application design to facilitate planning trips with various sized groups.

The idea for Travel Buddy came from a lack of group planning resources. We wanted to create a visual and interactive way of planning a trip that did not include the use of Excel or Google docs.

Travel Buddy allows you to create a trip and invite your friends to join in the planning process. Each person is able to add / make suggestions for accomodations, dining, transportation and activites etc. All members are able to vote and show interest in those travel planning suggestions. Ultimately this tool facilitates and encourages discussion among groups prior to taking a trip and takes the burden of plannig off one individual person.

- Aaron Duque
- Darnell Calahan
- Josh Chow
- Meghan Hyde

Here is a link to view the deployed project.

https://thethirteen.gitlab.io/travelbuddy/

Travel Buddy Vocabulary:

trip: repository of users and suggestions for an event with specific date range
user: someone authenticated in the system
owner: user who creates a trip
buddy: user invited to a trip
guest: non-participant user with trip link
item: item within a trip that can be suggested by buddies and voted on

## Navigating the application

- Signup / Login
- Create a trip and become the owner / admin of that trip.
- Upon creating a trip, add another user by username or email, and select their role as either buddy or guest.
- Select a category.
- Add an item with description as needed.
- Vote on your favorite item suggestions.

### Tech Used

Backend:

Python, FastAPI, PostresSQL, Psycopg, JWT tokens and OAuth2.

Frontend:

React, Redux, Bootstrap components and custom CSS.

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
- [ ] GitLab issue board is setup and in use (or project management tool of choice)
- [ ] Journals

## Project planning
[Wireframes](./docs/wireframe.md)  
[Table Relations](./docs/table-relations.png)

## Project Architecture

Our project is a monolithic application that utilizes a Postgres database, served by a FastAPI server and a Javascript / React frontend.


## Running this application locally on your machine

Steps:
1. fork and or just clone this repo.
2. A .env file in the root folder is required with the following:

      - The DEV_SIGNING_KEY can be any string
      - You can sign up and get your own PEXELS_API_KEY by signing up with Pexels.com
      - Your .env file should look like this:
        ```
        DEV_SIGNING_KEY=<A signing key here>
        PEXELS_API_KEY=<Your Pexels API key here>
        ```
3. Docker desktop is required https://www.docker.com/
4. Create a docker volume with the name buddy-db using the following command:
    ```  docker volume create buddy-db  ```
5. Build your docker container with
    ```  docker compose build  ```
6. Run your docker containers with
    ``` docker compose up  ```
7. In your web browser navigate to localhost:3000


