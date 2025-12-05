## Scripts by Category

### Checkers

- **bkdrcheck.ts** - Prints all hosts in the terminal that have root access and already have a backdoor installed.
- **checksome.ts** - Prints all hosts in the terminal categorized by: no root access, root access, and ready to be milked.

### Attacks

#### From `home`

- **FireStarter.ts** - Targets all hosts without root access, opens the required ports, and nukes them.
- **give.ts** - Copies **burntobits.ts** to a target host and executes it immediately. Requires one parameter: the target host. Usage: `run give.ts [target_host]`
- **burntobits.ts** - Performs `weaken()`, `grow()`, and `hack()` on the target host.
- **weakenAll.ts** - Applies `weaken()` to all hosts with root access.
- **growerAll.js** - Applies `grow()` to all hosts with root access.
- **hackAll.ts** - Performs `hack()` on all hosts with root access.

---

## Current Terminal Aliases

```
global alias bkdr=run /scripts/bkdrcheck.ts
global alias chks=run /scripts/checksome.ts
global alias fire=run /scripts/FireStarter.ts
```

---

## Remarks

Feel free to share any suggestions or feedback.
