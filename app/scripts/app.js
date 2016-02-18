$(document).ready(function() {

 	var advanceTask = function(task) {		//pass a task into the advanceTask function without a new id
 		var modified = task.innerText.trim()
 		for (list i = 0; i < listo.length; i++) {
 			if (listo[i].task === modified) {
 				if (listo[i].id === 'new') {
 					listo[i].id = 'inProgress';
 				} else if (listo[i].id === 'inProgress') {
 					listo[i].id = 'archived';
 				} else {
 					listo.spice(i, 1);
 				}
 				break;
 			}
 		}
 		task.remove();
 	};



 	$('#newTaskForm').hide();  //new task form is hidden when doc loads
 	var listo = [];
 	var Task = function(task) {		//task constructor, users can create object tasks for their list
 		this.task = task;
 		this.id = 'new';
 	}
 													// calling document DOM 
 	$(document).on('click', '#item', function(e) {  //func allows to change status of an item from new to inprogress
    	e.preventDefault();							//preventing the default action for the event from being triggered
	});

 	// variable called task so that we can access the 'this' keyword to pass it into another function.
	$(document).on('click', '#item', function(e) {
    e.preventDefault();
	  var task = this;      
	  advanceTask(task);
	  this.id = 'inProgress';  //change it's ID to the string 'inProgress'
	});

	//needs is the ability to move the actual list item
	//We do that by pulling all of the html around the item itself.
	$(document).on('click', '#item', function(e) {
	    e.preventDefault();
	  var task = this;      
	  advanceTask(task);
	  this.id = 'inProgress';
	  $('#currentList').append(this.outerHTML);
	});

	//We can also move the items from 'inProgress' to 'archived' with a similar function:
	$(document).on('click', '#inProgress', function (e) {
	  e.preventDefault();
	  var task = this;
	  task.id = "archived";
	  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
	  advanceTask(task);
	  $('#archivedList').append(changeIcon);
	});

	//create a way to delete the items on the list
	//All we have to do is pass a task into the advanceTask function without a new id //refer to advanceTask
	
	$(document).on('click', '#archived', function (e) {
	  e.preventDefault();
	  var task = this;
	  advanceTask(task); 
	});

 	var addTask = function(task) {};		//function to create object and push array into
 		var addTask = function(task) {		//contition that func only runs if there is a task 
    	if(task) {							// will only run if task is truthy, empty tasks are not truthy since they are empty strings
    		task = new Task(task);			//call our task constructor and fill it with the new task,
			listo.push(task);				//push the new task to listo array   
		}
	};

	var addTask = function(tast) {
		if(task) {
			task = new Task(task);
			listo.push(task);

			$('#newItemInput').val('');		//we want to clear input form after we submit it, then show new list item in index.html
        	$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');  //add fadeToggle so that New button will hide and show the input form at the same time.
	};

	$('#saveNewItem').on('click', function (e) {	// call a jQuery event that calls the addTask func when we click the saveNewItem button.
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	//so that we can open and close the new task form with the newListItem and Cancel button.
	//opens form 
	$('#newListItem').on('click', function(){
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});
	//closes form
	$('#cancel').on('click', function (e)) {	// e is event object
		e.preventDefault();
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	});









  //ALL CODE GOES IN HERE
});