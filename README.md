# Travel Buddy

designed and coded by:  
[Aaron Duque](https://gitlab.com/Odinitegit) | [Darnell Calahan](https://gitlab.com/darnellcalahan15) | [Josh Chow](https://gitlab.com/thejoshchow) | [Meghan Hyde](https://gitlab.com/Meghan.Hyde)
___

__Travel Buddy__ is a web application design to facilitate planning trips with various sized groups.

The idea for Travel Buddy came from a lack of group planning resources. We wanted to create a visual and interactive way of planning a trip that did not include the use of Excel or Google docs.

Travel Buddy allows you to create a trip and invite your friends to join in the planning process. Each person is able to add / make suggestions for accomodations, dining, transportation and activites etc. All members are able to vote and show interest in those travel planning suggestions. Ultimately this tool facilitates and encourages discussion among groups prior to taking a trip and takes the burden of plannig off one individual person.

___
Here is a link to view the deployed project:

https://thethirteen.gitlab.io/travelbuddy/
___
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

## Tech Used

Backend:

Python, FastAPI, PostresSQL, Psycopg, JWT tokens and OAuth2.

Frontend:

React, Redux, Bootstrap components and custom CSS.

## Project resources
[API Endpoints](./docs/apiendpoints.md)  
[Wireframes](./docs/wireframe.md)  
[Table Relations](./docs/table-relations.png)

## Project Architecture

Our project is a monolithic application that utilizes a Postgres database, served by a FastAPI server and a Javascript / React frontend.


## Running this application locally on your machine

Steps:
1. fork and/or just clone this repo. `https://gitlab.com/thethirteen/travelbuddy.git`
2. A .env file in the root folder is required with the following:

      - The DEV_SIGNING_KEY can be any string
      - You can sign up and get your own PEXELS_API_KEY by signing up with [www.pexels.com](https://www.pexels.com)
      - Your .env file should look like this:
        ```
        DEV_SIGNING_KEY=signing_key_here
        PEXELS_API_KEY=your_pexels_api_key_here
        ```
3. Docker desktop is required. learn more about docker [here](https://www.docker.com/)
4. Create a docker volume with the name buddy-db using the following command: `docker volume create buddy-db`
5. Build your docker container with `docker compose build`
6. Run your docker containers with `docker compose up`
7. In your web browser navigate to `localhost:3000`


