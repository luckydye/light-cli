# light-cli

A simple cli script for simple cli programs.

## Usage

```
// script.mjs

#!/usr/bin/env node

import { command, main } from 'light-cli';

command('hello', {

    usage: 'hello <answer>',
    description: 'Say hello.',

    async execute([ answer ], flags) {
        log(answer);

        return true;
    }
});

main();
```

If the "execute" function returns false, the script will log the usage and description, if it exists.
 
Flags start with a single "-" and are accessible from the second "flags" argument. 
All other cli arguments are in the first argument of the execute function as an array.
