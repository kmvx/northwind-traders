#!/usr/bin/env bash
set -eu -o pipefail

FILE="$1"

NODE_OPTIONS=\"--experimental-strip-types\" prettier --write --ignore-unknown "$FILE"

eslint --max-warnings 0 --fix "$FILE"
