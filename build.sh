#!/usr/bin/env bash
cd assets
echo building assets
/home/ceyhun/programs/sencha/6.0.2.14/sencha app build --clean
cd ../
echo cleaning prod directories
rm -fr ../prod/storm/
echo copying Dockerfile
cp Dockerfile ../prod/
echo copying all dev files to prod
cp -R  ../storm ../prod/storm
echo copying sails prod conf file
cp -f test/docker/sails/local.js ../prod/storm/config/
echo moving assets prod to new place
cp -f -R ../prod/storm/assets/build/production/App ../prod/storm/assets/
cp -f ../prod/storm/assets/App/app.js ../prod/storm/assets/
cp -f ../prod/storm/assets/App/app.json ../prod/storm/assets/
cp -f ../prod/storm/assets/App/index.html ../prod/storm/assets/
echo removing development files
rm -fr ../prod/storm/.git
rm -fr ../prod/storm/assets/app
rm -fr ../prod/storm/assets/build/temp
echo removing repository files
rm -fr ../prod/storm/bin/repo/data/*
