//----------------------------------------------------------------------------
// bootstrapTable.js用于处理页面中的bootstrap-table表格初始化及数据加载----------
//----------------------------------------------------------------------------

// ----------------------------reportor_overview_iframe.html------------------
// bootstrap-table.js——————————实时报警
function alarmTypeFormatter(value) {
    return '<div class="tag_bg h-100 mx-auto">' + value + '</div>'
}
function statusFormatter(value) {
    if (value == "已处理") {
        return '<span class="unhandled_bg h-100 mx-auto">' + value + '</span>'
    } else {
        return '<span class="handled_bg h-100 mx-auto">' + value + '</span>'
    }
}
function secTableHei() {
    return $("#security_table_container").height()
}


$("#security_table").bootstrapTable({
    height: secTableHei(),
    columns: [{
        field: 'alarmType',
        title: '报警类型',
        formatter: alarmTypeFormatter
    }, {
        field: 'alarmTime',
        title: '报警时间'
    }, {
        field: 'alarmDevice',
        title: '报警设备'
    }, {
        field: 'status',
        title: '状态',
        formatter: statusFormatter
    }, {
        field: 'handleTime',
        title: '处理时间'
    },
    ],
    data: [{
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '未处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '未处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    },
    ]
})

// bootstrap-table.js——————————组织安全排名
function addFormatter(value) {
    if (value % 2 == 0) {
        return '<i class="iconfont" style="color:#d71e06">&#xe68b;</i>' + '<span style="color:#d13438">' + value + '</span>'
    } else {
        return '<i class="iconfont" style="color:#5dcd49">&#xe68a;</i>' + '<span style="color:#d13438">' + value + '</span>'
    }
}

function orgTableHeight() {
    return $("#org_table_container").height()
}

$("#org_table").bootstrapTable({
    height: orgTableHeight(),
    columns: [
        [
            {
                field: 'sort',
                title: '排名'
            }, {
                field: 'add',
                title: '增幅',
                formatter: addFormatter
            }, {
                field: 'orgName',
                title: '组织名称'
            }, {
                field: 'total',
                title: '报警总数'
            }, {
                field: 'contact',
                title: '联系人'
            }
        ]
    ],
    data: [{
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 3,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 4,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '0',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 1,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 7,
        orgName: '悦华门东服务中心',
        total: '4',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '1',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }, {
        sort: 1,
        add: 2,
        orgName: '悦华门东服务中心',
        total: '20',
        contact: '徐甜甜/86566799'
    }
    ]
})


// ----------------------------security_iframe.html----------------------------
// bootstrap-table.js——————————实时报警
function subSecTableHei() {
    return $("#table_con").height()
}
$("#sub_security_table").bootstrapTable({
    height: subSecTableHei(),
    columns: [{
        field: 'alarmType',
        title: '报警类型',
        formatter: alarmTypeFormatter
    }, {
        field: 'alarmTime',
        title: '报警时间'
    }, {
        field: 'alarmDevice',
        title: '报警设备'
    }, {
        field: 'status',
        title: '状态',
        formatter: statusFormatter
    }, {
        field: 'handleTime',
        title: '处理时间'
    },
    ],
    data: [{
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '未处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '未处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    }, {
        alarmType: '消防',
        alarmTime: '2020-2-10 13:00:00',
        alarmDevice: 'SBBH202025854',
        status: '已处理',
        handleTime: 'None'
    },
    ]
})