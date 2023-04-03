let input = document.getElementById("input");
let NumArr = [];
let OperationArr = [];
let Num = "0";
let Operation = "+";

window.onload = init()

// 初始化函数
function init(){
    let center = document.querySelector('#center');
    center.addEventListener('click',function(e){
        if(e.target.className == 'Num')
            NumOnClick(e.target);
        else if(e.target.className == 'Operation')
            OperationOnClick(e.target);
        else if(e.target.className == 'action')
            actionOnClick(e.target);
        else if(e.target.className == 'special')
            specialOnClick(e.target);
        else if(e.target.id == 'equal')
            equalOnClick(e.target);
        showConsole();
    })
// 直接遍历显示，简单粗暴，安全，但不高效
    input.value = show();
}

// 数字按键通配方法
function NumOnClick(e){
    Num = "" + Num;
    if(e.value == "."){
        if(Num.indexOf(".") < 0){
            Num = Num + "" + e.value;
        }
    }else{
        if(Num == 0 && Num.charAt(Num.length-1) != "."){
            Num = e.value;
        }else{
            Num = Num + "" + e.value;
        }
    }
    input.value = show();
}

// 运算符通配方法
function OperationOnClick(e){
    Num = "" + Num;
    if(Num.charAt(Num.length-1) != "." && Num.charAt(Num.length-1) != "-" && Num.charAt(Num.length-1) != "+"){
        NumArr.push(Num);
        Num = "0";
        OperationArr.push(e.value);
    }
    input.value = show();
}

// 特殊运算方法
function specialOnClick(e){
    Num = "" + Num;
    if(Num.charAt(Num.length-1) != "." && Num.charAt(Num.length-1) != "-" && Num.charAt(Num.length-1) != "+"){
        switch(e.value){
            case "%":
                Num *= 0.01;
                break;
            case "⅟x":
                if(Num != '0'){
                    Num = 1/Num;
                }
                break;
            case "√x":
                if(Num >= 0){
                    Num = Math.sqrt(Num);
                }
                break;
            case "x^²":
                Num *= Num
                break;
            case "+/-":
                Num *= -1
            break;
        }
    }
    input.value = show();
}

// 功能按键方法
function actionOnClick(e){
    Num = "" + Num;
    switch(e.value){
        case "CE":
            Num = "0"
            break;
        case "C":
            NumArr = [];
            OperationArr = [];
            Operation = "+";
            Num = "0";
            break;
        case "DEL":
            Num = Num.slice(0 , -1);
            if(Num == ''){
                Num = '0';
            }
            break;
    }
    input.value = show();
}

// 等于按键
function equalOnClick(e){
    NumArr.push(Num);
    if(OperationArr.length == NumArr.length-1){
        input.value = calculation(NumArr,OperationArr)
        console.log("结果值:" + input.value + "\n");
        NumArr = []
        OperationArr = [];
        Operation = "+";
        Num = input.value;
    }
}

// 计算函数
function calculation(NumArr,OperationArr){
    for(let i = 0; i < OperationArr.length; i++){
        switch(OperationArr[i]){
            case "X":
                NumArr[i] *= NumArr[i+1];
                NumArr.splice(i+1,1);
                OperationArr.splice(i,1);
                i--;
                break;
            case "➗":
                NumArr[i] /= NumArr[i+1];
                NumArr.splice(i+1,1);
                OperationArr.splice(i,1);
                i--;
                break;
        }
    }
    for(let i = 0; i < OperationArr.length; i++){
        switch(OperationArr[i]){
            case "+":
                NumArr[i] = parseFloat(NumArr[i]) + parseFloat(NumArr[i+1]); 
                NumArr.splice(i+1,1);
                OperationArr.splice(i,1);
                i--;
                break;
            case "-":
                NumArr[i] -= NumArr[i+1];
                NumArr.splice(i+1,1);
                OperationArr.splice(i,1);
                i--;
                break;
        }
    }
    return NumArr[0];
}

// 显示到input框
function show(){
    let temp = ''
    for(let i = 0; i<NumArr.length; i++){
        temp = temp + '' + NumArr[i] + '' + OperationArr[i];
    }
    temp = temp + Num;
    return temp
}

// 显示到控制台，当前状态
function showConsole(){
    console.log("Num:" + Num);
    console.log(NumArr);
    console.log("Operation:" + Operation);
    console.log(OperationArr);
    console.log('\n');
}