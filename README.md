# SoundBubble

###### Group Members: [Martin Palanca](https://github.com/martipal), [Sherry Zhang](https://github.com/veronicz), [Yancey Yang](https://github.com/Talos6)

SoundBubble is a platform that leverages Spotify's public API to build logs of a user's recently played tracks and makes this data visible to other users. Users can create and join groups to refine which users' song logs appear on their feed, as well as rate songs using an 'thumbs up' and 'thumbs down' scale.

## Table of Contents

- [Project Description](#Project-Description)
- [Project Task Requirements](#Project-Task-Requirements)
  - [Minimal Requirement](#Minimal-Requirement)
  - [Standard Requirements](#Standard-Requirements)
  - [Stretch Requirements](#Stretch-Requirements)
- [Breakdown of Minimal Requirements](#Breakdown-of-Minimal-Requirements)
  - [Requirement 1: Retrieve a user’s recently played song log](#Retrieve-a-users-recently-played-song-log)
  - [Requirement 2: Create a user interface](#Create-a-user-interface)
- [Prototypes](#Prototypes)
- [MongoDB Schema](#MongoDB-Schema)

## Project Description

This project is intended for users who are subscribed to the music platform Spotify. It will allow users, and other users within their “Group”, to view each other’s song logs and interact with the logs by “Up Voting” or “Down Voting” a particular log. The type of data we will be storing are Songs along with User Information. This data will be able to be shared among users to access within the group. Additional functionality that we may add/remove based on time constraints is the ability to recommend a played song to another user, and adding commenting functionality to a particular song log for users to provide their opinions (e.g. “This song is awesome!”, “This song is lame”).

## Project Task Requirements

### Minimal Requirement

1. Retrieve a user’s recently played song log
2. Create a user interface for interacting with Spotify song logs
3. The ability to “Up Vote” and “Down Vote” a particular song log
4. The ability to add users to a private group
5. User log in capabilities

### Standard Requirements

1. Be able to clear a user’s posted song logs
2. Album cover appears as an icon for the song log
3. If song logs are large, paginate the song log
4. Create a clickable link on a song log to redirect the user to the spotify song page

### Stretch Requirements

1. Adding song log commenting functionality
2. Adding the ability for a user to recommend a played song to another user

## Breakdown of Minimal Requirements

### Retrieve a user’s recently played song log

1. Complete a technical analysis of Spotify’s public API to determine available
   functionality and limitations
2. Implement retrieval of a user’s recently played songs using the public Spotify API
3. Store song logs
4. Parse song data into a Song object to retrieve relevant data (e.g. song name,
   artist, timestamp, hyperlink, etc)

### Create a user interface

1. Create a main/home page with navigation to other pages (about, song logs,
   group, etc).
2. Create an interactive dynamic song log dashboard that updates on refresh
3. Implement design of the UI so that offered functionality is intuitive

## Prototypes

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
