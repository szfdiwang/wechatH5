window.onload = function () {
    // 获取网关token
    (function () {
        $.ajax({
            type: 'get',
            headers: {
                Authorization: "Basic ZXJvbmdfMTAwMDQwMDFfMDE6NWU0YTU0MDA4NWU1NGU0Mzk5ZDk2ODU3YTEwNWQ1ODE="
            },
            url: urlToken + "auth/oauth/token?grant_type=client_credentials",
            dataType: 'JSON',
            success: function (msg) {
                msg = JSON.parse(msg);
                token = "bearer " + msg.access_token;
                sessionStorage.token = token;
            },
            error: function (msg) {
                console.log(msg);
            }
        });
        
        //sessionStorage.token = token;
    })();
    // 获取短信接口
    $(".bindCont ul li.phoneCode input.org").on('click', function () {
        var Mphone = $(".phone").val();
        if (!(/^1[345678]\d{9}$/.test(Mphone))) {
            $(".tipsInfo span").html("手机号码有误，请重填！");
            $(".tipsInfo").show();
            setTimeout(function () {
                $(".tipsInfo").hide();
            }, 1000);
            return false;
        } else {
            $.ajax({
                url: urlToken + '/erong-cfss-wechat/wechat/getValiCode',
                type: 'get',
                //async: true,
                headers: {
                    Authorization: sessionStorage.token
                },
                data: {
                    "cellPhone": Mphone + ""
                },
                dataType: "json",
                success: function (msg) {
                    console.log(msg);
                    if (msg.resultCode == "1") {
                        var count = 60;

                        function CountDown() {
                            $(".org").attr("disabled", true);
                            $(".org").val(count + "秒后重新获取");
                            if (count == 0) {
                                $(".org").val("获取验证码").removeAttr("disabled");
                                clearInterval(countdown);
                            }
                            count--;
                        }
                        var countdown = setInterval(CountDown, 1000);
                    } else {
                        console.log(msg.responseMsg);
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            });
        }
    });

    // 绑定账户
    $(".bindInfo").on('click', function () {
        if ($(".customerName").val() == "") {
            $(".tipsInfo span").html("请输入真实姓名！");
            $(".tipsInfo").show();
            setTimeout(function () {
                $(".tipsInfo").hide();
            }, 1000);
            return false;
        }
        var idTypeIf = $(".idType option").not(function () {
            return !this.selected
        }).text();
        if (idTypeIf == "请选择") {
            $(".tipsInfo span").html("请选择证件种类！");
            $(".tipsInfo").show();
            setTimeout(function () {
                $(".tipsInfo").hide();
            }, 1000);
            return false;
        }
        var idType = $(".idType option").not(function () {
            return !this.selected
        }).val();
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test($(".idNo").val()) === false) {
            $(".tipsInfo span").html("身份证输入不合法");
            $(".tipsInfo").show();
            setTimeout(function () {
                $(".tipsInfo").hide();
            }, 1000);
            return false;
        }
        var Mphone = $(".phone").val();
        if (Mphone == "") {
            $(".tipsInfo span").html("手机号码不能为空！");
            $(".tipsInfo").show();
            setTimeout(function () {
                $(".tipsInfo").hide();
            }, 1000);
            return false;
        } else {
            if (!(/^1[345678]\d{9}$/.test(Mphone))) {
                $(".tipsInfo span").html("手机号码有误，请重新输入！");
                $(".tipsInfo").show();
                setTimeout(function () {
                    $(".tipsInfo").hide();
                }, 1000);
                return false;
            }
        };
        if ($(".valiCode").val() == '') {
            $(".tipsInfo span").html("请输入验证码！！");
            $(".tipsInfo").show();
            setTimeout(function () {
                $(".tipsInfo").hide();
            }, 1000);
            return false;
        };
        var customerName = $(".customerName").val() + "";
        var idNo = $(".idNo").val() + "";
        var valiCode = $(".valiCode").val() + "";

        $.ajax({
            url: urlToken + '/erong-cfss-wechat/wechat/bindWechat',
            type: 'post',
            async: true,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            headers: {
                Authorization: sessionStorage.token
            },
            data: JSON.stringify({
                "customerName": customerName,
                "idType": idType + "",
                "idNo": idNo,
                "cellPhone": Mphone + "",
                "openId": sessionStorage.openId,
                "valiCode": valiCode
            }),
            success: function (msg) {
                console.log(msg);
                if (msg.resultCode == "1") {
                    $(".tipsInfo span").html("绑定成功");
                    $(".tipsInfo").show();
                    setTimeout(function () {
                        $(".tipsInfo").hide();
                    }, 1000);
                    sessionStorage.customerName = customerName;
                    sessionStorage.idNo = idNo;
                    window.location.href = "RepaymentList.html";
                } else {
                    $(".tipsInfo span").html(msg.errorDesc);
                    $(".tipsInfo").show();
                    setTimeout(function () {
                        $(".tipsInfo").hide();
                    }, 1000);
                }


            },
            error: function (msg) {
                console.log(msg);
            }
        });
    })
}