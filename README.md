# lottery

自定义jQuery抽奖组件

@author : 陈文琦(Barry)
@create : 2016/7/11
@update : 2017/6/6
@version : 1.0.1

抽奖元素支持随意摆放，按照dom中排列顺序进行排序(抽奖顺序)

初始化组件：
var loot = new lottery();
	loot.init({
	    container:'#lottery', // 容器ID
	    items:'.lottery-unit', // 抽奖元素公共样式
	    focusClass:'active', // 抽奖高亮class
	    loop:3 // 至少需要转多少圈
	});

调用方法：
$("#start-lottery").click(function(){
	if(loot.isStart==false){
        // 当抽奖未执行时才进来,防止连点
        var index = 2,coupon = 'WAWEYUIO2109DEWQUIO',name='棒球衫';
        // 启动抽奖
        loot.start();
        // 设置中奖元素序号、回调函数
        loot.stop(index,function(i){
        	// do something
            alert('恭喜您获得了第'+(i+1)+'项奖品');            
        });
    }       
});	