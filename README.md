# Issue
When using a custom arg to match input based on my own values, logging the error produces the following input. 

```
ResultError: Unwrap failed
    at Err.unwrap (\sapphire-unwrap-error\node_modules\@sapphire\result\src\lib\Result\Err.ts:108:2)
    at Args.pick (\sapphire-unwrap-error\node_modules\@sapphire\framework\dist\lib\parsers\Args.js:45:19)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at PingCommand.messageRun (\sapphire-unwrap-error\src\commands\Test.ts:15:34)
    at async \sapphire-unwrap-error\node_modules\@sapphire\framework\dist\optional-listeners\message-command-listeners\CoreMessageCommandAccepted.js:20:23
    at Object.fromAsync (\sapphire-unwrap-error\node_modules\@sapphire\result\src\lib\Result.ts:55:2)
```

In this case, I want to handle the following cases, and return 1 of 3 messages.
- Arg Provided, matched
- Arg Provided, unmatched
- No Arg Provided

I know that I could peekResult or similar and decide whether to reply with the *unmatched message* or *no arg message* - But eventually I will want to expand the `ThingArg` out to throw errors of other types.

# Reproduction Steps
1. Run `npm install`
2. Provide token in Bot.ts
3. Run `npm run dev`
4. Run commands with input below

## Expected Results
### Thing provided, correctly found match in `ThingArg`
In this case, the input provided is matched using the `ThingArg`.

`^test apple`
> **Apple:** Juicy and Sweet

### Thing provided, but was not matched inside `ThingArg`
In this case, we provide input that cannot be matched by the arg.
`test bus`
> 'Bus' was not recognized as a valid Thing.

### No arg provided at all
In this case, no input is provided, but a different message is displayed.
> All Things: Apple, Pineapple, Pen

# References
- [Original Discord support conversation](https://discord.com/channels/737141877803057244/1056065110038290564/1056065110038290564)
- [Similar issue raised by PoroUsedSnax](https://github.com/sapphiredev/framework/issues/528)
- [Subsequent PR from favna/kyranet/vladfrangu](https://github.com/sapphiredev/utilities/pull/475)