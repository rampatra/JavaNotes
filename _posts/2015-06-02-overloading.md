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

### The confounding part in method overloading

I will show you different scenarios after which you can answer any question related to method matching (which method
will be invoked).

__The 3 factors that can make overloading a little tricky _(written in order of preference)_:__

* Widening
* Autoboxing
* Var-args

{% highlight java linenos %}

class MethodOverloading {

    static void go(float x) {
        System.out.print("float ");
    }

    static void go(Long x) {
        System.out.print("Long ");
    }

    static void go(double x) {
        System.out.print("double ");
    }

    static void go(Double x) {
        System.out.print("Double ");
    }

    static void go(int x, int y) {
        System.out.print("int,int ");
    }

    static void go(byte... x) {
        System.out.print("byte... ");
    }

    static void go(Long x, Long y) {
        System.out.print("Long,Long ");
    }

    static void go(long... x) {
        System.out.print("long... ");
    }

    public static void main(String[] args) {
        byte b = 5;
        short s = 5;
        long l = 5;
        float f = 5.0f;
        // widening beats autoboxing
        go(b);
        go(s);
        go(l);
        go(f);
        // widening beats var-args
        go(b, b);
        // auto-boxing beats var-args
        go(l, l);
    }
}

{% endhighlight %}

The output of the above program is `float float float float int,int Long,Long`.

From the output it is clear that the JVM prefers __widening over autoboxing and var-args__. In every case, when an exact
match isn't found, the JVM uses the method with the smallest argument that is wider than the parameter.

Now look at the call `go(l, l)` at last, this invokes `go(Long x, Long y)` rather than `go(long... x)` which clearly shows
JVM prefers __boxing over var-args__.

__Widening reference variables__

Reference widening depends on inheritance, in other words if it passes the _IS-A_ test then no harm. Consider the below
code:

{% highlight java linenos %}

class Animal {
    static void eat() {
    }
}

class Dog extends Animal {

    void go(Animal a) { }

    public static void main(String[] args) {
        Dog d = new Dog();
        d.go(d);
    }
}

{% endhighlight %}

The above code compiles fine as `Dog` can widen into an `Animal` because it passes the _IS-A_ test. If in case, `Dog`
didn't have extended `Animal` then widening wouldn't be possible and the code wouldn't compile.

Similarly, you __cannot__ widen `Integer` to `Long` but you __can__ widen `int` to `long`.

__Combine Widening with Boxing__

Let's see what happens when the compiler has to widen and then autobox the parameter for a match to be made.

{% highlight java linenos %}

class WidenAndBox {
    static void go(Long x) {
        System.out.println("Long");
    }

    public static void main(String[] args) {
        byte b = 5;
        go(b); // compiler has to widen to `long` and
               // then box to `Long`
    }
}

{% endhighlight %}




__Combine both Widening and Boxing with Var-args__





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
