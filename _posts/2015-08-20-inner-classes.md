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

### When it is good to have an inner class?

Let's say you have to design a chat client in java through which a user can send messages to the server. 
chat-client–specific methods (accept input, read new messages from server, send user input back to server, and so on) to 
be in the class


### Little Basics

Suppose you have an inner class like this:

{% highlight java linenos %}
public class MyOuter {
    class MyInner { }
}
{% endhighlight %}

When you compile it : 

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





