Print red, yellow and green

A typical problem to compare several asynchronous programming methods: red light is on for 3 seconds, green light for 1 second, and yellow light for 2 seconds. How can we make the three lights continuously alternate in a repeating sequence?
三个亮灯函数：
Three lighting functions:

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

这道题复杂的地方在于需要“交替重复”亮灯，而不是“亮完一次”就结束了。
The complexity of this problem is that it requires "alternating repeated" lighting, rather than "lighting once" and then ending.
（1）用 callback 实现
(1) Implement with callback

const task = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') {
            red()
        }
        else if (light === 'green') {
            green()
        }
        else if (light === 'yellow') {
            yellow()
        }
        callback()
    }, timer)
}
task(3000, 'red', () => {
    task(2000, 'green', () => {
        task(1000, 'yellow', Function.prototype)
    })
})

这里存在一个 bug：代码只是完成了一次流程，执行后红黄绿灯分别只亮一次。该如何让它交替重复进行呢？
There is a bug here: the code only completes the process once, and the red, yellow and green lights only once after execution. How do you make it alternate?
上面提到过递归，可以递归亮灯的一个周期：
Recursion mentioned above can recursively light a period:

const step = () => {
    task(3000, 'red', () => {
        task(2000, 'green', () => {
            task(1000, 'yellow', step)
        })
    })
}
step()

注意看黄灯亮的回调里又再次调用了 step 方法 以完成循环亮灯。
Notice that in the callback of the yellow light, the step method is called again to complete the cyclic lighting.
（2）用 promise 实现
(2) Implement with promises

const task = (timer, light) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            }
            else if (light === 'green') {
                green()
            }
            else if (light === 'yellow') {
                yellow()
            }
            resolve()
        }, timer)
    })
const step = () => {
    task(3000, 'red')
        .then(() => task(2000, 'green'))
        .then(() => task(2100, 'yellow'))
        .then(step)
}
step()

这里将回调移除，在一次亮灯结束后，resolve 当前 promise，并依然使用递归进行。
This version removes the callback, resolving the promise at the end of each lighting sequence and using recursion to continue the cycle.
（3）用 async/await 实现
(3) Implement with async/await

const taskRunner =  async () => {
    await task(3000, 'red')
    await task(2000, 'green')
    await task(2100, 'yellow')
    taskRunner()
}
taskRunner()