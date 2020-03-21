import chalk from 'chalk';

global.log = (...str) => {
    console.log('[INFO]', ...str);
}

global.error = (...str) => {
    console.log(chalk.red('[ERROR]', ...str));
}

global.warn = (...str) => {
    console.log(chalk.yellow('[WARN]', ...str));
}

const Commands = {};

export function command(name, options) {
    Commands[name] = options;
}

export async function main(command, args, flags = []) {

    command = command || process.argv.slice(2)[0];
    args = args || process.argv.slice(3);

    for(let arg of [...args]) {
        if(arg[0] == "-") {
            flags.push(arg);
            args.splice(args.indexOf(arg), 1);
        }
    }

    if(Commands[command]) {
        const result = await Commands[command].execute(args, flags);
        if(!result && Commands[command].usage) {
            log(Commands[command].description);
            log(`Usage: ${chalk.green(Commands[command].usage)}`);
        }
    } else {
        log('Commands:', chalk.green(Object.keys(Commands).join(", ")));
    }
}
