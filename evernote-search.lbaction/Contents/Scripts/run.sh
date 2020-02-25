#!/usr/bin/env bash

# setup nvm to find node executable
. ~/.nvm/nvm.sh
(echo 'window = this;'; ./node_modules/.bin/browserify $1; echo ';ObjC.import("stdlib");$.exit(0)') | /usr/bin/osascript -l JavaScript
#cat $1 | /usr/bin/osascript -l JavaScript


