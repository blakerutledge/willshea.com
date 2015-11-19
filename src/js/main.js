//import Tumblr from "./libs/tumblr.js";

var box, button, toggle, posts;
var imagesLeft = [];
var imagesRight = [];

var header = "<img class='item-image' src='";
var closer = "'></img>";

class Main {
  constructor(options = {}) {

  	toggle = false;
  	box = document.querySelector('.nav-content');
  	button = document.querySelector('.nav-button');
  	button.addEventListener('click', function() { 
  		toggleNav(toggle);
  	}, false);

	$.ajax({
	    url: "http://willshea.tumblr.com/api/read/json",
	    dataType: 'jsonp',
	    success: function(results){
	        // Logs to your javascript console.
	        for (var i=0; i < results.posts.length; i++ ) {
	        	imagesLeft[i] = results.posts[i]["photo-url-1280"];
	        }
	        buildLeft(imagesLeft);
		}    
	});

	$.ajax({
	    url: "http://cemetery521.tumblr.com/api/read/json",
	    dataType: 'jsonp',
	    success: function(results){
	        // Logs to your javascript console.
	        for (var i=0; i < results.posts.length; i++ ) {
	        	imagesRight[i] = results.posts[i]["photo-url-1280"];
	        }
	        buildRight(imagesRight);
		}    
	});



	  var custom_event = $.support.touch ? "tap" : "click";
      
      //open up image
      $(document).on("click", ".item-image", function(e) {
      		var html = "<img class='item-focus-image' src='";
      		html += this.src+"'></img>";
      		$('.layout-focus').html(html);
			$('.layout-focus').css("display", "block");
        });

       //close down image
      $(document).on("click", ".item-focus-image", function(e) {
			$('.layout-focus').html("");
			$('.layout-focus').css("display", "none");
        });

      function centerItVariableWidth(target, outer){
		  var out = $(outer);
		  var tar = $(target);
		  var x = out.width();
		  var y = tar.outerWidth(true);
		  var z = tar.index();
		  var q = 0;
		  var m = out.find('li');
		  //Just need to add up the width of all the elements before our target. 
		  for(var i = 0; i < z; i++){
		    q+= $(m[i]).outerWidth(true);
		  }
		  out.scrollLeft(Math.max(0, q - (x - y)/2));
		}
		function centerItVariableHeight(target, outer){
		  var out = $(outer);
		  var tar = $(target);
		  var x = out.height();
		  var y = tar.outerHeight(true);
		  var z = tar.index();
		  var q = 0;
		  var m = out.find('li');
		  //Just need to add up the width of all the elements before our target. 
		  for(var i = 0; i < z; i++){
		    q+= $(m[i]).outerHeight(true);
		  }
		  out.scrollTop(Math.max(0, q - (x - y)/2));
		}



  }
};


function buildLeft(images) {
	var html = "";
	for (var i=0; i < images.length; i++) {
		html += header + images[i] + closer;
	}
	$(".layout-left").html(html);
}

function buildRight(images) {
	var html = "";
	for (var i=0; i < images.length; i++) {
		html += header + images[i] + closer;
	}
	$(".layout-right").html(html);
}

function toggleNav(x) {
	if (x) {
		box.classList.toggle('nav-closed');
		toggle = false;
	}
	else {
		box.classList.toggle('nav-closed');
		toggle = true;
	}
}


document.addEventListener('DOMContentLoaded', event => new Main)
