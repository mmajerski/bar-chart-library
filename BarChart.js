class BarChart {
  constructor(targetId, width, height, data) {
    this.configureChart(targetId, width, height, data);

    // pre operations
    this.performPreOperations();

    this.drawChart();

    // console.log(this);
  }

  configureChart(targetId, width, height, data) {
    // global canvas specification
    this.setCanvasParameters(targetId, width, height, data);

    // global chart specification
    this.setChartParameters();
  }

  setCanvasParameters(targetId, width, height, data) {
    // canvas specification
    this.id = targetId;
    this.width = width;
    this.height = height;
    this.data = data;
  }

  setChartParameters() {
    // -- chart specification --
    // axis configuration
    this.axisRatio = 10;
    this.verticalMargin = (this.height * this.axisRatio) / 100;
    this.horizontalMargin = (this.width * this.axisRatio) / 100;
    this.axisColor = "#b1b1b1";
    this.axisWidth = 2;

    // label configuration
    this.fontRatio = 3;
    this.fontFamily = "times";
    this.fontStyle = "normal";
    this.fontWeight = "300";
    this.fontColor = "#666";
    this.verticalFontSize = (this.height * this.fontRatio) / 100;
    this.horizontalFontSize = (this.width * this.fontRatio) / 100;

    // helper vertical/horizontal lines configuration(inside lines)
    this.lineColor = "#e5e5e5";
    this.lineWidth = 0.75;
  }

  performPreOperations() {
    this.createCanvas();

    this.handleData();

    this.prepareData();
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = `${this.id}-${Math.random()}`; // pseudo unique id
    canvas.width = this.width;
    canvas.height = this.height;

    document.getElementById(this.id).innerHTML = "";
    document.getElementById(this.id).appendChild(canvas);

    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  handleData() {
    this.labels = [];
    this.values = [];

    this.data.forEach((item) => {
      this.labels.push(item.label);
      this.values.push(item.value);
    });
  }

  prepareData() {
    // global variables
    this.itemsNum = this.data.length;
    this.maxValue = Math.max(...this.values);
    this.minValue = Math.min(...this.values);

    // axis specification
    this.verticalAxisLength = this.height - 2 * this.verticalMargin; // bottom and top margins
    this.horizontalAxisLength = this.width - 2 * this.horizontalMargin; // left and right margins

    // label specification
    this.verticalUpperBound = Math.ceil(this.maxValue / 10) * 10;
    this.verticalLabelFreq = parseInt(this.verticalUpperBound / this.itemsNum);
    this.horizontalLabelFreq = parseInt(
      this.horizontalAxisLength / this.itemsNum
    );
  }

  drawChart() {
    this.drawVerticalAxis();
    this.drawVerticalLabels();

    this.drawHorizontalAxis();
    this.drawHorizontalLabels();

    this.drawHorizontalLines();
    this.drawVericalLines();

    this.drawBars();
  }

  drawVerticalAxis() {
    this.context.beginPath();
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.context.moveTo(this.horizontalMargin, this.verticalMargin);
    this.context.lineTo(
      this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.stroke();
  }

  drawVerticalLabels() {
    const labelFont = `${this.fontStyle} ${this.fontWeight} ${this.verticalFontSize}px ${this.fontFamily}`;
    this.context.font = labelFont;
    this.context.textAlign = "right";
    this.context.fillStyle = this.fontColor;

    const scaledVerticalLabelFreq =
      (this.verticalAxisLength / this.verticalUpperBound) *
      this.verticalLabelFreq;

    for (let i = 0; i <= this.itemsNum; i++) {
      const labelText = this.verticalUpperBound - i * this.verticalLabelFreq;
      const verticalLabelX =
        this.horizontalMargin - this.horizontalMargin / this.axisRatio;
      const verticalLabelY = this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.fillText(labelText, verticalLabelX, verticalLabelY);
    }
  }

  drawHorizontalAxis() {
    this.context.beginPath();
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = this.axisWidth;
    this.context.moveTo(
      this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.lineTo(
      this.width - this.horizontalMargin,
      this.height - this.verticalMargin
    );
    this.context.stroke();
  }

  drawHorizontalLabels() {
    const labelFont = `${this.fontStyle} ${this.fontWeight} ${this.verticalFontSize}px ${this.fontFamily}`;
    this.context.font = labelFont;
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.fillStyle = this.fontColor;

    for (var i = 0; i < this.itemsNum; i++) {
      const horizontalLabelX =
        this.horizontalMargin +
        i * this.horizontalLabelFreq +
        this.horizontalLabelFreq / 2;
      const horizontalLabelY =
        this.height -
        this.verticalMargin +
        this.verticalMargin / this.axisRatio;

      this.context.fillText(this.labels[i], horizontalLabelX, horizontalLabelY);
    }
  }

  drawHorizontalLines() {
    this.context.strokeStyle = this.lineColor;
    this.context.lineWidth = this.lineWidth;

    const scaledVerticalLabelFreq =
      (this.verticalAxisLength / this.verticalUpperBound) *
      this.verticalLabelFreq;

    90;

    for (let i = 0; i < this.itemsNum; i++) {
      const horizontalLineStartX = this.horizontalMargin;
      const horizontalLineStartY =
        this.verticalMargin + i * scaledVerticalLabelFreq;

      const horizontalLineEndX =
        this.horizontalMargin + this.horizontalAxisLength;
      const horizontalLineEndY =
        this.verticalMargin + i * scaledVerticalLabelFreq;

      this.context.beginPath();
      this.context.moveTo(horizontalLineStartX, horizontalLineStartY);
      this.context.lineTo(horizontalLineEndX, horizontalLineEndY);
      this.context.stroke();
    }
  }

  drawVericalLines() {
    this.context.strokeStyle = this.lineColor;
    this.context.lineWidth = this.lineWidth;

    for (var i = 0; i <= this.itemsNum; i++) {
      const verticalLineStartX =
        this.horizontalMargin + i * this.horizontalLabelFreq;
      const verticalLineStartY = this.height - this.verticalMargin;

      const verticalLineEndX =
        this.horizontalMargin + i * this.horizontalLabelFreq;
      const verticalLineEndY = this.verticalMargin;

      this.context.beginPath();
      this.context.moveTo(verticalLineStartX, verticalLineStartY);
      this.context.lineTo(verticalLineEndX, verticalLineEndY);
      this.context.stroke();
    }
  }

  drawBars() {
    for (let i = 0; i < this.itemsNum; i++) {
      const color = this.createRandomColor();
      const fillOpacity = "0.5";
      const fillColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${fillOpacity})`;
      const borderColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${fillOpacity})`;

      this.context.beginPath();

      const barX =
        this.horizontalMargin +
        i * this.horizontalLabelFreq +
        this.horizontalLabelFreq / 3;
      const barY = this.height - this.verticalMargin;

      const barWidth = this.horizontalLabelFreq / 3;
      const barHeight =
        -(this.verticalAxisLength * this.values[i]) / this.verticalUpperBound;

      this.context.fillStyle = fillColor;
      this.context.strokeStyle = borderColor;
      this.context.rect(barX, barY, barWidth, barHeight);
      this.context.stroke();
      this.context.fill();
    }
  }

  createRandomColor() {
    const red = getRandomInt(0, 257);
    const green = getRandomInt(0, 257);
    const blue = getRandomInt(0, 257);

    return { red, green, blue };
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}
