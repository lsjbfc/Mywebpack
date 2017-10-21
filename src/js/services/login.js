import '../../css/register.css'
import '../../css/test.scss'
import '../../util/footer/footer.css'
import '../../css/login.css'
import '../../css/test.less'
import main from '../../main.js'
import '../../lib/jquery.cookie.js'
import template from '../../lib/template.js'
// import '../../lib/es5-shim.min.js'
// import '../../lib/es5-sham.min.js'


// var jquery=$;


console.log('template.defaults.rules[1].test', template.defaults.rules[1].test)
// (function() {
//     var testObject = {};
//     if (!(Object.setPrototypeOf || testObject.__proto__)) {
//         var nativeGetPrototypeOf = Object.getPrototypeOf;

//         Object.getPrototypeOf = function(object) {
//             if (object.__proto__) {
//                 return object.__proto__;
//             } else {
//                 return nativeGetPrototypeOf.call(Object, object);
//             }
//         }
//     }
//   })();
console.log($('body'))
$('#header').css({
    'background': 'red'
})

// console.log($.ajaxSetup)

var htm = template('my', {
    arr: [1, 3, 5]
})
$('#header').append(htm)

$.cookie('cookie', new Date())
$('#header').click(() => {
    console.log('111')
})
$('.button').on('click', (e) => {
    e = e || event;
    console.log('e', e.currentTarget);
    $.ajax({
        url: 'http://116.62.224.22:9005/manager/marketSearch/list',
        type: "GET",
        // header: {
        //     token: '1524545'
        // },
        data: {
            userName: '1',
            password: 'sdf'
        },
        success: function (res) {
            // if (res.success){
            //     resolve(res);
            //   } else {
            //     reject('err');
            //   }
            if (res.success) {
                console.log(res)
            }
        },
        // error: (err) => {
        //     console.log(err)
        // }
    })


})

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(1000).then((value) => {
    console.log(value);
});

var obj = new Proxy({}, {
    get: function (target, key, receiver) {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    }
  });
  console.log(obj)
  obj.count = 1
  ++obj.count   



  const foo=(a)=>{
    // arguments
    this.a=arguments[0]
    console.log('1',this.a)
  }
  const f=(x)=>{

  }
  f.bind(foo)
  f('2')