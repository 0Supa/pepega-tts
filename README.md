# Pepega TTS ![PepegaPhone](https://cdn.frankerfacez.com/emoticon/312720/1)
 A simple to use Discord TTS bot made by [Supa](https://discord.com/users/535820575868715008)
## TTS Engines
 * Amazon Polly *via StreamElements* `63 voices`
 * Google Translate `47 languages`

## Features
 * Customizable Prefix and TTS language/voice per server
 * 600 TTS character limit
 * Skip the current TTS message
 * Skip all queued TTS messages
 * Disconnects from the voice channel only when empty
 * Fast response to commands

## Command list
| Command | Description | Aliases | Cooldown |
|:---:|---|---|---|
| **;help** | DM's you the command list | commands, cmds | 8s |
| **;voices** | DM's you the Polly TTS supported voices |  | 8s |
| **;langs** | DM's you the Google TTS supported languages | languages | 8s |
| **;polly** | send an Amazon Polly TTS message in your voice channel | p | 1s |
| **;say** | send a Google TTS message in your voice channel | s, g | 1s |
| **;voice** | changes the guild Polly TTS voice |  | 5s |
| **;lang** | changes the guild Google TTS language |  | 5s |
| **;join** | joins your voice channel | connect | 4s |
| **;leave** | leaves the current voice channel | disconnect | 3s |
| **;skip** | skips the current playing TTS |  | 2s |
| **;stop** | skips all the queued TTS messages | skipall | 2s |
| **;prefix** | changes the bot guild's prefix | pepegaprefix | 7s |
| **;ping** | pong! 🏓 | pong, pyng, dink | 3s |

## I just want to add the bot in my Discord server
[Click here](https://discord.com/oauth2/authorize?client_id=837274404551524372&scope=bot&permissions=0) to invite the bot in your server 😀

## Installation
* `git clone https://github.com/0Supa/pepega-tts.git`
* `cd pepega-tts`
* `npm install`
* make a copy of `.env_template` named `.env` and add your credentials into it
* **the bot requires a database, you'll either need to create a MariaDB Database and import the tables from the [schema](schema.sql), or ajust the code yourself**
