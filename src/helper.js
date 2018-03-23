export const getParameters = (fileText) => {
    let counter  = 0;
    for(var i = 0; i < fileText.length; i++) {
        if(fileText[i] === '\n') {
            counter += 1;
        }
    }
    console.log(counter);
};