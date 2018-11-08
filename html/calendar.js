//calendarRect
let calendarRect = {
  x: 0,
  y: 0,
  width: 150,
  height: 150
};
//模式，用来定义当前操作所在的状态
let Mode = {
  ORIGINAL: 1,
  YEAR: 2,
  MONTH: 3,
  DAY: 4
};
//当前模式
let currentMode = Mode.ORIGINAL;
//获取画布，并初始化
let calendarCanvas = document.getElementById("calendar");
let context = calendarCanvas.getContext("2d");
context.beginPath();
context.strokeStyle = "blue";

calendarRect.x = getElementLeft(calendarCanvas);
calendarRect.y = getElementTop(calendarCanvas);
calendarRect.width = calendarCanvas.clientWidth;
calendarRect.height = calendarCanvas.clientHeight;
//日期
let selectedDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate()
};
//文字样式
context.font = "20px sans-serif";
context.textAlign = "center";
context.textBaseline = "middle";
//设置阴影
context.shadowColor = "gray";
context.shadowOffsetX = 1;
context.shadowOffsetY = 1;
context.shadowBlur = 1;
//年
context.fillStyle = "rgb(60, 188, 248)";
context.fillRect(0, 0, calendarRect.width, calendarRect.height * 0.33);
context.fillStyle = "white";
context.fillText(
  selectedDate.year + "年",
  calendarRect.width / 2,
  (calendarRect.height * 0.33) / 2
);
//月
context.fillStyle = "rgb(65, 252, 236)";
context.fillRect(
  0,
  calendarRect.height * 0.33,
  calendarRect.width,
  calendarRect.height * 0.34
);
context.fillStyle = "white";
context.fillText(
  selectedDate.month + "月",
  calendarRect.width / 2,
  calendarRect.height * (0.34 / 2 + 0.33)
);
//日
context.fillStyle = "rgb(255, 222, 36)";
context.fillRect(
  0,
  +calendarRect.height * 0.67,
  calendarRect.width,
  calendarRect.height * 0.33
);
context.fillStyle = "white";
context.fillText(
  selectedDate.day + "日",
  calendarRect.width / 2,
  calendarRect.height * (0.33 / 2 + 0.67)
);
//点击之后的处理
calendarCanvas.onclick = function(event) {
  var touchX = event.pageX;
  var touchY = event.pageY;
  // context.arc(touchX, touchY, 1, Math.PI / 180 * 0, Math.PI / 180 * 360, anticlockwise);
  // context.fill();
  // context.beginPath();
  changeModeByTouchPosition(touchX, touchY);
};
/**根据点击的位置改变模式
 *return Mode:
 *1:year   2:month   3:day
 */
