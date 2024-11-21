export function Value(variable: string) {
    return function (target: any, propertyKey: string) {
        const descriptor = {
            get() {
                return process.env[variable.replace(/\./g, "_")];
            },
            enumerable: true,
            configurable: true,
        };
        Object.defineProperty(target, propertyKey, descriptor);
    };
}
