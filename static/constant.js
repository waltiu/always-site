import { uuid } from "util"

export const HOT_LABEL='最热'
export const OTHER_LABEL='其他'
export const HOT_SHOW_MAX =10


export const newsHotList=[{
  name:'baidu',
  url:"https://www.frontendjs.com/api/hot/baidu",
  icon:'https://www.baidu.com/favicon.ico',
  tranferData:(data)=>{
    return (data?.data||[]).map((item,index)=>{
      return {
        text:item.text,
        hotValue:item.hotValue,
        link:item.link
      }
      }).slice(0,HOT_SHOW_MAX)
  }
},
{
  name:'知乎',
  url:"https://tenapi.cn/zhihuresou/",
  icon:'https://static.zhihu.com/heifetz/favicon.ico',
  tranferData:(data)=>{
   return( data?.list||[]).map((item,index)=>{
    return {
      text:item.query,
      link:item.url
    }
    }).slice(0,HOT_SHOW_MAX)

  }
}]


const searchList=[{
    icon: "https://img.bidianer.com/engine/201905/06/5ccffcbb848d1_6VmFZFyC397EDMO.svg",
    name: "百度",
    url: "https://www.baidu.com/s?tn=78000241_19_hao_pg&ie=utf-8&wd=",
},  {
    icon: "https://img.bidianer.com/engine/201904/14/5cb34424d14e6HcH59ZkZZEe8ND-7.svg",
    name: '网易云音乐',
    url: "https://music.163.com/#/search/m/?s=",
}, {

    icon: "https://img.bidianer.com/engine/201904/15/5cb4182d9c42cEu-yEtxPyEbjiNq7.svg",
    name: "百度图片",
    url: "https://image.baidu.com/search/index?tn=baiduimage&word=",
}, {

    icon: "https://img.bidianer.com/engine/201904/16/5cb544c26d015jJ5gQ9ojDZAP1qW4.svg",
    name: '百度地图',
    url: "http://map.baidu.com/m?word=",
},{

    icon: "https://img.bidianer.com/engine/202102/19/602fd5b78adfe2K5aUWS_vedEJ3ns.svg",
    name: '知乎',
    url: "https://www.zhihu.com/search?q=",
}, {
    icon: "https://img.bidianer.com/engine/201904/14/5cb34d1303b1blA85SUXF98Q7LZI9.svg",
    name: 'B站',
    url: "https://search.bilibili.com/all?keyword=",
},   {

    icon: "https://img.bidianer.com/engine/201904/14/5cb3407b5e7998B5paS4A0LCkOQm-.svg",
    name: '贴吧',
    url: "http://tieba.baidu.com/f?ie=utf-8&kw=",
}]


