const config = {
    minLength: 3,
};

export const isValidDealName = (name: string) => name.length >= config.minLength;
