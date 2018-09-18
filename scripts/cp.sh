#!/bin/bash

work_path=$(dirname $0)
cd ./${work_path}/../
work_path=$(pwd)
rsync -av --exclude node_modules --exclude .git "${work_path}" /Users/liyang/vipabc/developping