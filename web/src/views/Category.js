import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ReactEcharts from 'echarts-for-react';

const Category = () => {
    const [nodeData, setNodeData] = useState([]);
    const [linkData, setLinkData] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetch("/api/home", {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                setNodeData(data.data.nodedata);
                setLinkData(data.data.linkdata)
            } else {
                alert("Failed to load data")
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to load data")
        });
    },[])

    const options = {
        title: {
            text: 'Sign - Category Diagram',
            right: '15%'
        },
        tooltip: {},
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        legend: [{
            data: ['Sign', 'Category'],
            top: '10%',
            right: 0
        }],
        series: [{
            type: 'graph',
            layout: 'force',
            roam: true,
            force: {
                repulsion: 1000,
                edgeLength: 200
            },
            draggable: true,
            lineStyle: {
                opacity: 0.9,
                width: 5,
                curveness: 0,
                color: '#89BABE'
            },
            label: {
                show: true,
                fontWeight: 'bold',
                fontSize: 16
            },
            data: nodeData,
            links: linkData,
            categories: [
                {
                    name: 'Sign',
                    itemStyle: {
                        borderColor: '#E2C1C9',
                        borderWidth: 3,
                        shadowBlur: 20,
                        shadowColor: '#E1AFA4',
                        color: '#FEFDFD',
                    },
                    symbolSize: 80,
                }, {
                    name: 'Category',
                    itemStyle: {
                        borderColor: '#C3CBE8',
                        borderWidth: 4,
                        shadowBlur: 10,
                        shadowColor: '#9299C7',
                        color: '#F9FCFF',
                    },
                    symbolSize: 120,
                }],
        }]
    };

    const onEvents = {
        'click': (params) => {
            if (params.data.category === 0) {
                navigate('/sign/'+params.data.id.slice(1))
            }
        }
    };

    return (
        <ReactEcharts option={options} onEvents={onEvents} style={{
            height: '90%',
            borderEndStartRadius: '10px',
            borderEndEndRadius: '10px',
            ...((window.innerWidth <= 768) && { height: '78%' })
          }}/>
    );
};

export default Category;
