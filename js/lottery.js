/*
* Object: lottery module
* Author: Barry Chen
* Create: 2016/7/11
* Update: 2017/6/6
* Version: 1.0.1
*/
function lottery(){
	this.container = "#lottery"; // ������id/class
	this.items = ".lottery-item"; // �齱Ԫ��id/class
	this.focusClass= "lottery-active"; // ѡ��Ԫ����ʽ
	this.index = 0; // ��ǰ����index
	this.timer = null; // �齱��ʱ��
	this.speed = 200; // �����ٶ�
	this.count = 0; // �齱Ԫ�ظ���
	this.loop = 4; // ������ҪתXȦ
	this.cycle = 0 // ������Ҫת�����ٴ� count*loop
	this.prize = -1;  // ��Ʒindex
	this.callback =""; // ��ɳ齱��ص�
	this.isStart = false;
}
// ��ʼ���齱���
lottery.prototype.init = function(o){
	$.extend(this,(typeof(o)==="object")?o:{});
	this.count = $(this.container).find(this.items).length; 
	this.cycle = this.loop*this.count; // ������Ҫת���ٸ����� 
	if(this.count>0){
		this.children = [];
		for(var i=1;i<=this.count;i++){
			this.children.push($(this.container).find(this.items+"-"+i));
		}
	}
}
// Ϊ����Ԫ�����class
lottery.prototype.focus = function(){
	this.index = (this.index>=this.count-1)?0:(this.index+1);	
	$(this.container).find(this.items).removeClass(this.focusClass);
	this.children[this.index].addClass(this.focusClass);
}
// ��ʼ�齱
lottery.prototype.start = function(){
	if(this.isStart==false){
		this.isStart = true;
		this.children[0].addClass(this.focusClass);
		var self=this;
		setTimeout(function(){self.roll();},200);
	}
}
// ֹͣ�齱�����ݻ�Ԫ�����
lottery.prototype.stop = function(idx,callback){
	var self = this;
	setTimeout(function(){self.cycle += idx;self.prize = idx;self.callback = callback;}, 1500);
}
// �齱ѭ��
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