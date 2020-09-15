var member = ['younhong', 'ko', 'kkwack'];

var i = 0;
while (i < member.length) {
    console.log('array: ',member[i]);
    i = i+1;
}
var roles = {
    'programmer':'younhong', 
    'designer': 'ko',
    'manager': 'kkwack'
}

for (var name in roles) {
    console.log('object: ', name, roles[name]);
}