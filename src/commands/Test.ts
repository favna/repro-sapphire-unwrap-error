import { ApplyOptions } from "@sapphire/decorators";
import { Args, ArgumentError, Command, CommandOptions, ResultError } from "@sapphire/framework";
import type { Message } from "discord.js";
import ThingArg from "../lib/arguments/ThingArg";
import { ALL_THE_THINGS, IThing } from "../types/Thing";

@ApplyOptions<CommandOptions>({
    aliases: ["test", "t"],
    description: "Test command for custom arg"
})
export class PingCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        try {
            const thing: IThing | null = await args
                .pick(ThingArg)
                .then((result) => {
                    return result;
                })
                .catch((err: ResultError<ArgumentError<IThing>>) => {
                    console.log(err); //!Generates the output (similar) mentioned in original post https://discord.com/channels/737141877803057244/1056065110038290564/1056065110038290564

                    if (err.value instanceof ArgumentError && err.value.identifier === "InputNotMatchingThing") {
                        throw err.value;
                    } else {
                        return null;
                    }
                });

            if (thing) {
                return message.reply({ content: `**${thing.name}:** ${thing.description}` });
            } else {
                const allThings = ALL_THE_THINGS.map((e) => e.name).join(", ");
                return message.reply({ content: `**All Things:**${allThings}` });
            }
        } catch (err) {
            if (err instanceof ArgumentError && err.identifier === "InputNotMatchingThing") {
                return message.reply({ content: err.message });
            }

            return message.reply("Unknown error occurred");
        }
    }
}
