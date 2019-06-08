import React from 'react';
import Song from './Song.jsx';
import songSampleDataRaw from './sampleData/sample_recently_played.jsx';
import profilesRaw from './sampleData/sample_profiles.jsx';

let songSampleData = JSON.parse(songSampleDataRaw);

let profiles = JSON.parse(profilesRaw);

export default class SongLog extends React.Component {

    getSongDetails(s, i){
        let randIndex=Math.floor(Math.random() * 5);
        let randProfile=profiles.profiles[randIndex];
        let song = s.track;
        let songUrl;
        
        if (s.context === null){
            songUrl= "https://support.spotify.com/tr/article/Error-code-404/";
        } else { 
            songUrl= song.external_urls.spotify;
        }
        
        let artists = song.artists;
        let artistNames = artists.map(artist => artist.name);
        // TODO: calls below need to be made null safe
        
        return (<Song key={i}
        userName = {randProfile.username}
        userImage = {randProfile.profile_photo}
        songName = {song.name}
        songArtist = {artistNames}
        songAlbumCover = {song.album.images[0].url}
        songTimeStampTime = {s.played_at.substring(11,16)}
        songTimeStampDate = {s.played_at.substring(0,10)}
        songExternalUrl = {songUrl}/>)
    }

    render(){
    let tracks = songSampleData.items;
    let songDivs = tracks.map((s, i) => this.getSongDetails(s, i));
        
    
    return (<div className="feed_container">
        <div className="song_feed_header">
         <h1 className="song_feed_title">
         Your Feed
         </h1>
         <img className="refresh_button" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5rIE754i5dhUenkMUyG-JulFFkR78v3yt0TS-tbqiKCsr4Uj"/>
        </div>
        <div className="songs">
        <ul>   
        {songDivs}
        </ul>
        </div>
      </div>);
    }

}