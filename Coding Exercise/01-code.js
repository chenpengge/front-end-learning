// Common JavaScript interview questions
// 1. Detect data type
//  It by calling the Object. prototype. ToString. Call (data) to obtain a data type. This tag is a string, such as "[object Array]" or "[object Object]".
// The concrete type name is then extracted from the tag and converted to lower case by using regular expression replacement and split operations.
// This is an easy problem.
// For all the basic data types in JavaScript, 
//how could you write a function to detect the type of arbitrary data?
// Besides basic types, you need to also handle also commonly used complex
// data type including Array, ArrayBuffer, Map, Set, Date and Function
// The goal is not to list up all the data types but to show us how to
//solve the problem when we need to.
// The type should be lowercase 

function detectType(data){
  let tag = Object.prototype.toString.call(data)
  console.log(tag);
  tag = tag.replace(/\[|]/g,'').split(" ")[1]
  // console.log(tag);
  let str = tag.toLowerCase()
  // console.log(str);
  let typeSet = new Set([
    "string",
    "number",
    "boolean",
    "undefined",
    "null",
    "symbol",
    "array",
    "arraybuffer",
    "function",
    "map",
    "set",
    "date",
    "big"
  ])
  if (typeSet.has(str)){
    return str
  } else {
    return 'object'
  }
}
// console.log(detectType(11));
// console.log(detectType(true));
// console.log(detectType('233'));
// console.log(detectType(new Map()));
// console.log(detectType(new Set()));
console.log(detectType(new Date()));
console.log(detectType({x:1}));
console.log(detectType(() => 3));
console.log(detectType(null));

// 2. this
// In JavaScript, the pointer to this keyword is dynamic, depending on how the function is called.
// ●  When an object method uses this internally, this refers to the object on which the method was called.
// ● After an object method is assigned to a variable, this refers to the global object when the variable is called.
// ● Use the apply method to explicitly change the this context of function execution.
// ● Arrow functions inherit this from the external scope and do not have their own this binding.
// This is a JavaScript Quiz from BFE.dev


const obj = {
	a: 1,
	b: function () {
		console.log(this.a)
	},
	c() {
		console.log(this.a)
	},
	d: () => {
		console.log(this.a)
		// d是一个箭头函数, 箭头函数中没有this, 会向上级作用域寻找, 上级作用域this指向window
	},
	e: (function () {
		return () => {
			console.log(this.a);
		}
	})(), // 立即执行函数（IIFE），this会100% 指向全局对象window或者global。
	f: function () {
		return () => {
			console.log(this.a);
		}
	}
}

// console.log(obj.a) // 1
// obj.b();  // 1
// (obj.b)()  // undefined   1
// const b = obj.b 
// b()  // undefined
// obj.b.apply({ a: 2 }) // 2
obj.c()  // 1
obj.d();  // undefined
(obj.d)() // undefined
obj.d.apply({ a: 2 }) // undefined
obj.e(); //  undefined
(obj.e)() // undefined
// obj.e.call({ a: 2 }) //  undefined
obj.f()();  //  1  通过隐式绑定调用 f, 调用f返回一个箭头函数, 箭头函数的this会向上级寻找, this指向person1
(obj.f())() //  1
obj.f().call({ a: 2 }) //1 


//  3. pipe
// We traverse the funcs array using the reduce method. The reduce method accepts an accumulator function and an initial value. The accumulator function is used to take the output of the previous function as input to the next function and return the result.


/**
 * @param {Array<(arg: any) => any>} funcs 
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
	// your code here
	// return function (arg){
	// 	let result = arg
	// 	for(let item of funcs){
	// 		result = item.call(this, result)
	// 	}
	// 	return result
	// }
	return function (arg){
		return funcs.reduce((pre, cur) => {
			return cur.call(this,pre)
		},arg)
	}
}


// 4.decode message

// First, we create a function named decode and pass in the parameters, then determine the length of the parameters and the zeroth item of the parameters, and return an empty string if both are 0
// Then you need to record the current position, declare the variables row and col to represent the x and y axes, and declare the result variable to store the corresponding letters
// As we move forward, only the direction of the Y-axis actually changes alternately, and we can declare a variable, directionY, to represent its direction.
// By recording the current position row, col, + 1, row + 1 or col + 1, row - 1.
// When a boundary is encountered, change the direction of the Y-axis until the last element is taken and the result is returned.

// [
// 	[I B C A L K A]
// 	[D R F C A E A]
// 	[G H O E L A D ]
// ]
// This is a JavaScript coding problem from BFE.dev 
// 前进的时候实际上只有Y轴的方向会交替改变，我们可以用一个flag来表示其方向。

// 通过记录当前位置x, y，  + 1, y + 1 或者 x + 1, y - 1。

// 当遇到边界的时候，改变Y轴的方向，直到最后的元素被取到，就返回结果。
/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
	// your code here
	let rows = message.length
	if(rows == 0) return ''
	let cols = message[0].length
	if(cols == 0) return ''
	
	let result = ''
	let row = 0
	let col = 0
	let directionY = 1
	while(col < cols){
	  result += message[row][col]
	  console.log(result)
	  if (row == rows - 1) {
		  directionY = -1
	  }
	  if (row == 0){
		directionY = 1
	  }
	  col += 1
	  row += directionY
	}
	return result
  }

// 5.improve-a-function

// In this case we need to use a map
// Iterate over each key-value pair in the excludes array, storing them using the excludeMap object. If a key does not exist in excludeMap,Create a new Set object and store it as a value in excludeMap; If the key already exists, the Set object for the corresponding value is fetched and the current value is added to the Set object.
//  Use the filter method of the items array to filter out the items that meet the conditions and return a new array. For each item, use Object.keys(item) to get all its keys,Then use every method to iterate over the keys.
// In the callback function of every method, determine whether the current key exists in excludeMap. If it does not exist, the key does not need to be excluded and returns true.
// If so, get the Set object of the corresponding value, and use the has method to determine whether the value of the current item exists in the Set.
// Finally, the filter method returns a new array containing the items that were not excluded.
function excludeItems(items, excludes) {
  let excludeMap = new Map()
  for (let { k, v } of excludes) {
    if (!excludeMap.has(k)) {
      excludeMap.set(k, new Set())
    }
    excludeMap.get(k).add(v)
  }
  return items.filter(item => {
    return Object.keys(item).every(
      key => !excludeMap.has(key) || !excludeMap.get(key).has(item[key])
    )
  })
}
// I hope that will be helpful.