What are the methods for delaying the loading of JavaScript scripts? 
Delayed loading is to wait until the page is loaded before loading the JavaScript file. It helps to speed up page loading. 

Generally, there are the following ways to do it: 

● 
Add the defer attribute to the js script: This attribute synchronizes the script loading and Document parsing, and then executes the script file after the document parsing is completed. In this way, the page rendering is not blocked. Multiple scripts with the preceding attribute are executed sequentially according to the specifications, but this may not be the case in some browsers. 
● 
Add the async attribute to the js script: This attribute will asynchronously load the script and will not block the parsing process of the page. However, when the script is loaded, the js script will be executed immediately. If the document is not parsed, it will also be blocked. The execution sequence of scripts with multiple async attributes is unpredictable and is generally not executed in sequence according to the code sequence. 
● 
Dynamic DOM creation method: to dynamically create DOM tags, one way is to listen to document loading events. After the document is loaded, you can dynamically create script tags to introduce js scripts. 
● 
use the setTimeout delay method: set a timer to delay loading js script files 
● 
Load JS last: Put the js script at the bottom of the document so that the js script can be loaded and executed at the end as much as possible. 

JavaScript definition of class array objects? 

An object with the length attribute and several Index attributes can be called a class array object. Class array objects are similar to arrays, but array methods cannot be called. Common class array objects include the results returned by arguments and DOM methods. Another function can also be considered as a class array object because it contains the length attribute value, which represents the number of parameters that can be received. 

There are several common methods to convert class arrays into arrays: 

call the slice method of the array to realize the conversion
Array.prototype.slice.call(arrayLike);

call the splice method of the array to realize the conversion
Array.prototype.splice.call(arrayLike, 0);

use apply to call the concat method of the array to realize the conversion
Array.prototype.concat.apply([], arrayLike);

implement the conversion by using the Array.from method
Array.from(arrayLike);
