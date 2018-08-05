#!/bin/bash
today=`date '+%Y_%m_%d__%H_%M_%S'`
git add .
git commit -m "commit automatico - $today"
git push
