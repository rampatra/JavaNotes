---
layout: post
title: Variables and Literals
published: false
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
int length = 343;
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
int six = 06;     // Equal to decimal 6
int seven = 07;   // Equal to decimal 7
int eight = 010;  // Equal to decimal 8
int nine = 011;   // Equal to decimal 9
{% endhighlight %}

You can have up to 21 digits in an octal number, not including the leading zero. This is because no mater what number
system you use, the range of values that an `int` can hold is always between $$ -2^31 to +2^31-1 $$.

**Hexadecimal Literals**





#### Floating-point Literals














