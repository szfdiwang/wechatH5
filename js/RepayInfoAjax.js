var selectItem = []; //已经选的期数
var totalMoney = 0; //合计还款金额
var contractNo = ""; //合同号
var erongPutoutNo = "";
var bankPutoutNo = "";
var repayTerms = "";
var cardNo = '0000'; //卡号
var cardNoLast4 = ''; //卡号后四位
var bankNameEn = ''; //银行中文
var bankNameCn = ''; //银行英文
var cardNoLastMore = ''; //卡号
var cellPhone = ''; //电话
var bindId = '';
sessionStorage.cusName = '';
sessionStorage.idNo = '';
var reqId = 'cc' + Date.parse(new Date()) + 'post';
var timer = 60;
var businessNo = "";
var transId = "";
var overdueMoney = 0;
var totalOverDue = 0;

var curIndex = 0;
var indexFlag = false;
var aryPayable = [];
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
]
var sessionObj = JSON.parse(sessionStorage.curObject);
var contractNo = sessionObj.contractNo;
var payAmount = sessionObj.payAmount;

$.ajax({
    //url: urlapp + '/carLoan-web/queryRepaymentSchedule',
    url: urlToken + '/erong-cfss-aps/aps/wx/queryRepaymentSchedule',
    type: 'post',
    async: true,
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    headers: {
        Authorization: sessionStorage.token
        //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
    },
    data: JSON.stringify({
        "contractNo": contractNo + ""
    }),
    success: function (msg) {
        if (msg.stateCode == "200") {
            //if (msg.data.loanAmountAll == "0") {
            // $(".erong").addClass('active');
            // $(".erong").html("暂无数据!");
            // window.location.reload();
            // $('#bankTab').remove();
            // $('#erongTab').remove();

            // $(".bankCont").css("display", "block").html("暂无数据!");
            // } else if (msg.data.loanAmountAll != "0") {
            if (msg.data.erong && !msg.data.bank) {
                contractNo = msg.data.erong.contractNo;
                erongPutoutNo = msg.data.erong.putoutNo;
                $(".erong").addClass('active');
                $(".RepayContLi bank bankCont").css("display", "none");
                $(".RepayContLi erong erongCont").css("display", "block");
                //仅有erong数据
                $('#erongTab').css("width", "100%")
                $('#bankTab').remove();
                showErong(msg);
                touchPayAble();
            } else if (!msg.data.erong && msg.data.bank) {
                contractNo = msg.data.bank.contractNo;
                bankPutoutNo = msg.data.bank.putoutNo;
                $(".bank").addClass('active');
                $(".RepayContLi bank bankCont").css("display", "block");
                $(".RepayContLi erong erongCont").css("display", "none");
                //仅有银行数据
                $('.RepayTitle ul').find('li')[3].remove();
                $('.footbar').hide();
                $('#erongTab').remove();
                $('#bankTab').css("width", "100%")
                showBank(msg);
            } else {
                contractNo = msg.data.erong.contractNo;
                erongPutoutNo = msg.data.erong.putoutNo;
                //2者皆有
                $(".erong").addClass('active');
                showErong(msg);
                showBank(msg);
                touchPayAble();
                tabChange();
            }

        } else {
            return false;
        }
    },
    error: function (msg) {
        console.log(msg)
    }
});

function tabChange() {
    $(".RepayTab ul li").on('click', function () {
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.RepayContLi').eq(index).show().siblings().hide();
        console.log(index);
        if (index == 1) {
            $('.RepayTitle ul').find('li')[3].remove();
            $('.footbar').hide();
        } else if (index == 0 && !$('.RepayTitle ul').find('li')[3]) {
            var liDom = "<li>状态</li>"
            $('.RepayTitle ul').append(liDom);
            $('.footbar').show();
        }
    });
}


function switchLoanStatus(status) {
    // var status = msg.data.erong.payScheduleList[i].payStatus
    switch (status) {
        case 0:
            return "待还款";
            break;
        case 1:
            return "已结清";
            break;
        case 2:
            return "还款中";
            break;
        case 3:
            return "逾期还款";
            break;
        default:
            return "还款中";
            break;
    }

}
// 还款计划列表显示隐藏

