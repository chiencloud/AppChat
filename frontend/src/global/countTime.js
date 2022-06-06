const countTime = (timeSend) => {
    const monthFomat = ['January', 'February', 'March', 'April', 'May', 'June','July','August','September', 'October', 'November', 'December']
    const [date, time] = timeSend.split(' ')
    const [year, month, day] = date.split('-')
    const dateFormat = `${monthFomat[parseInt(month-1)]} ${day}, ${year} ${time}`;
    
    const dateSend = new Date(dateFormat);
    const dateNow = new Date()

    const distance = dateNow.getTime() - dateSend.getTime();

    if(distance < 1000*60){
        return '< 1 phút'
    }
    else if(distance < 1000 * 60 * 60){
        const minutes = parseInt(distance/(1000*60));
        return `${minutes} phút`
    }
    else if(distance < 1000 * 60 * 60 * 24){
        const hours = parseInt(distance/(1000*60*60));
        return `${hours} giờ`
    }
    else if(distance < 1000 * 60 * 60 * 24 * 30){
        const day = parseInt(distance/(1000*60*60*24));
        return `${day} ngày`
    }
    else if(distance < 1000 * 60 * 60 * 24 * 30 * 12){
        const month1 = parseInt(distance/(1000*60*60*24*30));
        return `${month1} tháng`
    }
    else{
        const year1 = parseInt(distance/(1000*60*60*24*12));
        return `${year1} năm`
    }
}

export default countTime