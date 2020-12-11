import { Component, OnInit } from '@angular/core';
// import {
//   Scene,
//   Camera,
//   WebGLRenderer,
//   PerspectiveCamera,
//   MeshBasicMaterial,
//   BoxGeometry,
//   Mesh
// } from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'threejsdemo';

  constructor() {
    // const scene = new Scene();
    // const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // const renderer = new WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    // const geometry = new BoxGeometry();
    // const material = new MeshBasicMaterial({ color: 0x00ff04 });
    // const cube = new Mesh(geometry, material);
    // scene.add(cube);

    // camera.position.z = 5;

    // function animate() {
    //   requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // }
    // animate();
  }

  ngOnInit() { }
}
