#!/bin/bash

lftp -c "open -u $USER,$PASSWORD $HOST; mirror -R web ~"