function showPlan() {
    var isLimore = false;
    $(".RepayContLi ul li").children().not('span').on('click', function () {
        $(".LiMore").hide();
        if (!isLimore) {
            $(this).parents().css("borderBottom", "none");
            $(this).parents().next('.LiMore').show();
            isLimore = true;
        } else {
            $(".RepayContLi ul li").css("borderBottom", "1px solid #ccc");
            isLimore = false;
        }
    });
}

//填充erong数据
function showErong(msg) {
    var erongpayAbleN = "";
    var erongpayAbleY = "";
    $(".RepayMoney h2 span").html(payAmount);
    $(".unpaidTerm").html(msg.data.erong.unpaidTerm);
    $(".overdueTerm").html(msg.data.erong.overdueTerm);
    $(".paidTerm").html(msg.data.erong.paidTerm);
    $(".productName").html(msg.data.erong.productName);
    $(".loanAmount").html(msg.data.erong.loanAmount);
    if (msg.data.erong.productId == "000408" || msg.data.erong.productId == "000420" || msg.data.erong.productId == "000421" || msg.data.erong.productId == "000410") {

    } else {
        $(".footBtn").hide();
        $(".footbar").css('width', '100%');
    }
    for (var i = 0; i < msg.data.erong.payScheduleList.length; i++) {
        if (msg.data.erong.payScheduleList[i].payAble == "Y") {
            // curIndex = msg.data.erong.payScheduleList[i].currentTerm;
            aryPayable.push(msg.data.erong.payScheduleList[i].currentTerm);
            var erongpayAbleY = '<li class="active">' +
                '<span class="needCheck" checked="false"></span>' +
                '<p>' + msg.data.erong.payScheduleList[i].currentTerm + '期</p>' +
                '<p>' + Number(msg.data.erong.payScheduleList[i].amountRepayment) + '</p>' + //总还款金额
                '<p style="display:none;">' + msg.data.erong.payScheduleList[i].corpInteRepayment + '</p>' + //罚息
                '<p style="display:none;">' + msg.data.erong.payScheduleList[i].payFee + '</p>' + //手续费
                '<p>' + msg.data.erong.payScheduleList[i].payDate + '</p>' +
                '<p>' + switchLoanStatus(msg.data.erong.payScheduleList[i].payStatus) + '</p>' +
                '</li>' +
                '<div class="LiMore">' +
                '<p>' +
                '<span>本金</span>' +
                '<span>' + msg.data.erong.payScheduleList[i].corpRepayment + '</span>' +
                '</p>' +
                '<p>' +
                '<span>利息</span>' +
                '<span>' + msg.data.erong.payScheduleList[i].inteRepayment + '</span>' +
                '</p>' +
                '</div>';
            $(".erongCont ul").append(erongpayAbleY);
        }
        if (msg.data.erong.payScheduleList[i].payAble == "N") {
            var erongpayAbleN = '<li>' +
                '<span></span>' +
                '<p>' + msg.data.erong.payScheduleList[i].currentTerm + '期</p>' +
                '<p>' + Number(msg.data.erong.payScheduleList[i].amountRepayment) + '</p>' +
                '<p style="display:none;">' + msg.data.erong.payScheduleList[i].corpInteRepayment + '</p>' +
                '<p style="display:none;">' + msg.data.erong.payScheduleList[i].payFee + '</p>' + //手续费
                '<p>' + msg.data.erong.payScheduleList[i].payDate + '</p>' +
                '<p>' + switchLoanStatus(msg.data.erong.payScheduleList[i].payStatus) + '</p>' +
                '</li>' +
                '<div class="LiMore">' +
                '<p>' +
                '<span>本金</span>' +
                '<span>' + msg.data.erong.payScheduleList[i].corpRepayment + '</span>' +
                '</p>' +
                '<p>' +
                '<span>利息</span>' +
                '<span>' + msg.data.erong.payScheduleList[i].inteRepayment + '</span>' +
                '</p>' +
                '</div>';
            $(".erongCont ul").append(erongpayAbleN);
        }
    }
    // $(".bankCont").html("暂无数据!");
    // 还款计划列表显示隐藏
    // showPlan();
    payBackMyMoney();
    repayment(msg);
}

