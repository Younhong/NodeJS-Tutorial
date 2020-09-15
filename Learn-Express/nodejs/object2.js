var f = function() {
    console.log("Function variable");
}

var a = [f()];
a[0];

var b = [f];
b[0]();

var o = {
    func:f
}

o.func();