### knightMoves function

#### board

#### knight

to find the nearest path, I could sort the options based on the difference between the current position, and the destination after the path. start with those, and then work outward. Might be unnecessary to sort them like this, but if i figure out a way to optimize it, maybe it will be good?

scrap that idea, lets just do them in order

find difference between the knights current position (x, y) and the move (mx, my) to get the new (x, y)

if the x is < 0 || x > 7 || y < 0 || y > 7, return

if the current coordinates == the target coordinates, 
and if the current depth is null, assign current depth to depth
else if current depth is less than depth, assign current depth to depth
 return the current coordinates.

 ---

 another approach. on each move, the total difference between the current position and the final position is calculated and if there are more than 3 successful moves, only the top 3 legal moves are included in the next round. this is calculated as the difference between the square to be moved to and the final square.

 im storing parent in each node. when the currentPosition == the destination, while currentPosition.parent !null, push currentPosition.square to q, then currentPosition = currentPosition.parent
 then return 