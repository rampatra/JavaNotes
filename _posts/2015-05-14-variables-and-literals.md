---
layout: post
title: Variables and Literals
---

Variables are devices that are used to store data, such as a number, or a string of character data so that we can 
manipulate them later in our program. Variables can be broadly classified in to 4 types in Java:

1. __Instance__ variables (non-static, declared in a class).
2. __Class__ variables (static, declared in a class).
3. __Local__ variables (declared inside a method).
4. __Parameters__ (variables in a method signature).

Instance variables and objects reside in heap whereas local variables reside in stack. Consider the below program:

{% highlight java linenos %}
class Collar {
}

class Dog {
    Collar c; // instance variable
    String name; // instance variable

    public static void main(String[] args) {
        Dog d; // local variable: d
        d = new Dog();
        d.go(d);
    }

    void go(Dog dog) { // local variable: dog
        c = new Collar();
        dog.setName("Aiko");
    }

    void setName(String dogName) { // local var: dogName
        name = dogName;
        // do more stuff
    }
}
{% endhighlight %}

For the above program, the instance variables, objects and local variables will be stored in memory as shown in the 
figure below:

![](/img/posts/variables.png)

### Literal Values for All Primitive Types

__Literals__ are nothing but values that a particular data type can hold. A __primitive literal__ is merely a source 
code representation of the primitive data types, in other words, an integer, floating-point number, boolean, or 
character etc. that you type in while writing code. The following are examples of primitive literals:

{% highlight java %}
127          // byte literal
376          // short literal
4290         // int literal
58L          // long literal
2546.343f    // float literal
2546789.343  // double literal
'b'          // char literal
false        // boolean literal
{% endhighlight %}

#### Integer Literals

There are four ways to represent integer numbers in the Java language: decimal (base 10), octal (base 8),
hexadecimal (base 16), and from Java 7, binary (base 2).
 
One more new feature introduced in Java 7 was __numeric literals with underscores (_) characters__. This was introduced
to increase readability. See below:

{% highlight java %}
int pre7 = 1000000;     // pre Java 7 – we hope it's a million
int with7 = 1_000_000;  // much clearer!
{% endhighlight %}

But you must keep in mind the below gotchas:
{% highlight java %}
int i1 = _1_000_000; // illegal, can't begin with an "_" 
int i2 = 10_0000_0;  // legal, but confusing
{% endhighlight %}

NOTE: You can use the underscore character for any of the numeric types (including doubles and floats), but for
doubles and floats, you CANNOT add an underscore character directly next to the decimal point.

**Decimal Literals**

These are numbers with a radix of 10 which we use most commonly. They do not need prefix of any kind and are initialized
as below:

{% highlight java %}
int length = 343; // 343 is the literal
{% endhighlight %}

**Binary Literals**

From Java 7, you can initialize variables holding binary literals. But they must start with either `0B` or `0b`, as shown 
below:

{% highlight java %}
int b1 = 0B101010;   // set b1 to binary 101010 (decimal 42)
int b2 = 0b00011;    // set b2 to binary 11 (decimal 3)
{% endhighlight %}

**Octal Literals**

Octal integers use only the digits 0 to 7. They have a radix of 8. In Java, you represent an integer in octal form by 
placing a zero in front of the number, as follows:

{% highlight java %}
int six = 06;     // equal to decimal 6
int seven = 07;   // equal to decimal 7
int eight = 010;  // equal to decimal 8
int nine = 011;   // equal to decimal 9
{% endhighlight %}

You can have up to 21 digits in an octal number, not including the leading zero. This is because no mater what number
system you use, the range of values that an `int` can hold is always between $$ -2^{31} $$ to $$ +2^{31}-1 $$.

**Hexadecimal Literals**

Hexadecimal (hex for short) numbers are constructed using 16 distinct symbols. They have a radix of 16. Counting from 
0 through 15 in hex looks like this:

{% highlight java %}
0 1 2 3 4 5 6 7 8 9 a b c d e f
{% endhighlight %}

Java accepts uppercase or lowercase letters for the extra digits _(one of the few places Java is not case-sensitive)_.
You represent an integer in hexadecimal form by placing a `0x` in front of the number, as follows:

{% highlight java %}
int x = 0X0001;     // equals to decimal 1
int y = 0x7fffffff; // equals to decimal 2147483647
int z = 0xDeadCafe; // equals to decimal -559035650
{% endhighlight %}

All four integer literals (binary, octal, decimal, and hexadecimal) are defined as `int` by default, but they may also
be specified as `long` by placing a suffix of `L` or `l` after the number:

