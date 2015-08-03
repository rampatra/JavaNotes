---
layout: post
title: Constructors
---

Objects are constructed. You can never make a new object without invoking a constructor (and not just the
constructor of the object's actual class type, but also the constructor of each of its superclasses).

Suppose there is a `Horse` class which extends `Animal` (and obviously `Animal` extends `Object`). Now this is how the
constructors are called after `new Horse()` is invoked from `main()`:

1. main() calls new Horse()
2. Horse() calls super()
3. Animal() calls super()
4. Object()


Constructors __have no return type__ and their __names must exactly match the class name__. Typically, constructors
are used to initialize instance variable as below:

{% highlight java linenos %}
class Foo {
     int size;
     String name;

     Foo(String name, int size) {
        this.name = name;
        this.size = size;
     }
}
{% endhighlight %}





### Q&A

__Q1.__ What is the output of the below program?

{% highlight java linenos %}
public class Animal {

    String name;

    Animal(String name) {
        this.name = name;
    }

    Animal() {
        this(getName());
    }

    String getName() {
        return "abc";
    }

    public static void main(String[] args) {
        Animal b = new Animal();
        System.out.println(b.name);
    }
}
{% endhighlight %}

1. `abc`
2. Empty string
3. Won't compile
4. Runtime error