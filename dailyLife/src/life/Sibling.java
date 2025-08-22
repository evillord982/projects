package life;

public class Sibling {
    String name;
    int age;

    public Sibling(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void introduce() {
        System.out.println("My name is " + this.name + " and I am " + this.age + " years old.");

    }

    public boolean isOlder(Sibling other) {
        return this.age > other.age;
    }
}