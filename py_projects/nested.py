

# nested loop = a loop within another loop

for i in range(3):
    for j in range(1, 10):
        print(j, end=" ")
    print()

rows = int(input("Enter the number of rows: "))
columns = int(input("Enter number of columns: ")) 
symbols = input("Enter the symbol to use: ")

for x in range(rows):
    for y in range(columns):
        print(symbols, end ="")
    print()