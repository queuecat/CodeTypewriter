//插入样式
function insertStyle(obj, attrs) {
    for (const attr in attrs) {
        obj.style[attr] = attrs[attr];
    }
}
//构造函数
function CodeTypewriter(option) {
    //选项
    this.element = option.element || document.querySelector(".codetypewriter");
    this.data = option.data || "Hello World!";
    this.animation = option.animation ? option.animation : "line";
    this.cursor = option.cursor ? option.cursor : "transverse";
    this.dataList = [];
    this.time = option.time || 200;
    this.direction = true; //方向，true为正序
    this.firstLine = 0; //第一个换行
    this.flag = true; //换行标志
    this.init = () => {
        var obj = this.element;
        var data = this.data;
        //遍历添加内容
        for (let index = 0; index < data.length; index++) {
            let span = document.createElement("span");
            if (data[index] == "\n") {
                span.appendChild(document.createElement("br"));
            } else if (data[index] == "\t") {
                for (let index = 0; index < 4; index++) {
                    let space = document.createElement("span");
                    space.innerHTML = " ";
                    insertStyle(space, {
                        display: "none"
                    });
                    obj.appendChild(space);
                    this.dataList.push(space);

                }
                continue;
            } else {
                span.innerHTML = data[index];
            }
            insertStyle(span, {
                display: "none"
            });
            obj.appendChild(span);
            this.dataList.push(span);
        }
        //光标css
        var css = document.createElement("style");
        css.innerHTML = `
        .cursorV {
            width: 7px;
            height: 15px;
            background-color: #d0d0d0;
            display: inline-block;
            margin: -1px 1px -3px;
            animation: cursor-blink 0.5s infinite linear both alternate;
        }
        .cursorT{
            width: 12px;
            height: 5px;
            background-color: #d0d0d0;
            display: inline-block;
            margin: -1px 1px -3px;
            animation: cursor-blink .35s infinite;
            animation-direction: alternate;
        }
        @keyframes cursor-blink {
            0%,
            30% {
                opacity: 0;
            }
            70%,
            100% {
                opacity: 1;
            }
        }`;
        document.body.appendChild(css);
        //光标
        var cursor = document.createElement("span");
        if (this.cursor == "vertical") {
            cursor.className = "cursorV";
        } else if (this.cursor == "transverse") {
            cursor.className = "cursorT";
        } else {
            throw "cursor " + this.cursor + " is undifind";
        }
        obj.appendChild(cursor);
        //动画
        this.animationFun();
    }
    this.animationFun = () => {
        var direction = this.direction;
        var list = this.dataList;
        //动画
        if (this.animation == "line") {
            if (direction) { //正向输出
                for (let index = 0; index < list.length; index++) {
                    if (list[index].style.display == "none") {
                        list[index].style.display = "inline"
                        if (index >= list.length - 1) {
                            setTimeout(this.animationFun, this.time);
                            this.direction = false;
                        } else {
                            setTimeout(this.animationFun, this.time);
                        }
                        return;
                    }
                }
            } else {
                for (let index = list.length - 1; index >= 0; index--) {
                    if (list[index].style.display != "none") {
                        list[index].style.display = "none"
                        if (index <= 0) {
                            setTimeout(this.animationFun, this.time);
                            this.direction = true;
                        } else {
                            setTimeout(this.animationFun, this.time);
                        }
                        return;
                    }
                }
            }
        } else if (this.animation == "both") {
            if (direction) { //正向输出
                for (let index = 0; index < list.length; index++) {
                    if (list[index].style.display == "none") {
                        list[index].style.display = "inline"
                        if (index >= list.length - 1) {
                            setTimeout(this.animationFun, this.time * 10);
                            this.direction = false;
                        } else {
                            setTimeout(this.animationFun, this.time);
                        }
                        return;
                    }
                }
            } else {
                for (let index = list.length - 1; index >= 0; index--) {
                    if (list[index].style.display != "none") {
                        list[index].style.display = "none"
                        if (index <= 0) {
                            setTimeout(this.animationFun, this.time * 10);
                            this.direction = true;
                        } else {
                            setTimeout(this.animationFun, this.time / 2);
                        }
                        return;
                    }
                }
            }
        } else if (this.animation == "lineFeed") {
            if (direction) { //正向输出
                for (let index = 0; index < list.length; index++) {
                    if (list[index].style.display == "none") {
                        if (index >= list.length - 1) {
                            this.direction = false;
                            setTimeout(this.animationFun, this.time * 10);
                        } else if (index < list.length && list[index].innerHTML == "<br>") {
                            this.firstLine = this.firstLine ? this.firstLine : index;
                            if (this.flag) {
                                setTimeout(this.animationFun, this.time * 10);
                                this.flag = false;
                                return;
                            } else {
                                list[index].style.display = "inline";
                                setTimeout(this.animationFun, this.time);
                                this.flag = true;
                            }
                        } else {
                            setTimeout(this.animationFun, this.time);
                        }
                        list[index].style.display = "inline";
                        return;
                    }
                }
            } else {
                for (let index = list.length - 1; index >= 0; index--) {
                    if (list[index].style.display != "none") {
                        list[index].style.display = "none"
                        if (index <= this.firstLine) {
                            setTimeout(this.animationFun, this.time);
                            this.direction = true;
                            this.firstLine = 0;
                        } else {
                            setTimeout(this.animationFun, this.time / 5);
                        }
                        return;
                    }
                }
            }
        } else {
            throw "animathion " + this.animation + " is undifind";
        }
    }
}