//填充bank数据
function showBank(msg) {
    var BankpayAbleN = "";
    var BankpayAbleY = "";
    $(".RepayMoney h2 span").html(payAmount);
    $(".unpaidTerm").html(msg.data.bank.unpaidTerm);
    $(".overdueTerm").html(msg.data.bank.overdueTerm);
    $(".paidTerm").html(msg.data.bank.paidTerm);
    $(".productName").html(msg.data.bank.productName);
    $(".loanAmount").html(msg.data.bank.loanAmount);
    for (var i = 0; i < msg.data.bank.payScheduleList.length; i++) {

        // if (msg.data.bank.payScheduleList[i].payAble == "Y") {
        //     var BankpayAbleY = '<li class="active">' +
        //         '<span></span>' +
        //         '<p>' + msg.data.bank.payScheduleList[i].currentTerm + '期</p>' +
        //         '<p>' + msg.data.bank.payScheduleList[i].amountRepayment + '</p>' +
        //         '<p>' + msg.data.bank.payScheduleList[i].payDate + '</p>' +
        //         '<p>' + switchLoanStatus(msg.data.erong.payScheduleList[i].payStatus) + '</p>' +
        //         '</li>';
        //     $(".bankCont ul").append(BankpayAbleY);
        // }
        // if (msg.data.bank.payScheduleList[i].payAble == "N") {
        var BankpayAbleN = '<li>' +
            '<span></span>' +
            '<p>' + msg.data.bank.payScheduleList[i].currentTerm + '期</p>' +
            '<p>' + msg.data.bank.payScheduleList[i].amountRepayment + '</p>' +
            '<p>' + msg.data.bank.payScheduleList[i].payDate + '</p>' +
            // '<p>' + switchLoanStatus(msg.data.bank.payScheduleList[i].payStatus) + '</p>' +
            '</li>' +
            '<div class="LiMore">' +
            '<p>' +
            '<span>本金</span>' +
            '<span>' + msg.data.bank.payScheduleList[i].corpRepayment + '</span>' +
            '</p>' +
            '<p>' +
            '<span>利息</span>' +
            '<span>' + msg.data.bank.payScheduleList[i].inteRepayment + '</span>' +
            '</p>' +
            '</div>';;
        $(".bankCont ul").append(BankpayAbleN);
        // }
    }
    // 还款计划列表显示隐藏
    showPlan();
    // touchPayAble();
}
//扩展nextAll
$.fn.nextAll = function (selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) return $([]);
    while (el.nextElementSibling) {
        var next = el.nextElementSibling;
        if (selector) {
            if ($(next).is(selector)) nextEls.push(next);
        } else nextEls.push(next);
        el = next;
    }
    return $(nextEls);
};
//浮点计算(还是会有精度丢失问题)
function floatCompute(a, b, flag) {
    var r1, r2, m;
    try {
        r1 = a.toString().split('.')[1].length;
    } catch (error) {
        r1 = 0;
    }
    try {
        r2 = b.toString().split('.')[1].length;
    } catch (error) {
        r2 = 0;
    }


    m = Math.pow(10, Math.max(r1, r2));
    if (flag) {
        return (a * m + b * m) / m;
    } else {
        return (a * m - b * m) / m;
    }

}
//切换选择期数
function touchPayAble() {
    $('.needCheck').on('click', function () {
        var aDom = $(this).nextAll();
        var thePeriod = aDom[0].innerHTML.split('期')[0]; //期数
        var periodNum = thePeriod.split('/')[0];
        var money = aDom[1].innerHTML; //总金额
        var overdueMoney = aDom[2].innerHTML; //罚息
        var payFee = aDom[3].innerHTML; //手续费
        if (this.attributes[1].nodeValue == "false") {
            $(this).css({
                'background': 'url(images/icon_40x40_26@2x.png) no-repeat',
                'background-size': '1rem',
                'background-position': '0 .94rem'
            });
            $(this).attr('checked', 'true');
            //未选中到已选中加入数组
            totalMoney = math.format(Number(totalMoney) + Number(money) - Number(overdueMoney), 14) //floatCompute(totalMoney, money, true)
            totalOverDue = math.format(Number(totalOverDue) + Number(overdueMoney), 14);
            selectItem.push(thePeriod);
        } else {
            $(this).css({
                'background': 'url(images/icon_40x40_27@2x.png) no-repeat',
                'background-size': '1rem',
                'background-position': '0 .94rem'
            });
            $(this).attr('checked', 'false');
            //已选中到未选中推出数组
            totalMoney = math.format(Number(totalMoney) + Number(overdueMoney) - Number(money), 14) //floatCompute(totalMoney, money, false)
            totalOverDue = math.format(Number(totalOverDue) - Number(overdueMoney), 14);
            var pindex = selectItem.indexOf(thePeriod);
            if (pindex > -1) {
                selectItem.splice(pindex, 1);
            }
        }
    })
}

