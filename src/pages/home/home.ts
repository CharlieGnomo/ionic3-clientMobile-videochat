import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var Peer: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private cameraOpts: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }



  @ViewChild('myvideo') myVideo: any;

  peer;
  anotherid;
  mypeerid;

  constructor(private camera: Camera) {

  }

  ngOnInit() {
    let video = this.myVideo.nativeElement;
    this.peer = new Peer({ key: '<yourkeyhere>' });
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    }, 3000);

    this.peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        console.log(data);
      });
    });

    var n = <any>navigator;

    n.mediaDevices.getUserMedia = (n.mediaDevices.getUserMedia || n.mediaDevices.webkitGetUserMedia || n.mediaDevices.mozGetUserMedia || n.mediaDevices.msGetUserMedia);

    this.peer.on('call', function (call) {

      n.mediaDevices.getUserMedia({audio: false,video: {facingMode: 'user'}}).then(stream => {
        call.answer(stream);
        call.on('stream', function (remotestream) {
          video.src = URL.createObjectURL(remotestream);
          video.play();
        })
      }).catch(console.error);
    })
  }

  connect() {
    var conn = this.peer.connect(this.anotherid);
    conn.on('open', function () {
      conn.send('Message from that id');
    });
  }

  videoconnect() {
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;

    var n = <any>navigator;

    n.mediaDevices.getUserMedia = (n.mediaDevices.getUserMedia || n.mediaDevices.webkitGetUserMedia || n.mediaDevices.mozGetUserMedia || n.mediaDevices.msGetUserMedia);

    n.mediaDevices.getUserMedia({audio: false, video:{facingMode: 'user'}}).then(stream => {
      var call = localvar.call(fname, stream);
      call.on('stream', function (remotestream) {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      })
    }).catch(console.error);
  }

  photo() {
    this.camera.getPicture(this.cameraOpts).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
     }, (err) => {
      // Handle error
     });

  }
}