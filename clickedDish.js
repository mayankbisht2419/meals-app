function loadDish(){
    var queryString = window.location.search;
    // Create a URLSearchParams object to parse the query string
    var urlParams = new URLSearchParams(queryString);
    // Retrieve data using the get() method
    var item = urlParams.get("item");
    // document.getElementById("item").innerHTML=item;
    var url="https://www.themealdb.com/api/json/v1/1/search.php?s="+item;
    var data= fetch(url).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        // dynamically writing about the asked dish
        var meal=data["meals"][0];
        console.log();
        var name=meal["strMeal"];
        var ins= meal["strInstructions"];
        console.log(name);
        console.log(ins);

        var htmlCode=
        '<div class="item"><div><h1>'+name+'</h1></div></div><div class="item"><div class="image"><img src="pic.jpg"></div></div><div class="item"><div><p>'+ins+'</p></div></div>';
        document.getElementById("contain").innerHTML=htmlCode;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    })
}