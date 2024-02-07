Implementing the call Function Manually

Steps to Implement the call Function：

1. 
Determine if the caller is a function, even though it's defined on the function's prototype, it might be called using methods like call.

2. 
Check if the passed-in context object exists; if not, set it to window.

3. 
Process the passed-in arguments, slicing off all parameters after the first one.

4. 
Attach the function as a property of the context object.

5. 
Invoke the method using the context object and save the result.

6. 
Remove the newly added property.

7.
Return the result.

// call函数实现
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
      result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
