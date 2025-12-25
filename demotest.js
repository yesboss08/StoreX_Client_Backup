const testVal = true

if(testVal){
    console.log("file test pass")           
    process.exit(0)
}else{
    console.log("test filed with 404")
    process.exit(1)
}