//还款按钮

function aryFn(ary) {
    var newAry = [];
    for (var i in ary) {
        newAry[i] = ary[i].split('/')[0];
    }
    return newAry;
}

function sortarr(arr) {
    for (i = 0; i < arr.length - 1; i++) {
        for (j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function aryFn2(ary) {
    curIndex = aryPayable[0].split('/')[0]; //第一位
    ary = sortarr(ary);
    if (ary.length > 1) {
        for (var i = 0; i < ary.length - 1; i++) {
            if (ary.indexOf(curIndex) == -1 || Math.abs(ary[i + 1] - ary[i]) != 1) {
                return false;
            } else {
                return true;
            }
        }
    } else if (ary.length = 1 && ary[0] == curIndex) {
        return true;
    } else {
        return false;
    }
}

contList = 0;

function payBackMyMoney() {
    $('.footbar').on('click', function () {
        if (selectItem.length == 0) {
            new myMessage({
                content: '请选择您要还款的期数!',
                timer: 2000
            });
            return;
        } else if (!aryFn2(aryFn(selectItem))) {
            new myMessage({
                content: '请按照顺序选择还款期数!',
                timer: 2000
            });
            return;
        } else {
            $.ajax({
                url: urlToken + 'erong-cfss-wechat/baofu/getLocalValidAuthBind',
                type: 'post',
                headers: {
                    Authorization: sessionStorage.token
                    //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
                },
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                data: JSON.stringify({
                    "openId": sessionStorage.openId
                    //openId: "oFNfv0i1TcbkLA0_erpdG125Zkt0" //sessionStorage.openId
                }),
                success: function (res) {
                    if (res.data && res.data.length != 0 && res.data[0].STATUS == "1") {
                        //已绑卡
                        // console.log(res);
                        cusName = res.data[contList].cusName;
                        cardNo = res.data[contList].cardNum;
                        cardNoLast4 = res.data[contList].cardNum.slice(-4);
                        bankNameEn = res.data[contList].bankCode;
                        cardNoLastMore = res.data[contList].cardNum;
                        bankNameCn = changeBankName(res.data[contList].bankCode, true);
                        bindId = res.data[contList].bindId;
                        phoneNum = res.data[contList].phoneNum;
                        // overdueMoney = res.data[0].corpInteRepayment;
                        // totalMoney = res.data[]
                        // transId = res.data[0].transId;
                        var moneyCode = math.format(Number(totalMoney) + Number(totalOverDue), 14) + "";
                        var layout = new myDialog({
                            target: '.footbar',
                            title: '<div class="myDialog_header_title">' +
                                '<div class="header_item">' + '还款金额' + '</div>' +
                                '<div class="header_money "><span class="orange_font title_size_font">' + totalMoney + '</span>' +
                                ' + <span>逾期费</span>' + '<span class="orange_font" >' + totalOverDue + '</span><img src="images/question.png" id="tisp3Btn">' + '</div>' +
                                // ' + <span>逾期费</span>' + '<span class="orange_font" >111</span><img src="images/question.png" id="tisp3Btn">' + '</div>' +
                                '</div>',
                            content: '<div class="content_firstline aLcarList">' +
                                '<div class="content_firstline_box standardbox">支付方式</div>' +
                                '<div class="content_firstline_box onehalfbox"><div class="iconbox"></div>' + bankNameCn + '</div><div class="content_firstline_box lettlebox">(' + cardNoLast4 + ') </div></div>' +
                                '<div class="addCardNum"><span><img src="images/add.png"></span><p>添加银行卡</p></div>' +
                                '<div class="validateLine"><input class="validateInput">' + '<div class="validateBtn" onclick="getSms(' + moneyCode + "" + ')">' + '获取验证码' + '</div>' + '</div>'
                        }).setWidth('90%').setHeight('20rem');
                        $('#myDialog').css('display', 'block');
                        if (bankNameEn) {
                            $('.iconbox').css({
                                'background': 'url(images/bank/icon-' + bankNameEn + '.png) no-repeat',
                                'background-size': '100%'
                            })
                        }
                        $("#tisp3Btn").on('click', function () {
                            $(".tips3").show();
                        });
                        qdBtn();
                        $("#myDialog-ok").addClass("activeBtn1");
                        addCardNum();
                        aLcarList();
                        $(".activeBtn1").on('click', function () {
                            confirmPayBtn();
                        });
                    } else if (res.data.length == 0) {
                        new myMessage({
                            content: '请您先绑定银行卡!',
                            timer: 1500
                        });
                        //未绑卡
                        $.ajax({
                            url: urlToken + 'erong-cfss-wechat/wechat/queryCustomer',
                            type: 'post',
                            headers: {
                                Authorization: sessionStorage.token
                                //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
                            },
                            contentType: "application/json;charset=UTF-8",
                            dataType: "json",
                            data: JSON.stringify({
                                "openId": sessionStorage.openId
                                //openId: "oFNfv0i1TcbkLA0_erpdG125Zkt0" //sessionStorage.openId
                            }),
                            success: function (res) {
                                if (res && res.resultCode == 1) {
                                    sessionStorage.cusName = res.data.customerName; //客户姓名
                                    sessionStorage.idNo = res.data.idNo; //身份证
                                    window.location.href = "bindBankCard.html";
                                } else {
                                    new myMessage({
                                        content: res.errorDesc,
                                        timer: 2000
                                    });
                                }
                            },
                            error: function (error) {
                                console.log(error);
                                new myMessage({
                                    content: '网络故障,请稍后重试',
                                    timer: 2000
                                });
                            }
                        })
                    } else {
                        new myMessage({
                            content: '网络故障,请稍后重试',
                            timer: 2000
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                    new myMessage({
                        content: '网络故障,请稍后重试',
                        timer: 2000
                    });
                }
            })

        }
    })
}


function aLcarList() {
    $(".aLcarList").on('click', function () {
        $(".carListDialog ul").html("");
        $.ajax({
            url: urlToken + 'erong-cfss-wechat/baofu/getLocalValidAuthBind',
            type: 'post',
            headers: {
                Authorization: sessionStorage.token
                //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
            },
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify({
                "openId": sessionStorage.openId
                //openId: "oFNfv0i1TcbkLA0_erpdG125Zkt0" //sessionStorage.openId
            }),
            success: function (res) {
                // console.log(res.data.length);
                if (res.resultCode == "1") {
                    for (var i = 0; i < res.data.length; i++) {
                        bankNameCn = changeBankName(res.data[i].bankCode, true);
                        bankNameEn = res.data[i].bankCode;
                        cardNoLast4 = res.data[i].cardNum.slice(-4);
                        var carListLi = '<li><img src="images/bank/icon-' + bankNameEn + '.png"><i style="display:none;">' + bankNameEn + '</i>' + bankNameCn + '<span>(' + cardNoLast4 + ')</span></li>';
                        $(".carListDialog ul").append(carListLi);
                        $(".carListDialog ul li").eq(contList).addClass('active');
                    }
                    $(".carListDialog").show();
                    $(".carListCont ul li").on('click', function () {
                        $(this).addClass('active').siblings().removeClass('active');
                        // init();
                        // console.log(contList);
                        contList = $(this).index();
                        bankNameCn = changeBankName(res.data[contList].bankCode, true);
                        bankNameEn = res.data[contList].bankCode;
                        cardNoLast4 = res.data[contList].cardNum.slice(-4);
                        $(".aLcarList").html('<div class="content_firstline_box standardbox">支付方式</div>' +
                            '<div class="content_firstline_box onehalfbox"><div class="iconbox"></div>' + bankNameCn + '</div><div class="content_firstline_box lettlebox">(' + cardNoLast4 + ') </div>');
                        if (bankNameEn) {
                            $('.iconbox').css({
                                'background': 'url(images/bank/icon-' + bankNameEn + '.png) no-repeat',
                                'background-size': '100%'
                            })
                        }
                        $(".carListDialog").hide();
                    });
                }
            },
            error: function (error) {
                console.log(error);
                new myMessage({
                    content: '网络故障,请稍后重试',
                    timer: 2000
                });
            }
        })
    });
}


function repayment(msg) {
    $(".footBtn").on('click', function () {
        $(this).addClass("footBtnActive");
        // console.log(msg.data.erong.payScheduleList.length);
        for (var i = 0; i < msg.data.erong.payScheduleList.length; i++) {
            if (msg.data.erong.payScheduleList[i].payStatus == "3") {
                $(".tips1").show();
                qdBtn();
                return;
            }
        }
        $.ajax({
            url: urlToken + 'erong-cfss-wechat/baofu/getLocalValidAuthBind',
            type: 'post',
            headers: {
                Authorization: sessionStorage.token
                //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
            },
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify({
                "openId": sessionStorage.openId
                //openId: "oFNfv0i1TcbkLA0_erpdG125Zkt0" //sessionStorage.openId
            }),
            success: function (res) {
                if (res.data && res.data.length != 0 && res.data[0].STATUS == "1") {
                    //已绑卡
                    cusName = res.data[contList].cusName;
                    cardNo = res.data[contList].cardNum;
                    cardNoLast4 = res.data[contList].cardNum.slice(-4);
                    cardNoLastMore = res.data[contList].cardNum;
                    bankNameEn = res.data[contList].bankCode;
                    bankNameCn = changeBankName(res.data[contList].bankCode, true);
                    bindId = res.data[contList].bindId;
                    phoneNum = res.data[contList].phoneNum;

                    $.ajax({
                        url: urlToken + 'erong-core-acct/acct/entry/trans/appAheadPayRepayment',
                        type: 'post',
                        headers: {
                            Authorization: sessionStorage.token
                            //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
                        },
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        data: JSON.stringify({
                            "putoutNo": erongPutoutNo,
                            "aheadPayType": "02"
                        }),
                        success: function (res) {
                            if (res.resultCode == "1") {
                                totalMoney = res.data.aheadPayAmount;
                                payCorp = res.data.payCorp;
                                actualCorp = res.data.payCorp;
                                payInte = res.data.payInte;
                                poundAge = res.data.poundAge;
                                payFee = res.data.payFee;
                                var layout = new myDialog({
                                    target: '.footbar',
                                    title: '<div class="myDialog_header_title">' +
                                        '<div class="header_item">' + '还款金额' + '</div>' +
                                        '<div class="header_money "><span class="orange_font title_size_font">' + totalMoney + '</span>' +
                                        '<img src="images/question.png" id="tisp4Btn">' + '</div>' +
                                        '</div>',
                                    content: '<div class="content_firstline aLcarList">' +
                                        '<div class="content_firstline_box standardbox">支付方式</div>' +
                                        '<div class="content_firstline_box onehalfbox"><div class="iconbox"></div>' + bankNameCn + '</div><div class="content_firstline_box lettlebox">(' + cardNoLast4 + ') </div></div>' +
                                        '<div class="addCardNum"><span><img src="images/add.png"></span><p>添加银行卡</p></div>' +
                                        '<div class="validateLine"><input class="validateInput">' + '<div class="validateBtn" onclick="getSms(' + totalMoney + ')">' + '获取验证码' + '</div>' + '</div>'
                                }).setWidth('90%').setHeight('20rem');
                                $('#myDialog').css('display', 'block');
                                if (bankNameEn) {
                                    $('.iconbox').css({
                                        'background': 'url(images/bank/icon-' + bankNameEn + '.png) no-repeat',
                                        'background-size': '100%'
                                    })
                                }

                                $("#myDialog-ok").addClass("activeBtn2");
                                $(".activeBtn2").on('click', function () {
                                    addClickFn();
                                });
                                $("#tisp4Btn").on('click', function () {
                                    var tisp4 = ' <div class="payStatusTitle">' +
                                        '<h2>提前还款金额</h2>' +
                                        '<p>' + totalMoney + '</p>' +
                                        '</div>' +
                                        '<div class="payStatusTxt status4Push">' +
                                        '<p><span>还款本金</span><span>' + payCorp + '</span></p>' +
                                        '<p><span>还款利息</span><span>' + payInte + '</span></p>' +
                                        '<p><span>提前还款违约金</span><span>' + poundAge + '</span></p>' +
                                        '<p><span>手续费</span><span>' + payFee + '</span></p>' +
                                        '</div>' +
                                        '<div class="payStatusBtn">确定</div>';
                                    $(".payStatus4Cont").html(tisp4);
                                    $(".tips4").show();
                                    qdBtn();
                                });
                                addCardNum();
                                aLcarList();
                            } else {
                                $(".footBtn").removeClass("footBtnActive");
                                new myMessage({
                                    content: res.errorDesc,
                                    timer: 2000
                                });
                            }
                        },
                        error: function (error) {
                            new myMessage({
                                content: '网络故障,请稍后重试',
                                timer: 2000
                            });
                        }
                    })
                } else if (res.data.length == 0) {
                    new myMessage({
                        content: '请您先绑定银行卡!',
                        timer: 1500
                    });
                    //未绑卡
                    $.ajax({
                        url: urlToken + 'erong-cfss-wechat/wechat/queryCustomer',
                        type: 'post',
                        headers: {
                            Authorization: sessionStorage.token
                            //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
                        },
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        data: JSON.stringify({
                            "openId": sessionStorage.openId
                            //openId: "oFNfv0i1TcbkLA0_erpdG125Zkt0" //sessionStorage.openId
                        }),
                        success: function (res) {
                            if (res && res.resultCode == 1) {
                                sessionStorage.cusName = res.data.customerName; //客户姓名
                                sessionStorage.idNo = res.data.idNo; //身份证
                                window.location.href = "bindBankCard.html";
                            } else {
                                new myMessage({
                                    content: res.errorDesc,
                                    timer: 2000
                                });
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            new myMessage({
                                content: '网络故障,请稍后重试',
                                timer: 2000
                            });
                        }
                    })
                } else {
                    new myMessage({
                        content: '网络故障,请稍后重试',
                        timer: 2000
                    });
                }
            },
            error: function (err) {
                console.log(err);
                new myMessage({
                    content: '网络故障,请稍后重试',
                    timer: 2000
                });
            }
        })


    });
}

function qdBtn() {
    $(".payStatusBtn").on('click', function () {
        $(".payStatus3").hide();
        $(".footBtn").removeClass("footBtnActive");
    });
}

$("#tisp2Btn").on('click', function () {
    $(".tips2").show();
    qdBtn();
});

function addCardNum() {
    $(".addCardNum").on('click', function () {
        $.ajax({
            url: urlToken + 'erong-cfss-wechat/wechat/queryCustomer',
            type: 'post',
            headers: {
                Authorization: sessionStorage.token
                //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
            },
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify({
                "openId": sessionStorage.openId
                //openId: "oFNfv0i1TcbkLA0_erpdG125Zkt0" //sessionStorage.openId
            }),
            success: function (res) {
                if (res && res.resultCode == 1) {
                    sessionStorage.cusName = res.data.customerName; //客户姓名
                    sessionStorage.idNo = res.data.idNo; //身份证
                    window.location.href = "bindBankCard.html";
                } else {
                    new myMessage({
                        content: res.errorDesc,
                        timer: 2000
                    });
                }
            },
            error: function (error) {
                console.log(error);
                new myMessage({
                    content: '网络故障,请稍后重试',
                    timer: 2000
                });
            }
        })
    })

}

function countDown(moneyCode) {
    if (timer == 0) {
        $('.validateBtn').attr("onclick", 'getSms(' + moneyCode + ')')
        $('.validateBtn').text("获取验证码");
        $('.validateBtn').css('color', '#ffffff');
        timer = 60;
        return;
    } else {
        $('.validateBtn').attr("onclick", 'null')
        $('.validateBtn').text("重新获取  " + timer + "s");
        $('.validateBtn').css('color', '#d9d9d9');
        timer--;
        console.log(timer);
    }

    setTimeout(function () {
        countDown(moneyCode);
    }, 1000) //每一秒钟执行一次替换
}



function getSms(moneyCode) {
    var curDate = new Date().format('yyyyMMddhhmmss');
    var sendtransId = 'wx' + sessionStorage.openId.substring(sessionStorage.openId.length - 10, sessionStorage.openId.length) + curDate;
    $('.validateBtn').css('color', '#d9d9d9');
    $('.validateBtn').attr("onclick", 'null')
    $.ajax({
        url: urlToken + "/erong-cfss-tass/baofoo/readyPayOfRZ",
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
                txn_amt: moneyCode + "",
                bind_id: bindId ? bindId : sessionStorage.bindId,
                trans_id: sendtransId,
                trade_date: curDate,
            }
        }),
        success: function (res) {
            if (res && res.resultCode == 1) {
                businessNo = res.data.business_no;
                transId = res.data.trans_id;
                countDown(moneyCode);
            } else {

                $('.validateBtn').attr("onclick", 'getSms(' + moneyCode + ')')
                $('.validateBtn').text("获取验证码");
                $('.validateBtn').css('color', '#ffffff');
                new myMessage({
                    content: res.errorDesc,
                    timer: 2000
                });
            }
        },
        error: function (err) {
            $('.validateBtn').attr("onclick", 'getSms(' + moneyCode + ')')
            $('.validateBtn').text("获取验证码");
            $('.validateBtn').css('color', '#ffffff');
            // console.log(err);
            new myMessage({
                content: '网络故障,请稍后重试!',
                timer: 2000
            });
        }
    })
}


function confirmPayBtn() {
    var sms = $('.validateInput').val();
    if (!sms) {
        new myMessage({
            content: '请输入短信验证码',
            timer: 2000
        });
        hideShade();
        return false;
    } else {
        showShade();
    }
    $.ajax({
        url: urlToken + "/erong-core-acct/acct/entry/trans/transBySelf", // "/erong-cfss-tass/baofoo/confirmPayOfRZ",
        type: 'post',
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        headers: {
            Authorization: sessionStorage.token
            //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
        },
        data: JSON.stringify({
            // reqId: reqId,
            // reqSys: 'wx',
            // reqParams: {
            repaymentAmount: math.format(Number(totalMoney) + Number(totalOverDue), 14) + "",
            smsCode: sms,
            putoutNo: erongPutoutNo, //借据编号
            businessNo: businessNo,
            toPhone: phoneNum,
            orderNo: transId,
            orderType: "03",
            repaymentWay: "6",
            accountNo: cardNoLastMore + "",
            accountBankName: bankNameCn
        }),
        success: function (res) {
            if (res && res.resultCode == 1) {
                hideShade();
                var desDom = document.getElementById("myDialog");
                desDom.parentNode.removeChild(desDom);
                new myMessage({
                    content: '还款成功',
                    timer: 2000
                });
                setTimeout(function () {
                    window.location.href = "RepayInfo.html";
                }, 1000)
            } else if (res.errorDesc == "参数orderNo不能为空") {
                new myMessage({
                    content: '请先点击获取验证码',
                    timer: 2000
                });
                hideShade();
            } else {
                new myMessage({
                    content: res.errorDesc,
                    timer: 2000
                });
                hideShade();
            }
        },
        error: function (err) {
            console.log(err);
            new myMessage({
                content: '网络故障,请稍后重试!',
                timer: 2000
            });
            hideShade();
        }
    })
}

function addClickFn() {
    var sms = $('.validateInput').val();
    if (!sms) {
        new myMessage({
            content: '请输入短信验证码',
            timer: 2000
        });
        hideShade();
        return false;
    } else {
        showShade();
    }
    console.log(Number(totalMoney) + "");
    console.log(bankNameCn);
    //return;
    $.ajax({
        url: urlToken + "erong-core-acct/acct/entry/trans/appTransAheadPay",
        type: 'post',
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        headers: {
            Authorization: sessionStorage.token
            //Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
        },
        data: JSON.stringify({
            putoutNo: erongPutoutNo, //借据编号
            orderNo: transId,
            orderType: "04",
            repaymentWay: "6",
            repaymentAmount: Number(totalMoney) + "", //1
            smsCode: sms,
            businessNo: businessNo,
            toPhone: phoneNum,
            repaymentChannel: "01",
            aheadPayType: "02",
            payCorp: payCorp + "",
            actualCorp: actualCorp + "",
            actualInte: payInte + "",
            actualPoundage: poundAge + "",
            payFee: payFee + "",
            actualFee: payFee + "",
            accountNo: cardNoLastMore + "",
            accountBankName: bankNameCn
        }),
        success: function (res) {
            if (res && res.resultCode == 1) {
                hideShade();
                var desDom = document.getElementById("myDialog");
                desDom.parentNode.removeChild(desDom);
                new myMessage({
                    content: '还款成功',
                    timer: 2000
                });
                setTimeout(function () {
                    window.location.href = "RepayInfo.html";
                }, 1000)
            } else if (res.errorDesc == "参数orderNo不能为空") {
                new myMessage({
                    content: '请先点击获取验证码',
                    timer: 2000
                });
                hideShade();
            } else {
                new myMessage({
                    content: res.errorDesc,
                    timer: 2000
                });
                hideShade();
            }
        },
        error: function (err) {
            console.log(err);
            new myMessage({
                content: '网络故障,请稍后重试!',
                timer: 2000
            });
            hideShade();
        }
    })
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