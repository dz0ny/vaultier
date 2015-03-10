#!/bin/bash

script_home=$(cd "$(dirname "$0")"; pwd)
execute_cwd=$script_home/../src/phone
execute_cmd="ember server"

cd $execute_cwd
$execute_cmd
