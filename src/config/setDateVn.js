const formatDatVn = (data) => {
    if (data) {
        const date = data.toString().split(" ")
        var month = ""
        switch (date[1]) {
            case "Mar": month = "Tháng 3"; break;
            case "Apr": month = "Tháng 4"; break;
            case "May": month = "Tháng 5"; break;
            case "Jun": month = "Tháng 6"; break;
            case "Jul": month = "Tháng 7"; break;
            case "Aug": month = "Tháng 8"; break;
            case "Sep": month = "Tháng 9"; break;
            case "Oct": month = "Tháng 10"; break;
            case "Nov": month = "Tháng 11"; break;
            case "Dec": month = "Tháng 12"; break;
            case "Jan": month = "Tháng 1"; break;
            case "Feb": month = "Tháng 2"; break;
        }
        const newDate = `${date[2]} ${month}`
        return newDate
    } else {
        return "Không có"
    }

}
export default formatDatVn;