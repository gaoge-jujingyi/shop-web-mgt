(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a0bb"],{huUZ:function(t,e,a){},lJHR:function(t,e,a){"use strict";var i=a("huUZ");a.n(i).a},ySHl:function(t,e,a){"use strict";a.r(e);var i=a("P2sY"),n=a.n(i),s=a("QbLZ"),l=a.n(s),o=a("QSRe"),r=a("ZySA"),c=(a("7Qib"),a("Mz3J")),u=a("ZfUE"),d=a("BEYb"),p=a("a0Nf"),f=a("Q4Eu"),m=a("41Be"),h=a("L2JU"),_=a("oBYj"),v=a("gJ+i"),b=a("bY1+"),y={name:"couponManager",components:{Pagination:c.a,SysCode:u.a,FormDialog:d.a,DyFilterInput:v.a,DySelect:b.a,UserCouponList:_.a},directives:{waves:r.a,permission:f.a},filters:{},data:function(){return{cacheData:{},tableKey:0,list:null,total:0,listLoading:!0,listQuery:{pageNum:0,pageSize:10,orderBy:"+id",templateId:null,status:""},currentTemplate:{},multipleSelection:[],formVisible:!1,formVisibleCoupon:!1,isEdit:!1,formData:{}}},computed:l()({},Object(h.b)(["merchantNo"])),created:function(){},mounted:function(){var t=this;Object(p.a)(this.cacheData,"1000,1021,1023").then(function(){t.handleQueryList()})},methods:{checkPermission:m.a,cellStyle:function(){return"padding: 5px 0px;"},handleFilter:function(){this.listQuery.pageNum=0,this.listQuery.status="",this.handleQueryList()},handleReset:function(){this.listQuery.pageNum=0,this.listQuery.templateId="",this.listQuery.status="",this.handleQueryList()},handleQueryList:function(){var t=this;this.listLoading=!0;var e={pageSize:this.listQuery.pageSize,pageNum:this.listQuery.pageNum,"params[templateId]":this.listQuery.templateId,"params[status]":this.listQuery.status};Object(o.a)(e).then(function(e){t.list=e.list,t.total=e.total}).catch(function(t){console.log(t)}).finally(function(){t.listLoading=!1})},formOpen:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.isEdit=e,this.formVisible=!0,this.formData=e?n()({},t):{}},formOpenOffer:function(t){this.currentTemplate=t,this.formVisibleCoupon=!0},formClose:function(){this.formVisible=!1,this.$refs.formData.resetFields()},formCloseCoupon:function(){this.formVisibleCoupon=!1},handleOffer:function(t,e){var a=this;Object(o.e)(this.currentTemplate.id,t.uid).then(function(t){a.formVisibleCoupon=!1})},handleFormSave:function(){},handleSelectionChange:function(t){this.multipleSelection=t},handleSelected:function(t){var e=this.multipleSelection;!e.length||0==e.length||e.length>1?this.$message({type:"warning",message:"请选择一条数据进行操作"}):"edit"===t&&this.formOpen(e[0],!0)},handleMultiSelected:function(t){var e=this.multipleSelection;e.length&&0!=e.length||this.$message({type:"warning",message:"请至少选择一条数据进行操作"})}}},g=(a("lJHR"),a("KHd+")),w=Object(g.a)(y,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[t.cacheData.codes?a("sys-code",{staticClass:"filter-item",attrs:{selectStyle:"width:250px;",placeholder:"请选择状态","cache-options":t.cacheData.codes,"type-code":"1023",selected:t.listQuery.status},on:{"update:selected":function(e){t.$set(t.listQuery,"status",e)}}}):t._e(),t._v(" "),a("dy-select",{staticClass:"filter-item",attrs:{placeholder:"请选择模版",selectStyle:"width:250px;",selected:t.listQuery.templateId,selectType:"COUPON_TEMPLATE"},on:{"update:selected":function(e){t.$set(t.listQuery,"templateId",e)}}})],1),t._v(" "),a("div",{staticClass:"actions-container"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"right-actions"},[a("el-button",{staticClass:"action-item",attrs:{size:"small",icon:"el-icon-circle-close-outline"},on:{click:t.handleReset}},[t._v(t._s(t.$t("table.reset")))]),t._v(" "),a("el-button",{staticClass:"action-item",attrs:{size:"small",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(t._s(t.$t("table.query")))])],1)])],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"","default-sort":{prop:"createdDate",order:"descending"}},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"模版名称",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.cpName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"折扣金额（分）",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.cpValue))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"金额文案",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.valueDesc))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"单位文案",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.unitDesc))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"满减金额（分）",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.conditionValue))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"满减条件","show-overflow-tooltip":!0,align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.cpCondition))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("statusFilter")(e.row.status,t.cacheData.statusMap[1023])))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"优惠券类型",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("statusFilter")(e.row.couponType,t.cacheData.statusMap[1021])))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"receiveTime",sortable:"",label:"领取时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.receiveTime?a("span",[t._v(t._s(t._f("parseTime")(e.row.receiveTime)))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"startAt",label:"开始日期",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.startAt?a("span",[t._v(t._s(t._f("parseTime")(e.row.startAt,"{y}-{m}-{d}")))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"endAt",label:"结束日期",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.endAt?a("span",[t._v(t._s(t._f("parseTime")(e.row.endAt,"{y}-{m}-{d}")))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createdTime",sortable:"",label:t.$t("table.createdTime"),width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("parseTime")(e.row.createdTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("table.actions"),align:"center",width:"150",fixed:"right","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.$t("table.edit"),placement:"top-start"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"action-item",attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){t.formOpen(e.row,!0)}}})],1),t._v(" "),"102300"==e.row.status?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"action-item",attrs:{type:"text"},on:{click:function(a){t.formOpenOffer(e.row)}}},[t._v("发放")]):t._e()]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){t.$set(t.listQuery,"pageSize",e)},pagination:t.handleQueryList}}),t._v(" "),a("user-coupon-list",{attrs:{visible:t.formVisibleCoupon,multi:!1,title:"发送优惠券"},on:{"update:visible":function(e){t.formVisibleCoupon=e},onCancel:t.formCloseCoupon,onSubmit:t.handleOffer}},[a("div")])],1)},[],!1,null,"54bf3a44",null);w.options.__file="couponManager.vue";e.default=w.exports}}]);