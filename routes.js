const express = require('express');

const app = express();

app.get('/mean', (req, res) => {
    const nums = req.query.nums;
    if (!nums) {
        res.status(400).json({ error: 'nums are required' });
    } else {
        const numArr = nums.split(',').map(Number).filter(num => !isNaN(num));
        if (numArr.length === 0) {
            res.status(400).json({ error: 'at least one valid number is required' });
        } else {
            const mean = numArr.reduce((acc, num) => acc + num, 0) / numArr.length;
            res.json({ response: { operation: 'mean', value: mean } });
        }
    }
})


app.get('/median', (req, res) => {
    const nums = req.query.nums;
    if (!nums) {
        res.status(400).json({ error: 'nums are required' });
    } else {
        const numArr = nums.split(',').map(Number).filter(num => !isNaN(num));
        if (numArr.length === 0) {
            res.status(400).json({ error: 'at least one valid number is required' });
        } else {
            numArr.sort((a, b) => a - b);
            const medianIndex = Math.floor(numArr.length / 2);
            const median = numArr.length % 2 === 0 ? (numArr[medianIndex - 1] + numArr[medianIndex]) / 2 : numArr[medianIndex];
            res.json({ response: { operation: 'median', value: median } });
        }
    }
})


app.get('/mode', (req, res) => {
    const nums = req.query.nums;
    if (!nums) {
        res.status(400).json({ error: 'nums are required' });
    } else {
        const numArr = nums.split(',').map(Number).filter(num => !isNaN(num));
        if (numArr.length === 0) {
            res.status(400).json({ error: 'at least one valid number is required' });
        } else {
            const frequencyMap = {};
            numArr.forEach(num => {
                frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            });
            let maxFrequency = 0;
            let mode;
            Object.keys(frequencyMap).forEach(num => {
                const frequency = frequencyMap[num];
                if (frequency > maxFrequency) {
                    maxFrequency = frequency;
                    mode = num;
                }
            });
            res.json({ response: { opertion: 'mode', value: mode } });
        }
    }
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
});