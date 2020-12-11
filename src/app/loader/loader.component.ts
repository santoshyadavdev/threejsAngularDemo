import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import {
  Scene,
  Camera,
  WebGLRenderer,
  PerspectiveCamera,
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
  Clock,
  Color,
  Fog,
  HemisphereLight,
  DirectionalLight,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  GridHelper,
  AnimationMixer,

} from 'three';

import * as stat from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  scene = new Scene();
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  hemiLight = new HemisphereLight(0xffffff, 0x444444);
  container: HTMLElement;
  dirLight = new DirectionalLight(0xffffff);
  mesh = new Mesh(new PlaneBufferGeometry(2000, 2000), new MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
  grid = new GridHelper(2000, 20, 0x000000, 0x000000);
  loader = new FBXLoader();
  clock = new Clock();
  mixer: any;
  webRenderer: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.container = this.renderer.createElement('div');
    this.renderer.appendChild(el.nativeElement, this.container);
    this.camera.position.set(100, 200, 300);
    this.scene.background = new Color(0xa0a0a0);
    this.scene.fog = new Fog(0xa0a0a0, 200, 1000);
    this.hemiLight.position.set(0, 200, 0);
    this.scene.add(this.hemiLight);

    this.dirLight.position.set(0, 200, 100);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.top = 180;
    this.dirLight.shadow.camera.bottom = - 100;
    this.dirLight.shadow.camera.left = - 120;
    this.dirLight.shadow.camera.right = 120;
    this.scene.add(this.dirLight);

    this.mesh.rotation.x = - Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    this.scene.add(this.grid);

  }

  ngOnInit(): void {
    this.loader.load('assets/Samba Dancing.fbx', (object) => {
      console.log(object);

      this.mixer = new AnimationMixer(object);

      const action = this.mixer.clipAction(object.animations[0]);
      action.play();

      object.traverse(function (child: any) {

        if (child.isMesh) {

          child.castShadow = true;
          child.receiveShadow = true;

        }

      });

      this.scene.add(object);

    });

    this.webRenderer = new WebGLRenderer({ antialias: true });
    this.webRenderer.setPixelRatio(window.devicePixelRatio);
    this.webRenderer.setSize(window.innerWidth, window.innerHeight);
    this.webRenderer.shadowMap.enabled = true;
    this.renderer.appendChild(this.container, this.webRenderer.domElement);

    const controls = new OrbitControls(this.camera, this.webRenderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();

    var animate = () => {
      requestAnimationFrame(animate);

      const delta = this.clock.getDelta();

      if (this.mixer) this.mixer.update(delta);

      this.webRenderer.render(this.scene, this.camera);
    };

    animate();

  }


}
