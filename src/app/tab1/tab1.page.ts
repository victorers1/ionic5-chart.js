import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('lineChartCanvas') lineChartCanvas: ElementRef;
  @ViewChild('barChartCanvas') barChartCanvas: ElementRef;
  @ViewChild('comboChartCanvas') comboChartCanvas: ElementRef;

  lineChart: Chart;
  barChart: Chart;
  comboChart: Chart; // mix of line and bar

  lineChartX: number = 0;
  barChartX: number = 0;
  comboChartX: number = 0;

  constructor() { }

  /**
   * Initializes charts if they aren't defined
   */
  ionViewDidEnter() {
    if (this.lineChart == null) {
      this.initLineChart();
      setInterval(
        () => {
          this.addData(this.lineChart, this.lineChartX++);
        },
        1000
      );
    }

    if (this.barChart == null) {
      this.initBarChart();
      setInterval(
        () => {
          this.addData(this.barChart, this.barChartX++);
        },
        1000
      );
    }

    if (this.comboChart == null) {
      this.initComboChart();
      setInterval(
        () => {
          this.addData(this.comboChart, this.comboChartX++);
        },
        1000
      );
    }

    // setInterval(
    //   () => {
    //     this.addData(this.lineChart, this.lineChartX++);
    //     this.addData(this.barChart, this.barChartX++);
    //     this.addData(this.comboChart, this.comboChartX++);
    //   },
    //   1000
    // );
  }

  initLineChart() {
    this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Dataset 1',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Dataset 2',
          borderColor: 'rgb(162, 235, 54)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
        },
        {
          label: 'Dataset 3',
          borderColor: 'rgb(235, 54, 162)',
          borderWidth: 1,
          fill: true,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'seconds'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Amplitude'
            }
          }]
        }
      }
    });
  }
  initBarChart() {
    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Dataset 1',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
        },
        {
          label: 'Dataset 2',
          borderColor: 'rgb(162, 235, 54)',
          borderWidth: 1,
        },
        {
          label: 'Dataset 3',
          borderColor: 'rgb(235, 54, 162)',
          borderWidth: 1,
        }]
      },
    });
  }
  initComboChart() {
    this.comboChart = new Chart(this.comboChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          type: 'line',
          label: 'Dataset 1',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          fill: false,
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: 'rgb(162, 235, 54)',
          borderWidth: 1,
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: 'rgb(235, 54, 162)',
          borderWidth: 1,
        }]
      },
    });
  }

  /**
   * Adds a random number on tail
   */
  addData(chart: Chart, index: number) {
    chart.data.labels.push(`${index}`);
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(Math.random());
    });

    // Starts removing after 10th element was added
    if (index > 10) this.removeData(chart);

    chart.update();
  }

  /**
   * Removes 1 element from head
   */
  removeData(chart: Chart) {
    chart.data.labels.splice(0, 1);
    chart.data.datasets.forEach(dataset => {
      dataset.data.splice(0, 1);
    });
    chart.update();
  }
}
