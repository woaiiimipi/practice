// /*
// 表单校验
// */
// //Dom节点
// let form = document.getElementById("form");
// let username = document.getElementById("username");
// let tip_username = document.getElementById("tip_username");
// let password = document.getElementById("password");
// let tip_password = document.getElementById("tip_password");
// let passwordrepeat = document.getElementById("passwordrepeat");
// let tip_passwordrepeat = document.getElementById("tip_passwordrepeat");
// //提交按钮
// let submit = document.getElementById("submit");
// //初始状态
// let isUsernameValidate = false;
// let isPasswordValidate = false;
// let isPasswordrepeatValidate = false;
// // tip_username.innerText = "用户名不能为空";
// // tip_password.innerText = "密码不能为空";
// // tip_passwordrepeat.innerText = "密码确认不能为空";
// //正则表达式
// //用户名校验正则
// let usernameReg = /^[a-z0-9_]+$/i;
// //添加事件
// username.addEventListener("input", function(event) {
//   checkUsername(event);
// });
// username.addEventListener("blur", function(event) {

//   checkPassword(event);
// });
// password.addEventListener("input", function(event) {
//   checkPassword(event);
// });
// password.addEventListener("blur", function(event) {
//   checkPassword(event);
// });
// passwordrepeat.addEventListener("input", function(event) {
//   checkPasswordrepeat(event);
// });
// password.addEventListener("blur", function(event) {
//   checkPasswordrepeat(event);
// });
// submit.addEventListener("click", function(event) {
//   if (isUsernameValidate && isPasswordValidate && isPasswordrepeatValidate) {
//     form.submit();
//   } else {
//     alert("表单填写不完整！");
//   }
// });

// //功能函数
// function checkUsername(event) {
//   // @ts-ignore
//   isUsernameValidate = false;
//   if (username.value == null || username.value == "") {
//     tip_username.innerText = "用户名不能为空~";
//   } else if (!usernameReg.test(username.value)) {
//     tip_username.innerText = "用户名不合法~";
//   } else {
//     isUsernameValidate = true;
//     tip_username.innerText = "";
//   }
//   // @ts-ignore
// }
// function checkPassword(event) {
//   isPasswordValidate = false;
//   console.log(password.value.length);
//   // @ts-ignore
//   if (password.value == null || password.value == "") {
//     tip_password.innerText = "密码不能为空！";
//   } else if (password.value.length < 6) {
//     console.log("ddddddddddddddddddddddddddd");
//     tip_password.innerText = "密码太短！";
//   } else if (password.value.length > 20) {
//     tip_password.innerText = "密码太长！";
//   } else {
//     isPasswordValidate = true;
//     tip_password.innerText = "";
//   }
//   // @ts-ignore
// }
// function checkPasswordrepeat(event) {
//   isPasswordrepeatValidate = false;
//   // @ts-ignore
//   if (passwordrepeat.value == null || passwordrepeat.value == "") {
//     tip_passwordrepeat.innerText = "密码确认不能为空！";
//   } else if (passwordrepeat.value != password.value) {
//     tip_passwordrepeat.innerText = "密码不一致！";
//   } else {
//     isPasswordrepeatValidate = true;
//     tip_passwordrepeat.innerText = "";
//   }
// }
// /*
// 搜索框提示
// */

/*
使用HTML属性方式
*/
(function() {
  // 错误项计数器
  let wrongItemNumber = 0;
  let inputsNeedCheck = document.getElementsByTagName("input");
  //提交按钮
  let submit = document.getElementById("submit");

  for (let index = 0; index < inputsNeedCheck.length; index++) {
    const input = inputsNeedCheck[index];
    //1需要校验的input
    if (input.attributes["check-event"] != null) {
      //累计错误数
      wrongItemNumber++;
      let clickEvents = input.getAttribute("check-event").split(";");
      clickEvents.forEach(function(item) {
        input.addEventListener(item, function() {
          //1.1需要正则表达式校验
          if (input.getAttribute("reg") != null) {
            // let reg = new RegExp(input.attributes["reg"].value);
            let reg = eval(input.attributes["reg"].value);
            let tipSpanId = input.attributes["tip-span-id"].value;
            let tipSpan = document.getElementById(tipSpanId);
            if (reg.test(input.value)) {
              tipSpan.innerText = "";
              if (input.attributes["valid"].value == "false") {
                wrongItemNumber--;
                input.attributes["valid"].value = "true";
              }
            } else {
              tipSpan.innerText = input.attributes["error-text"].value;
              if (input.attributes["valid"].value == "true") {
                wrongItemNumber++;
                input.attributes["valid"].value = "false";
              }
            }
          }
          //1.2密码一致性校验
          else {
            let tipSpanId = input.attributes["tip-span-id"].value;
            let tipSpan = document.getElementById(tipSpanId);
            let compareInputId = input.attributes["compare-input-id"].value;
            let compareInput = document.getElementById(compareInputId);
            if (compareInput.value == input.value) {
              tipSpan.innerText = "";
              if (input.attributes["valid"].value == "false") {
                wrongItemNumber--;
                input.attributes["valid"].value = "true";
              }
            } else {
              tipSpan.innerText = input.attributes["error-text"].value;
              if (input.attributes["valid"].value == "true") {
                wrongItemNumber++;
                input.attributes["valid"].value = "false";
              }
            }
          }
          //1.3提交按钮校验
          if (wrongItemNumber == 0) {
            submit.disabled = false;
          } else {
            submit.disabled = true;
          }
        });
      });
    }
  }
})();
