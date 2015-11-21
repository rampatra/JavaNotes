---
layout: post
title: Variables and Literals
published: true
---

Variables can be broadly classified in to 2 types in Java:

1. __Instance__ variables (declared in a class).
2. __Local__ variables (declared inside a method).

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



#### Character Literals



#### String Literals

