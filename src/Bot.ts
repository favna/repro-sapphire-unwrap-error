import { SapphireClient } from "@sapphire/framework"
import { ClientOptions } from "discord.js";


const CLIENT_OPTIONS: ClientOptions = {
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true,
	loadMessageCommandListeners: true,
	defaultPrefix: "^",
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES"],
	partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"],
	shards: "auto",
	typing: false,
};

export const client:SapphireClient = new SapphireClient(CLIENT_OPTIONS)

async function main() {

    //---- PROVIDE TOKEN HERE
    const DISCORD_TOKEN="TOKEN GOES HERE"

    await client.login(DISCORD_TOKEN);
    console.log(`Connected to Discord. ${client.user.username}`);

    console.log("Please check Readme.md for more information on reproducing the issue")
}

main();