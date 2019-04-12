"use strict";
var urlJson = "http://api.myerong.com/asssets/inner/";
var urlToken = "http://api.myerong.com/asssets/inner/";
// var urlJson = "https://test.myerong.com:5080/asssets/inner/";
// var urlToken = "https://test.myerong.com:5080/asssets/inner/";
var ruleArr = ['ZUUL-010102', 'ZUUL-010103', 'ZUUL-010104', 'ZUUL-010106', 'ZUUL-010109', 'ZUUL-010111'];
var bankList = [{
        bankNameEn: 'ICBC',
        bankNameCn: '中国工商银行'
    },
    {
        bankNameEn: 'ABC',
        bankNameCn: '中国农业银行'
    },
    {
        bankNameEn: 'CCB',
        bankNameCn: '中国建设银行'
    },
    {
        bankNameEn: 'BOC',
        bankNameCn: '中国银行'
    },
    {
        bankNameEn: 'BCOM',
        bankNameCn: '中国交通银行'
    },
    {
        bankNameEn: 'CIB',
        bankNameCn: '兴业银行'
    },
    {
        bankNameEn: 'CITIC',
        bankNameCn: '中信银行'
    },
    {
        bankNameEn: 'CEB',
        bankNameCn: '中国光大银行'
    },
    {
        bankNameEn: 'PAB',
        bankNameCn: '平安银行'
    },
    {
        bankNameEn: 'PSBC',
        bankNameCn: '中国邮政储蓄银行'
    },
    {
        bankNameEn: 'SHB',
        bankNameCn: '上海银行'
    },
    {
        bankNameEn: 'SPDB',
        bankNameCn: '浦东发展银行'
    },
    {
        bankNameEn: 'CMBC',
        bankNameCn: '中国民生银行'
    },
    {
        bankNameEn: 'CMB',
        bankNameCn: '招商银行'
    },
    {
        bankNameEn: 'GDB',
        bankNameCn: '广发银行'
    },
    {
        bankNameEn: 'HXB',
        bankNameCn: '华夏银行'
    },
    {
        bankNameEn: 'HZB',
        bankNameCn: '杭州银行'
    },
    {
        bankNameEn: 'BOB',
        bankNameCn: '北京银行'
    },
    {
        bankNameEn: 'NBCB',
        bankNameCn: '宁波银行'
    },
    {
        bankNameEn: 'JSB',
        bankNameCn: '江苏银行'
    },
    {
        bankNameEn: 'ZSB',
        bankNameCn: '浙商银行'
    },
];

/**
 * 设置公共的对话框方法
 */
