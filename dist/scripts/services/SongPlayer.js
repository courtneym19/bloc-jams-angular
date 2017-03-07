(function() {
     function SongPlayer() {
         
         /**
         * @desc SongPlayer object returned by the SongPlayer function to make all properties and methods available to the rest of the application
         * @type {Object}
         */
         var SongPlayer = {};
         
         /**
         * @desc Object holding the properties of the currently playing or paused song
         * @type {Object}
         */
         var currentSong = null;
         
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
                currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentSong = song;
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
         * @function play
         * @desc uses the setSong and playSong functions to play the selected song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } 
             
             else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }    
         };
         
         /**
         * @function pause
         * @desc Pauses the currently playing song and sets the 'playing' property to true 
         @param {Object} song
         */
         SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
         };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();