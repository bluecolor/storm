## STORM - Task Scheduler

[Storm](https://blue-color.github.io/storm/) is an enterprise task scheduler that runs blazingly fast and scales to thousands of tasks.


### Requirements
  - Install [nodejs](https://nodejs.org/en/download/) v4.5.
  - Install [jdk](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) v1.8
  - Install coffee-script with `npm install coffee-script -g`
  - Install and start [mongodb](https://www.mongodb.com/). If you already have a running mongodb instance and want to use
    it you can skip that step
  - [Windows]
    - `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).  
  - [Linux]
    - Make sure Python is in your environment variables  v2.7.x `python --version`
    - You may need to set LD_LIBRARY_PATH like $JDK_HOME/jre/lib/amd64/server in your `~\.profile`

### Installation
  - Get Storm from [here](https://github.com/blue-color/storm/releases)
  - Extract the archive file.
  - `cd $STORM_HOME` STORM_HOME is the location where you extracted the contents of the downloaded storm archive.
  - [Windows]  
    - `npm install --msvs_version=2015`
  - [Linux/OSX]  
    - `npm install`


### Run
- [Linux]
  - `./storm`
- [Windows]
  - `storm.bat`
- open a web browser
- go to [http://localhost:8080](http://localhost:8080)
  or if you are using development version go to  [http://localhost:9090](http://localhost:9090)
  
