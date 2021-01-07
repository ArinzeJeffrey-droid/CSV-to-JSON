const name = ["arinze", "jeffrey"]
let word = "/("
for(i=0;i < name.length; i++){
    let fix = name[i].charAt(0).toUpperCase() + name[i].slice(1)
    console.log(fix);
    word+=`${name[i].charAt(0).toUpperCase() + name[i].slice(1)}|`
}
let newword = word.slice(0, -1)
newword+=")/"
console.log(newword);

// let named = "boy"
// let hello = named.charAt(0).toUpperCase() + named.slice(1)
// console.log(hello);