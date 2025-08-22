package life;

public class Pet {

        String name;
        String type;
        String colour;
    
        public Pet(String n, String t, String c) {
            this.name = n;
            this.type = t;
            this.colour = c;
        }
        public String myName() { return name; }
        public String myType() { return type; }
        public String myColour() { return colour; }


        public void introduce() {
            System.out.println("My name is " + this.name + " and I am a " + this.type +"." + " I have " + this.colour + " fur.");
    }
}
