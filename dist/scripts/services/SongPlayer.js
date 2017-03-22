(function() {
     function SongPlayer($rootScope, Fixtures) {
         
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
                stopSong();
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
             
            currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
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
         * @function stopSong
         * @desc Stops the currently playing song
         */
         var stopSong = function() {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         };
         
         /**
         * @desc Object holding the properties of the currently playing or paused song
         * @type {Object}
         */
         SongPlayer.currentSong = null;
         
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
         
         SongPlayer.volume = 80;
         
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
             
             if(currentBuzzObject) {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentBuzzObject.bind('ended', function() {
                    currentSongIndex++;
                    if (currentSongIndex < currentAlbum.songs.length) {
                        var song = currentAlbum.songs[currentSongIndex];
                        setSong(song);
                        playSong(song);
                    }
                })
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
        * @desc Clicking previous button on player bar plays previous song
        */
        SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
            
             if (currentSongIndex < 0) {
                 stopSong();
             }
             else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
        };
         
        /**
        * @function next
        * @desc Clicking next button on player bar plays next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /*
        * @function setVolume
        * @desc Set volume on scale 0-100
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
                SongPlayer.volume = volume;
            }
        };
         
        /*
        * @function muteVolume
        * @desc Mutes the volume
        */
        SongPlayer.muteVolume = function() {
            if (currentBuzzObject) {
                currentBuzzObject.toggleMute();
            }
        };
         

         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();