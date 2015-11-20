---
layout: post
title: Nested Classes
---

A class inside another class is called a __Nested Class__. In other words, as a class has member variables and member 
methods it can also have member classes. 

Nested classes are divided into two categories: __static__ and __non-static__. Nested classes that are declared static 
are called __static nested classes__. Non-static nested classes are called __inner classes__.

You can say inner classes are of 3 types:

 * "Regular" Inner classes
 * Method-local inner classes
 * Anonymous inner classes
 
## Why Use Nested Classes?

 * __It is a way of logically grouping classes that are only used in one place__: If a class is useful to only one other 
 class, then it is logical to embed it in that class and keep the two together. Nesting such "helper classes" makes 
 their package more streamlined.
 * __It increases encapsulation__: Consider two top-level classes, A and B, where B needs access to members of A that 
 would otherwise be declared private. By hiding class B within class A, A's members can be declared private and B can 
 access them. In addition, B itself can be hidden from the outside world.
 * __It can lead to more readable and maintainable code__: Nesting small classes within top-level classes places the 
 code closer to where it is used.

## Inner classes

These are just "regular" inner classes which are not method-local, anonymous or static.

### Little Basics

Suppose you have an inner class like this:

{% highlight java linenos %}
class MyOuter {
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
class MyOuter {
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
of its outer class even those which are declared as `static`__. The inner class is also a member of the outer class. So 
just as any member of the outer class (say, an instance method) can access any other member of the outer class, private
or not, the inner class (also a member) can do the same.

### Instantiate the inner class

To create an instance of an inner class, you must have an instance of the outer class to tie to the inner class. There 
are no exceptions to this rule: __An inner class instance can never stand alone without a direct relationship to an 
instance of the outer class__.

#### Instantiating an Inner Class from Within the Outer Class

{% highlight java linenos %}
class MyOuter {
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
words, there's already an instance of the outer class i.e, the instance running the makeInner() method.

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
to the outer class instance that the inner instance is tied to, it can access the outer class `this` like shown below:

{% highlight java linenos %}
class MyOuter {
    private int x = 7;

    public void makeInner() {
        MyInner in = new MyInner();
        in.seeOuter();
    }

    class MyInner {
        public void seeOuter() {
            System.out.println("Outer x is " + x);
            System.out.println("Inner class ref is " + this);
            System.out.println("Outer class ref is " + MyOuter.this);
        }
    }

    public static void main(String[] args) {
        MyOuter.MyInner inner = new MyOuter().new MyInner();
        inner.seeOuter(); // works fine
        System.out.println(inner.x); // compiler error as you can't directly
                                     // access outer class member through a
                                     // inner class reference (you can have 
                                     // getter & setter in the inner class)
    }
}
{% endhighlight %}

#### Some points to note

* You can refer to this [StackOverflow question](http://stackoverflow.com/questions/12251922/i-thought-inner-classes-could-access-the-outer-class-variables-methods)
to understand how you can and can't access outer class members from inner class.
* Inner class can access __private members__ of the outer enclosing class even those __which are declared `static`__.
* Normally the inner class code doesn't need a reference to the outer class, since it already has an implicit one
it's using to access the members of the outer class, it would need a reference to the outer class if it needed to pass
that reference to some other code as in the above example.

## Method-Local Inner Classes

A regular inner class scoped inside another class's curly braces, but outside any method code (in other words, at the
 same level that an instance variable is declared) is called a __method-local inner class__.
 
{% highlight java linenos %}
class Outer {    
    private String x = "Outer";

