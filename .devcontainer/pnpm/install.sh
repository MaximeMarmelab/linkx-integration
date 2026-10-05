#!/usr/bin/env zsh

set -e

npm install -g pnpm

NODE_MODULES_PATH="/workspaces/linkx-integration/node_modules"
mkdir -p "$NODE_MODULES_PATH" && chown -R $_CONTAINER_USER:$_CONTAINER_USER "$NODE_MODULES_PATH"

PNPM_STORE_DIR="/workspaces/linkx-integration/.pnpm-store"
mkdir -p "$PNPM_STORE_DIR" && chown -R $_CONTAINER_USER:$_CONTAINER_USER "$PNPM_STORE_DIR"

PNPM_HOME="/mnt/pnpm"
PNPM_BIN_PATH="$PNPM_HOME/bin"

mkdir -p "$PNPM_BIN_PATH" && chown -R $_CONTAINER_USER:$_CONTAINER_USER "$PNPM_HOME"

echo "export PNPM_HOME=\"$PNPM_HOME\"" >> /home/$_CONTAINER_USER/.zshrc
echo "export PATH=\$PATH:\"$PNPM_BIN_PATH\"" >> /home/$_CONTAINER_USER/.zshrc
echo "export PATH=\$PATH:\"/home/$_CONTAINER_USER/.local/share/pnpm/bin\"" >> /home/$_CONTAINER_USER/.zshrc
