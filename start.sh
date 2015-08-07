#!/bin/bash

#Set the root password as root if not set as an ENV variable
export PASSWD=${PASSWD:=root}

#Set the root password
echo "root:$PASSWD" | chpasswd
#Spawn dropbear
dropbear -E -F-s &

export AUDIODEV=hw:1,0

#start your application from here...
sleep 9999999999999