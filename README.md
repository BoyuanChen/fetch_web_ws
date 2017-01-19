### Web UI (Drop-in Replacement for RVIZ)
#### Setup

These commands install the rosbridge server and the tf-to-web republisher; both packages must exist for visualization to show.
```
sudo apt-get install ros-<rosdistro>-rosbridge-server
sudo apt-get install ros-<rosdistro>-tf2-web-republisher
```

### Running

Run these commands in sequeunce to start the websocket server and properly publish tf via websocket to the browser
```
rosrun tf2_web_republisher tf2_web_republisher
roslaunch rosbridge_server rosbridge_websocket.launch
```
Note that the socket server is running on port `9090` by default.

In the directory of the this project, run
```
python -m SimpleHTTPServer 8080
```
Visit localhost:8080 to see everything up and running


### PointCloud

Install Packages:

- rosbridge_server
- tf2_web_republisher 
- openni_camera 
- ros_web_video 
- depth_image_proc 
- depthcloud_encoder

We might also have to install `openni_launch`, which is not included in the official documentation
```
http://wiki.ros.org/ros3djs/Tutorials/Point%20Cloud%20Streaming%20from%20a%20Kinect
```

Run 
```
roslaunch openni_launch openni.launch depth_registration:=true
rosrun ros_web_video ros_web_video _port:=9999 _framerate:=15 _bitrate:=250000 _profile:=best www_file_server:=true _wwwroot:=http://cdn.robotwebtools.org/ros3djs/current/ros3d.min.js

rosrun nodelet nodelet standalone depth_image_proc/convert_metric image_raw:=/head_camera/depth_registered/image_raw image:=/head_camera/depth_registered/image
rosrun depthcloud_encoder depthcloud_encoder_node _depth:=/head_camera/depth_registered/image _rgb:=/head_camera/rgb/image_rect_color

# the following should be the right way
rosrun ros_web_video ros_web_video _port:=9999 _framerate:=15 _bitrate:=250000 _profile:=best www_file_server:=true _wwwroot:=~/ros/grasp_ws/web-ui/pointcloud

```

```
catkin_init_workspace
catkin_make
```
