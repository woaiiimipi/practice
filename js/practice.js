// var  = document.getElementById("");

var dateSource = ["blue", "white", "red", "black", "purple"];
// var data_list1 = document.getElementById("data_list1");
// dateSource.forEach(function(item, index, array) {
//   var option = document.createElement("option");
//   option.setAttribute("value", item);
//   data_list1.appendChild(option);
// });

var dateLists = document.getElementsByClassName("data_list");
console.log(dateLists);
dateSource.forEach(function(item) {
  for (let i = 0; i < dateLists.length; ++i) {
    var option = document.createElement("option");
    option.setAttribute("value", item);
    dateLists[i].appendChild(option);
    if (i === 0) {
      console.log("parent: ", dateLists[i]);
      console.log("children: ", dateLists[i].children);
    }
  }
});
