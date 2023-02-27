# The Knight's Den

## Game board with move history, game type options, and customizable themes!

![play screenshot](https://user-images.githubusercontent.com/88412345/221296345-229bb624-4a6e-4835-ae43-b66af2757b6b.PNG)

## Learn to play chess with visual aids and structured lessons!

![learn screenshot](https://user-images.githubusercontent.com/88412345/221296384-be5907d7-5573-40df-88c0-729c8c6564d6.PNG)

## Overview of technologies used

The Knight's Den is a web-based chess application that allows users to play against each other in real-time. It was built using Ruby on Rails for the backend, ActionCable for websockets, and React for the frontend, and hosted on Heroku.

Rails: Rails is a popular web application framework written in Ruby. It follows the Model-View-Controller (MVC) architectural pattern and provides developers with a set of conventions for building web applications quickly and easily.

React: React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components that can be easily composed to build complex interfaces.

webpack: webpack is a module bundler for JavaScript applications. It allows developers to bundle their code and assets into a single file that can be loaded by the browser.

Bootstrap: Bootstrap is a popular front-end framework for building responsive and mobile-first web applications. It provides developers with a set of CSS and JavaScript components for building UIs quickly and easily.

Chess.js: Chess.js is a JavaScript library for chess game logic. It allows developers to write code that can validate and manipulate chess game states.

React-chessboard: React-chessboard is a lightweight and customizable React component for rendering chess games. React Chessboard was used in this app to create the interactive chess boards and game displays.

Perfect Scrollbar: Perfect Scrollbar is a JavaScript library for custom scrollbar styling. It provides developers with a way to style scrollbars that match the design of their application.

Action Cable: Action Cable is a Rails library for real-time communication between the server and the client. It uses WebSockets to provide a persistent connection between the client and the server.

## Installation instructions

-Clone the repository from Github to your local machine.
-Open a terminal and navigate to the project directory.
-Run yarn install to install the necessary JavaScript dependencies.
-Run bundle install to install the necessary Ruby dependencies.
-Run rails db:create to create the database.
-Run rails db:migrate to run the database migrations.
-Once the installation is complete, you can start the development server by running the command 'rails server' or 'rails s' in your terminal.
-Now open your web browser of choice and navigate to 'http://localhost:3000/' to view the app.

## Who is this app for?

The users of this chess app could be anyone who enjoys playing chess, regardless of their skill level or experience. The app is designed to be intuitive and easy to use, so it can be enjoyed by complete beginners as well as more experienced players.

The users may want to improve their chess skills, track their progress, or simply enjoy a game of chess with friends or strangers. The app provides a range of features to meet these needs, including game analysis, statistics tracking, and the ability to play against a computer or other users online.

## Original Wireframes

### Front end sketches

![refined chess wireframe 1](https://user-images.githubusercontent.com/88412345/221352976-0871e290-0209-42a3-af5c-f8f6403a8252.jpg)
![refined chess wireframe 2](https://user-images.githubusercontent.com/88412345/221352984-dc9a6c01-9d9f-49de-88ec-81c7d98463d4.jpg)

### Backend datbase structure and API endpoints

![Chess Database Structure 2](https://user-images.githubusercontent.com/88412345/221353094-e87d82ba-e065-4eaf-b671-8c2e13a2ade0.jpg)
![Updated Chess API Endpoints](https://user-images.githubusercontent.com/88412345/221353105-005f51d9-6d2f-48e0-bf54-6a3fc39d4975.jpg)

I began the project with a pretty clear set of wireframes for the app's layout and structure. However, as I dove into building the app, I found that there were additional functionalities and improvements that I could, and wanted, to add that would enhance the user experience. Some of these included a more intuitive interface for the chess game, real-time updates of the moves made in a game, and a more engaging and entertaining experience with some added satire. In the end, the app evolved into a more comprehensive and polished product than I had originally envisioned. I'm proud of the result and hope that users find it to be a fun and engaging experience.

## Video Demo of the app

https://www.loom.com/share/228620553ee0436b837e28ba1f3d9a81

## Major Challenges

While developing the app, there were a few major hurdles that I faced while creating this chess app. One of the main challenges was integrating the Chess.js library with the React-Chessboard component. This required me to read through the documentation carefully and understand how the two libraries worked together. There were a few unusual UI glitches and bugs that weren't exactly game breaking, but made for a not so smooth user experience. It took some trial and error, but eventually I was able to get everything working pretty smoothly.

Another major hurdle I faced during the development of the app was implementing the real-time updates for the chess game using Action Cable. It required me to understand the WebSocket protocol and the way Rails handles channels and broadcasts. I had to spend a lot of time testing and debugging my code to make sure the updates were reliable for a smooth user experience. Additionally, I had to make sure that game statistics updated properly and only once per game, no matter how many players were connected to ActionCable. This required careful consideration of the data flow and implementing conditional logic to ensure that statistics were only updated once per game session. This was a tricky problem to solve, but with some perseverance, I was able to implement a solution that worked well.

Finally, designing the user interface and experience was a major hurdle that required a lot of trial and error. I had to make sure the app was intuitive and easy to use for both beginners and experienced players, while also being visually appealing and engaging. I had to experiment with different design elements, color schemes, and animations to find the right balance between functionality and aesthetics.
Despite these challenges, I found the development of this app to be an incredibly enjoyable and rewarding learning experience. These obstacles taught me a lot and pushed me to further develop my problem-solving skills. By overcoming these hurdles, I was able to create a functional and engaging application that users of all skill levels can enjoy. It is my hope that this app will provide a fun and intuitive way for people to learn and improve their chess skills!
