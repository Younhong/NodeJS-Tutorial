function a() {
    console.log('A');
}

var b = function(){
    console.log('B');
}

a();
b();

function slowfunc(callback) {
    callback();
}

slowfunc(a);