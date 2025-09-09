####1)What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?

_____________________________________________________________________________________________________________________________________________________________

_______________________________________________________________________________________________________________________________________________________________


Answer to the question no.01;


var ,let and const are keyword of javascript that is use to declare of assign a value .

Here I discuss about some major difference between them.

var:- var is a type of keyword in js that is change able , that means we can do modify of change it . and also it is redeclare able keyword

example ;

var id=36;

id=37;

var id=38;


let:- let is a similar type of keyword in js , but let is different from var . 

we can change it the value of let , but we cann’t redeclare the value o let , that is the difference from var.

example:

let id=36;

id=37;

let id=38;( it will be error)

const:- it is also similar types of keyword in js like var , const,

but it is totally different from var and little bit for const. 

major difference is , const is not change able or redeclareable;

that means the value of const is fixed;

example;

const id=36;

id=37;(error)

const id=38(error)#

___________________________________________________________________________________________________________________________________________________________

_____________________________________________________________________________________________________________________________________________________________

Answer to the question no:2

map(), forEach(), and filter() are the method of , Javascript 

, mainly those are used to create new array with different condition;

now iam discuss about the difference between map(), forEach(), and filter()

map(), is a method of javascript that is used to that create a new array 

by using new function to through each element of the main array . it cannot able to change it .

and it is return a new array ;

filter(), is a method of javascript that is used to create an new array ,

and it contain the value of orginal array and it will create when some condition will pass;

it does not change the old array, (orginall) n

 The forEach() method is an array method that go through  a provided
 
 function once for each element of an array. And it has no return value that means undefined ;
_________________________________________________________________________________________________________________________________________________________

__________________________________________________________________________________________________________________________________________________________


Answer to the question no:3

An arrow function is a shorter and easy  way to write functions 

in JavaScript introduced in ES6, using the => (arrow) syntax.

 It does not have its own this,parameter/ arguments, 
 
 or super, instead it takes them from the surrounding scope.

 __________________________________________________________________________________________________________________________________________________________

____________________________________________________________________________________________________________________________________________________________

Answer to the question no :4

Destructuring assignment is an ES6 feature that is a easy way to unpack

values from arrays or properties from objects into separate variables .

It work on some step that are;

1.	Array Destructuring
  
2.	Object Destructuring
  
3.	Nested Destructuring
___________________________________________________________________________________________________________________________________________________________

____________________________________________________________________________________________________________________________________________________________


Answer to the question no .5:


Template literals are a new way of creating strings in ES6 using backticks (`) instead of quotes ('or").

They allow string  inserting variables directly, multi-line strings, and embedded expressions.

Here I discuss the difference between string concatenation 

Template Literals (ES6)

String concatenation: It is a old way , it is use ‘+’ for joining two string .

expression support and readability are very hard , on multiple support line need \n;

Template Literals (ES6): It is a new way , Uses backticks `, ${ } for vars, it is very easy read ,

clean and easy to write it direct support multiple support lite;







