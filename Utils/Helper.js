//解析week pattern
export function weekpatternToDates(dow, wp, start_date) {
    try{
        let week = 0;
        let dow_int = 0;
        let offset = 0;
        let block = 0;
        let start_block = "";
        let end_block = "";
        let from = start_date.split("/");
        let startd = new Date(from[2], from[1] - 1, from[0]);
        let c = new Date(from[2], from[1] - 1, from[0]);
        let retval = "";
        let dd;
        if (wp === undefined)
            return "";
        for ( var i = 0; i < wp.length; i++) {

            if (i > 0) {
                week += 7;
            }
            if (wp.charAt(i) === '1') {
                if (dow === "Mon")
                    dow_int = 2;
                else if (dow === "Tue")
                    dow_int = 3;
                else if (dow === "Wed")
                    dow_int = 4;
                else if (dow === "Thu")
                    dow_int = 5;
                else if (dow === "Fri")
                    dow_int = 6;
                else if (dow === "Sat")
                    dow_int = 7;
                else if (dow === "Sun")
                    dow_int = 1;
                else {
                    // dow_int=2;
                    dow_int = c.getDay() + 1;
                }

                let base_dow = startd.getDay() + 1;

                if (dow_int >= base_dow) {
                    offset = dow_int - base_dow;
                } else {
                    offset = dow_int + 7 - base_dow;
                }
                dd = new Date(c);
                dd.setDate(dd.getDate() + (week + offset));

                if (block === 0) {
                    start_block = (dd.getDate() + "/" + (dd.getMonth() + 1));
                }
                end_block = (dd.getDate() + "/" + (dd.getMonth() + 1));

                block = 1;
            } else {
                block = 0;
            }

            if (block === 0 || (block === 1 && i === wp.length - 1)) {
                if (!end_block === "") {
                    if (end_block === start_block)
                        if (retval === "")
                            retval = start_block;
                        else
                            retval = retval + ", " + start_block;
                    else if (retval === "")
                        retval = start_block + "-" + end_block;
                    else
                        retval = retval + ", " + start_block + "-" + end_block;
                }
                start_block = "";
                end_block = "";
            }
        }
        // System.out.println("startd: " + startd);
        return retval;
    }
    catch(e){
        console.log("Error in weekpatternToDates: "+e);
        return "";
    }
}
//对JSON分组，确定总共要选几门课
export function needSelectClass(activityJsonArray) {
    let needSelectClassType = []; //需要选择的Class种类
    Object.keys(activityJsonArray).forEach((key)=>{
        if(!needSelectClassType.includes(activityJsonArray[key].activity_group_code)) {
            needSelectClassType.push(activityJsonArray[key].activity_group_code);
        }
    })
    return needSelectClassType;
}