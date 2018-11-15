// var  = document.getElementById("");

var dataSource = ["blue", "white", "red", "black", "purple"];
// var data_list1 = document.getElementById("data_list1");
// dataSource.forEach(function(item, index, array) {
//   var option = document.createElement("option");
//   option.setAttribute("value", item);
//   data_list1.appendChild(option);
// });

var dataLists = document.getElementsByClassName("data_list");
console.log(dataLists);
dataSource.forEach(function(item) {
  for (let i = 0; i < dataLists.length; ++i) {
    var option = document.createElement("option");
    option.setAttribute("value", item);
    dataLists[i].appendChild(option);
    if (i === 0) {
      console.log("parent: ", dataLists[i]);
      console.log("children: ", dataLists[i].children);
    }
  }
});

