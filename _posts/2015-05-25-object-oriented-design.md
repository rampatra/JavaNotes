---
layout: post
title: Object oriented design
---

### Encapsulation

Suppose you want the variable `small` to be always $$1/3^{rd}$$ of `big`.

But in the below code as the variable `small` is `public`, any code can access it and assign any arbitrary value
thus violating the requirement of `small` being $$1/3^{rd}$$ of `big`. This happens __due to lack of encapsulation__.

{% highlight java linenos %}
class Foo {
    public int big = 9;
    public int small = 3;
    public void setBig(int num) {
        big = num;
        small = num/3;
    }
    // other code here
}
{% endhighlight %}

The problem can be solved by changing the access modifier of `small` to `private` so that each and every code
will go through `setBig()` method to set the value of `big` and `small`. This is nothing but a small __practical
example of encapsulation__. Here we encapsulated the variable `small` by making it private and providing _getters_
and _setters_ for code to access it. _(We should follow this practice always for all variables)_

### Inheritance

A class inheriting public/protected properties of another class by using the keyword `extends` is called _inheritance
in java_.

The two most common __reasons to use inheritance__:

* To promote code reuse.
* To use polymorphism.

### IS-A relationship

In OO, the concept of _IS-A_ is based on __class inheritance or interface implementation__. _IS-A_ is a way of saying,
"this thing is a type of that thing."

For example in the below figure:

![](/img/posts/is-a.png)

_"Car extends Vehicle" means "Car IS-A Vehicle."<br/>
"Subaru extends Car" means "Subaru IS-A Car."_

### HAS-A relationship

_HAS-A_ relationships are _based on usage, rather than inheritance_. In other words, class A _HAS-A_ B if code in class A has
a reference to an instance of class B. For example, you can say the following, A Horse _IS-A_ Animal. A Horse _HAS-A_ Halter.
The code might look like this:

{% highlight java linenos %}

public class Animal { }

public class Horse extends Animal {
    private Halter myHalter;
}

{% endhighlight %}

### Polymorphism

Any Java object that can pass more than one _IS-A_ test can be considered __polymorphic__. Other than objects of type `Object`,
all Java objects are polymorphic in that they pass the _IS-A_ test for their own type and for class `Object`.

The only way to access an object is through a reference variable:

* A reference variable can be of only one type, and once declared, that type can never be changed (although the object it
references can change provided its not declared `final`).
* A reference variable's type determines the methods that can be invoked on the object the variable is referencing.
* A reference variable can refer to any object of the same type as the declared reference, or __to any subtype of the
declared type__.
* A reference variable can be declared as a class type or an interface type. If the variable is declared as an interface
type, it can reference any object of any class that implements the interface.

More on polymorphism in [Overriding](/2015/05/29/overriding.html) & [Overloading](/2015/06/02/overloading.html) in Java.

{% include responsive_ad.html %}
