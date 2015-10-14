---
layout: post
title: Inner Classes
---

A class inside another class is called an __Inner Class__. In other words, as a class has member variables and member 
methods it can also have member classes. You can say inner classes are of 4 types:

 * Inner classes
 * Method-local inner classes
 * Anonymous inner classes
 * Static nested classes

## Inner classes

These are just "regular" inner classes which are not method-local, anonymous or static.

### Little Basics

Suppose you have an inner class like this:

{% highlight java linenos %}
public class MyOuter {
    class MyInner { }
}
{% endhighlight %}

When you compile it: 

{% highlight java %}
javac MyOuter.java
{% endhighlight %}

you will end up with two class files:

{% highlight java %}
MyOuter.class
MyOuter$MyInner.class
{% endhighlight %}

The inner class is still, in the end, a separate class, so a separate class file is generated for it. But the inner 
class file isn't accessible to you in the usual way. You can't say

{% highlight java %}
java MyOuter$MyInner
{% endhighlight %}

in hopes of running the `main()` method of the inner class, because a regular inner class cannot have static declarations 
of any kind. The only way you can access the inner class is through a live instance of the outer class. In other words, 
only at runtime, when there's already an instance of the outer class to tie the inner class instance to.

Now with the basics done, let's see an inner class performing some actions:

{% highlight java linenos %}
public class MyOuter {
    private int x = 7;

    // inner class definition
    class MyInner {
        public void seeOuter() {
            System.out.println("Outer x is " + x);
        }
    } // close inner class definition
} // close outer class
{% endhighlight %}

The output of the above program would be `Outer x is 7`. This happens because an __inner class can access private members
of its outer class__. The inner class is also a member of the outer class. So just as any member of the outer class (say, 
an instance method) can access any other member of the outer class, private or not, the inner class (also a member) can do
the same.

### Instantiate the inner class

To create an instance of an inner class, you must have an instance of the outer class to tie to the inner class. There 
are no exceptions to this rule: __An inner class instance can never stand alone without a direct relationship to an 
instance of the outer class__.

#### Instantiating an Inner Class from Within the Outer Class

{% highlight java linenos %}
public class MyOuter {
    private int x = 7;

    public void makeInner() {
        MyInner in = new MyInner();  // make an inner instance
        in.seeOuter();
    }

    class MyInner {
        public void seeOuter() {
            System.out.println("Outer x is " + x);
        }
    }
}
{% endhighlight %}

The reason the above syntax works is because the outer class instance method code is doing the instantiating. In other
words, there's already an instance of the outer class—the instance running the makeInner() method.

#### Instantiating an Inner Class from Outside the Outer Class Instance Code

{% highlight java %}
public static void main(String[] args) {
    MyOuter mo = new MyOuter(); // gotta get an instance of outer class
    MyOuter.MyInner inner = mo.new MyInner(); // instantiate inner class from outer class instance
    inner.seeOuter();
}
{% endhighlight %}

As we know that we must have an outer class instance to create an inner class instance, the above code would be the way
to go. _Instantiating an inner class is the only scenario in which you'll invoke new on an instance as opposed to invoking
new to construct an instance._

If you are a one liner then the below code is for you:

{% highlight java %}
public static void main(String[] args) {
     MyOuter.MyInner inner = new MyOuter().new MyInner(); // all in one line
     inner.seeOuter();
}
{% endhighlight %}

#### Referencing the Inner or Outer Instance from Within the Inner Class

An object refers to itself normally by using the `this` reference. The `this` reference is the way an object can pass a
reference to itself to some other code as a method argument:

{% highlight java %}
public void myMethod() {
    MyClass mc = new MyClass();
    mc.doStuff(this); // pass a ref to object running myMethod
}
{% endhighlight %}

So within an inner class code, the `this` reference refers to the instance of the inner class, as you'd probably expect, 
since `this` always refers to the currently executing object. But when the inner class code wants an explicit reference 
to the outer class instance that the inner instance is tied to, it can access the outer class `this` like:

{% highlight java %}
class MyInner {
    public void seeOuter() {
        System.out.println("Outer x is " + x); 
        System.out.println("Inner class ref is " + this); 
        System.out.println("Outer class ref is " + MyOuter.this);
    } 
}
{% endhighlight %}

NOTE: Normally the inner class code doesn't need a reference to the outer class, since it already has an implicit one
it's using to access the members of the outer class, it would need a reference to the outer class if it needed to pass
that reference to some other code as in the above example.



