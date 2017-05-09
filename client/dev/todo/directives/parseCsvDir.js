;(function(ng) {
  "use strict";

  ng.module("project-timeline").directive("parseCsv", ['$localStorage', function($localStorage){
        return {
            restrict: 'E',
            template: "<input class='upload' type='file'><button ng-click='upload()'>upload</button>",
            replace: false,
            link: function($scope, $element, $attribute){
                var projectStartDate = 'May 8, 2017';
                var projectEndDate = 'May 23, 2017';

                var parseData = function(results, file) {
                    console.log("Parsing complete:", results, file);
                    var visDataSet = [];
                    results.forEach(function(result){
                        var color;
                        if(result['status']==="open"){
                            
                        }
                        visDataSet.push({
                            content: result['Key'] + '' + result['Task name'],
                            start: new Date(result['Created']),
                            end: new Date(result['End Date'])
                        });
                    });
                    console.log('visDataSet',visDataSet);
                    //assignee
                    //created Date
                    //end date 
                    //in progress
                    //title = jira number + summary
                    
                };

                $scope.upload = function() {
                    console.log("upload");
                    $('input[type=file]').parse({
                        config: {
                        delimiter: ",",	// auto-detect
                        newline: "",	// auto-detect
                        quoteChar: '"',
                        header: true,
                        dynamicTyping: true,
                        preview: 0,
                        encoding: "",
                        worker: false,
                        comments: false,
                        step: undefined,
                        complete: function(results, file) {
                            console.log("Parsing complete:", results, file);
                            var visDataSet = [];
                            var assigneeArray = ['','','','Kenny Chung','Melody Fan','Septem','Eason Yu','Ralph Lai','Joseph Kuo','Paul Wang','Shawn Liu','Chanel Liu'];
                            var groups = [
                                {
                                    id: 1,
                                    content: 'UI',
                                    order: 1,
                                    nestedGroups: [4,5,6],
                                    showNested: false
                                },
                                {
                                    id: 2,
                                    content: 'BK',
                                    order: 2,
                                    nestedGroups: [7,8,9],
                                    showNested: false
                                },
                                {
                                    id: 3,
                                    content: 'QA',
                                    order: 3,
                                    nestedGroups: [10,11,12],
                                    showNested: false
                                }, {
                                    id: 4,
                                    content:'Kenny Chung',
                                }, {
                                    id:5,
                                    content: 'Melody Fan'
                                }, {
                                    id:6,
                                    content: 'Septem',
                                }, {
                                    id:7,
                                    content: 'Eason Yu'
                                }, {
                                    id:8,
                                    content: 'Ralph lai'
                                }, {
                                    id:9,
                                    content: 'Joseph Kuo'
                                }, {
                                    id:10,
                                    content: 'Paul Wang'
                                },
                                {
                                    id:11,
                                    content: 'Shawn Liu'
                                },
                                {
                                    id:12,
                                    content: 'Chanel Liu'
                                }
                            ];
                            results.data.forEach(function(result){
                                var className;
                                switch (result['Status']){
                                    case "Open": 
                                        className = "gray ";
                                        break;
                                    case "Reopened": 
                                        className = "gray ";
                                        break;
                                    case "In Progress":
                                        className = "blue";
                                        break;
                                    case "Closed":
                                        className = "green";
                                        break;
                                    case "Resolved":
                                        className = "green";
                                        break;
                                    case "QA Verified":
                                        className = "qa";
                                        break;
                                }

                                var group;
                                switch (result['Assignee']){
                                    case "Chanel Liu": 
                                        group = "3";
                                        break;
                                    case "Paul Wang":
                                        group = "3";
                                        break;
                                    case "Shawn Liu":
                                        group = "3";
                                        break;
                                    case "Kenny Chung":
                                        group = "1";
                                        break;
                                    case "Septem":
                                        group = "1";
                                        break;
                                    case "Melody Fan":
                                        group = "1";
                                        break;
                                    case "Eason Yu":
                                        group = "2";
                                        break;
                                    case "Joseph Kuo":
                                        group = "2";
                                        break;
                                    case "Ralph Lai":
                                        group = "2";
                                }

                                var startDate = new Date(result['Created']);
                                var endDate = new Date(result['Due Date']);
                                
                                var groupId = assigneeArray.indexOf(result['Assignee'])+1;
                                


                                if(result['Resolved']!==" "){
                                    endDate = new Date(result['Resolved']);
                                    console.log('resolved', result['Key'], endDate);
                                    groupId = assigneeArray.indexOf(result['Reporter'])+1;
                                } else {
                                    if(result['Due Date']==" "){
                                        className = "purple";
                                    }
                                }

                                var date = new Date();
                                if((date.getTime()>endDate.getTime())&&(result['Status']!="Closed"&&result['Status']!="Resolved"&&result['Status']!='In Progress')){
                                    className = "red";
                                }
                                
                                date.setDate(date.getDate() + 7);
                                console.log('Key', result['Key'],date, result['Due Date']);
                                if((date.getTime()>endDate.getTime())&&(result['Status']=="Open"||result['Status']=="Reopened")&&className != "red"){
                                    console.log('Key', result['Key']);
                                    className = "yellow";
                                }
                                var contentHTML = "<a target='_blank' href='http://jira.retair.com:8080/browse/"+result['Key']+"'>"+result['Key'] + ' ' + result['Summary']+"</a>";
                                visDataSet.push({
                                    className : className,
                                    content: contentHTML,
                                    title : result['Key'] + ' '+ result['Summary'],
                                    start: startDate,
                                    end: endDate,
                                    group: groupId
                                });
                            });
                            console.log('visDataSet',visDataSet);
                            var items = new vis.DataSet(visDataSet);
                            var options = {
                                zoomKey: 'ctrlKey',
                                start: new Date(projectStartDate),
                                end: new Date(projectEndDate),
                                //subGroupOrder: "end",
                                orientation: 'top',
                                width: '98%',
                                zoomable: false,
                                timeAxis: {
                                    scale: "day",
                                    step: 1
                                },
                                order: function(itemA, itemB){
                                    return itemA["end"].getTime() - itemB["end"].getTime();
                                },
                                margin: {
                                    item: 3
                                },
                                align: 'center'
                            };
                            var container = document.getElementById('container');
                            var timeline = new vis.Timeline(container, items, groups, options);
                            //timeline.setScale('day', 1);
                            //assignee
                            //created Date
                            //end date 
                            //in progress
                            //title = jira number + summary
                            
                        },
                        error: undefined,
                        download: false,
                        skipEmptyLines: true,
                        chunk: undefined,
                        fastMode: undefined,
                        beforeFirstChunk: undefined,
                        withCredentials: undefined
                    },
                        before: function(file, inputElem)
                        {
                            console.log("test");
                            // executed before parsing each file begins;
                            // what you return here controls the flow
                        },
                        error: function(err, file, inputElem, reason)
                        {
                            // executed if an error occurs while loading the file,
                            // or if before callback aborted for some reason
                        },
                        complete: function(data)
                        {   
                            console.log(data);
                            // executed after all files are complete
                        }
                    });
                };
            }
        };
    }]);
}(window.angular));