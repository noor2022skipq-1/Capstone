exports.combineErrors=async(details)=>{
    return await details.reduce((prev,newer)=>{
        return prev+newer.message+"\n";
    },"");
}