{% highlight java %}
long jo = 110599L;
long so = 0xFFFFl;  // Note the lowercase 'l'
{% endhighlight %}

#### Floating-point Literals

Floating-point numbers are defined as a number, a decimal symbol, and more numbers representing the fraction. For
example,

{% highlight java %}
double d = 11301874.9881024;
{% endhighlight %}

By default, floating-point literals are defined as `double` (64 bits) so if you want to assign a floating-point literal
to a variable of type `float` (32 bits), you must attach the suffix `F` or `f` to the number. So, the below code 
generates a compiler error:

{% highlight java %}
float f = 23.467890;    // Compiler error, possible loss
                        // of precision
{% endhighlight %}

This happens because we're trying to fit a larger number (64 bits) into a (potentially) less precise "container" 
(32 bits).

Now as by default floating-point literals are of type `double`, it is optional to attach a suffix of `D` or `d` when you
want to assign it to a variable of type `double`. For example,

{% highlight java %}
double d = 110599.995011D; // Optional, not required
double  g = 987.897;       // No 'D' suffix, but OK because the
                           // literal is a double by default
{% endhighlight %}

#### Boolean Literals

Boolean literals can be either `true` or `false`. In C (and some other languages) it is common to use numbers to 
represent true or false, but this will not work in Java. For example,

{% highlight java %}
boolean t = true;  // Legal
boolean  f = 0;    // Compiler error!
int x = 1;  if (x) { } // Compiler error!
{% endhighlight %}

#### Character Literals

A char literal is represented by a single character in __single quotes__: 

{% highlight java %}
char a = 'a';
char b = '@';
{% endhighlight %}

You can also assign unicode value to a `char` variable, like:

{% highlight java %}
char letterN = '\u004E'; // The letter 'N'
{% endhighlight %}

Note, characters are nothing but __16-bit unsigned integers__. So, you can assign a number literal, assuming it will fit 
into the unsigned 16-bit range (0 to 65535) to a `char` variable. For example, the following are all __legal__:

{% highlight java %}
char a = 0x892;        // hexadecimal literal
char b = 982;          // int literal
char c = (char)70000;  // The cast is required; 70000 is
                       // out of char range
char d = (char) -98;   // Ridiculous, but legal
{% endhighlight %}

And the following are __not legal__ and produce compiler errors:

{% highlight java %}
char e = -29;    // Possible loss of precision; needs a cast
char f = 70000;  // Possible loss of precision; needs a cast
{% endhighlight %}

#### Literal values for Strings

You can create a `String` in Java in the following ways:

{% highlight java %}
String s = "tutorial";
String str = new String("Rahul roy");
String con = s + str; // concatenate 2 strings
{% endhighlight %}

Strings are __not primitives__ in Java but can be represented as literals, in other words, they can be typed directly
into code like:

{% highlight java %}
System.out.println("Bill" + " Joy");
{% endhighlight %}

### Literal values for Non-Primitives

Variables are just bit holders, with a designated type. You can have an `int` holder, a `double` holder, a `long` holder,
and even a `String[]` holder. This holder is assigned a bunch of bits representing the value. For primitives, the bits 
represent __a numeric value__ but for non-primitives, these bits represent __a way to get to the object__. 

For example, a `byte` with a value of `6` means that the bit pattern in the variable (the `byte` holder) is `00000110`,
representing the 8 bits. But what happens in case of non-primitives, for example, `Button b = new Button();`, what's 
inside the `Button` holder `b`? Is it the Button object? No! A variable referring to an object is just a reference 
variable. A __reference variable__ bit holder contains __bits representing a way to get to the object__. We don't know 
what the format is. The way in which object references are stored is virtual-machine specific (it's a pointer to 
something, we just don't know what that something really is). All we can say for sure is that the variable's value is 
not the object, but rather a value representing a specific object on the heap. Or `null`. When it is `null`, i.e, 
`Button b = null;` you can say that the reference variable `b` is not referring to any object.

### Casting

__Casting__ is a way of converting literal values/objects from one type to another. When the type of variable is 
__different__ from the type of literal/object it's holding/referring, you may require __casting__. 

Casting can be done by the compiler _(implicit cast)_ or by you _(explicit cast)_. Typically, an implicit cast happens 
when you're doing a __widening conversion__, in other words, putting a smaller thing (say, a byte) into a bigger container 
(such as an int). But when you try to put a large value into a small container (referred to as __narrowing__), you should 
do an explicit cast, where you tell the compiler that you're aware of the danger and accept full responsibility.





