export default ({data}) => {
    if(data.status == 200) {
        console.log("VALIDATE ok");
        return true;
    }
    else if(data.status == 401){
        return true;
    }
    else {
        console.log("VALIDATE error");
        alert(`Ошибка: ${data.error}`);
        return false;
    }
}