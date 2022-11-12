function parseDigits(input: string) {
    return input
        .split("")
        .map((s) => parseInt(s, 10))
        .filter(isFinite);
}

export function parsePhoneNumber(input: string): string {
    const mask = input.startsWith("+") ? "+x (xxx) xxx-xx-xx" : "x (xxx) xxx-xx-xx"

    const filledMask = parseDigits(input).reduce(
        (mask, digit) => mask.replace("x", String(digit)),
        mask
    );

    const fillIndex = filledMask.indexOf("x");
    return ~fillIndex ? filledMask.substring(0, fillIndex) : filledMask;
}
