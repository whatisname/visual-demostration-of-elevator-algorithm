//javascript file
//author:
//
// var position = $("#position"); //电梯当前位置
// var direction = $("#direction"); //电梯当前方向
// var userInfo = $("#user-info"); //用户点击情况
// var elevatrInfo = $("#elevatr-info"); //电梯运行情况
function setPos(pos) {
    var position = $("#position"); //电梯当前位置
    position.val(pos + "层");

    var elevator = $("#elevator-item");
    elevator.css('left', (pos-1) * 50 + 'px' );
}

function setDir(dir) {
    var direction = $("#direction"); //电梯当前方向
    switch (dir) {
        case 0:
        case "停":
            direction.val("停");
            break;
        case 1:
        case "上":
            direction.val("上");
            break;
        case 2:
        case "下":
            direction.val("下");
            break;
        default:
            break;
    }
}

function setUserInfo(info) {
    var userInfo = $("#user-info"); //用户点击情况
    userInfo.html(info);
    userInfo.append("<br/>");
}
function appendToUserInfo(info) {
    var userInfo = $("#user-info"); //用户点击情况
    userInfo.append(info);
    userInfo.append("<br/>");
}

function setElevatorInfo(info) {
    var elevatrInfo = $("#elevatr-info"); //电梯运行情况
    elevatrInfo.html(info);
    elevatrInfo.append("<br/>");
}
function appendToElevatorInfo(info) {
    var elevatrInfo = $("#elevatr-info"); //电梯运行情况
    elevatrInfo.append(info);
    elevatrInfo.append("<br/>");
}

function setErrorInfo(info) {
	var errorInfo = $("#error-info"); //错误信息显示
	errorInfo.html(info);
	errorInfo.append("<br/>");
}
function appendToErrorInfo(info) {
	var errorInfo = $("#error-info"); //错误信息显示
	errorInfo.append(info);
	errorInfo.append("<br/>");
}

function isListEmpty(list){

	if(list[1] === undefined) //列表为空（首项从1开始，不考虑list[0]）
		return 1; 

	//列表不为空
	return 0;
}

function appendToList (list,item) {
	list[list.length] = item;
	return 1;
}

function popList(list)
{
	if(list.length == 1)
	{
		return false;
	}
	else
	{
		// //从第二个位置开始前移 -12
		// for(var j = 1; j < list.length-1; j++)
		// {
		// 	list[j] = list[j+1];
		// }
		list.splice(1,1);
		return true;
	}
}

function insertIntoList(waitingList,floor,pos)
{
	if(pos == 0)
		return false;
	else
	{
		//重复值检查
		if(floor == waitingList[pos-1])
		{
			// setErrorInfo("不可插入重复值");
			return false;
		}
		//插入位置后面的元素后移
		for(var j = waitingList.length; j > pos; j--)
		{
			waitingList[j] = waitingList[j-1];
		}
		waitingList[pos] = floor;
		return true;
	}
}

function getInsertPosi(list,floor,eleStatu,elePos)
{
	//调度算法说明
	//等待队列里有两类位置：位于电梯方向上 和 位于返回方向上两种顺序相反
	//插入有一下几种情况
	//1.需插入楼层位于电梯运动方向上，按照大小插入到第一类位置
	//2.需插入楼层位于电梯运动方向相反方向，按照大小插入到第二类位置上
	//3.忽略需插入楼层和电梯所处相同楼层的情况
	//
	//应先判断电梯方向
	//电梯运动方向为上，等待队列中排列为：高层顺序+底层逆序  6789 (5) 4321
	//电梯运动方向为下，等待队列中排列为：低层逆序+高层顺序  4321 (5) 6789
	
	if (eleStatu == 1) //电梯向上
	{
		//alert("电梯向上");
		if(floor >= elePos) //第一种情况
		{
			//alert("电梯向上-第一种情况");
			var i;
			for (i = 1; i < list.length; i++)
			{
				if(floor < list[i] && elePos < list[i])//找到插入位置
				{
					// setErrorInfo("插入到第 " + i + " 个");
					return i;
				}
				if(elePos > list[i]) //访问到第一类位置结束时结束循环
					break;
			}
			//如果访问到队尾未插入，插入到队尾
			//如果访问完第一类位置，插入到第一类位置的结尾（第二类位置开头）
			if (i == list.length || elePos > list[i])
				return i;
					
		}else //第二种情况
		{
			//alert("电梯向上-第二种情况");
			var i;
			for (i = 1; i < list.length; i++)
			{
				if(floor > list[i] && elePos > list[i])//找到插入位置
				{
					// setErrorInfo("插入到第 " + i + " 个");
					return i;
				}
			}//end of for
			//如果访问到队尾未插入，插入到队尾
			if (i == list.length)
				return i;

		}//end of if-else :第二种情况
	}else if(eleStatu == 2) //电梯向下
	{
		// alert("电梯向下");
		if(floor <= elePos) //第一种情况
		{
			//alert("电梯向下-第一种情况");
			var i;
			for (i = 1; i < list.length; i++)
			{
				if(floor > list[i] && elePos > list[i])//找到插入位置
				{
					// setErrorInfo("插入到第 " + i + " 个");
					return i;
				}
				if(elePos < list[i]) //访问到第一类位置结束时结束循环
					break;
			}
			//如果访问到队尾未插入，插入到队尾
			//如果访问完第一类位置，插入到第一类位置的结尾（第二类位置开头）
			if (i == list.length || elePos < list[i])
				return i;
					
		}else //第二种情况
		{
			//alert("电梯向下-第二种情况");
			var i;
			for (i = 1; i < list.length; i++)
			{
				if(floor < list[i] && elePos < list[i])//找到插入位置
				{
					// setErrorInfo("插入到第 " + i + " 个");
					return i;
				}
			}//end of for
			//如果访问到队尾未插入，插入到队尾
			if (i == list.length)
				return i;
		}//end of if-else :第二种情况
	}else if(eleStatu == 0) //电梯静止
	{
		// alert("电梯静止");
		return list.length;
	}
}


