import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'music-player',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './music-player.component.html',
    styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent implements AfterContentInit {
    @ViewChild('audio') audioPlayer!: ElementRef<HTMLAudioElement>;
    constructor() {}
    songs: string[] = [
        "assets/musics/song1.m4a",
        "assets/musics/song1.mp3",
        "assets/musics/song2.mp3"
    ]
    currentIndex: number = 0;
    isMuted = false;

    ngAfterContentInit(): void {
        // setTimeout(() => {
        //     if (this.audioPlayer) {
        //         if (this.audioPlayer.nativeElement instanceof HTMLAudioElement) {
        //             this.loadSong();
        //         } else {
        //             console.log(this.audioPlayer.nativeElement);
        //         }
        //     } else {
        //       console.error('Audio Player is still undefined or null');
        //     }
        //   }, 1000);
    }

    loadSong() {
        const player = this.audioPlayer.nativeElement;
        player.src = this.songs[this.currentIndex];
        player.load();

        const promise = player.play();
        if (promise !== undefined) {
            promise.then(_ => {
              // Autoplay started!
              player.onended = () => {
                this.currentIndex = (this.currentIndex + 1) % this.songs.length;
                this.loadSong();
              }
            }).catch(error => {
              // Autoplay was prevented.
              // Show a "Play" button so that user can start playback.
            });
          }
    }

    toggleMute() {
        const player = this.audioPlayer.nativeElement;
        player.muted = !player.muted;
        this.isMuted = player.muted;
    }
}