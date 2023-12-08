export const parseNumberFromString = (
    value: string | undefined
): number | undefined => {
    if (value === undefined) {
        return undefined;
    }

    const parsedValue = Number(value);

    if (!isNaN(parsedValue) && isFinite(parsedValue)) {
        return parsedValue;
    }

    return undefined;
};
