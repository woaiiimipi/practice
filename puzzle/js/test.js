//The map for play puzzle
class PuzzleMap {
  constructor() {
    this.htmlNode = document.createElement("div");
    this.row = 3;
    this.col = 3;
    this.spiritImg = new Image();
    this.originSequence = "";
    this.itemList = new Array();
    this.url = "../img/spirit.jpg";
    this.parent = document.body;
    /**
     * @type {DragBehaviorPacket} DragBehaviorPacket - ...
     */
    this.dragBehaviorPacket = null;
    this.DRAGSTART = 1;
    this.DRAGEND = 2;
    this.funDragStart = undefined;
    this.funDragEnd = undefined;
  }

  /**
   * init the puzzle.
   */
  initItems() {
    //set outer reffence
    let _that_ = this;
    let sequence = 0;
    this.spiritImg.addEventListener("load", function() {
      //put the puzzleMap node into parent(default is document.body)
      _that_.initHtmlNode();
      _that_.parent.append(_that_.htmlNode);
      _that_.initEvents();
      console.log("img src loaded!");
      //Create DraggableItem(n)
      if (_that_.row > 0 && _that_.col > 0) {
        let itemWidth = this.width / (_that_.row + 0.0);
        let itemHeight = this.height / (_that_.col + 0.0);
        for (let rowTmp = 0; rowTmp < _that_.row; rowTmp++) {
          for (let colTmp = 0; colTmp < _that_.col; colTmp++) {
            let item = new DraggableItem();
            _that_.itemList.push(item);
            item.rect.width = itemWidth;
            item.rect.height = itemHeight;
            item.rect.x = rowTmp * itemWidth;
            item.rect.y = colTmp * itemHeight;
            item.sequenceId = sequence++;

            item.setAttachPuzzleMap(_that_);
            item.setBgUrl(_that_.url);
            item.initHtmlNode();
            _that_.htmlNode.appendChild(item.htmlNode);
          }
        }
      }
    });
    console.log("init items completed!");
    return this;
  }
  /**
   *
   */
  initHtmlNode() {
    this.htmlNode.style.width = this.spiritImg.width + "";
    this.htmlNode.style.height = this.spiritImg.height + "";
    let _that_ = this;
    this.htmlNode.draggable = true;
    this.htmlNode.style.position = "relative";
    this.htmlNode.style.transform = "translateX(-50%)";
    this.htmlNode.style.left = "50%";
    return this;
  }
  /**
   * Disrupt the puzzleMap randomly
   * @return {Void}
   */
  randomDisrupt(level) {
    let _that_ = this;
    setTimeout(function() {
      let timeout = 0;
      while (level-- > 0) {
        for (let item of _that_.itemList) {
          let dstItemIndex = Math.floor(Math.random() * _that_.itemList.length);
          let dstItem = _that_.itemList[dstItemIndex];
          setTimeout(function() {
            item.exchangeWithAnother(dstItem);
          }, timeout);
          timeout = timeout + 10;
        }
      }
    }, 100);
    // let timeSlice = 100;
  }
  /**
   * @param row {number} - .
   * @param col {number} - .
   */

