#!/bin/bash

if [ ! -n "$1" ]; then
	echo "Usage: ./new_proj.sh <project_name>"
	exit $E_BADARGS
fi

cp -r ./example_sketch/ ./"$1"
cd "$1"
ln -s ../libraries libraries
