function revstr (str){
    let rev="";
        for(let i=str.length-1; i>=0; i--){
                rev+=str[i]
        }
        return rev;

}
const str = "javascript"
const a= revstr(str)
console.log(a)