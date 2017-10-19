import '../../css/register.css'
import '../../util/footer/footer.css'
import '../../css/login.css'
import main from '../../main.js'
import '../../lib/jquery.cookie.js'
import template from '../../lib/template.js'
// var jquery=$;
template.defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/;

console.log('template.defaults.rules[1].test', template.defaults.rules[1].test)

console.log($('body'))
$('#header').css({
    'background': 'red'
})
// $.ajaxSetup({
//     header: {
//         token: '1111'
//     },
//     error: (err) => {
//         console.log('err', err)
//     }
// })
console.log($.ajaxSetup)

var htm = template('my', { arr: [1, 3, 5] })
$('#header').append(htm)

$.cookie('cookie', new Date())
$('.button').on('click', (e) => {
    e = e || event;
    console.log('e', e.currentTarget);
    $.ajax({
        url: 'http://localhost:8/login.html',
        type: "GET",
        header: {
            token: '1524545'
        },
        data: {
            userName: '1',
            password: 'sdf'
        },
        success: function (res) {
            if (res.success) {
                console.log(res)
            }
        },
        // error: (err) => {
        //     console.log(err)
        // }
    })

}
)
