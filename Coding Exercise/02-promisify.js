
// To solve this problem and implement the promisify() function, we need to:
// 1. Define the promisify() function, which takes a function (func) as an argument.
// 2. Return a new function that wraps the original function (func) and returns a promise.
// 3. Inside the new function, call the original function (func) with the provided arguments, plus a callback function.
// 4. Inside the callback function passed to the original function, check if there is an error. If there is an error, reject the promise with the error. If there is no error, resolve the promise with the data.
// 5. Return the promise from the new function.
/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
// 这段代码实现了一个名为promisify的函数，它接受一个函数func作为参数
// ，该函数遵循了“error-first callback”的约定。然后，promisify函数返回一个新的函数，
// 这个函数也接受与原始函数相同的参数，并返回一个 Promise 对象。
function promisify(func) {
	return function (...args) {
		return new Promise((resolve, reject) => {
			//Call the original function with provided arguments and a callback function
			func.call(this, ...args, (error, data) => {
				if (error) {
					reject(error)
				} else {
					resolve(data)
				}
			})
		})
	}
}


// 	implement-once
// _.once(func) is used to force a function to be called only once, later calls only returns the result of first call.
// Can you implement your own once()?
function func(num) {
	return num
}

const onced = once(func)

onced(1)
// 1, func called with 1

onced(2)
// 1, even 2 is passed, previous result is returned
/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
	// your code here
	let flag = false
	let result
	return function () {
		if (!flag) {
			flag = true
			result = func.apply(this, arguments)
		}
		return result
	}
}
function func(num) {
	return num;
}

// console.log(onced(1)); // Output: 1, func called with 1
// console.log(onced(2)); // Output: 1, even though 2 is pass
// this question  is used to force a function to be called only once, later calls only returns the result of first call.
// Create a variable flag and initialize it to false.This variable will be used to indicate whether the function has been called.
// Create a variable named result to store the result of the function call.
// The once function returns a new anonymous function,Inside the new function,if  the flag is false, the function has not  been called.Sets the flag flag to true.
// The original function func is called with the apply() method and the result is stored in the result variable.Returns the result of a function call.
// The once function ensures that the original function func passed in will only be called once, and all subsequent calls will directly return the result of the first call.