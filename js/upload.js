var maxSize = 3 * 1024 * 1024;
var imgAry = [];
var index = 0;
var pageObject = JSON.parse(sessionStorage.curObject)
var appNo = pageObject.appNo;

$(document).ready(function () {
    var str = "<P>" + pageObject.returnReason + "</P>"
    $(".backReasonContent").append(str);
    // $(".backFn").on("click", function () {
    //     history.go(-1)
    // })
})

function backFn() {
    history.go(-1)
}
$(".photoBox").on("click", ".deleteFn", function (e) {
    var thId = e.target.parentElement.id
    imgAry.forEach(function (item) {
        if (item['id'] == thId) {
            imgAry.pop(item);
        }
    })
    //非双向绑定 数据删除了 dom还要删除一遍
    $('#' + thId + '').remove();
})

$(".plusBox").on("click", function (e) {
    $("#upload").click();
    $("#upload").off("change");
    $("#upload").change(function (e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!this.files.length) return;
        if (!/\/(?:jpeg|png|gif)/i.test(files[0].type)) return;
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var res = this.result;
            var data = compressFn(res, file);
        }
    });
})

function compressFn(result, file) {
    var that = this;
    var img = new Image();
    img.src = result;
    img.onload = function () {
        var degree = 0,
            drawWidth,
            drawHeight,
            width,
            height;
        drawWidth = this.width;
        drawHeight = this.height;
        //改变图片
        var maxSide = Math.max(drawWidth, drawHeight);
        if (maxSide > 1024) {
            var minSide = Math.min(drawWidth, drawHeight);
            minSide = (minSide / maxSide) * 1024;
            maxSide = 1024;
            if (drawWidth > drawHeight) {
                drawWidth = maxSide;
                drawHeight = minSide;
            } else {
                drawWidth = minSide;
                drawHeight = maxSide;
            }
        }
        var canvas = document.createElement("canvas");
        canvas.width = width = drawWidth;
        canvas.height = height = drawHeight;
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, drawWidth, drawHeight);
        //压缩
        var data = canvas.toDataURL("image/jpeg", 0.5);
        if (file.size > maxSize) {
            data = canvas.toDataURL("image/jpeg", 0.7);
        }
        canvas = context = null;
        //转换格式
        var curData = blobToFile(dataURLtoBlob(data), file.name);
        curData.id = index;
        imgAry.push(curData);
        var domStr = '<div class="plusBox" id="' + index + '"><i class="deleteFn" onclick="deleteFn()"></i><img src="' + data + '"/></div>'
        index++
        $(".photoBox").prepend(domStr);
        return data;
    }
}

//将base64转换为blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}
//blob 转file 非标准file
function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

function submitFn() {

    if (imgAry.length == 0) return;
    var formdata = new FormData();
    imgAry.map(function (item) {
        formdata.append("files", item)
    })
    formdata.append("appNo", appNo);
    showShade();
    // /erong-cfss-phss/loaninfo/supplementMsg
    $.ajax({
        url: urlToken + "erong-cfss-phss/loanInfo/supplementMsg",
        type: 'post',
        cache: false,
        contentType: false,
        processData: false,
        // dataType: "json",
        headers: {
            // Authorization: "bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTcwODE2OTcyLCJhdXRob3JpdGllcyI6WyJjbGllbnQiXSwianRpIjoiNmMwOTIxNjYtZDkwNy00ZmU3LTgwMGYtOGVlODEwMWEwMjk0IiwiY2xpZW50X2lkIjoiaW1nIn0.hvlqaV93aVTbPjhgL9PDhG-IuhOWmnpwORvGgAxKwVtqfej0cwKZPCCaBe1pCf_fqbMA6pYkUizRsIrq3ZMhjWBLEZjTTQROPBuWR3A6nDHhWQrchyEelsuMPDo3xiYwdv6qR0toyVI1Sy3gW-SZ6LcIdjQfvG-NcDsnCmha-kkyjnR1-2XpixydMG91rNow2YLBK2_8PrufObnLpMHO4LRcc945Sa-yLtgc4kOlY4kXF7yhtbwLWxzuXidn_lmed7BtYroLebepgaK6k-J6QnvZ5lNr2WdxHPrLYbcbMu18r7wxuEqkAQ_d0hRESEvibnU8vPIh9C7AOyzz3pVF2A",
            Authorization: sessionStorage.token
        },
        data: formdata,
        success: function (res) {
            hideShade();
            if (res.resultCode == "1") {
                //上传图片成功!!!
                new myMessage({
                    content: "上传成功",
                    timer: 2000
                });
                imgAry = [];
                $(".onlyOne").siblings().remove();
                setTimeout(() => {
                    window.location.href = "RepaymentList.html"
                }, 2000);
            } else {
                //失败
                new myMessage({
                    content: "上传失败请重试",
                    timer: 2000
                });
            }
        },
        error: function (e) {
            hideShade();
            new myMessage({
                content: e.errorDesc,
                timer: 2000
            });
        }
    })
}

function hideShade() {
    $(".shade_inside_layer").hide(); //.css("display", "none");
    $(".shade_layer").hide(); //.css("display", "none");
}

function showShade() {
    $(".shade_inside_layer").show(); //.css("display", "block");
    $(".shade_layer").show(); //.css("display", "block");
}