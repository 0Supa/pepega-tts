# Pepega TTS ![PepegaPhone](https://cdn.frankerfacez.com/emoticon/312720/1)
 A simple to use Discord TTS bot made by [Supa](https://discord.com/users/535820575868715008)
## TTS Engines
 * Amazon Polly *via StreamElements* `63 voices`
 * Google Translate `47 languages`

## Features
 * Slash commands
 * Customizable TTS language/voice per server
 * 600 TTS character limit
 * Skip the current TTS message
 * Skip all queued TTS messages
 * Disconnects from the voice channel only when empty
 * Fast response to commands

## Command list
| Command | Description | Cooldown |
|:---:|---|---|
| **/help** | DM's you the command list | 8s |
| **/voices** | sends a link to the Polly TTS supported voices | 8s |
| **/langs** | DM's you the Google TTS supported languages | 8s |
| **/(polly, google)** | send a Google/Polly TTS message in your current voice channel | 1s |
| **/voice** | changes the guild Polly TTS voice | 5s |
| **/lang** | changes the guild Google TTS language | 5s |
| **/join** | joins your voice channel | 4s |
| **/leave** | leaves the current voice channel | 4s |
| **/skip** | skips the current playing TTS | 2s |
| **/ping** | pong! 🏓 | 3s |

## I just want to add the bot in my Discord server
[Click here](https://discord.com/oauth2/authorize?client_id=837274404551524372&scope=bot&permissions=0) to invite the bot in your server 😀

## Installation
* `git clone https://github.com/0Supa/pepega-tts.git`
* `cd pepega-tts`
* `npm install`
* make a copy of `config_template.json` named `config.json` and add your credentials into it
* **the bot requires a database and a redis server, you'll either need to create a Redis server and a MariaDB Database and import the tables from the [schema](schema.sql), or adjust the code yourself**
