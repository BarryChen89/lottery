/*
* Object: lottery module
* Author: Barry Chen
* Create: 2016/7/11
* Update: 2017/6/6
* Version: 1.0.1
*/
function lottery(){
	this.container = "#lottery"; // 父框体id/class
	this.items = ".lottery-item"; // 抽奖元素id/class
	this.focusClass= "lottery-active"; // 选中元素样式
	this.index = 0; // 当前高亮index
	this.timer = null; // 抽奖计时器
	this.speed = 200; // 最慢速度
	this.count = 0; // 抽奖元素个数
	this.loop = 4; // 至少需要转X圈
	this.cycle = 0 // 至少需要转动多少次 count*loop
	this.prize = -1;  // 奖品index
	this.callback =""; // 完成抽奖后回调
	this.isStart = false;
}
// 初始化抽奖组件
lottery.prototype.init = function(o){
	$.extend(this,(typeof(o)==="object")?o:{});
	this.count = $(this.container).find(this.items).length; 
	this.cycle = this.loop*this.count; // 至少需要转多少个格子 
	if(this.count>0){
		this.children = [];
		for(var i=1;i<=this.count;i++){
			this.children.push($(this.container).find(this.items+"-"+i));
		}
	}
}
// 为高亮元素添加class
lottery.prototype.focus = function(){
	this.index = (this.index>=this.count-1)?0:(this.index+1);	
	$(this.container).find(this.items).removeClass(this.focusClass);
	this.children[this.index].addClass(this.focusClass);
}
// 开始抽奖
lottery.prototype.start = function(){
	if(this.isStart==false){
		this.isStart = true;
		this.children[0].addClass(this.focusClass);
		var self=this;
		setTimeout(function(){self.roll();},200);
	}
}
// 停止抽奖，传递获奖元素序号
lottery.prototype.stop = function(idx,callback){
	var self = this;
	setTimeout(function(){self.cycle += idx;self.prize = idx;self.callback = callback;}, 1500);
}
// 抽奖循环
lottery.prototype.roll = function(obj){
	var self = obj || this;
	self.cycle--;
	self.focus();
	if (self.cycle<=0 && self.prize==self.index) {
		clearTimeout(self.timer);
		self.cycle = self.count*self.loop;
		self.prize=-1;
		self.speed=200;
		self.isStart=false;
		setTimeout(function(){
			$(self.container).find(self.items).removeClass(self.focusClass);
			if($.isFunction(self.callback)){self.callback(self.index);}
			self.index = 0;
		}, 1000);
	}else{
		if(self.prize == -1){ 
			self.speed = (self.speed<=100)?100:(self.speed-10);
		}else{
			if(self.prize<5&&self.cycle<=5 || (self.prize-self.index<=5)&&self.cycle<=5) self.speed += 300;
		}
		self.timer = setTimeout(function(){self.roll(self)},self.speed);
	}
}