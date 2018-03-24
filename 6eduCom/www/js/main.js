//require('./bootstrap.js')
require('../css/bootstrap.min.css');
require('../css/style.css')
require('../css/slider.css')
require('../fonts/css/font-awesome.min.css')
require('./bootstrap.min.js')
require('./vue.js')
window.$ = require('./jquery.min.js')
// <!-- Bootstrap -->
//     <link href="css/bootstrap.min.css" rel='stylesheet' type='text/css'/>
//     <link href="css/bootstrap.css" rel='stylesheet' type='text/css'/>
//     <meta name="viewport" content="width=device-width, initial-scale=1">
// <link href="css/style.css" rel="stylesheet" type="text/css" media="all"/>
//     <!-- start plugins -->
//     <script type="text/javascript" src="js/jquery.min.js"></script>
//     <script type="text/javascript" src="js/bootstrap.js"></script>
//     <script type="text/javascript" src="js/bootstrap.min.js"></script>
//     <!-- start slider -->
//     <link href="css/slider.css" rel="stylesheet" type="text/css" media="all"/>
//     <!----font-Awesome----->
// <link rel="stylesheet" href="fonts/css/font-awesome.min.css">
//     <!----font-Awesome----->
// <script src="js/vue.js" type="text/javascript"></script>

addEventListener("load", function () {
        setTimeout(hideURLbar, 0);
    }, false);

function hideURLbar() {
    window.scrollTo(0, 1);
}
$(function () {
    let vm = new Vue({
        el:'#big',
        data:{
            banners:'',
            customs:''
        }
    })
    $.ajax({
        url:'/get_banners',
        success(res){
            vm.banners = res;
            for (var i = 0; i < vm.banners.length; i++) {
                vm.banners[i].hide = true;
            }
            vm.banners[0].hide = false;
        },
        error(){
            alert('获取数据失败');
        }
    })
    $.ajax({
        url:'/get_custom_evaluations',
        success(res){
            vm.customs = res;
        },
        error(){
            alert('获取客户评价失败');
        }
    })
})
