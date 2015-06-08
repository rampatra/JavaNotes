---
layout: post
title: Overloading
---

Reusing the same method name in the same class or subclass but with different arguments
(and optionally, a different return type) is called __Method Overloading in Java__.

There are certain __rules for overloading__, the below code points out all of the rules:

{% highlight java linenos %}

public class Foo {
    public void doStuff(int y, String s) { }

    public void doStuff(int x) { }  // Valid overload as DIFFERENT ARGUMENT LIST
                                    // (and methods can be overloaded
                                    // in the same class or in subclass)
}

class Bar extends Foo {

    private void doStuff(long a) {  // Valid overload as DIFFERENT ARGUMENT LIST
                                    // (access modifier CAN be same or different)
    }

    public String doStuff(int x, int y) { // Valid overload as DIFFERENT ARGUMENT LIST
        return "s";                       // (return type CAN be same or different)
    }

    public void doStuff(int y, long s) throws IOException { } // Valid method overload as DIFFERENT ARGUMENT LIST
                                                              // (overloaded methods CAN declare new or broader
                                                              // checked exceptions)

    public String doStuff(int y, String s) { // Invalid overload, MUST change method's
        return "s";                          // argument list (compiler error)
    }
}

{% endhighlight %}

In short, the only rule you __MUST__ obey is to __change the argument list__ of the overloaded method, the rest
are all optional.

### Invoking Overloaded Methods

{% highlight java linenos %}

class Animal {
}

class Horse extends Animal {
}

class UseAnimals {
    public void doStuff(Animal a) {
        System.out.println("In the Animal version");
    }

    public void doStuff(Horse h) {
        System.out.println("In the Horse version");
    }

    public static void main(String[] args) {
        UseAnimals ua = new UseAnimals();
        Animal animalObj = new Animal();
        Horse horseObj = new Horse();
        Animal animalRefToHorse = new Horse();
        ua.doStuff(animalObj);
        ua.doStuff(horseObj);
        ua.doStuff(animalRefToHorse);
    }
}

{% endhighlight %}

The output of the above program is:

    In the Animal version
    In the Horse version
    In the Animal version

Notice the call `doStuff(animalRefToHorse)`, here the `Animal` version of `doStuff()` is called despite the actual
object being passed is of a `Horse`. The __reference type__ (not the object type) determines which overloaded method is
invoked.

To summarize, __which overridden version__ of the method to call (in other words, from which class in the
inheritance tree) is decided __at runtime based on object type__, but __which overloaded version__ of the method to
call is based on the __reference type of the argument passed at compile time__.

Therefore, polymorphism doesn't determine which overloaded version is called, polymorphism does come into play when
the decision is about which overridden version of a method is called.

{% include responsive_ad.html %}

### Q&A

__Q1.__ Consider the below program in which a method is both overridden and overloaded.

{% highlight java linenos %}

public class Animal {
    public void eat() {
        System.out.println("Animal eating");
    }
}

public class Horse extends Animal {
    public void eat() {
        System.out.println("Horse eating hay ");
    }

    public void eat(String s) {
        System.out.println("Horse eating " + s);
    }
}

{% endhighlight %}

Figure out which version of `eat()` will run on each of the invocation made?

    1. Animal ah = new Horse();
       ah.eat();
    2. Horse he = new Horse();
       he.eat("Apples");
    3. Animal a2 = new Animal();
       a2.eat("treats");
    4. Animal ah2 = new Horse();
       ah2.eat("Carrots");

__Q2.__

