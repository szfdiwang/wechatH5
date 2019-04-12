if (!!sessionStorage.myToken) {
    sessionStorage.token = "bearer " + sessionStorage.myToken;
    sessionStorage.openId = sessionStorage.openId;
}
var curObjectString = "";
var UNITTITLE = "申请金额/元";
var UNITTITLESP = "审批金额/元";
var UNIT = "期";
$(document).ready(function () {
    showShade();
    $.ajax({
        //url: urlapp + '/carLoan-web/queryLoanListByIdentity',
        url: urlToken + '/erong-cfss-wechat/wechat/queryLoanListByIdentity',
        type: 'post',
        async: true,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        headers: {
            Authorization: sessionStorage.token
            // Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A"
        },
        data: JSON.stringify({
            //"certNo": sessionStorage.idNo + "",
            // "certNo": "632221199805276024",
            // "cusName": sessionStorage.customerName + "",
            // "cusName": "苏如波",
            // "certType": "001",
            "openId": sessionStorage.openId
            //"openId": "oFNfv0i1TcbkLA0_erpdG125Zkt0"
        }),
        success: function (msg) {
            hideShade();
            // console.log(msg);
            if (msg.stateCode == "200") {
                if (msg.data.loanInfos.length == 0) {
                    var str = '<div class="noInfo"><img src="images/newstyle/no_data@2x.png"/><div class="fontModel">暂无借款信息</div></div>'
                    $(".borrowingCont").append(str);
                } else {
                    // hideShade();
                    // var status10List = [];
                    // var status15List = [];
                    // var status20List = [];
                    // var status30List = [];
                    // var status40List = [];
                    // var status50List = [];
                    // var status60List = [];
                    // var status70List = [];
                    // var appendBody = "";
                    for (var i = 0; i < msg.data.loanInfos.length; i++) {
                        var status10 = ''; //审批中 010
                        var status15 = ''; //待签约 015
                        var status20 = ''; //待放款 020
                        var status30 = ''; //还款中 030
                        var status40 = ''; //已结清 040
                        var status50 = ''; //已拒绝 050
                        var status60 = ''; //已退回 060
                        var status70 = ''; //平台拒绝 070

                        if (msg.data.loanInfos[i].status == "010") {
                            var status10 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="money amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div>' +
                                '<div class="right_box"><span class="title">' + msg.data.loanInfos[i].term + UNIT + '</span><div class="balanceImg"></div>' +
                                '<div class="statusText"><span class="statusOne">' + '审批中' + '</span><span class="statusTwo">' + '待放款' + '</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>申请时间: ' + msg.data.loanInfos[i].createTime + '</span></div></div>' +
                                '<div class="status_title_approval"></div></div>'

                            // status10List.push(status10);

                        } else if (msg.data.loanInfos[i].status == "015") {
                            var status15 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="money amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div>' +
                                '<div class="right_box"><span class="title">' + msg.data.loanInfos[i].term + UNIT + '</span><div class="balanceImg"></div>' +
                                '<div class="statusText"><span class="statusOne">' + '待签约' + '</span><span class="statusTwo">' + '审批中' + '</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>申请时间: ' + msg.data.loanInfos[i].createTime + '</span></div></div>' +
                                '<img src="images/newstyle/borrowing_label10@2x.png" class="status_title"/></div>'
                            // status15List.push(status15);
                        } else if (msg.data.loanInfos[i].status == "020") {
                            var status20 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="money amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div>' +
                                '<div class="right_box"><span class="title">' + msg.data.loanInfos[i].term + UNIT + '</span><div class="balanceImg"></div>' +
                                '<div class="statusText"><span class="statusOne">' + '待放款' + '</span><span class="statusTwo">' + '还款中' + '</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>申请时间: ' + msg.data.loanInfos[i].createTime + '</span></div></div>' +
                                '<img src="images/newstyle/borrowing_label2@2x.png" class="status_title"/></div>'
                            // status20List.push(status20);
                        } else if (msg.data.loanInfos[i].status == "030") {
                            // sessionStorage.payAmount = msg.data.loanInfos[i].payAmount;//传递应还金额进去
                            var status30 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="money amount">' + msg.data.loanInfos[i].finalAmount + '</span><span class="unit">' + UNITTITLESP + '</span></div>' +
                                '<div class="another_right_box"><div class="inside_left_box"><span class="curPeriod">' + msg.data.loanInfos[i].currentTerm + "/" + msg.data.loanInfos[i].term + UNIT + '</span><span class="numOfPeriod">期数</span></div>' +
                                '<div class="inside_right_box"><span class="cureturn">' + msg.data.loanInfos[i].payAmount + '</span><span class="return">当期应还</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>申请时间: ' + msg.data.loanInfos[i].createTime + '</span></div><div class="repayBtn payMymoney">我要还款</div></div>' +
                                '<img src="images/newstyle/borrowing_label8@2x.png" class="status_title"/></div>'
                            // status30List.push(status30);

                        } else if (msg.data.loanInfos[i].status == "040") {
                            var status40 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="moneyGray amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div><div class="term">' + msg.data.loanInfos[i].term + '</div>' +
                                '<div class="another_right_box"><div class="inside_left_box"><span class="curPeriod">' + msg.data.loanInfos[i].currentTerm + "/" + msg.data.loanInfos[i].term + UNIT + '</span><span class="numOfPeriod">期数</span></div>' +
                                '<div class="inside_right_box"><span class="cureturn">' + msg.data.loanInfos[i].nextPayDate + '</span><span class="return">结清时间</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>申请时间: ' + msg.data.loanInfos[i].createTime + '</span></div></div>' +
                                '<img src="images/newstyle/borrowing_label4@2x.png" class="status_title"/></div>'
                            // status40List.push(status40);
                        } else if (msg.data.loanInfos[i].status == "050") {
                            var status50 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="moneyGray amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div>' +
                                '<div class="another_right_box"><div class="inside_left_box"><span class="curPeriod">' + msg.data.loanInfos[i].term + UNIT + '</span><span class="numOfPeriod">期数</span></div>' +
                                '<div class="inside_right_box"><span class="cureturn">' + msg.data.loanInfos[i].applicationDate + '</span><span class="return">申请时间</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>拒绝原因: ' + msg.data.loanInfos[i].returnReason + '</span></div></div>' +
                                '<img src="images/newstyle/borrowing_label12@2x.png" class="status_title"/></div>'
                            // status50List.push(status50);
                        } else if (msg.data.loanInfos[i].status == "060") {
                            var status60 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="moneyGray amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div>' +
                                '<div class="another_right_box"><div class="inside_left_box"><span class="curPeriod">' + msg.data.loanInfos[i].term + UNIT + '</span><span class="numOfPeriod">期数</span></div>' +
                                '<div class="inside_right_box"><span class="cureturn">' + msg.data.loanInfos[i].examineTime + '</span><span class="return">退回时间</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>申请时间: ' + msg.data.loanInfos[i].applicationDate + '</span></div><div class="repayBtn infoSupply">补充资料</div></div>' +
                                '<img src="images/newstyle/borrowing_label5@2x.png" class="status_title"/></div>'
                            // status60List.push(status60);
                        } else if (msg.data.loanInfos[i].status == "070") {
                            var status70 = '<div class="new_style">' +
                                '<div class="top_box"><div class="line_one">' + '<div class="term">' + JSON.stringify(msg.data.loanInfos[i]) + '</div>' +
                                '<span class="line_one_img"></span><span>' + msg.data.loanInfos[i].cpName + '</span></div>' +
                                '<div class="line_two"><div class="left_box"> <span class="moneyGray amount">' + msg.data.loanInfos[i].amount + '</span><span class="unit">' + UNITTITLE + '</span></div>' +
                                '<div class="another_right_box"><div class="inside_left_box"><span class="curPeriod">' + msg.data.loanInfos[i].term + UNIT + '</span><span class="numOfPeriod">期数</span></div>' +
                                '<div class="inside_right_box"><span class="cureturn">' + msg.data.loanInfos[i].applicationDate + '</span><span class="return">申请时间</span></div></div></div></div>' +
                                '<div class="bottom_box"><div class="applyTime"><span>拒绝原因: ' + msg.data.loanInfos[i].returnReason + '</span></div></div>' +
                                '<img src="images/newstyle/borrowing_label13@2x.png" class="status_title"/></div>'
                            // status70List.push(status70);
                        }
                        $(".borrowingCont").append(status10 + status15 + status20 + status30 + status40 + status50 + status60 + status70)

                    }

                    // status10List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // status20List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // status30List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // status40List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // status50List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // status60List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // status70List.forEach(function (item) {
                    //     appendBody += item;
                    // })
                    // $(".borrowingCont").append(status40 + status50 + status60 + status70);
                    $(".new_style").on('click', function () {
                        curObjectString = $(this).find('.term').html();
                        sessionStorage.setItem("curObject", curObjectString);
                        sessionStorage.payAmount = $(this).find('.debtMoney h2').html();

                        window.location.href = "DetailsStaging.html";
                        // $.ajax({
                        //     url: urlapp + '/carLoan-web/queryRepaymentSchedule',
                        //     type: 'post',
                        //     async: true,
                        //     contentType: "application/json;charset=UTF-8",
                        //     dataType: "json",
                        //     data: JSON.stringify({
                        //         "contractNo": "2018072616292933314767989"
                        //     }),
                        //     success: function(msg) {
                        //         window.location.href = "RepayInfo.html";
                        //     },
                        //     error: function(msg) {
                        //         console.log(msg);
                        //     }
                        // });
                    })
                    $(".payMymoney").on("click", function (e) {
                        curObjectString = $(this).parent().parent().find('.term').html(); //('.term').html();
                        sessionStorage.setItem("curObject", curObjectString);
                        e.stopPropagation();
                        window.location.href = "RepayInfo.html";
                    })
                    $(".infoSupply").on("click", function (e) {
                        curObjectString = $(this).parent().parent().find('.term').html();
                        sessionStorage.setItem("curObject", curObjectString);
                        e.stopPropagation();
                        window.location.href = "supplyInfo.html";
                    })
                }
            } else {
                hideShade();
            }
        },
        error: function (msg) {
            hideShade();
        }
    });
})

function hideShade() {
    $(".shade_inside_layer").css("display", "none");
    $(".shade_layer").css("display", "none");
}

function showShade() {
    $(".shade_inside_layer").css("display", "block");
    $(".shade_layer").css("display", "block");
}