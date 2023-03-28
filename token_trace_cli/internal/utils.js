
const util = {
    arrayParser: function(arrayStr){
        let arr = arrayStr.slice( 1, -1).split(",");
        return arr
    },
    arrayParserInt: function(arrayStr){
        let arr = this.arrayParser(arrayStr)
        for(let i=0;i<arr.length;i++){
            let tmp = Number(arr[i])
            if(arr[i] == NaN){
                console.error(`"${arr[i]}" cant be converted into integer`)
                process.exit(1)
            }
            arr[i] = tmp
        }

        return arr
    } 
}

module.exports = util