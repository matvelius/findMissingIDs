#!/usr/bin/env node

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var numberOfUsers = 0
var recentVisitors = []
var haveNotVisited = []

var lineIndex = 1

rl.on('line', function (line) {
    console.log('current line: ', line)
    console.log('current lineIndex: ', lineIndex)
    if (lineIndex == 1) {
        numberOfUsers = line
    } else {
        recentVisitors = line.split(' ').map(item => +item).sort((a, b) => a - b)

        console.log('numberOfUsers: ', numberOfUsers)
        console.log('recent visitors: ', recentVisitors)

        var lastUserIDChecked = 0

        for (let i = 0; i < numberOfUsers; i++) {
            console.log('--index:', i, '--haveNotVisited:', haveNotVisited)

            lastUserIDChecked = i == 0 ? 0 : recentVisitors[i - 1]

            if (recentVisitors[i] == null) { // end of array 
                // console.log('*recentVisitors[i] == null*')
                if (recentVisitors[i - 1] != null && recentVisitors[i - 1] + 1 <= numberOfUsers) {
                    haveNotVisited.push(recentVisitors[i - 1] + 1)
                    // console.log(`~~~ PUSHING ${recentVisitors[i - 1] + 1} to haveNotVisited`)
                }
            } else if (recentVisitors[i] > i + 1) {
                // console.log(`^^^ recentVisitors[i] (${recentVisitors[i]}) > i + 1 (${i + 1})`)
                const difference = recentVisitors[i] - (i + 1)
                // console.log(`difference: ${difference}`)

                for (let j = difference; j > 0; j--) {
                    const userIDToAdd = i + difference - j + 1
                    // console.log(`lastUserIDChecked: ${lastUserIDChecked}, userIDToAdd: ${userIDToAdd}`)
                    if (userIDToAdd != lastUserIDChecked && userIDToAdd != haveNotVisited[haveNotVisited.length - 1] && userIDToAdd != recentVisitors[i - 1] && userIDToAdd != recentVisitors[i - 2]) {
                        // console.log(`~~~ PUSHING ${userIDToAdd} to haveNotVisited\n`)
                        haveNotVisited.push(userIDToAdd)
                        lastUserIDChecked = userIDToAdd
                    }
                }
            }
        }

        console.log(haveNotVisited.join(' '))

        rl.close()
        return
    }
    lineIndex += 1
})