window.onload = function(){
	var datalist = document.getElementById("datalist");  //父容器
	var list = document.getElementsByTagName("li");  
	 
	//ie9以下支持classList
	supportIe9();
	
	setTimeout(function(){
		//遍历列表
		for(var i in list){
			//添加鼠标移入事件
			addEvent(list[i],"mouseover",function(){
				var currentmask = this.getElementsByTagName("span")[0];
				var active = getClass("li","active");
				active.classList.remove("active");
				this.classList.add("active");
				currentmask.classList.remove("mask");
			});
			//添加鼠标移出事件
			addEvent(list[i],"mouseout",function(){
				var currentmask = this.getElementsByTagName("span")[0];
				currentmask.classList.add("mask");
			});
		}
	},100);
}

//添加事件监听
function addEvent(obj,type,handle){
	if(obj.addEventListener){
		obj.addEventListener(type,handle,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on" + type,handle);
	}else{
		obj["on" + type] = handle;
	}
}

//通过类名获取对象
function getClass(tagName,ClassName){
	if(document.getElementsByClassName) //支持这个函数
    {        
    	return document.getElementsByClassName(ClassName)[0];
    }else{
    	var obj = document.getElementsByTagName(tagName);
		for(var i=0; i < obj.length;i++){
			var reg = new RegExp(ClassName);
			if(reg.test(obj[i].className)){
				return obj[i];
			}
		}
		return undefined;
		
    }
};

//ie9以下支持classList
function supportIe9(){
	if (!("classList" in document.documentElement)) {  
        Object.defineProperty(HTMLElement.prototype, 'classList', {  
            get: function() {  
                var self = this;  
                function update(fn) {  
                    return function(value) {  
                        var classes = self.className.split(/\s+/g),  
                            index = classes.indexOf(value);  
                          
                        fn(classes, index, value);  
                        self.className = classes.join(" ");  
                    }  
                }  
                  
                return {                      
                    add: update(function(classes, index, value) {  
                        if (!~index) classes.push(value);  
                    }),  
                      
                    remove: update(function(classes, index) {  
                        if (~index) classes.splice(index, 1);  
                    }),  
                      
                    toggle: update(function(classes, index, value) {  
                        if (~index)  
                            classes.splice(index, 1);  
                        else  
                            classes.push(value);  
                    }),  
                      
                    contains: function(value) {  
                        return !!~self.className.split(/\s+/g).indexOf(value);  
                    },  
                      
                    item: function(i) {  
                        return self.className.split(/\s+/g)[i] || null;  
                    }  
                };  
            }  
        });  
    }  
}