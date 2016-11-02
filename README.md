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


