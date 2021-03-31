exports.showGreetings = ()=>{
    let time = (new Date()).getHours();
        if(time>0 && time<12)
            return "Good Morning!";
        else if(time>=12 && time<=6)
            return "Good Afternoon!";
        else
            return "Good Evening!";
}