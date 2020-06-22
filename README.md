# bar-chart-library

Simple, configurable JavaScript bar chart library

## Description

Canvas based, simple, dependency-free JavaScript Bar Chart Library. It's lightweight and configurable.

![](https://github.com/userq11/bar-chart-library/blob/master/screenshot.PNG?raw=true)

## Installation
Download only the `BarChart.js` file and include it in your html

```html
<script src="BarChart.js"></script>
```

## Usage
In order to create bar chart you need a block level container e.g. div

```html
<div id="chart">This is a place for bar chart</div>
```
Then you create the `BarChart` object in your JavaScript file

```js
const chart = new BarChart(targetId, canvasWidth, canvasHeight, data);
```

### Paremeters
- `targetId(String)`
Defines the id of the container

- `chartWidth(Integer)`
Defines the width of the chart

- `chartHeight(Integer)`
Defines the height of the chart

- `data(Array of Objects)`
Defines the data to be visualized. `Object` must have `label` property which is `String` on horizontal axis, and `value` property which is `Number` on vertical axis. Example data:

```js
const data = [
    { label: "Mon", value: 339 },
    { label: "Tue", value: 392 },
    { label: "Wen", value: 483 },
    { label: "Thu", value: 240 },
    { label: "Fri", value: 451 },
    { label: "Sat", value: 205 },
    { label: "Sun", value: 156 }
  ];
```
