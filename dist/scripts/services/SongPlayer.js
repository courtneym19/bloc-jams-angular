(function() {
     function SongPlayer(Fixtures) {
         
         /**
         * @desc SongPlayer object returned by the SongPlayer function to make all properties and methods available to the rest of the application
         * @type {Object}
         */
         var SongPlayer = {};
         
         /**
         * @function currentAlbum
         * @desc Stores current album information
         * @returns {Object} albumPicasso
         */
         var currentAlbum = Fixtures.getAlbum();
         
         
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
         };
         
         /**
         * @function playSong
         * @desc Plays the Buzz Object associated with the
         * selected song and sets the `playing` property to true
         * @param {Object} song
         */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
         /**
         * @function getSongIndex
         * @desc Returns index of currently playing song
         * @param {Object} song
         * @returns {Number}
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
         /**
         * @desc Object holding the properties of the currently playing or paused song
         * @type {Object}
         */
         SongPlayer.currentSong = null;
         
         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } 
             
             else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }    
         };
         
         /**
         * @function pause
         * @desc Pause current song
         @param {Object} song
         */
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
         };
         
        /**
        * @function previous
        * @desc Previous button plays previous song
        */
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
            
             if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }
             else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
        };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();