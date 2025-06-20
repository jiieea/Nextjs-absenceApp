export const errorMsg = (error : string) => {
    const errorStr = error;
    const regex = /\((.*?)\)/;
    const match = errorStr.match(regex);

    return match;
        
}