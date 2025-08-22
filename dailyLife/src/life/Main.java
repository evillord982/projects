
// dailyLife/src/life/Main.java
package life;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Pet duke = new Pet("Duke", "Dog", "Brown");
        Pet luna = new Pet("Luna", "Cat", "White");

        
        Sibling simon = new Sibling("Simon", 25);
        Sibling malisa = new Sibling("Malisa",  22);
        Sibling miranda = new Sibling("Miranda", 14);
        Sibling alina = new Sibling("Alina", 12);


        List<Sibling> siblings = new ArrayList<>();
        siblings.add(simon);
        siblings.add(malisa);
        siblings.add(miranda);
        siblings.add(alina);
        
        Sibling oldest = getOldestSibling(siblings);
        if (oldest != null){
            System.out.println("The oldest sibling is " + oldest.name);
        }

        introduceSiblings(siblings);
        duke.introduce();
        luna.introduce();
            
    }

    private static void introduceSiblings(List<Sibling> siblings) {
        for (Sibling s : siblings) s.introduce();
    }

    private static Sibling getOldestSibling(List<Sibling> siblings) {
    if (siblings.isEmpty()) return null; // or throw an exception

    Sibling oldest = siblings.get(0);
    for (Sibling s : siblings) {
        if (s.age > oldest.age) {
            oldest = s;
        }
    }
    return oldest;
}

  
}
