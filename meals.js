var meals =[];
var searchedOne;
var clickedItem;
function loadMeals(){
        for (var i = 97; i <= 122; i++) {
            // fetching all the dishes aphabatically since one api for fetching was not available
            var currChar=String.fromCharCode(i);
            var url= "https://www.themealdb.com/api/json/v1/1/search.php?f="+currChar;
            var data= fetch(url).then(function (response) {
                // The API call was successful!
                return response.json();
            }).then(function (data) {
                // This is the JSON from our response
                meals=meals.concat(data["meals"]);
                fillWithDishes(meals);
            }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
            })
        }
}
// filter the meals out
function filteroutMeals(meal){
    try{
        var ret=meal["strMeal"].includes(searchedOne);
        return ret;
    }catch{
        return false;
    }
}
// takes input from search box
function searchMeals(){
    searchedOne = document.getElementById("inputBox").value;
    console.log("searched one is ->"+searchedOne);
    var filteredMeal=meals.filter(filteroutMeals);
    fillWithDishes(filteredMeal);
    console.log(filteredMeal);
    searchedOne="";
}
// filles the dishes dynamically
function fillWithDishes(meals){
    var htmlCode='';
    var l=meals.length>10? 10: meals.length;
    for(var i=0;i<l;i++){
        var meal=meals[i];
        var dishName= meal["strMeal"];
        //meals[i]["strMeal"];
        var category= meals[i]["strCategory"];
        var htmlCodeDiv='<div class="dish" id="dish'+meal["idMeal"]+'" onclick="selectMeal(this)" ><img src="pic.jpg" alt="Avatar" ><div class="dish-details"><h4><b>'+dishName+'</b></h4><p>'+category+'</p></div></div>';
        htmlCode=htmlCode + htmlCodeDiv;
    }
    document.getElementById("container-div").innerHTML=htmlCode;   
}

function selectMeal(div){
    // fetching what thing dish was clicked
    var x=div["childNodes"][1]["childNodes"];
    let selected=x[0]["childNodes"][0];
    console.log(selected.innerHTML);
    clickedItem=selected.innerHTML;
    window.location.href = "clickedDish.html?item="+clickedItem;

}