#!/bin/bash

kill `ps aux | grep server.lua | grep -v grep | tr -s " " | cut -d" " -f2`
