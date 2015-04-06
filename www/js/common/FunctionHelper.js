define(function () {
	var myLibrary = this;

	this.addMethod = function (object, name, fn){
		var old = object[name];
		object[name] = function(){
			if (fn.length == arguments.length)
				return fn.apply(this, arguments);
			else
			if (typeof old == 'function')
				return old.apply(this, arguments);
		};
	}

	return myLibrary;
});