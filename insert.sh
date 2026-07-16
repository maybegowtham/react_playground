#!/bin/bash

find . | rofi -dmenu | wl-copy
xdotool key ctrl+v

