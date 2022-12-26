import { ApplyOptions } from "@sapphire/decorators";
import { Args, ArgumentError, Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import ThingArg from "../lib/arguments/ThingArg";
import { ALL_THE_THINGS, IThing } from "../types/Thing";

@ApplyOptions<CommandOptions>({
	aliases: ["test", "t"],
	description: "Test command for custom arg",
})
export class PingCommand extends Command {
	public async messageRun(message: Message, args:Args): Promise<Message> {
        try {

            const thing:IThing = await args.pick(ThingArg).then((result)=>{
                return result;                
            }).catch((err) => {
                console.log(err); //!Generates the output (similar) mentioned in original post https://discord.com/channels/737141877803057244/1056065110038290564/1056065110038290564

                if (err instanceof ArgumentError && err.identifier === "InputNotMatchingThing"){
                    throw err;
                } else {
                    return null;
                }
            })

            if(thing){
                return message.reply({content:`**${thing.name}:** ${thing.description}`})
            } else {
                const allThings = ALL_THE_THINGS.map(e=>e.name).join(", ");
                return message.reply({content:`**All Things:**${allThings}`})
            }

        } catch(err) {
            if (err instanceof ArgumentError && err.identifier === "InputNotMatchingThing"){
                return message.reply({content: err.message})
            }
        }
	}
}
