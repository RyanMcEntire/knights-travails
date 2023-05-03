# knights-travails

Finds the shortest route a knight can take between two positions on a chess board.

#### output:
---

```js
knightMoves([6, 7], [1, 2]);
```
```
 > knightMoves([6,7], [1,2])
 => You made it in 4 moves! Here's your path:
 [ 6, 7 ]
 [ 7, 5 ]
 [ 5, 4 ]
 [ 3, 3 ]
 [ 1, 2 ]
```
---
```js
knightMoves([6, 7], [1, -1]);
```
```
 > knightMoves([6,7], [1,-1])
 You entered [1,-1] as the destination.
 Destination coordinates must be between [0, 0] & [7, 7]
```
---
```js
knightMoves([6, -1], [1, 2]);
```
```
 > knightMoves([6,-1], [1,2])
 You entered [6,-1] for the starting position.
 Starting position coordinates must be between [0, 0] & [7, 7]
```