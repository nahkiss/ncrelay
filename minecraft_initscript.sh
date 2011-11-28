#!/bin/bash
# /etc/init.d/minecraft

# NOTE: Found through google.com from a pastebin post that did not have author //Tero Heino
#
# version 0.3.1 2011-01-08 (YYYY-MM-DD)

  ### BEGIN INIT INFO
  # Provides:   minecraft
  # Required-Start: $local_fs $remote_fs
  # Required-Stop:  $local_fs $remote_fs
  # Should-Start:   $network
  # Should-Stop:    $network
  # Default-Start:  2 3 4 5
  # Default-Stop:   0 1 6
  # Short-Description:    Minecraft server
  # Description:    Starts the minecraft server
  ### END INIT INFO

#Settings
SERVICE='minecraft_server.jar'
USERNAME="minecraft"
MCPATH='/home/minecraft/minecraft'
BACKUPPATH='/home/minecraft/minecraft.backup'

ME=`whoami`
as_user() {
  if [ "$ME" == "$USERNAME" ] ; then
    bash -c "$1"
  else
    su - $USERNAME -c "$1"
  fi
}

mc_start() {
  if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
  then
    echo "Tried to start but $SERVICE was already running!"
  else
    echo "$SERVICE was not running... starting."
    cd $MCPATH
    as_user "cd $MCPATH && screen -dmS minecraft java -Xmx768M -Xms768M -jar minecraft_server.jar nogui"
    sleep 7
    if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
    then
      echo "$SERVICE is now running."
    else
      echo "Could not start $SERVICE."
    fi
  fi
}
mc_stop() {
        if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
        then
                echo "$SERVICE is running... stopping."
                as_user "screen -p 0 -S minecraft -X eval 'stuff \"say SERVER SHUTTING DOWN IN 10 SECONDS. Saving map...\"\015'"
                as_user "screen -p 0 -S minecraft -X eval 'stuff \"save-all\"\015'"
                sleep 10
                as_user "screen -p 0 -S minecraft -X eval 'stuff \"stop\"\015'"
                sleep 7
        else
                echo "$SERVICE was not running."
        fi
        if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
        then
                echo "$SERVICE could not be shut down... still running."
        else
                echo "$SERVICE is shut down."
        fi
}


mc_update() {
  if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
  then
    echo "$SERVICE is running! Will not start update."
  else
    # MC_SERVER_URL=http://minecraft.net/`wget -q -O - http://www.minecraft.net/download.jsp | grep minecraft_server.jar\</a\> | cut -d \" -f 2`
    MC_SERVER_URL=https://s3.amazonaws.com/MinecraftDownload/launcher/minecraft_server.jar
    as_user "cd $MCPATH && wget -q -O $MCPATH/minecraft_server.jar.update $MC_SERVER_URL"
    if [ -f $MCPATH/minecraft_server.jar.update ]
    then
      as_user "mv $MCPATH/minecraft_server.jar.update $MCPATH/minecraft_server.jar"
      echo "Minecraft successfully updated."
    else
      echo "Minecraft update could not be downloaded."
    fi
  fi
}

mc_backup() {
  if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
  then
    echo "$SERVICE is running! Will not start backup."
  else
    echo "Backing up minecraft data"
    if [ -d $BACKUPPATH/world_`date "+%m.%d.%Y"` ]
    then
      for i in 1 2 3 4 5 6
      do
        if [ -d $BACKUPPATH/world_`date "+%m.%d.%Y"`-$i ]
        then
          continue
        else
          as_user "cd $MCPATH && cp -r world $BACKUPPATH/world_`date "+%m.%d.%Y"`-$i"
          break
        fi
      done
    else
      as_user "cd $MCPATH && cp -r world $BACKUPPATH/world_`date "+%m.%d.%Y"`"
    fi
    echo "Backing up the minecraft server executable"
    if [ -f "$BACKUPPATH/minecraft_server_`date "+%m.%d.%Y"`.jar" ]
    then
      for i in 1 2 3 4 5 6
      do
        if [ -f "$BACKUPPATH/minecraft_server_`date "+%m.%d.%Y"`-$i.jar" ]
        then
          continue
        else
          as_user "cd $MCPATH && cp minecraft_server.jar \"$BACKUPPATH/minecraft_server_`date "+%m.%d.%Y"`-$i.jar\""
          break
        fi
      done
    else
      as_user "cd $MCPATH && cp minecraft_server.jar \"$BACKUPPATH/minecraft_server_`date "+%m.%d.%Y"`.jar\""
    fi
  fi
  echo "Backup complete"
}


#Start-Stop here
case "$1" in
  start)
    mc_start
    ;;
  stop)
    mc_stop
    ;;
  restart)
    mc_stop
    mc_start
    ;;
  update)
    mc_stop
#    mc_backup
    mc_update
    mc_start
    ;;
  backup)
    mc_stop
    mc_backup
    mc_start
    ;;
  status)
    if ps ax | grep -v grep | grep -v -i SCREEN | grep $SERVICE > /dev/null
    then
      echo "$SERVICE is running."
    else
      echo "$SERVICE is not running."
    fi
    ;;

  *)
  echo "Usage: /etc/init.d/minecraft {start|stop|update|backup|status|restart}"
  exit 1
  ;;
esac

exit 0
