//File contains miscellanious methods

//Time 
const getCurrentUnixMilliseconds = (): number => Date.now();

//get icon info {type,name,color}
const getIconInfo = (input: string): { type: string; name: string; color: string } => {
    var type : string = "fa5";
    var name : string = "";
    var color : string = "themedefault";
    const inputSplit = input.split('|');
    if (inputSplit.length == 3 || inputSplit.length == 2){
        type = inputSplit[0];
        name = inputSplit[1];
    }if (input.length == 3){
        color = inputSplit[2];
    }
    return { type, name, color };
  };