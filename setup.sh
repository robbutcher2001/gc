#!/bin/bash

zsh_config=~/.zshrc
if [ -f $zsh_config ]; then
   echo -e "\nalias gc=\"node "$(pwd)"/git-checkout.mjs\"" >> $zsh_config
   echo "Done, please restart terminal instance."
else
   echo "zsh config not found, please set up manually."
fi