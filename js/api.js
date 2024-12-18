/*$(document).ready(function() {

    // Manejo de subtítulos con API TextTrack
    /*var videoPlayer = $('video')[0];
    var track = videoPlayer.textTracks[0];

    track.mode = 'hidden'; // Ocultar subtítulos por defecto

    videoPlayer.addEventListener('play', function() {
        track.mode = 'showing'; // Mostrar subtítulos cuando se reproduce el video
    });

    videoPlayer.addEventListener('pause', function() {
        track.mode = 'hidden'; // Ocultar subtítulos cuando se pausa el video
    });
});*/

class VideoPlayer {
    constructor() {
        this.videoPlayer = $('video')[0];
        this.playlist = $('section')[1];
    }

    handleFileUpload() {
        $('input[type="file"]').on('change', (event) => {
            var archivo = event.target.files[0];
            var url = URL.createObjectURL(archivo);
            this.videoPlayer.src = url;
        });
    }

    handleVideoURL() {
        $('button').on('click', () => {
            var videoURL = $('input[type="text"]').val();
            this.videoPlayer.src = videoURL;
        });
    }

    handleDragAndDrop() {
        $(this.playlist).on('dragover', (event) => {
            event.preventDefault();
        });

        $(this.playlist).on('drop', (event) => {
            event.preventDefault();
            var archivo = event.originalEvent.dataTransfer.files[0];
            var url = URL.createObjectURL(archivo);
            this.addVideoToPlaylist(url);
        });
    }

    addVideoToPlaylist(url) {
        var videoItem = document.createElement('article');
        videoItem.draggable = true;
        videoItem.innerHTML = `
            <h3>Playlist Video</h3>
            <video src="${url}" controls></video>
            `;
        this.playlist.appendChild(videoItem);
    }

    initialize() {
        this.handleFileUpload();
        this.handleVideoURL();
        this.handleDragAndDrop();
    }
}

// Inicialización de la clase VideoPlayer
$(document).ready(function() {
    var videoPlayer = new VideoPlayer();
    videoPlayer.initialize();
});