function changeModeByTouchPosition(touchX, touchY) {
  switch (currentMode) {
    case Mode.ORIGINAL: {
      //在年的一行
      if (
        postionInRect(
          touchX,
          touchY,
          calendarRect.x,
          calendarRect.y,
          calendarRect.x + calendarRect.width,
          calendarRect.y + calendarRect.height * 0.33
        )
      ) {
        // alert("年");
        var spacing = 1;
        var times = 0;
        var interval = setInterval(function() {
          //清屏
          clearCanvas();
          //年
          context.fillStyle = "rgb(60, 188, 248)";
          context.fillRect(
            0,
            0,
            calendarRect.width,
            calendarRect.height * 0.33 + spacing * 2
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.year + "年",
            calendarRect.width / 2,
            (calendarRect.height * 0.33) / 2 + spacing
          );
          //月
          context.fillStyle = "rgb(65, 252, 236)";
          context.fillRect(
            0,
            calendarRect.height * 0.33 + 2 * spacing,
            calendarRect.width,
            calendarRect.height * 0.34 + 2 * spacing
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.month + "月",
            calendarRect.width / 2,
            calendarRect.height * (0.34 / 2 + 0.33) + (spacing * 3) / 2
          );
          //日
          context.fillStyle = "rgb(255, 222, 36)";
          context.fillRect(
            0,
            calendarRect.height * 0.67 + spacing,
            calendarRect.width,
            calendarRect.height * 0.33 + spacing
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.day + "日",
            calendarRect.width / 2,
            calendarRect.height * (0.33 / 2 + 0.67) + spacing / 2
          );
          spacing = spacing + 1;
          if (spacing > calendarRect.height * 0.2) {
            clearInterval(interval);
          }
        }, 5);
        currentMode = Mode.YEAR;
      } else if (
        postionInRect(
          touchX,
          touchY,
          calendarRect.x,
          calendarRect.y + calendarRect.height * 0.33,
          calendarRect.x + calendarRect.width,
          calendarRect.y + calendarRect.height * 0.67
        )
      ) {
        var spacing = 1;
        var interval = setInterval(function() {
          //清屏
          clearCanvas();
          //文字样式
          context.font = "20px sans-serif";
          context.textAlign = "center";
          context.textBaseline = "middle";
          //年
          context.fillStyle = "rgb(60, 188, 248)";
          context.fillRect(
            0,
            0,
            calendarRect.width,
            calendarRect.height * 0.33 - spacing
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.year + "年",
            calendarRect.width / 2,
            (calendarRect.height * 0.33) / 2 - spacing / 2
          );
          //月
          context.fillStyle = "rgb(65, 252, 236)";
          context.fillRect(
            0,
            calendarRect.height * 0.33 - spacing,
            calendarRect.width,
            calendarRect.height * 0.34 + spacing * 2
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.month + "月",
            calendarRect.width / 2,
            calendarRect.height * (0.34 / 2 + 0.33)
          );
          //日
          context.fillStyle = "rgb(255, 222, 36)";
          context.fillRect(
            0,
            calendarRect.height * 0.67 + spacing,
            calendarRect.width,
            calendarRect.height * 0.33 + spacing
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.day + "日",
            calendarRect.width / 2,
            calendarRect.height * (0.33 / 2 + 0.67) + spacing / 2
          );
          spacing = spacing + 1;
          if (spacing > calendarRect.height * 0.2) {
            clearInterval(interval);
          }
        }, 5);
        currentMode = Mode.MONTH;
      } else {
        // alert("年");
        var spacing = 1;
        var times = 0;
        var interval = setInterval(function() {
          //清屏
          clearCanvas();
          //年
          drawDateRectByDateType(
            DateTypeColor.YEAR,
            0,
            0,
            calendarRect.width,
            calendarRect.height * 0.33 - spacing
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.year + "年",
            calendarRect.width / 2,
            (calendarRect.height * 0.33) / 2 - spacing / 2
          );
          //月
          drawDateRectByDateType(
            DateTypeColor.MONTH,
            0,
            calendarRect.height * 0.33 - spacing,
            calendarRect.width,
            calendarRect.height * 0.34 - spacing / 2
          );
          context.fillStyle = "white";
          context.fillText(
            selectedDate.month + "月",
            calendarRect.width / 2,
            calendarRect.height * (0.34 / 2 + 0.33) - (spacing * 3) / 2
          );
          //日
          drawDateRectByDateType(
            DateTypeColor.DAY,
            0,
            calendarRect.height * 0.67 - 2 * spacing,
            calendarRect.width,
            calendarRect.height * 0.33 + spacing * 2
          );

          context.fillStyle = "white";
          context.fillText(
            selectedDate.day + "日",
            calendarRect.width / 2,
            calendarRect.height * (0.33 / 2 + 0.67) - spacing / 2
          );
          spacing = spacing + 1;
          if (spacing > calendarRect.height * 0.2) {
            clearInterval(interval);
          }
        }, 5);
        currentMode = Mode.DAY;
      }
      break;
    }
    case Mode.YEAR: {
      var yearRect = {
        x: 0,
        y: 0,
        width: calendarRect.width,
        height: calendarRect.height * (0.33 + 0.2 * 2)
      };
      //年区域
      if (
        postionInRect(
          touchX,
          touchY,
          yearRect.x,
          yearRect.y,
          yearRect.width,
          yearRect.height
        )
      ) {
        console.log("edit");
      }
      //月区域
      else if (
        postionInRect(
          touchX,
          touchY,
          0,
          yearRect.height,
          calendarRect.width,
          calendarRect.height * 0.87
        )
      ) {
        drawDateRectByDateType(DateTypeColor.MONTH, 0, y, width, height);
        console.log("month");
      }
      //日区域
      else if (
        postionInRect(
          touchX,
          touchY,
          0,
          calendarRect.height * 0.87,
          calendarRect.width,
          calendarRect.height
        )
      ) {
        console.log("day");
      }
      break;
    }
    case Mode.MONTH: {
      break;
    }
    case Mode.DAY: {
      break;
    }
    default: {
      break;
    }
  }
}
/*
获取元素在浏览器中的绝对位置
*/
function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}
//判断点是否在某个矩形内部
function postionInRect(px, py, rx1, ry1, rx2, ry2) {
  return px >= rx1 && px <= rx2 && py >= ry1 && py <= ry2;
}
//清除画布
function clearCanvas() {
  context.clearRect(0, 0, calendarRect.width, calendarRect.height);
}
//画"年"框
var DateTypeColor = {
  YEAR: "rgb(60, 188, 248)",
  MONTH: "rgb(65, 252, 236)",
  DAY: "rgb(255, 222, 36)"
};
function drawDateRectByDateType(dateType, x, y, width, height) {
  context.fillStyle = dateType;
  context.fillRect(x, y, width, height);
}
var rect4Draw = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
function changeAnimation(yearRect, monthRect, dayRect) {}
