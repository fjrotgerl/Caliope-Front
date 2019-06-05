import audioPlayer from './audioPlayer'
import constants from './configuration'

function changeSongVolume () {
  if (audioPlayer.getSongStatus()) {
    if (this.songVolume < 10) {
      audioPlayer.changeVolume("0.0" + this.songVolume);
    } else {
      audioPlayer.changeVolume("0." + this.songVolume);
    }
  }
}

export default { changeSongVolume }
