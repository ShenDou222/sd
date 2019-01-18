//用来存储与蛇块,有几个蛇块 存几个div
var snakeBody=[];
//存所有蛇块的位置
var snakePosition=[];
// 蛇的宽度
var width =20;
//蛇移动的方向  37 左 38上 39 右 40 下
var drection=37;
//速度
var speed =1000;
// 定时器
var timer;
// 方向最后一次改变的毫秒值
var lastChangeTime=0;
// 用来记录食物的div
var food=null;
// 用来记录食物的位置
var foodp=[];
// 页面加载后 
onload =function(){
	fatherDiv =document.getElementById("show");
	// 初始化所有的蛇块
	createSnake();
	// 将蛇块画到div 中
	drowSnake();
	makeAfood();
}
// 初始化蛇块的函数
function createSnake(){
	// 初始化5个蛇块
	for(var i=0;i<7;i++){
		var div = document.createElement("div");
		div.className="snake";
		snakeBody.push(div);
		// 把初始化的5个蛇块的位置存到snakePosition 中 18+i  表示 块的横坐标 5 纵坐标
		snakePosition.push([18+i,5])
	}
} var a = [20,20]; a[0];a[1]
// 画蛇
function drowSnake(){
	for(var i=0;i<snakeBody.length;i++){
		// 设置每一个蛇块的横坐标
		snakeBody[i].style.left =snakePosition[i][0]*width+"px";
		// 设置每一个蛇块的纵坐标
		snakeBody[i].style.top =snakePosition[i][1]*width+"px";
		// 追加到主展示区
		fatherDiv.appendChild(snakeBody[i]);
		// 清空每一个快的类名
		// snakeBody[i].className="";
		snakeBody[i].className="snake";
		// 设置蛇头的样式
		if(i==0){
			snakeBody[i].classList.add("head");
		}
		// 设置蛇身体的样式
		if(i%3==0){
			snakeBody[i].classList.add('color0');
		}else if(i%3==1){
			snakeBody[i].classList.add('color1');
		}else{
			snakeBody[i].classList.add('color2');
		}	
	}
}
// 移动函数
function move(){
	// 1.移除最后一个节点的位置
	// 2.追加一个新的节点位置
	var oldHeadPosition =snakePosition[0];

	var newHeadPosition =[];
	// 3.修改位置
	for(var i in  oldHeadPosition){
		newHeadPosition[i] = oldHeadPosition[i];
	}
	// 判定新蛇头的位置应该在什么位置
	if(drection==37){
		newHeadPosition[0]=newHeadPosition[0]-1;
	}else if(drection ==38){
		newHeadPosition[1]=newHeadPosition[1]-1;
	}else if(drection ==39){
		newHeadPosition[0]=newHeadPosition[0]+1;
	}else if(drection ==40){
		newHeadPosition[1]=newHeadPosition[1]+1;
	}
	// 判定有没有吃到食物
	if(newHeadPosition.toString()==foodp.toString()){
		// 如果吃到食物 就将食物追加到 蛇块当中 
		//并且将食物的位置 追加到 蛇位置数组当中
		// snakePosition.unshift(foodp);
		snakeBody.push(food);
		makeAfood();
		console.log(snakePosition,snakeBody);
	}else{
		snakePosition.pop();
	}
	if(pandingHead(newHeadPosition)){
		snakePosition.unshift(newHeadPosition);
		drowSnake();
	}else{
		clearInterval(timer);
		alert("game over");

	};
	// 4.从新画这条蛇
}
function  pandingHead(arr){
	if(arr[0]>=0&&arr[0]<=24&&arr[1]>=0&&arr[1]<=24){
		for(var i=0;i<snakePosition.length;i++){
			if(snakePosition[i].toString()==arr.toString()){
				alert("因为食物的位置已经添加到了蛇位置的数组，所有这里一定执行")
				return false;
			}
		}
		return true;
	}else{
		return false;
	}
}
// 键盘按下事件
onkeydown = function(){
	// 判定是不是上下左右键
	if(event.keyCode==37||event.keyCode==38||event.keyCode==39||event.keyCode==40){
		// 是不是垂直方向
		if(Math.abs(event.keyCode-drection)%2){
			// 获取系统当前时间的毫秒值
			var d1 = Date.now();
			// 判定修改时间是否大于速度
			if(d1-lastChangeTime>speed){
				// 修改方向
				drection =event.keyCode;
				// 记录修改时间
				lastChangeTime=d1;
			}	
		}
	}
	// 空格调速
	if(event.keyCode==32){
		speed==300?speed=200:speed=100;
		clearInterval(timer);
		timer=setInterval(move,speed);
	};
}
// 启动定时器 让蛇移动
timer=setInterval(move,speed);  
// 随机产生一个豆
function makeAfood(){
	food = document.createElement('div');
	food.className="food";
	var x = Math.floor(Math.random()*25);
	var y =Math.floor(Math.random()*25);
	foodp=[x,y];
	food.style.left=x*width+"px";
	food.style.top=y*width+"px";
	fatherDiv.appendChild(food);
}