//javascript file
//author:
var waitingList = new Array();
waitingList[0] = "-";
var eleStatu = 0; //电梯运动状态	0:停;	1:上;	2:下;
var elePos = 1; //电梯当前楼层

$(document).ready(function(){
	start();
});

function start () {
	//初始化信息
	setPos(elePos); //电梯开始停在0层
	setDir(eleStatu); //开始时暂停		0或"停":停;		1或"上":上;	2或"下":下;
	setUserInfo(""); 
	setElevatorInfo("");

	//启动计时器
	var elevatorMove = setInterval("move()",2000);
}

function choseFloor(floor)
{
	//加入到等待队列
	//addToWatingList(Floor);
	//移动电梯
	addToWatingList(floor)
}

function addToWatingList (floor) 
{	
	var dir = 0; //判断电梯运动状态标志 0：向上;	1:向下;
	//如果需插入楼层和电梯所处位置为相同楼层，电梯保持状态（实际应该开门，电梯停下，TODO）
	if(elePos == floor)
		return eleStatu;
	
	//判断队列是否为空
	if(isListEmpty(waitingList)) //没有人等待时(电梯静止)
	{
		// setErrorInfo("电梯为空");
		appendToList(waitingList,floor);

	}else //有人等待(电梯运动)
	{
		// setErrorInfo("插入等待队列");
		
		var pos = getInsertPosi(waitingList,floor,eleStatu,elePos); //应当插入在waitingList的该元素之后
		insertIntoList(waitingList,floor,pos);
	}
	//判断电梯运动状态
	//排列队列
	//显示在网页上
	// appendToUserInfo("加入 " + floor +" 以后队列： "+waitingList);
	setUserInfo(waitingList + " (加入 " + floor + " )");
}

function move () 
{
	//无用户乘坐电梯，停下电梯
	if( waitingList.length == 1)
	{
		eleStatu = 0; //电梯运动状态	0:停;	1:上;	2:下;
		updateInfo();
	}
	else//有用户申请，开始运动
	{
		//向上
		if(waitingList[1] > elePos)
		{
			eleStatu = 1;
			// showAnimation(elePos,waitingList[1]);
			elePos = waitingList[1];
			popList(waitingList);
			updateInfo();
		}
		else if(waitingList[1] < elePos) //向下
		{
			eleStatu = 2;
			// showAnimation(elePos,waitingList[1]);
			elePos = waitingList[1];
			popList(waitingList);
			updateInfo();
		}
	}

	// appendToUserInfo("移动一次以后队列： " + waitingList);
	setUserInfo(waitingList);
}

function updateInfo()
{
	setPos(elePos);
	setDir(eleStatu);
}

function showAnimation(elePos,elePos1){
	if(elePos >= elePos1)
	{
		var distance = 50 * (elePos - elePos1); 
		appendToErrorInfo("上： "+ (elePos - elePos1) );
		var elevator = $("#elevator-item");
		elevator.animate({
			left:'-='+ distance+'px'
		},50);
	}else
	{
		var distance = 50 * (elePos1 - elePos); 
		appendToErrorInfo("下： "+ (elePos1 - elePos) );
		var elevator = $("#elevator-item");
		elevator.animate({
			left:'+='+ distance+'px'
		},50);
	}
	
}
