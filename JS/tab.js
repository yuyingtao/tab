;(function($){
	//构造函数
	var Tab=function(tab) {
		var _this=this;
		this.tab=tab;
		this.tabnav=_this.tab.find("ul.tab-nav li");
		this.conntent=this.tab.find(".tab-content .tab-item");
		this.config={
			"triggerType":"mouseover",
			"effect":"default",
			"invoke":2,
			"loop":false
		}
		if(this.getConfig()){
			$.extend(this.config, this.getConfig());
	  }
		var _config=this.config;
			if(this.config.loop){
			this.timer=null;
			this.config.auto=3000;
			this.loop=0;
			this._loop();
			this.tab.hover(function(){
				window.clearInterval(_this.timer);
			},function(){
				_this._loop();
			})
		}
		if(_config.triggerType==="click"){
			this.tabnav.bind(_config.triggerType,function(){
				_this.invoke($(this));
			})
		}else{
			this.tabnav.bind("mouseover",function(){
				_this.invoke($(this));
			})
		}
	  if(_config.invoke!=null&&_config.invoke){
	  	_this.invoke(this.tabnav.eq(_config.invoke))
	  }
	};
	//对象的方法
	Tab.prototype={
		invoke:function (curentTab) {
			var index=curentTab.index();
			curentTab.addClass("actived").siblings().removeClass("actived");
			if(this.config.effict==="defalut"){
			this.conntent.eq(index).addClass("current").siblings().removeClass("current")
			}else{
				this.conntent.eq(index).addClass("current").fadeIn().siblings().fadeOut()
			}
			this.loop=index;
			
			

		},
	  getConfig:function () {
	  	var config=this.tab.attr("data-config")
	  	if(config!=null&&config!=""){ 
	  		return $.parseJSON(config)
	  	}else {
	  		return null;
	  	}
	  },
	  _loop:function () {
	  	var _this=this,
	  	tab=this.tabnav,
	  	tabLen=tab.size(),
	  	config=this.config;
	  	this.timer=window.setInterval(function(){
	  		_this.loop++;
	  		if(_this.loop>=tabLen){
	  			_this.loop=0;
	  		}
	  		tab.eq(_this.loop).trigger(config.triggerType)
	  	},config.auto)
	  }
	}
	//window.Tab=Tab;
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this));
				
			});
			return this
		}
	})
})(jQuery);