    void doStuff() {
        
        class Inner {
            
            public void seeOuter() {
                System.out.println("Outer x is " + x);
            } // close inner class method
            
        } // close inner class definition
    }
}
{% endhighlight %}

In the above example, `class Inner` is the method-local inner class. But the inner class is useless because you are never 
instantiating the inner class. Just because you declared the class doesn't mean you created an instance of it. So to 
use the inner class, you must make an instance of it somewhere within the method but __below the inner class definition
(or the compiler won't be able to find the inner class)__. You can even refer my 
[StackOverflow question](http://stackoverflow.com/questions/29620714/method-local-inner-class-vs-inner-class). 

The following legal code shows how to instantiate and use a method-local inner class:

{% highlight java linenos %}
class Outer {    
    private String x = "Outer";

    void doStuff() {
        
        class Inner {
            
            public void seeOuter() {
                System.out.println("Outer x is " + x);
            } // close inner class method
            
            MyInner mi = new MyInner();  // This line must come
                                         // after the class
                                         
            mi.seeOuter();
            
        } // close inner class definition
    }
}
{% endhighlight %}

### What a Method-Local Inner Object Can and Can't Do
 
A method-local inner class can be instantiated only within the method where the inner class is defined. In other words,
no other code running in any other method inside or outside the outer class can ever instantiate the method-local 
inner class. 

Can             |Cannot
----------------|----------------
Access private members of the outer/enclosing class. | Cannot use the local variables of the method the inner class is in.
The only modifiers you can apply to a method-local inner class are `abstract` and `final`, but, as always, never both at the same time. | You can't mark a method-local inner class `public`, `private`, `protected`, `static` or `transient` (just like local variable declaration).

#### Important Points

* Method-local inner class __cannot access the local variables of the method inside which it is defined unless the 
variables are marked `final`__. This is because the local variables of the method live on the stack and exist only 
for the lifetime of the method. The scope of a local variable is limited to the method the variable is declared in. 
When the method ends, the stack frame is blown away and the variable is history. But even after the method completes, the 
inner class object created within it might still be alive on the heap if, for example, a reference to it was passed 
into some other code and then stored in an instance variable. Because the local variables aren't guaranteed to be alive
as long as the method-local inner class object is, the inner class object can't use them. Unless the local variables
are marked final.

{% highlight java linenos %}
class MyOuter {
    private String x = "Outer";

    void doStuff() {
        String z = "local variable";
        
        class MyInner {
            public void seeOuter() {
                System.out.println("Outer x is " + x);
                System.out.println("Local var z is " + z);  // won't compile, making 'z' final
                                                            // will solve the problem
            }            
        } // close method-local inner class
    }
}
{% endhighlight %}

* A local class declared in a `static` method has access to only `static` members of the enclosing class, since there is no
associated instance of the enclosing class. If you're in a `static` method, there is no `this`, so an inner class in a 
`static` method is subject to the same restrictions as the `static` method. In other words, no access to instance variables.

## Anonymous Inner Classes

Inner class declared without any class name at all is known as __Anonymous Inner Class__. These can be seen as two types:

* Plain/Normal Anonymous Inner Class
* Argument Defined Anonymous Inner Class

### Plain/Normal Anonymous Inner Class also comes in two flavors:

* Flavor 1:

{% highlight java linenos %}
class Popcorn {
    public void pop() {
        System.out.println("popcorn");
    }
}
class Food {
    Popcorn p = new Popcorn() {
        public void pop() {
            System.out.println("this method overrides pop() in Popcorn class");
        }
        public void push() {
            System.out.println("new method in anonymous inner class");
        }
    };
}
{% endhighlight %}

In the above code, the `Popcorn` reference variable __DOES NOT__ refer to an instance of `Popcorn`, but to an __instance 
of an anonymous (unnamed) subclass of `Popcorn`__.
   
__Polymorphism comes to play in Anonymous Inner Class__ as in the above example, we're using a superclass reference 
variable type to refer to a subclass object. And when you call `p.pop()` then the `pop()` inside `Food` class will be
called instead of the one in `Popcorn` class.

But we need to keep one thing in mind, i.e, you can only call methods on an anonymous inner class reference that are 
defined in the reference variable type. So, in the above code, you cannot call `p.push()` as `p` is a reference variable
of type `Popcorn` and `Popcorn` class does not have any method named `push()`.

* Flavor 2:

The only difference between flavor one and flavor two is that flavor one creates an anonymous subclass of the specified
class type, whereas flavor two creates an __anonymous implementer of the specified interface type__.

{% highlight java linenos %}
interface Cookable {
    public void cook();
}

class Food {
    Cookable c = new Cookable() {
        public void cook() {
            System.out.println("anonymous cookable implementer");
        }
    };
}
{% endhighlight %}

This is the only time you will ever see the syntax `new Cookable()` where `Cookable` is an interface rather than a 
non-abstract class type. Think about it: You can't instantiate an interface, yet that's what the above code looks like 
it's doing. But, of course, it's not instantiating a `Cookable` object, it's creating an instance of a new anonymous
implementer of `Cookable`.

#### Some obvious points:

* Anonymous Inner Class can implement only one interface. There simply isn't any mechanism to say that your 
anonymous inner class is going to implement multiple interfaces.
* Anonymous Inner Class can't extend a class and implement an interface at the same time.
* If the Anonymous Inner Class is a subclass of a class type, it automatically becomes an implementer of any
interfaces implemented by the superclass.

### Argument Defined Anonymous Inner Class

Consider the below code:

{% highlight java linenos %}
class MyWonderfulClass {
    void go() {        
        Bar b = new Bar();
        b.doStuff(new Foo() {
            public void foof() {
                System.out.println("foofy");
            } // end foof method
        }); // end inner class def, arg, and b.doStuff stmt.
    } // end go()
}

interface Foo {
    void foof();
}

class Bar {
    void doStuff(Foo f) {
    }
}
{% endhighlight %}

The `doStuff(Foo f)` in `Bar` class takes an object of a class that implements `Foo` interface. So, we just passed an 
anonymous class which is an implementation of the `Foo` interface as an argument to the `doStuff()` method (in line 4).
This we call it as __Argument Defined Anonymous Class__.

Please note that argument defined anonymous class end like `});` but normal anonymous class end like `};`.

## Static Nested Class

Static Nested Classes are sometimes referred to as static inner classes, but they really aren't inner classes at all
based on the standard definition of an inner class. While an inner class (regardless of the flavor) enjoys that special 
relationship with the outer class (or rather, the instances of the two classes share a relationship), a static nested 
class does not. It is simply __a non-inner (also called "top-level") class scoped within another__.

So with static classes, it's really more about name-space resolution than about an implicit relationship between the 
two classes. A static nested class is __simply a class that's a static member of the enclosing class__:

{% highlight java %}
class BigOuter {
    static class Nested { }
}
{% endhighlight %}

The class itself isn't really "`static`", there's no such thing as a `static` class. The `static` modifier in this case says 
that the nested class is a `static` member of the outer class. That means it can be accessed, as with other `static` 
members, without having an instance of the outer class.

{% highlight java linenos %}
class Outer {
    static class Nest {
        void go() {
            System.out.println("hi outer");
        }
    }
}

class Inner {
    static class Nest {
        void go() {
            System.out.println("hi inner");
        }
    }

    public static void main(String[] args) {
        Outer.Nest outerNest = new Outer.Nest(); // access static inner class 
        outerNest.go();                          // present inside a different class   
        
        Nest innerNest = new Nest(); // access static inner class
        innerNest.go();              // present inside the same class
    }
}
{% endhighlight %}

{% include responsive_ad.html %}

### Q&A

__Q1.__ 

{% highlight java linenos %}
public class HorseTest {
    public static void main(String[] args) {
        class Horse {
            public String name;
            public Horse(String s) {
                name = s;
            }
        }
        Object obj = new Horse("Zippo");
        System.out.println(obj.name);
    }
}
{% endhighlight %}

What is the result?

A. An exception occurs at runtime at line 10  
B. Zippo  
C. Compilation fails because of an error on line 3  
D. Compilation fails because of an error on line 9  
E. Compilation fails because of an error on line 10  

__Q2.__

{% highlight java linenos %}
public abstract class AbstractTest {
    public int getNum() {
        return 45;
    }

    public abstract class Bar {
        public int getNum() {
            return 38;
        }
    }

    public static void main(String[] args) {
        AbstractTest t = new AbstractTest() {
            public int getNum() {
                return 22;
            }
        };
        AbstractTest.Bar f = t.new Bar() {
            public int getNum() {
                return 57;
            }
        };
        System.out.println(f.getNum() + " " + t.getNum());
    }
}
{% endhighlight %}


What is the output?

A. 57 22   
B. 45 38  
C. 45 57  
D. An exception occurs at runtime  
E. Compilation fails

__Q3.__

{% highlight java linenos %}
class A {
    void m() {
        System.out.println("outer");
    }
}

public class MethodLocalVSInner {

    public static void main(String[] args) {
        new MethodLocalVSInner().go();
    }

    void go() {
        new A().m();
        class A {
            void m() {
                System.out.println("inner");
            }
        }
    }

    class A {
        void m() {
            System.out.println("middle");
        }
    }
}
{% endhighlight %}

This is an [interesting question](http://stackoverflow.com/questions/29620714/method-local-inner-class-vs-inner-class),
so think and determine the output?

A. inner  
B. outer  
C. middle  
D. Compilation fails  
E. An exception is thrown at runtime

__Q4.__

{% highlight java linenos %}
class Car {
    class Engine {
        // insert code here
    }

    public static void main(String[] args) {
        new Car().go();
    }

    void go() {
        new Engine();
    }

    void drive() {
        System.out.println("hi");
    }
}
{% endhighlight %}

Which, inserted independently at line 3, produce the output "hi"? (Choose all that apply.)

A. { Car.drive(); }  
B. { this.drive(); }  
C. { Car.this.drive(); }  
D. { this.Car.this.drive(); }  
E. Engine() { Car.drive(); }  
F. Engine() { this.drive(); }  
G. Engine() { Car.this.drive(); }  

__Q5.__

{% highlight java linenos %}
class City {
    class Manhattan {
        void doStuff() throws Exception {
            System.out.print("x ");
        }
    }

    class TimesSquare extends Manhattan {
        void doStuff() throws Exception {
        }
    }

    public static void main(String[] args) throws Exception {
        new City().go();
    }

    void go() throws Exception {
        new TimesSquare().doStuff();
    }
}
{% endhighlight %}

What is the result?

A. x  
B. x x  
C. No output is produced  
D. Compilation fails due to multiple errors  
E. Compilation fails due only to an error on line 4  
F. Compilation fails due only to an error on line 7

__Q6.__

{% highlight java linenos %}
class OuterClassAccess {
    private int size = 7;
    private static int length = 3;

    public static void main(String[] args) {
        new OuterClassAccess().go();
    }

    void go() {
        int size = 5;
        System.out.println(new Inner().adder());
    }

    class Inner {
        int adder() {
            return size * length;
        }
    }
}
{% endhighlight %}

What is the result?

A. 15  
B. 21  
C. An exception is thrown at runtime  
D. Compilation fails due to multiple errors  
E. Compilation fails due only to an error on line 4  
F. Compilation fails due only to an error on line 5

__Q7.__

{% highlight java linenos %}
import java.util.*;

public class Pockets {
    public static void main(String[] args) {
        String[] sa = {"nickel", "button", "key", "lint"};
        Sorter s = new Sorter();
        for (String s2 : sa) System.out.print(s2 + " ");
        Arrays.sort(sa, s);
        System.out.println();
        for (String s2 : sa) System.out.print(s2 + " ");
    }

    class Sorter implements Comparator<String> {
        public int compare(String a, String b) {
            return b.compareTo(a);
        }
    }
}
{% endhighlight %}

What is the result?

A. Compilation fails  
B. button key lint nickel  
   nickel lint key button  
C. nickel button key lint  
   button key lint nickel  
D. nickel button key lint  
   nickel button key lint  
E. nickel button key lint  
   nickel lint key button  
F. An exception is thrown at runtime

