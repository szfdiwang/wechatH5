window.onload = function() {
    function getName(params) {
        var name = sessionStorage.cusName;
        $('#bindBankCusName').val(name);
    }
    getName();
}

var curNum;
var timer = 60;
var reqId = 'cc' + Date.parse(new Date()) + 'post';
var bankNo = "";

function takeBankCardFn(BankNo) {
    if (BankNo.value == "") return;
    var account = new String(BankNo.value);
    account = account.substring(0, 23); /*帐号的总数, 包括空格在内 */
    if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}") == null) {
        /* 对照格式 */
        if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}|" +
                ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}") == null) {
            var accountNumeric = accountChar = "",
                i;
            for (i = 0; i < account.length; i++) {
                accountChar = account.substr(i, 1);
                if (!isNaN(accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i = 0; i < accountNumeric.length; i++) {
                if (i == 4) account = account + " ";
                if (i == 8) account = account + " ";
                if (i == 12) account = account + " ";
                if (i == 16) account = account + " ";
                account = account + accountNumeric.substr(i, 1)
            }
        }
    } else {
        account = " " + account.substring(1, 5) + " " + account.substring(6, 10) + " " + account.substring(14, 18) + "-" + account.substring(18, 25);
    }
    if (account != BankNo.value) BankNo.value = account;

}

function changeBankName(name, bol) {
    for (var i in bankList) {
        var obj = bankList[i]
        if (bol) { //英文反中文
            if (obj.bankNameEn == name) {
                return obj.bankNameCn;
            }
        } else {
            if (obj.bankNameCn == name) {
                return obj.bankNameEn;
            }
        }
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function judgeBank(bankheadnum) {
    if (bankheadnum.value == "") return;
    curNum = Trim(bankheadnum.value, 'g');
    $.ajax({
        url: urlToken + 'erong-cfss-wechat/baofu/getCardForBank',
        type: 'post',
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        headers: {
			Authorization: sessionStorage.token
            //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
        },
        data: JSON.stringify({
            cardNum: curNum
        }),
        success: function(res) {
            console.log(res);
            if (res && res.resultCode == 1) {
                if (res.data.bankName != undefined) {
                    // var bankName = res.data.bankName;
                    bankNo = res.data.bankNo;
                    var bankNameCn = changeBankName(res.data.bankNo, true);
                    $('#bankName').text(bankNameCn).css('color', '#ffffff');
                    $('#cardNum').text('银行卡号: ' + curNum).css('color', '#ffffff');
                    var today = getNowFormatDate();
                    $('#cardDate').text('绑卡日期 :' + today).css('color', '#ffffff');
                    $('.card_detail').css({
                        'background': 'url(images/bank/icon_690x300_2@2x.png) no-repeat',
                        'background-size': '100%'
                    });
                    $('.bank_icon').css({
                        'background': 'url(images/bank/icon-' + bankNo + '.png) no-repeat',
                        'background-size': '100%'
                    })
                } else {
                    new myMessage({
                        content: res.errorDesc,
                        timer: 2000
                    });
                }
            } else {
                new myMessage({
                    content: '网络故障,请稍后重试',
                    timer: 2000
                });
            }
        },
        error: function(err) {
            console.log(err);
        }
    })

}

function Trim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}


function countDown() {
    if (timer == 0) {
        $('#get_phone_message').attr("onclick", 'getMessage()')
        $('#get_phone_message').text("获取验证码");
        $('#get_phone_message').css('color', '#f08300');
        timer = 60;
        return;
    } else {
        $('#get_phone_message').attr("onclick", 'null')
        $('#get_phone_message').text("重新获取  " + timer + "s");
        $('#get_phone_message').css('color', '#d9d9d9');
        timer--;
        console.log(timer);
    }

    setTimeout(function() {
            countDown();
        }, 1000) //每一秒钟执行一次替换
}

function getMessage() {
    var phone = $('#phoneNum').val();
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

    //间隔时长
    curNum = Trim($('#input_carNum').val(), 'g');
    $('#get_phone_message').attr("onclick", 'null')
    $('#get_phone_message').css('color', '#d9d9d9');
    if (curNum) {
        if (phone && myreg.test(phone)) {
            $.ajax({
                url: urlToken + '/erong-cfss-tass/baofoo/readyBindOfRZ', //'erong-cfss-tass/baofoo/readySignOfXY',
                type: 'post',
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                headers: {
					Authorization: sessionStorage.token
                    //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
                },
                data: JSON.stringify({
                    reqId: reqId,
                    reqSys: 'wx',
                    reqParams: {
                        acc_no: curNum,
                        id_card: sessionStorage.idNo, //身份证
                        id_holder: sessionStorage.cusName,
                        mobile: phone,
                        pay_code: bankNo,
                        trans_id: reqId
                    }
                }),
                success: function name(res) {
                    if (res && res.resultCode == 1) {
                        res.data.unique_code;
                        countDown();
                    } else {
                        $('#get_phone_message').css('color', '#f08300');
                        $('#get_phone_message').attr("onclick", 'getMessage()')
                        new myMessage({
                            content: res.errorDesc,
                            timer: 2000
                        });
                    }
                },
                error: function name(err) {
                    $('#get_phone_message').css('color', '#f08300');
                    $('#get_phone_message').attr("onclick", 'getMessage()')
                    console.log(err)
                    new myMessage({
                        content: '网络故障,请重试',
                        timer: 2000
                    });
                }
            })

        } else {
            $('#get_phone_message').css('color', '#f08300');
            $('#get_phone_message').attr("onclick", 'getMessage()')
            new myMessage({
                content: '您输入的电话号吗有误,请重新输入',
                timer: 2000
            });
        }
    } else {
        $('#get_phone_message').css('color', '#f08300');
        $('#get_phone_message').attr("onclick", 'getMessage()')
        new myMessage({
            content: '请您输入银行卡号',
            timer: 2000
        });
    }
}


function bindCardFn() {
    var sms = $('#smsNum').val();
    $.ajax({
        url: urlToken + '/erong-cfss-tass/baofoo/confirmBindOfRZ', //'erong-cfss-tass/baofoo/readySignOfXY',
        type: 'post',
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        headers: {
			Authorization: sessionStorage.token
            //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
        },
        data: JSON.stringify({
            reqId: reqId,
            reqSys: 'wx',
            reqParams: {
                sms_code: sms,
                trans_id: reqId, //身份证
            }
        }),
        success: function name(res) {
            console.log(res);
            if (res && res.resultCode == 1) {
                sessionStorage.bindId = res.data.bindId;
                new myMessage({
                    content: '绑定银行卡成功,即将跳转还款页面',
                    timer: 2000
                });
                setTimeout(function() {
                    window.location.href = "RepayInfo.html";
                }, 2000)
            } else if (res.errorDesc == "参数orderNo不能为空") {
                new myMessage({
                    content: '请先点击获取验证码',
                    timer: 2000
                });
            } else {
                new myMessage({
                    content: res.errorDesc,
                    timer: 2000
                });
            }
        },
        error: function name(err) {
            console.log(err);
            new myMessage({
                content: '网络故障请联系客服',
                timer: 2000
            });
        }
    })
}