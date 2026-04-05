#!/bin/bash
export PATH="$HOME/.local/bin:$PATH"
cd "$(dirname "$0")/.."
npx expo start --web --port 8081 --clear
