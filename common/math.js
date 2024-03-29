//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：$h.Div(arg1,arg2)
//返回值：arg1除以arg2的精确结果
const Div = function(arg1, arg2) {
	arg1 = parseFloat(arg1);
	arg2 = parseFloat(arg2);
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {}
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return this.Mul(r1 / r2, Math.pow(10, t2 - t1));
}
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：$h.Add(arg1,arg2)
//返回值：arg1加上arg2的精确结果
const Add = function(arg1, arg2) {
	arg2 = parseFloat(arg2);
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(100, Math.max(r1, r2));
	return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
}
//减法函数，用来得到精确的减法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：$h.Sub(arg1,arg2)
//返回值：arg1减去arg2的精确结果
const Sub = function(arg1, arg2) {
	arg1 = parseFloat(arg1);
	arg2 = parseFloat(arg2);
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
}
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：$h.Mul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
const Mul = function(arg1, arg2) {
	arg1 = parseFloat(arg1);
	arg2 = parseFloat(arg2);
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = function(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

export default {
	Add,
	Mul,
	Div,
	Sub,
	formatTime
}
