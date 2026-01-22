principle = 0

rate = 0

time = 0

while principle <= 0:
    principle = float(input("Enter the floating point amount: "))
    if principle <= 0:
        print("Invalid amount...")

while rate <= 0:
    rate = float(input("Enter the floating point amount: "))
    if rate <= 0:
        print("Invalid amount...")


while time <= 0:
    time = int(input("Enter the time: "))
    if time <= 0:
        print("Invalid amount...")

total = principle * pow((1 + rate / 100), time)

print(f"Balance after {time} year/s: ${total}")


