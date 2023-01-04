import { Args } from "@sapphire/framework";
import { ALL_THE_THINGS, IThing } from "../../types/Thing";

export default Args.make<IThing>(async (parameter, { argument }) => {
    const thing = ALL_THE_THINGS.find((e) => e.name.toLowerCase() === parameter.toLowerCase());

    if (thing) {
        console.log(`CustomArg MATCH: ${thing.name} from ${argument.toString()}`);
        return Args.ok(thing);
    }

    return Args.error({
        argument,
        parameter,
        identifier: "InputNotMatchingThing",
        message: `\`${parameter}\` was not recognized as a valid Thing.`
    });
});