  setRowAndColNumber(row, col) {
    this.row = row;
    this.col = col;
    return this;
  }
  /**
   *
   */
  judgeCurrentStutas() {
    let result = true;
    if (this.itemList.length > 1) {
      for (let index = 1; index < this.itemList.length; index++) {
        if (
          this.itemList[index].sequenceId -
            this.itemList[index - 1].sequenceId !==
          1
        ) {
          result = false;
          break;
        }
      }
    }
    return result;
  }
  /**
   * set the spirit src'url.
   * @param url {string} - .
   */
  setResourceUrl(url) {
    this.url = url;
    //load the image src
    this.spiritImg.src = this.url;
    // document.getElementById("");
    return this;
  }
  /**
   * @param parent {HTMLElement} - origin.
   */
  setParentNode(parent) {
    this.parent = parent;
    return this;
  }
  /**
   * @param message Message
   */
  handle(message) {
    switch (message.what) {
      case this.DRAGSTART: {
        this.dragBehaviorPacket = message.obj;
        break;
      }
      case this.DRAGEND: {
        //offset:{offsetX,offsetY} - The dragged point(mouse point)' offset
        let offset = message.obj;
        let draggedAreaCenterPoint = {
          x:
            this.dragBehaviorPacket.draggingItem.rect.x +
            this.dragBehaviorPacket.draggingItem.rect.width / 2 +
            (offset.x - this.dragBehaviorPacket.mousePointOffsetItemLeftTop.x),

          y:
            this.dragBehaviorPacket.draggingItem.rect.y +
            this.dragBehaviorPacket.draggingItem.rect.height / 2 +
            (offset.y - this.dragBehaviorPacket.mousePointOffsetItemLeftTop.y)
        };
        let dstDragebleItem = new DraggableItem();
        let minCenterPointDistance = Number.MAX_VALUE;

        for (let item of this.itemList) {
          let currentItemCenterPoint = {
            x: item.rect.x + item.rect.width / 2,
            y: item.rect.y + item.rect.height / 2
          };
          let currentCenterPointDistance = Math.sqrt(
            Math.pow(currentItemCenterPoint.x - draggedAreaCenterPoint.x, 2) +
              Math.pow(currentItemCenterPoint.y - draggedAreaCenterPoint.y, 2)
          );
          if (currentCenterPointDistance < minCenterPointDistance) {
            dstDragebleItem = item;
            minCenterPointDistance = currentCenterPointDistance;
          }
        }
        this.dragBehaviorPacket.draggingItem.exchangeWithAnother(
          dstDragebleItem
        );
        // for(let i =0;i<1000000;i++){
        //     if(i === 999999){
        //         console.log(this.htmlNode.clientWidth);
        //     }
        // }
        // let before = new Date().getTime();
        // for(let now = new Date().getTime();now - before < 5*1000;now = new Date().getTime()){
        // }
        if (this.judgeCurrentStutas()) {
          this.unbindEvents();
          let _that_ = this;
          setTimeout(function() {
            alert("Congratulations!");
            _that_.initEvents();
          }, 0);
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  /**
   * init click event.
   * @return {Void}
   */

  initEvents() {
    let _that_ = this;
    this.funDragStart = function(event) {
      let child = event.target;
      for (let item of _that_.itemList) {
        if (child === item.htmlNode) {
          let packet = new DragBehaviorPacket();
          packet.draggingItem = item;
          packet.mousePointOffsetItemLeftTop = {
            x: event.offsetX,
            y: event.offsetY
          };
          let message = new Message();
          message.what = _that_.DRAGSTART;
          message.obj = packet;
          _that_.handle(message);
        }
      }
    };
    this.htmlNode.addEventListener("dragstart", this.funDragStart);
    this.funDragEnd = function(event) {
      let child = event.target;
      let offset = {
        x: event.offsetX,
        y: event.offsetY
      };
      let message = new Message();
      message.what = _that_.DRAGEND;
      message.obj = offset;
      _that_.handle(message);
    };
    this.htmlNode.addEventListener("dragend", this.funDragEnd);
  }
  removeDragStartFun(event) {}

  unbindEvents() {
    function removeDragStartFun() {
      console.log("remove dragstart");
    }
    function removeDragEndFun() {
      console.log("remove dragend");
    }
    this.htmlNode.removeEventListener("dragstart", this.funDragStart);
    this.htmlNode.removeEventListener("dragend", this.funDragEnd);
    this.funDragStart = undefined;
    this.funDragEnd = undefined;
  }
}

class GameObject {
  constructor() {
    this.bgUrl = "../img/spirit.jpg";
    this.rowNumber = 3;
    this.colNumber = 3;
    this.degreeOfDificulty = 5;
    this.parentNode = document.body;
  }
  start() {
    document.body.style.textAlign = "center";
    let puzzleMap = new PuzzleMap();
    init();
    //init
    function init() {
      puzzleMap
        .setRowAndColNumber(this.rowNumber, this.colNumber)
        .setResourceUrl(this.bgUrl)
        .setParentNode(this.parentNode)
        .initItems()
        .randomDisrupt(this.degreeOfDificulty);
    }
  }
  /**
   * @param {{bgUrl : string,rowNumber:number,colNumber:number,degreeOfDificulty:number,parentNode:HTMLElement}} params
   */
  resetParams(params) {
    this.bgUrl = params.bgUrl || this.bgUrl;
    this.rowNumber = params.rowNumber || this.rowNumber;
    this.colNumber = params.colNumber || this.colNumber;
    this.degreeOfDificulty = params.degreeOfDificulty || this.degreeOfDificulty;
    this.parentNode = params.parentNode || this.parentNode;
  }
}
//------------------------------------------
// import  {PuzzleMap} from "../js/PuzzleMap.js"
class DraggableItem {
  /**
   * init the puzzle.
   * @param rect {object} - .
   * @param htmlNode {HTMLElement} - .
   * @param sequenceId {number} - for compare.
   */
  constructor() {
    this.rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.htmlNode = document.createElement("div");
    this.sequenceId = -1;
    this.bgUrl = "";
    this.attachPuzzleMap = null;
  }
  /**
   * Exchange two DraggableItem's BgImg.
   * @param destination {DraggableItem} - destination.
   * @return {Void}
   */
  exchangeWithAnother(destination) {
    let tmpBackground = this.htmlNode.style.background;
    this.htmlNode.style.background = destination.htmlNode.style.background;
    destination.htmlNode.style.background = tmpBackground;
    let tmpSequenceId = this.sequenceId;
    this.sequenceId = destination.sequenceId;
    destination.sequenceId = tmpSequenceId;
  }
  setBgUrl(url) {
    this.bgUrl = url;
    return this;
  }
  initHtmlNode() {
    this.htmlNode.className = "puzzle-item";
    this.htmlNode.style.position = "absolute";
    this.htmlNode.style.width = this.rect.width + "";
    this.htmlNode.style.height = this.rect.height + "";
    this.htmlNode.style.border = "1px solid black";
    this.htmlNode.draggable = true;
    this.htmlNode.style.backgroundAttachment = "fixed";
    this.htmlNode.style.background =
      "url(" +
      this.bgUrl +
      ")" +
      " " +
      -this.rect.x +
      "px" +
      " " +
      -this.rect.y +
      "px";
    this.htmlNode.style.left = this.rect.x + "";
    this.htmlNode.style.top = this.rect.y + "";
    console.log("init item HtmlNode completely!");
    // this.initDragEvents();
  }
  removeHtmlNode() {
    this.parentNode.removeChild(this.htmlNode);
    this.htmlNode = document.createElement("div");
    return this;
  }

  /**
   * @param {PuzzleMap} puzzleMap
   */
  setAttachPuzzleMap(puzzleMap) {
    this.attachPuzzleMap = puzzleMap;
  }
}

class Message {
  /**
   * @param {number} what
   * @param {Object} obj
   */
  constructor(what, obj) {
    this.what = what;
    this.obj = obj;
  }
}

class DragBehaviorPacket {
  constructor() {
    /**
     * @type {DraggableItem} draggingItem
     */
    this.draggingItem = null;
    this.mousePointOffsetItemLeftTop = {
      x: 0,
      y: 0
    };
  }
}

//-------------------------------------------
//set params

// let btnChangeParams = document.getElementById("changeParam");
// btnChangeParams.addEventListener("click", function(event) {
//   document.getElementById("tipPanal").style.visibility = "visible";
// });
// let restart = document.getElementById("restart");
// restart.addEventListener("click", function(event) {
//   puzzleMap.parent.removeChild(puzzleMap.htmlNode);
//   puzzleMap.htmlNode = document.createElement("div");
//   init();
// });
// let btnFinish = document.getElementById("finish");
// btnFinish.addEventListener("click", function(event) {
//   console.log("click finish");
//   puzzleMap.parent.removeChild(puzzleMap.htmlNode);
//   puzzleMap.htmlNode = document.createElement("div");
//   bgUrl = document.getElementById("text-image-url").value;
//   rowNumber = document.getElementById("text-row-number").value;
//   colNumber = document.getElementById("text-col-number").value;
//   degreeOfDificulty = document.getElementById("text-degree-dificulty").value;
//   init();
//   document.getElementById("tipPanal").style.visibility = "hidden";
// });
//-----------------------------------------------------
(function() {
  let gameObject = new GameObject();
  gameObject.start();
})();
