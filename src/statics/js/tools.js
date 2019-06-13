import audioPlayer from './audioPlayer'
import constants from './configuration'

/* Obtener los datos de un usuario */
async function getUserData (userName, vue) {
  return await vue.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userName)
    .then(response => {
      return response.data;
    });

}

/* Play/Stop una cancion */
async function toogleSong (cancionId, isSongPlaying, vue) {
  await vue.$axios.get(constants.REST_API_URL + "/getSongFilenameById/" + cancionId)
    .then(async response => {
      let nombreCancion = response.data;
      audioPlayer.setSong(nombreCancion);
      await vue.$axios.get(constants.REST_API_URL + "/getAutorCancionByCancionId/" + cancionId)
        .then(response => {
          let autorCancion = response.data;
          audioPlayer.setAutor(autorCancion);
          audioPlayer.toogle();
        });
      isSongPlaying = audioPlayer.getSongStatus();
    });
}

/* Stop cancion */
function stopSong(isSongPlaying) {
  if (audioPlayer.getSongStatus()) {
    audioPlayer.stop();
    isSongPlaying = false;
    audioPlayer.setSongStatus(false);
  }
}


/* Cambiar volumen de una cancion */
function changeSongVolume (songVolume) {
  if (audioPlayer.getSongStatus()) {
    if (songVolume < 10) {
      audioPlayer.changeVolume("0.0" + songVolume);
    } else {
      audioPlayer.changeVolume("0." + songVolume);
    }
  }
}

/* Dar like */
function doLike(cancionId, username, vue) {
  vue.$axios.put(constants.REST_API_URL + "/addSongToLikedList/" + cancionId + "/" + username)
      .catch(error => console.error(error))
}

/* Comentar */
async function doComment(comentarioDialog, userId, songId, comentario, vue ) {
  comentarioDialog = true;
  await vue.$axios.put(constants.REST_API_URL + "/addCommentByCancionId/" + userId + "/" + songId, {
    "mensaje": comentario
  })
    .catch(error => console.error(error))
}

/* Obtener las canciones */
async function getAllSongs(vue) {
  return await vue.$axios.get(constants.REST_API_URL + "/getCanciones")
    .then(response => {
      return response.data;
    })
    .catch(error => console.error(error))
}

/* Obtener las canciones */
async function getUserSongs(username, vue) {
  return await vue.$axios.get(constants.REST_API_URL + "/getSongsFromUser/" + username)
    .then(response => {
      return response.data;
    })
    .catch(error => console.error(error))
}

/* Obtener canciones de mg de x usuario */
async function getLikedSongs(username, vue) {
  return await vue.$axios.get(constants.REST_API_URL + "/getLikedSongsByUserId/" + username)
    .then(response => {
      return  response.data;
    })
    .catch(error => console.error(error))
}

async function getPlaylists(vue) {
  return await vue.$axios.get(constants.REST_API_URL + "/getPlaylist")
    .then(response => {
      return  response.data;
    })
    .catch(error => console.error(error))
}

export default { changeSongVolume, toogleSong, stopSong, doLike, doComment, getAllSongs, getUserData,getUserSongs, getLikedSongs, getPlaylists }