//绑定立即函数到win对象中
;
(function (window) {
    //原始配置
    myDialog.prototype.defaults = {
        target: null,
        width: 500,
        height: 300,
        title: '',
        content: ''
    }

    //定义替换方法
    myDialog.prototype.extend = function (dest, src) {
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                dest[prop] = src[prop];
            }
        }
        return dest;
    };

    //模板实现
    myDialog.prototype.template = function () {
        var title = "<div class='myDialog-header'>" + this.options.title + "<div id='myDialog-close'>×</div></div>";
        var content = "<div class='myDialog-content'>" + this.options.content + "</div>";
        var footer = "<div class='myDialog-footer'><div id='myDialog-ok'>确定</div><div id='myDialog-cancel'>取消</div></div>";

        var _myDialog = document.createElement("div");
        _myDialog.setAttribute("id", "myDialog");
        _myDialog.innerHTML = "<div class='myDialog-mask'></div><div class='myDialog-inner'>" + title + content + footer + "</div>";

        return _myDialog;
    };

    //绑定点击事件
    myDialog.prototype.bindEvents = function () {
        var _myDialog = document.getElementById("myDialog");
        document.getElementById("myDialog-close").addEventListener("click", function (e) {
            $(".footBtn").removeClass("footBtnActive");
            e.preventDefault();
            // _myDialog.style.display = "none";
            _myDialog.parentNode.removeChild(_myDialog);
            timer = 0
            businessNo = "";
            transId = "";
            $('.validateBtn').attr("onclick", 'getSms()')
            $('.validateBtn').text("获取验证码");
            $('.validateBtn').css('color', '#ffffff');
        });
        // document.getElementById("myDialog-ok").addEventListener("click", function (e) {
        //     e.preventDefault();
        //     _myDialog.style.display = "none";
        // });
        document.getElementById("myDialog-cancel").addEventListener("click", function (e) {
            $(".footBtn").removeClass("footBtnActive");
            e.preventDefault();
            _myDialog.parentNode.removeChild(_myDialog);
            timer = 0
            businessNo = "";
            transId = "";
            $('.validateBtn').attr("onclick", 'getSms()')
            $('.validateBtn').text("获取验证码");
            $('.validateBtn').css('color', '#ffffff');
            // _myDialog.style.display = "none";
        });
    };

    //初始化
    myDialog.prototype.init = function () {
        var layout = this.template();
        document.body.appendChild(layout);
        // if (this.options.target) {
        //     document.body.appendChild(layout);
        //     document.querySelector(this.options.target).addEventListener("click", function () {
        //         document.getElementById("myDialog").style.display = "block";
        //     });
        // } else {
        //     document.body.appendChild(layout);
        //     document.body.addEventListener("click", function (e) {
        //         document.getElementById("myDialog").style.display = "block";
        //     });
        // }
        this.bindEvents();
    };

    //比例设置
    myDialog.prototype.setWidth = function (val) {
        var width = document.getElementsByClassName("myDialog-inner")[0];
        width.style.width = val;
        // width.style.marginLeft = -val / 2 + "px";

        return this;
    };

    myDialog.prototype.setHeight = function (val) {
        var height = document.getElementsByClassName("myDialog-inner")[0];
        height.style.height = val;
        // height.style.marginTop = -val / 2 + "px";

        return this;
    };
    Date.prototype.format = function (format) {
        var args = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
    };

    function myDialog(options) {
        this.options = this.extend(this.defaults, options);
        this.init();
    }

    function myMessage(options) {
        this.options = this.extends(this.defaults, options);
        this.init();
    }
    myMessage.prototype.defaults = {
        content: '',
        timer: 2000,
    }

    myMessage.prototype.extends = function (temp, src) {
        for (var obj in src) {
            if (src.hasOwnProperty(obj)) {
                temp[obj] = src[obj];
            }
        }
        return temp;
    }

    myMessage.prototype.template = function () {
        var content = this.options.content;
        var _myMessage = document.createElement('div');
        _myMessage.setAttribute('id', 'myMessage');
        _myMessage.innerHTML = '<span class="myMessage">' + content + '</span>';

        return _myMessage;
    }

    myMessage.prototype.init = function () {

        var layout = this.template();
        document.body.appendChild(layout);
        var mes = document.getElementsByClassName("myMessage")[0];
        mes.style.height = this.options.height;
        mes.style.width = this.options.width;
        $('#myMessage').css({
            'display': 'block',
            "z-index": "9999"
        });
        this.hide(this.options.timer);
    }

    myMessage.prototype.hide = function (timer) {
        setTimeout(function (timer) {
            var myMessage = document.getElementById("myMessage");
            myMessage.parentNode.removeChild(myMessage);
        }, timer)
    }

    window.myMessage = myMessage;
    window.myDialog = myDialog;
    //用传入的参数替代掉原来的参数 有自定义的参数用自定义的
}(window));

function hideShade() {
    $(".shade_inside_layer").hide(); //.css("display", "none");
    $(".shade_layer").hide(); //.css("display", "none");
}

function showShade() {
    $(".shade_inside_layer").show(); //.css("display", "block");
    $(".shade_layer").show(); //.css("display", "block");
}