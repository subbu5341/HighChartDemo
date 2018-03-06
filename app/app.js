'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])
.controller('myController', function($scope, $http) {
	$scope.title ="chart App"

	function readCSV() {
		// http get request to read CSV file content
		$http.get('/Sample1.csv').success($scope.processData);
	};

	$scope.processData = function(allText) {
		// split content based on new line
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];

		for ( var i = 0; i < allTextLines.length; i++) {
			// split content based on comma
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
				var tarr = [];
				for ( var j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				lines.push(tarr);
			}
		}
		$scope.data=lines;
		$scope.selections = lines[0];
		$scope.selectedXOption =lines[0][0]
		$scope.selectedYOption =lines[0][1]
		$scope.dataChange()
	}
	// onload invoke
	readCSV()
	$scope.dataChange = function() {
		$scope.scotterData = [];
		$scope.xBarData = [];
		$scope.yBarData = [];
		var xindex = $scope.data[0].indexOf($scope.selectedXOption)
		var yindex = $scope.data[0].indexOf($scope.selectedYOption)
		angular.forEach($scope.data, function(item,i) {
			if(i!=0){
				if(!isNaN(item[xindex]) && !isNaN(item[yindex]))
				$scope.scotterData.push([parseFloat(item[xindex]),parseFloat(item[yindex])]);
				$scope.xBarData.push(parseFloat(item[xindex]))
				$scope.yBarData.push(parseFloat(item[yindex]))
			}
		})
		Highcharts.chart('container', {
		    chart: {
		        type: 'scatter',
		        zoomType: 'xy'
		    },
		    title: {
		        text: $scope.selectedXOption + "  Versus  "  + $scope.selectedYOption
		    },
		    xAxis: {
		        title: {
		            enabled: true,
		            text: $scope.selectedXOption
		        },
		        startOnTick: true,
		        endOnTick: true,
		        showLastLabel: true
		    },
		    yAxis: {
		        title: {
		            text: $scope.selectedYOption
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'left',
		        verticalAlign: 'top',
		        x: 100,
		        y: 70,
		        floating: true,
		        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
		        borderWidth: 1
		    },
		    plotOptions: {
		        scatter: {
		            marker: {
		                radius: 5,
		                states: {
		                    hover: {
		                        enabled: true,
		                        lineColor: 'rgb(100,100,100)'
		                    }
		                }
		            },
		            states: {
		                hover: {
		                    marker: {
		                        enabled: false
		                    }
		                }
		            },
		            tooltip: {
		                headerFormat: '<b>{series.name}</b><br>',
		                pointFormat: '{point.x} , {point.y}'
		            }
		        }
		    },
		    series: [{
		        name: 'Scotter',
		        color: 'rgba(223, 83, 83, .5)',
		        data: $scope.scotterData

		    }]
		});
		Highcharts.chart('container1', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Historic World Population by Region'
		    },
		    subtitle: {
		        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
		    },
		    xAxis: {
		        categories: [$scope.selectedXOption],
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: $scope.selectedXOption,
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    tooltip: {
		        valueSuffix: ' millions'
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            }
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'top',
		        verticalAlign: 'top',
		        x: 40,
		        y: 80,
		        floating: true,
		        borderWidth: 1,
		        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		        shadow: true
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        data: $scope.xBarData
		    }]
		});
		Highcharts.chart('container2', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Historic World Population by Region'
		    },
		    subtitle: {
		        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
		    },
		    xAxis: {
		        categories: [$scope.selectedYOption],
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: $scope.selectedYOption,
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    tooltip: {
		        valueSuffix: ' millions'
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            }
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'top',
		        verticalAlign: 'top',
		        x: 40,
		        y: 80,
		        floating: true,
		        borderWidth: 1,
		        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFA07A'),
		        shadow: true
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        data: $scope.yBarData
		    }]
		});

	}

});
