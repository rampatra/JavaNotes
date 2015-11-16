---
layout: post
title: Variables
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



