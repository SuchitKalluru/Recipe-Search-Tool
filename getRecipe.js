document.getElementById('ingredients-form').addEventListener('submit', function(e) {  
  //Hide Welcome 
  document.getElementById('welcome').style.display = 'none';
  e.preventDefault();

  // Get the ingredients from the form
  var ingredients = document.getElementById('ingredients-input').value;
  var addRecipeInformation = true;

  // HTTP Request
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.edamam.com/search?q=' + ingredients + '&app_id=APP_ID&app_key=API_KEY', true);

  request.onload = function() {
    var data = JSON.parse(this.response);

    // Actual Data
    var recipes = data.hits;

    // Sort off of the drop down menu 
    var sortOption = document.getElementById('sort-select').value;
    if (sortOption === 'alpha') {
      recipes.sort(function(a, b) {
        if (a.recipe.label < b.recipe.label) {
          return -1;
        } else if (a.recipe.label > b.recipe.label) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortOption === 'alpha-reverse') {
      recipes.sort(function(a, b) {
        if (a.recipe.label > b.recipe.label) {
          return -1;
        } else if (a.recipe.label < b.recipe.label) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortOption === 'cook-time') {
      recipes.sort(function(a, b) {
        return a.recipe.totalTime - b.recipe.totalTime;
      });
    } else if (sortOption === 'servings') {
      recipes.sort(function(a, b) {
        return a.recipe.yield - b.recipe.yield;
      });
    }

    // Display the recipes
    var recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; 
    recipes.forEach(function(recipe) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + recipe.recipe.url + '"><h3>' + recipe.recipe.label + '</h3><img src="' + recipe.recipe.image + '" alt="' 
      + recipe.recipe.label + '" height="200" width="200"><p>Cook time: ' + recipe.recipe.totalTime + ' minutes</p><p>Servings: ' 
      + recipe.recipe.yield + '</p><p>Cuisine: ' + recipe.recipe.dietLabels;

      recipeList.appendChild(li);
    });
  }
request.send();
});