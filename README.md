# SoundBubble

###### Group Members: [Martin Palanca](https://github.com/martipal), [Sherry Zhang](https://github.com/veronicz), [Yancey Yang](https://github.com/Talos6)

SoundBubble is a platform that leverages Spotify's public API to build logs of a user's recently played tracks and makes this data visible to other users. Users can create and join groups to refine which users' song logs appear on their feed, as well as rate songs using a 'thumbs up' and 'thumbs down' scale, and post comments to a particular song that are then visible to all group members.

## Table of Contents

- [Project Description](#Project-Description)
- [Project Proposal](#Project-Proposal)
  - [Project Task Requirements](#Project-Task-Requirements)
    - [Minimal Requirement](#Minimal-Requirement)
    - [Standard Requirements](#Standard-Requirements)
    - [Stretch Requirements](#Stretch-Requirements)
  - [Breakdown of Minimal Requirements](#Breakdown-of-Minimal-Requirements)
    - [Requirement 1: Retrieve a user’s recently played song log](#Retrieve-a-users-recently-played-song-log)
    - [Requirement 2: Create a user interface](#Create-a-user-interface)
  - [Prototypes](#Prototypes)
- [MongoDB Schema](#MongoDB-Schema)
- [Project Addendum](#Project-Addendum)
  - [Basic Technology Requirements](#Basic-Technology-Requirements)
  - [Basic Contribution Requirements](#Basic-Contribution-Requirements)
  - [Basic Functionality Requirements](#Basic-Functionality-Requirements)
  - [Challenges, Learning, and Future Directions](#Challenges\,-Learning\,-and-Future-Directions)
  - [Initiative and Additional Contributions](#Initiative-and-Additional-Contributions)
  
  

## Project Description

This project is intended for users who are subscribed to the music platform Spotify. It will allow users, and other users within their “Group”, to view each other’s song logs and interact with the logs by “Up Voting” or “Down Voting” a particular log. The type of data we will be storing are Songs along with User Information. This data will be able to be shared among users to access within the group. Additional functionality that we may add/remove based on time constraints is the ability to recommend a played song to another user, and adding commenting functionality to a particular song log for users to provide their opinions (e.g. “This song is awesome!”, “This song is lame”).

## Project Proposal

### Project Task Requirements

#### Minimal Requirement

1. Retrieve a user’s recently played song log
2. Create a user interface for interacting with Spotify song logs
3. The ability to “Up Vote” and “Down Vote” a particular song log
4. The ability to add users to a private group
5. User log in capabilities

#### Standard Requirements

1. Be able to hide or show the current user’s song logs
2. Album cover appears as an icon for the song log
3. If song logs are large, paginate the song log
4. Create a clickable link on a song log to redirect the user to the spotify song page

#### Stretch Requirements

1. Adding song log commenting functionality
2. Adding the ability for a user to recommend a played song to another user

### Breakdown of Minimal Requirements

#### Retrieve a user’s recently played song log

1. Complete a technical analysis of Spotify’s public API to determine available
   functionality and limitations
2. Implement retrieval of a user’s recently played songs using the public Spotify API
3. Store song logs
4. Parse song data into a Song object to retrieve relevant data (e.g. song name,
   artist, timestamp, hyperlink, etc)

#### Create a user interface

1. Create a main/home page with navigation to other pages (about, song logs,
   group, etc).
2. Create an interactive dynamic song log dashboard that updates on refresh
3. Implement design of the UI so that offered functionality is intuitive

### Prototypes

![Home](/readme_images/home_ui.png)
This sketch offers an early view of our music dashboard and the features it is intended to have. They include:

- Song logs from various users assembled into a “Feed” with most recently played songs appearing at the top
- An icon representing the user and a photograph of the user if applicable
- A photograph of the album cover next to the song name.
- The ability to upvote or downvote a user’s played song
- Depending on time constraints, the name and artist may act as a hyperlink to the playable song on Spotify’s platform
- Timestamped songs

![Groups](/readme_images/groups_ui.png)
Functionalities on this page:

- Lists all groups the current user is in
- Lists all users currently in the selected group
- Add a user to the group
- Remove a member from the group
- Create a new group
- Depending on time constraints, clicking on a user from this page may show a list of songs they upvoted/downvoted

## MongoDB Schema

![MongoDB Schema](/readme_images/db_schema.png)

## Project Addendum

### Basic Technology Requirements

- HTML/CSS/JS: These are the bases of our app. HTML is the fundamental expression that we use to render every react component. We styling the component by a lot CSS file and imported material ui packages. Besides, all the functions and expressions are written in Javascript.
- React/Redux: React components will show every element inside our app. When element changed by functions, we use React state to handle the changes to one single component and use Redux store with reducers to handle the changes to multiple components.
- Node/Backend: NodeJS provided us useful packages to get the project done. Such as full-stack framework Meteor, bootstrap and material ui for front-end styling, simple schema for database structure and so on. Furthermore, we have several CRUD methods to get interact with our server and database. With the usage of Meteor publish and subscribe, we reinforce our database and only expose demanded data to client side.
- NoSQL/MongoDB: Our database deployed to mLab, a cloud-side documentational database. We set MongoDB schema to keep data organized and easy to use. With NoSQL and MongoDB queries we successfully made our changes to the data.
- Release Engineering: The application is deployed on heroku. Now this application can be accessed anytime, anywhere and on any device. It behaves the same as other website: https://sound-bubble.herokuapp.com/


### Basic Contribution Requirements
- Martin's contributions to this project largely focused on developing the front-end user interface, with a primary focus on developing the ReactJS component structure and the overall layout of our application. Specifically, he spearheaded the design of our more functional components, which include Songs, the Song Log, Groups, and Comments. Martin also took leadership in the CSS styling of our application, ensuring that the design is clean, intuitive, reactive, and accessible. 
  - https://github.com/martipal/SoundBubble/pull/44, https://github.com/martipal/SoundBubble/pull/41

- Sherry's contributions to this project were mainly focused on the implementation of our back-end application structure and functionality. Specifically, Sherry took leadership in handling API authentication and requests using Spotify's Public Web API. Sherry also led the design and implementation of our Mongo database and schema to ensure efficiency, ease-of-use, and to minimize redundancy. In addition, she also was responsible for configuring the technologies learned in class to work with the Meteor framework.
  - https://github.com/martipal/SoundBubble/commit/848fe202c5cbde639614f252bd0f678760162779, https://github.com/martipal/SoundBubble/pull/20

- Yancey’s contributions to this project mostly focused on building features that enhance our application. Specifically, Yancey took the initiative to implement the group admin role and restricted the power of removing group members and transferring group ownership to the admin, completing the use case of ‘Group’ in our application. In addition, he also implemented a filter that gives users more flexibility to search through song logs by user name, song name, and artist name.
  - https://github.com/martipal/SoundBubble/pull/45, https://github.com/martipal/SoundBubble/pull/38

### Basic Functionality Requirements
SoundBubble presents a streamlined and simple mechanism to share music with others based on songs played on the music application, Spotify. Currently, sharing played songs on Spotify is done on a per-song basis and involves sharing individual Spotify song links via third-party social media applications, such as Facebook and Instagram. Due to this, getting a grasp of others’ music listening preferences by sharing music can be tedious and challenging. SoundBubble solves this problem by presenting a central “feed” where you can view your recently played tracks, as well as those of your friends. SoundBubble users can also interact with played song logs by “rating” songs on a “thumbs up”/”thumbs down” scale, as well as leaving comments on users’ played songs. This enables the transition of the private music-listening experience into a more communal and collective one and allows users to discover new music based on the listening patterns of those around them. 

### Challenges, Learning, and Future Directions

#### Challenges and Learning
- Spotify Web API: This is our first time to get in touch with Spotify’s public web API. We went through all the user documents and github examples to know the API functionality and usage. We wrapped the API into Meteor service, built reasonable API call to get the data we want and maintained its functionality as time goes by.
- Store Data: This is the challenge we faced when trying to develop a MongoDB database. We parsed the response data from API, discussed about how to create a schema that is clear, easy to use and efficient, drew an ‘ERD’ diagram to visualize the relationship, and implemented database structure and validation by using 'simple-schema'.
- Manage Data: Some uesr actions will have different consequences depending on whether the user is in a group or not. And the interdependence of collections that would have been easy to maintain if we were to use a SQL database caused some bugs we did not foresee. Once we found a bug, we would re-plan out the functionality we wanted to achieve, the data it will affected directly or inadvertently, and any edge cases, and fixed any data inconsistency we came across during testing and development.

#### Future Directions
Though the current state of our application is complete and ready-to-use, additional functionality could be implemented to expand on our current base functionality. For example, if time permitted, we would have liked to implement the ability for users to directly recommend songs to other users, as well as also enabling other users to directly message another user. Additionally, the Groups functionality could be refined to “invite” other users to the group, from which the user can “accept” or “decline”; the current state of our application automatically adds users to the group if they are added by another user. These refinements are minor given the current scope of our application, but would begin the evolution of our application into a complete social media platform which is centered around music. 

### Initiative and Additional Contributions
- SoundBubble aims to provide seamless music sharing experience to users. For that reason, we integrated a cron task to pull data from Spotify Web API on schedule in addition to the manual fetching triggered by the refresh button. This made sure that our database is reasonably up-to-date, and removed the need for users to manually press the refresh button every time when they log in to see the latest song logs, and avoided the potential long wait time to respond to that refresh action. 
https://github.com/martipal/SoundBubble/commit/f2a0a4df0f46aa08ff9ea72ce11d05cfedb8c489
- To avoid data redundancy when the same user listened to the same song multiple times, we stored the timestamps in an array. But to make this information ready to present for the client, we utilized MongoDB aggregation to unwind the timestamps array and published the aggregation reactively: https://github.com/martipal/SoundBubble/commit/261a0d8a9076831c8b29de8aa917fcc92f3d8122
