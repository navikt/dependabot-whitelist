const core = require('@actions/core');

async function run() {
    try {
        const whitelist = core
            .getInput('whitelist', {required: true})
            .split('/n');

        const dependencies = core
            .getInput('dependencies', {required: true})
            .split(',');

        dependencies.forEach(dep => {
            if (whitelist.includes(dep)) {
                core.info('Dependency ${dep} is whitelisted.');
            } else {
                core.setFailed('Dependency ${dep} is not whitelisted.')
            }
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
