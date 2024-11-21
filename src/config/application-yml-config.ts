export const transformYamlToEnv = async (yamlObject: object, prefix = '') => {
    for (const [key, value] of Object.entries(yamlObject)) {
        const newKey = prefix ? `${prefix}_${key}` : key;
        if (typeof value === 'object' && value !== null) {
            await transformYamlToEnv(value, newKey);
        } else {
            process.env[newKey] = value;
        }
    }
};