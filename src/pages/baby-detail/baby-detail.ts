import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-baby-detail',
  templateUrl: 'baby-detail.html',
})
export class BabyDetailPage {

  temperature = 0;
  colorTemperature;
  humidity = 0;
  colorHumidity;

  @ViewChild('barTemperatureCanvas') barTemperatureCanvas;
  @ViewChild('barHumidityCanvas') barHumidityCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barTemperatureChart: any;
  barHumidityChart: any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  //user = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  cambiaTemp() {
    this.temperature=40;
    if(this.temperature < 36)
      this.colorTemperature='rgba(54, 162, 235, 0.2)';
    else
      if(this.temperature > 36)
        this.colorTemperature='rgba(255, 99, 132, 0.2)';
      else
        this.colorTemperature='rgba(75, 192, 192, 0.2)';
    //console.log(this.barTemperatureChart.config.data.datasets[0].data[0]);
    this.barTemperatureChart.config.data.datasets[0].data[0] = this.temperature;
    this.barTemperatureChart.config.data.datasets[0].backgroundColor[0] = this.colorTemperature;
    this.barTemperatureChart.update();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BabyDetailPage');

    //this.user=this.navParams.get('user');
    //console.log(this.user);

    // 'rgba(255, 99, 132, 0.2)', RED
    // 'rgba(54, 162, 235, 0.2)', BLUE
    // 'rgba(255, 206, 86, 0.2)', YELLOW
    // 'rgba(75, 192, 192, 0.2)', GREEN
    // 'rgba(153, 102, 255, 0.2)', PURPLE
    // 'rgba(255, 159, 64, 0.2)' ORANGE

    // Set temperature values
    this.temperature = 36;
    if(this.temperature < 36)
      this.colorTemperature='rgba(54, 162, 235, 0.2)';
    else
      if(this.temperature > 36)
        this.colorTemperature='rgba(255, 99, 132, 0.2)';
      else
        this.colorTemperature='rgba(75, 192, 192, 0.2)';

    // Set humidity values
    this.humidity = 82;
    this.colorHumidity='rgba(255, 206, 86, 0.2)';

    // Temperatura Chart
    this.barTemperatureChart = new Chart(this.barTemperatureCanvas.nativeElement, {

      type: 'horizontalBar',
      data: {
          labels: ["Temperatura"],
          datasets: [{
              label: '°C',
              data: [this.temperature],
              backgroundColor: [
                this.colorTemperature
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              xAxes: [{
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 45,
                    beginAtZero:true
                  }
              }]
          },
          maintainAspectRatio: false
      }

  });

  // Humidity Chart
  this.barHumidityChart = new Chart(this.barHumidityCanvas.nativeElement, {

    type: 'horizontalBar',
    data: {
        labels: ["Humedad"],
        datasets: [{
            label: '%',
            data: [this.humidity],
            backgroundColor: [
              this.colorHumidity
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                  beginAtZero:true
                }
            }]
        },
        maintainAspectRatio: false
    }

});

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Temperatura", "Humedad", "Movimiento", "Vibración", "Proximidad", "Humos"],
        datasets: [{
            label: 'Valores',
            data: [12, 14, 20, 15, 7, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }

  });

  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

    type: 'doughnut',
    data: {
      labels: ["Temperatura", "Humedad", "Movimiento", "Vibración", "Proximidad", "Humos"],
      datasets: [{
        label: 'Valores',
        data: [12, 14, 20, 15, 7, 2],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ]
      }]
    }

});

this.lineChart = new Chart(this.lineCanvas.nativeElement, {

    type: 'line',
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [
            {
                label: "Valores",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
            }
        ]
    }

});

  }

}