export const defaultTag=[
  {
      "title":HOT_LABEL,
      "tags": [
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2018/08/sdcnav-9-3.png",
              "name": "PPT神器 iSlide",
              "link": "https://www.uisdc.com/ppt-artifact-islide",
              "title": "design",
              "heat": 4
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2020/04/nav-aliyun-202018.png",
              "name": "阿里云建站神器",
              "link": "https://ac.aliyun.com/application/webdesign/sumei?source=5176.11533457&userCode=itzns7ko",
              "title": "design",
              "heat": 3
          },
          {
              "icon": "https://static.figma.com/app/icon/1/favicon.ico",
              "name": "figma",
              "link": "https://www.figma.com/",
              "title": "design",
              "heat": 2
          },
          {
              "icon": "https://mastergo.com/favicon.ico",
              "name": "masterGo",
              "link": "https://mastergo.com/",
              "title": "design",
              "heat": 1
          },
          {
              "icon": "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/favicon.png?_v_=20200710_1",
              "name": "echarts",
              "link": "https://echarts.apache.org/zh/index.html",
              "title": "visualization"
          },
          {
              "icon": "https://www.highcharts.com/docs/img/favicon.png",
              "name": "highcharts",
              "link": "https://www.highcharts.com/docs/index",
              "title": "visualization"
          },
          {
              "icon": "https://d3js.org/favicon.png",
              "name": "d3",
              "link": "https://d3js.org/",
              "title": "visualization"
          },
          {
              "icon": "https://threejs.org/files/favicon.ico",
              "name": "threejs",
              "link": "https://threejs.org/",
              "title": "visualization"
          },
          {
              "icon": "http://fabricjs.com/favicon.ico",
              "name": "fabricjs",
              "link": "http://fabricjs.com/",
              "title": "visualization"
          },
          {
              "icon": "https://img.js.design/assets/webImg/favicon.ico",
              "name": "即时设计",
              "link": "https://js.design/",
              "title": "design"
          }
      ]
  },
  {
      "title": "design",
      "tags": [
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2018/08/sdcnav-9-3.png",
              "name": "PPT神器 iSlide",
              "link": "https://www.uisdc.com/ppt-artifact-islide",
              "title": "design",
              "heat": 4
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2020/04/nav-aliyun-202018.png",
              "name": "阿里云建站神器",
              "link": "https://ac.aliyun.com/application/webdesign/sumei?source=5176.11533457&userCode=itzns7ko",
              "title": "design",
              "heat": 3
          },
          {
              "icon": "https://static.figma.com/app/icon/1/favicon.ico",
              "name": "figma",
              "link": "https://www.figma.com/",
              "title": "design",
              "heat": 2
          },
          {
              "icon": "https://mastergo.com/favicon.ico",
              "name": "masterGo",
              "link": "https://mastergo.com/",
              "title": "design",
              "heat": 1
          },
          {
              "icon": "https://img.js.design/assets/webImg/favicon.ico",
              "name": "即时设计",
              "link": "https://js.design/",
              "title": "design"
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2018/08/sdcnav-9-1.png",
              "name": "神器推荐专栏",
              "link": "https://www.uisdc.com/category/hot-download/tools-download",
              "title": "design"
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2018/08/sdcnav-9-2.png",
              "name": "设计师神器",
              "link": "https://uiiiuiii.com/inspirations/featured/tool",
              "title": "design"
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2020/03/jdr-design-nav.png",
              "name": "京东JDR Design",
              "link": "https://jdrd.jd.com/",
              "title": "design"
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2018/08/sdcnav-9-6.png",
              "name": "Adobe全家桶",
              "link": "https://uiiiuiii.com/software/5103.html",
              "title": "design"
          },
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2019/11/nav-1107-epub.png",
              "name": "H5制作神器",
              "link": "https://www.epub360.com/",
              "title": "design"
          }
      ]
  },
  {
      "title": "visualization",
      "tags": [
          {
              "icon": "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/favicon.png?_v_=20200710_1",
              "name": "echarts",
              "link": "https://echarts.apache.org/zh/index.html",
              "title": "visualization"
          },
          {
              "icon": "https://www.highcharts.com/docs/img/favicon.png",
              "name": "highcharts",
              "link": "https://www.highcharts.com/docs/index",
              "title": "visualization"
          },
          {
              "icon": "https://d3js.org/favicon.png",
              "name": "d3",
              "link": "https://d3js.org/",
              "title": "visualization"
          },
          {
              "icon": "https://threejs.org/files/favicon.ico",
              "name": "threejs",
              "link": "https://threejs.org/",
              "title": "visualization"
          },
          {
              "icon": "http://fabricjs.com/favicon.ico",
              "name": "fabricjs",
              "link": "http://fabricjs.com/",
              "title": "visualization"
          }
      ]
  },
  {
      "title": "",
      "tags": [
          {
              "icon": "https://image.uisdc.com/wp-content/uploads/2019/11/nav-1107-epub.png",
              "name": "H5制作神器",
              "link": "https://www.epub360.com/"
          }
      ]
  }
]