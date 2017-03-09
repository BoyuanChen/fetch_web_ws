import React from 'react'
import RouterGoTo from '../utils/RouteHelpers'
import Api from '../utils/Api.js'
import { observer } from 'mobx-react'
import AppState from '../utils/AppState.js'

const RoboViewer = observer(class RoboViewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
   
  }

  componentDidMount() {
    this.init();
  }

  init() {
    var ros = new ROSLIB.Ros({
      url : 'ws://tong.local:9090'
    });

    var viewer = new ROS3D.Viewer({
      divID : 'viewer',
      width : window.innerWidth,
      height : window.innerHeight,
      antialias : true,
      background: '#002233'
    });
    viewer.addObject(new ROS3D.Grid({
      color:'#0181c4',
      cellSize: 0.5,
      num_cells: 20
    }));

    
    var tfClient = new ROSLIB.TFClient({
      ros : ros,
      angularThres : 0.01,
      transThres : 0.01,
      rate : 10.0,
      fixedFrame: '/map'
    });

    new ROS3D.UrdfClient({
      ros : ros,
      tfClient : tfClient,
      path : 'http://resources.robotwebtools.org/',
      rootObject : viewer.scene,
      loader :  ROS3D.COLLADA_LOADER_2
    });
 

    // Setup Kinect DepthCloud stream
    depthCloud = new ROS3D.DepthCloud({
      url : 'http://tong.local:9999/streams/depthcloud_encoded.webm',
      f : 525.0
    });
    
    depthCloud.startStream();

    // Create Kinect scene node
    var kinectNode = new ROS3D.SceneNode({
      frameID : '/head_camera_rgb_optical_frame',
      tfClient : tfClient,
      object : depthCloud
    });
    viewer.scene.add(kinectNode);


    // Setup the marker client.
    var imClient = new ROS3D.InteractiveMarkerClient({
      ros : ros,
      tfClient : tfClient,
      topic : '/basic_controls',
      camera : viewer.camera,
      rootObject : viewer.selectableObjects
    });

    // Setup the map client.
    var gridClient = new ROS3D.OccupancyGridClient({
      ros : ros,
      rootObject : viewer.scene
    });
  }

  runRecognition() {
    var ros = new ROSLIB.Ros({
      url : 'ws://tong.local:9090'
    });


    var runRec = new ROSLIB.Topic({
      ros : ros,
      name : '/run_recognition',
      messageType : 'std_msgs/Empty'
    });
  
    var runRecMsg = new ROSLIB.Message();
    runRec.publish(runRecMsg);
  }

  submitNext() {
    
    var ros = new ROSLIB.Ros({
      url : 'ws://tong.local:9090'
    });


    var listener = new ROSLIB.Topic({
      ros : ros,
      name : '/switch_driver',
      messageType : 'std_msgs/String'
    });

    listener.subscribe(function(message) {
      console.log('Received message on ' + listener.name + ': ' + message.data);
    });
  }

  upTorso() {
    var ros = new ROSLIB.Ros({
      url : 'ws://tong.local:9090'
    });


    var upTor = new ROSLIB.Topic({
      ros : ros,
      name : '/up_torso',
      messageType : 'std_msgs/Empty'
    });
  
    var upTorMsg = new ROSLIB.Message();
    upTor.publish(upTorMsg);
  }

  downTorso() {
    var ros = new ROSLIB.Ros({
      url : 'ws://tong.local:9090'
    });


    var downTor = new ROSLIB.Topic({
      ros : ros,
      name : '/down_torso',
      messageType : 'std_msgs/Empty'
    });
  
    var downTorMsg = new ROSLIB.Message();
    downTor.publish(downTorMsg);
  }

  tuckArm() {
    var ros = new ROSLIB.Ros({
      url : 'ws://tong.local:9090'
    });


    var tuckAr = new ROSLIB.Topic({
      ros : ros,
      name : '/tuck_arm',
      messageType : 'std_msgs/Empty'
    });
  
    var tuckArMsg = new ROSLIB.Message();
    tuckAr.publish(tuckArMsg);
  }

  render(){
   
    return (
      <div>
        <h1> Fetch Control Panel </h1>
        <button type="button" onClick={this.runRecognition} >Run Recognition</button>
        <button type="button" onClick={this.upTorso}>Torso Up</button>
        <button type="button" onClick={this.downTorso}>Torso Down</button>
        <button type="button" onClick={this.tuckArm}>Tuck Arm</button>
        <button type="button" onClick={this.submitNext}>Submit Next</button>
        <div id="viewer" />
      </div>
    )
  }
})

export default RoboViewer