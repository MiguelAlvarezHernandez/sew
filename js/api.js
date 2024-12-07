$(document).ready(function() {
    // Manejo de la subida de archivos
    $('input[type="file"]').on('change', function(event) {
        var archivo = event.target.files[0];
        var videoPlayer = $('video')[0];
        var url = URL.createObjectURL(archivo);
        videoPlayer.src = url;
    });

    // Manejo de la carga de videos desde URL
    $('button').on('click', function() {
        var videoURL = $('input[type="text"]').val();
        var videoPlayer = $('video')[0];
        videoPlayer.src = videoURL;
    });

    // API Drag and Drop para la lista de reproducción
    var playlist = $('section')[0];

    $(playlist).on('dragover', function(event) {
        event.preventDefault();
    });

    $(playlist).on('drop', function(event) {
        event.preventDefault();
        var archivo = event.originalEvent.dataTransfer.files[0];
        var url = URL.createObjectURL(archivo);
        var videoItem = document.createElement('article');
        videoItem.draggable = true;
        videoItem.innerHTML = `<video src="${url}" controls></video>`;
        playlist.appendChild(videoItem);
    });

    // Manejo de subtítulos con API TextTrack
    var videoPlayer = $('video')[0];
    var track = videoPlayer.textTracks[0];

    track.mode = 'hidden'; // Ocultar subtítulos por defecto

    videoPlayer.addEventListener('play', function() {
        track.mode = 'showing'; // Mostrar subtítulos cuando se reproduce el video
    });

    videoPlayer.addEventListener('pause', function() {
        track.mode = 'hidden'; // Ocultar subtítulos cuando se pausa el video
    });
});