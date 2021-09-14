!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue"),require("axios"),require("element-plus"),require("dayjs")):"function"==typeof define&&define.amd?define(["exports","vue","axios","element-plus","dayjs"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).VV={},e.Vue,e.axios2,e.elementPlus,e.dayjs2)}(this,(function(e,t,a,o,r){"use strict";function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d=l(a),n=l(r);const i=d.default.create({baseURL:sessionStorage.getItem("http-url")||"",timeout:2e4});function s(e,t){return i({url:"/auth/v1/menus",method:"post",headers:t,data:e})}function c(e,t){return i({url:`/auth/v1/menus/${e}`,headers:t,method:"delete"})}function u(e,t){return i({url:`/auth/v1/menus/${e.id}`,method:"put",headers:t,data:e})}function p(e,t){return i({url:"/auth/v1/resources",method:"get",params:e,headers:t})}i.interceptors.request.use((e=>e),(e=>{console.log(e),Promise.reject(e)})),i.interceptors.response.use((e=>0===e.data.status?e.data:(o.ElMessage.error(e.data.statusText),Promise.reject())),(e=>{if(e.response&&e.response.data){const t=e.response.status,a=e.response.data.message;o.ElMessage.error(`Code: ${t}, Message: ${a}`)}else o.ElMessage.error(`${e}`);return Promise.reject(e)}));var m=Object.assign,f=t.defineComponent({props:{httpBaseUrl:{type:String,default:""},headers:{type:Object,default:()=>{}}},setup(e){sessionStorage.setItem("http-url",e.httpBaseUrl),t.provide("headers",e.headers);const a=t.reactive({tableData:[],height:200,total:0,pageSize:100,pageNo:1,searchTxt:"",loading:!1,editVisible:!1,editType:"add",editParms:{},tableId:"table"+Date.now()}),o=()=>{return t=this,o=arguments,r=function*(t=1){a.loading=!0;try{const t=yield p({size:a.pageSize,pageNo:a.pageNo,searchTxt:a.searchTxt},e.headers);a.tableData=t.data.data,a.pageNo=t.data.pageNo,a.total=t.data.totalCount}catch(e){console.log(e)}a.loading=!1},new Promise(((e,a)=>{var l=e=>{try{n(r.next(e))}catch(e){a(e)}},d=e=>{try{n(r.throw(e))}catch(e){a(e)}},n=t=>t.done?e(t.value):Promise.resolve(t.value).then(l,d);n((r=r.apply(t,o)).next())}));var t,o,r};return t.onMounted((()=>{t.nextTick((()=>{const e=document.getElementById(a.tableId),t=document.documentElement.clientHeight,o=e.getBoundingClientRect();a.height=t-o.top-90})),o()})),m(m({currentChange:e=>{a.pageNo=e,o()}},t.toRefs(a)),{getTableList:o,dayjs:n.default})}});const h=t.withScopeId("data-v-9982f184");t.pushScopeId("data-v-9982f184");const V=t.createVNode("p",{class:"title"},"接口管理",-1),g={class:"serach-bx"},v=t.createTextVNode("搜索"),N={class:"pagination-bx"},y={class:"pagination-left"},b=t.createTextVNode(" 总数："),C={style:{color:"#e53125"}},x=t.createTextVNode("，当前页码： ");t.popScopeId();const k=h((function(e,a,o,r,l,d){const n=t.resolveComponent("el-input"),i=t.resolveComponent("el-button"),s=t.resolveComponent("el-table-column"),c=t.resolveComponent("el-table"),u=t.resolveComponent("el-pagination"),p=t.resolveDirective("loading");return t.openBlock(),t.createBlock("div",null,[V,t.createVNode("div",g,[t.createVNode("div",null,[t.createVNode(n,{placeholder:"请输入内容",style:{width:"330px","margin-right":"20px"},modelValue:e.searchTxt,"onUpdate:modelValue":a[1]||(a[1]=t=>e.searchTxt=t),clearable:""},null,8,["modelValue"]),t.createVNode(i,{type:"primary",icon:"el-icon-search",onClick:a[2]||(a[2]=t=>(e.pageNo=1,e.getTableList()))},{default:h((()=>[v])),_:1})]),t.createCommentVNode(' <div>\r\n        <el-button type="success" @click="openEdit({})">+ 新增接口</el-button>\r\n      </div> ')]),t.withDirectives(t.createVNode(c,{id:e.tableId,data:e.tableData,border:"",style:{width:"100%"},height:e.height},{default:h((()=>[t.createVNode(s,{label:"序号",width:"50",type:"index"}),t.createVNode(s,{prop:"name",label:"接口名称"}),t.createVNode(s,{prop:"systemName",label:"业务系统"}),t.createVNode(s,{prop:"description",label:"接口描述"}),t.createVNode(s,{prop:"url",label:"接口地址"}),t.createVNode(s,{prop:"method",label:"请求方式",width:"80"}),t.createVNode(s,{prop:"name",label:"最后编辑时间"},{default:h((({row:a})=>[t.createTextVNode(t.toDisplayString(e.dayjs(a.modifiedAt).format("YYYY-MM-DD HH:mm:ss")),1)])),_:1})])),_:1},8,["id","data","height"]),[[p,e.loading]]),t.createVNode("div",N,[t.createVNode("div",y,[b,t.createVNode("span",C,t.toDisplayString(e.total),1),x,t.createVNode("span",null,t.toDisplayString(e.pageNo),1)]),t.createVNode(u,{background:"",layout:"prev, pager, next",total:e.total,"page-size":e.pageSize,"onCurrent-change":e.currentChange},null,8,["total","page-size","onCurrent-change"])])])}));f.render=k,f.__scopeId="data-v-9982f184",f.__file="src/lib/OperationConfig/InterFaceList.vue";var _=Object.assign,w=t.defineComponent({props:{type:{type:String,default:""},platform:{type:String,default:""},targetData:{type:Object,default:()=>{}},menuList:{type:Array,default:()=>[]}},setup(e,{emit:a}){const r=t.ref(),l=t.inject("headers");let d=t.reactive({id:"",name:"",redirectUrl:"",url:"",type:"menu",sortNum:1,iconUrl:"",parentId:0,platform:e.platform,description:"",parentName:"",status:!1});const n=t.reactive({value:"id",label:"name",checkStrictly:!0}),i=t.reactive({name:{required:!0,message:"请输入页面名称",trigger:"blur"},url:{required:!0,message:"请输入路由地址",trigger:"blur"},sortNum:{required:!0,message:"请输入排序",trigger:"blur"}});t.watch((()=>e.targetData),((t={})=>{if(t)if("add"===e.type){const{parentId:e,parentName:a}=t;d.parentId=e||0,d.parentName=e?a:"根节点（顶级菜单）",d.name="",d.url="",d.redirectUrl="",d.iconUrl="",d.description="",d.type="menu",d.sortNum=1}else{const{name:e="",url:a="",type:o="menu",parentId:r,iconUrl:l="",id:n,sortNum:i,status:s,redirectUrl:c,parentName:u,description:p=""}=t;d.parentId=r,d.parentName=r?"":"根节点（顶级菜单）",d.name=e,d.url=a,d.description=p,d.redirectUrl=c,d.iconUrl=l,d.type=o,d.sortNum=i,d.id=n,d.status=1===s}}),{deep:!0,immediate:!0});const c=()=>{return t=this,r=null,n=function*(){try{d.platform=e.platform,"add"===e.type?(d.status=0,yield s(d,l),o.ElMessage.success("操作成功"),a("saveSuccess")):(d.parentId=Array.isArray(d.parentId)?d.parentId[d.parentId.length-1]:d.parentId,yield u(_(_({},d),{status:d.status?1:0}),l),o.ElMessage.success("操作成功"),a("saveSuccess"))}catch(e){console.log(e)}},new Promise(((e,a)=>{var o=e=>{try{d(n.next(e))}catch(e){a(e)}},l=e=>{try{d(n.throw(e))}catch(e){a(e)}},d=t=>t.done?e(t.value):Promise.resolve(t.value).then(o,l);d((n=n.apply(t,r)).next())}));var t,r,n};return{editForm:d,rules:i,confirm:()=>{r.value.validate().then((e=>{if(!e)return!1;o.ElMessageBox.confirm("确认保存此次操作数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{c()}))}))},seveform:r,defaultProps:n}}});const I=t.withScopeId("data-v-3ae3769c");t.pushScopeId("data-v-3ae3769c");const S=t.createVNode("span",{class:"tip"},"不多于8个汉字",-1),B=t.createVNode("span",{class:"tip"},"路由为空，则不跳转",-1),D={key:0},F=t.createTextVNode("菜单项"),T=t.createTextVNode("页面资源"),P=t.createVNode("span",{class:"tip"},"启用后将在前端显示，否则隐藏",-1);t.popScopeId();const U=I((function(e,a,o,r,l,d){const n=t.resolveComponent("el-input"),i=t.resolveComponent("el-form-item"),s=t.resolveComponent("el-cascader"),c=t.resolveComponent("el-radio"),u=t.resolveComponent("el-radio-group"),p=t.resolveComponent("el-switch"),m=t.resolveComponent("el-input-number"),f=t.resolveComponent("el-button"),h=t.resolveComponent("el-form");return t.openBlock(),t.createBlock(h,{ref:"seveform",rules:e.rules,model:e.editForm,"label-width":"140px"},{default:I((()=>[t.createVNode(i,{class:"form-item",label:"页面名称：",prop:"name"},{default:I((()=>[t.createVNode(n,{modelValue:e.editForm.name,"onUpdate:modelValue":a[1]||(a[1]=t=>e.editForm.name=t),style:{width:"50%"},clearable:"",placeholder:"请输入",maxlength:"8"},null,8,["modelValue"]),S])),_:1}),t.createVNode(i,{class:"form-item",label:"描述："},{default:I((()=>[t.createVNode(n,{modelValue:e.editForm.description,"onUpdate:modelValue":a[2]||(a[2]=t=>e.editForm.description=t),style:{width:"50%"},clearable:"",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),t.createVNode(i,{class:"form-item",label:"路由地址：",prop:"url"},{default:I((()=>[t.createVNode(n,{modelValue:e.editForm.url,"onUpdate:modelValue":a[3]||(a[3]=t=>e.editForm.url=t),style:{width:"50%"},clearable:"",placeholder:"/xxxxx"},null,8,["modelValue"]),B])),_:1}),t.createVNode(i,{class:"form-item",label:"重定向："},{default:I((()=>[t.createVNode(n,{modelValue:e.editForm.redirectUrl,"onUpdate:modelValue":a[4]||(a[4]=t=>e.editForm.redirectUrl=t),style:{width:"50%"},clearable:"",placeholder:"/xxxxx"},null,8,["modelValue"])])),_:1}),t.createVNode(i,{class:"form-item",label:"上级菜单："},{default:I((()=>[e.editForm.parentName?(t.openBlock(),t.createBlock("span",D,t.toDisplayString(e.editForm.parentName),1)):"edit"===e.type?(t.openBlock(),t.createBlock(s,{key:1,options:e.menuList,props:e.defaultProps,modelValue:e.editForm.parentId,"onUpdate:modelValue":a[5]||(a[5]=t=>e.editForm.parentId=t),placeholder:"请选择",style:{width:"50%"}},null,8,["options","props","modelValue"])):t.createCommentVNode("v-if",!0)])),_:1}),t.createVNode(i,{class:"form-item",label:"页面类型："},{default:I((()=>[t.createVNode(u,{modelValue:e.editForm.type,"onUpdate:modelValue":a[6]||(a[6]=t=>e.editForm.type=t)},{default:I((()=>[t.createVNode(c,{label:"menu"},{default:I((()=>[F])),_:1}),t.createVNode(c,{label:"page"},{default:I((()=>[T])),_:1})])),_:1},8,["modelValue"])])),_:1}),t.createVNode(i,{class:"form-item",label:"icon图标："},{default:I((()=>[t.createVNode(n,{modelValue:e.editForm.iconUrl,"onUpdate:modelValue":a[7]||(a[7]=t=>e.editForm.iconUrl=t),style:{width:"50%"},clearable:"",placeholder:"请输入"},null,8,["modelValue"])])),_:1}),"edit"===e.type?(t.openBlock(),t.createBlock(i,{key:0,class:"form-item",label:"启动状态："},{default:I((()=>[t.createVNode(p,{modelValue:e.editForm.status,"onUpdate:modelValue":a[8]||(a[8]=t=>e.editForm.status=t)},null,8,["modelValue"]),P])),_:1})):t.createCommentVNode("v-if",!0),t.createVNode(i,{class:"form-item",label:"排序：",prop:"sortNum"},{default:I((()=>[t.createVNode(m,{modelValue:e.editForm.sortNum,"onUpdate:modelValue":a[9]||(a[9]=t=>e.editForm.sortNum=t),style:{width:"200px"},min:1,max:100},null,8,["modelValue"])])),_:1}),t.createVNode(i,null,{default:I((()=>[t.createVNode(f,{type:"primary",onClick:e.confirm},{default:I((()=>[t.createTextVNode("确认"+t.toDisplayString("add"===e.type?"新增":"修改"),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["rules","model"])}));w.render=U,w.__scopeId="data-v-3ae3769c",w.__file="src/lib/OperationConfig/EditMenu.vue";var L=t.defineComponent({props:{type:{type:String,default:""},platform:{type:String,default:""},targetData:{type:Object,default:()=>{}},menuList:{type:Array,default:()=>[]}},setup(e,{emit:a}){const r=t.ref(),l=t.inject("headers"),d=t.reactive({id:e.targetData.id||"",name:e.targetData.name||"",code:e.targetData.code||"",description:e.targetData.description||"",sortNum:e.targetData.sortNum||1,status:1===e.targetData.status,type:"operation",parentId:e.targetData.parentId,platform:e.platform}),n=t.reactive({name:{required:!0,message:"请输入功能名称",trigger:"blur"},code:{required:!0,message:"请输入功能编码",trigger:"blur"},sortNum:{required:!0,message:"请输入排序",trigger:"blur"}}),i=()=>{return t=this,r=null,n=function*(){try{d.status=d.status?1:0,"add"===e.type?(yield s(d,l),o.ElMessage.success("操作成功"),a("saveSuccess")):(yield u(d,l),o.ElMessage.success("操作成功"),a("saveSuccess"))}catch(e){console.log(e)}},new Promise(((e,a)=>{var o=e=>{try{d(n.next(e))}catch(e){a(e)}},l=e=>{try{d(n.throw(e))}catch(e){a(e)}},d=t=>t.done?e(t.value):Promise.resolve(t.value).then(o,l);d((n=n.apply(t,r)).next())}));var t,r,n};return t.onMounted((()=>{})),{editForm:d,rules:n,confirm:()=>{r.value.validate().then((e=>{if(!e)return!1;o.ElMessageBox.confirm("确认提交此次操作数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{i()}))}))},seveform:r}}});const M=t.withScopeId("data-v-e36892a4");t.pushScopeId("data-v-e36892a4");const E={class:"dialog-bx"},j=t.createVNode("span",{class:"tip"},"同一页面资源功能名称不能重名",-1),z=t.createVNode("span",{class:"tip"},"功能编码不能重复",-1),O=t.createVNode("span",{class:"tip"},"启用后将在前端显示，否则隐藏",-1);t.popScopeId();const $=M((function(e,a,o,r,l,d){const n=t.resolveComponent("el-input"),i=t.resolveComponent("el-form-item"),s=t.resolveComponent("el-switch"),c=t.resolveComponent("el-input-number"),u=t.resolveComponent("el-button"),p=t.resolveComponent("el-form");return t.openBlock(),t.createBlock("div",E,[t.createVNode(p,{ref:"seveform",rules:e.rules,model:e.editForm,"label-width":"140px"},{default:M((()=>[t.createVNode(i,{class:"form-item",label:"功能名称：",prop:"name"},{default:M((()=>[t.createVNode(n,{modelValue:e.editForm.name,"onUpdate:modelValue":a[1]||(a[1]=t=>e.editForm.name=t),style:{width:"50%"},clearable:""},null,8,["modelValue"]),j])),_:1}),t.createVNode(i,{class:"form-item",label:"功能编码：",prop:"code"},{default:M((()=>[t.createVNode(n,{modelValue:e.editForm.code,"onUpdate:modelValue":a[2]||(a[2]=t=>e.editForm.code=t),style:{width:"50%"},clearable:""},null,8,["modelValue"]),z])),_:1}),t.createVNode(i,{class:"form-item",label:"功能说明："},{default:M((()=>[t.createVNode(n,{modelValue:e.editForm.description,"onUpdate:modelValue":a[3]||(a[3]=t=>e.editForm.description=t),style:{width:"50%"},clearable:""},null,8,["modelValue"])])),_:1}),t.createVNode(i,{class:"form-item",label:"启用状态："},{default:M((()=>[t.createVNode(s,{modelValue:e.editForm.status,"onUpdate:modelValue":a[4]||(a[4]=t=>e.editForm.status=t)},null,8,["modelValue"]),O])),_:1}),t.createVNode(i,{class:"form-item",label:"排序：",prop:"sortNum"},{default:M((()=>[t.createVNode(c,{modelValue:e.editForm.sortNum,"onUpdate:modelValue":a[5]||(a[5]=t=>e.editForm.sortNum=t),style:{width:"30%"},clearable:""},null,8,["modelValue"])])),_:1}),t.createVNode(i,null,{default:M((()=>[t.createVNode(u,{type:"primary",onClick:e.confirm},{default:M((()=>[t.createTextVNode(t.toDisplayString("add"===e.type?"新增资源":"编辑资源"),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["rules","model"])])}));L.render=$,L.__scopeId="data-v-e36892a4",L.__file="src/lib/OperationConfig/EditSource.vue";var R=Object.assign,q=(e,t,a)=>new Promise(((o,r)=>{var l=e=>{try{n(a.next(e))}catch(e){r(e)}},d=e=>{try{n(a.throw(e))}catch(e){r(e)}},n=e=>e.done?o(e.value):Promise.resolve(e.value).then(l,d);n((a=a.apply(e,t)).next())})),A=t.defineComponent({props:{id:{type:String,default:""}},setup(e){const a=t.inject("headers"),r=t.reactive({unInterfaceList:[],interfaceList:[],form:{page:1,size:1e3}});let l=[];const d=()=>q(this,null,(function*(){try{const t=yield function(e,t){return i({url:`/auth/v1/menus/${e}/resources`,headers:t,method:"get"})}(e.id,a);if(r.unInterfaceList=t.data.map((e=>e.id)),l.length<1){const e=yield p({page:1,size:1e4},a);l=e.data.data}const o=r.unInterfaceList.map((e=>e.id)),d=[];l.forEach((e=>{o.includes(e.id)||(e.key=e.id||-1,e.label=e.name+":"+e.url,d.push(e))})),r.interfaceList=d}catch(e){console.log(12,e)}}));return t.watch((()=>e.id),(e=>{e&&d()})),t.onMounted((()=>{e.id&&d()})),R(R({},t.toRefs(r)),{handleBing:()=>q(this,null,(function*(){try{yield function(e,t,a){return i({url:`/auth/v1/menus/${e}/bindResources`,method:"post",headers:a,data:t})}(e.id,r.unInterfaceList,a),o.ElMessage.success("操作成功"),d()}catch(e){console.log(e)}}))})}});const H=t.withScopeId("data-v-611538a3");t.pushScopeId("data-v-611538a3");const Y={class:"addInterface"},K={style:{height:"86%"}},G={class:"center",style:{"padding-top":"20px"}},J=t.createTextVNode("提交绑定");t.popScopeId();const Q=H((function(e,a,o,r,l,d){const n=t.resolveComponent("el-transfer"),i=t.resolveComponent("el-button");return t.openBlock(),t.createBlock("div",Y,[t.createVNode("div",K,[t.createVNode(n,{modelValue:e.unInterfaceList,"onUpdate:modelValue":a[1]||(a[1]=t=>e.unInterfaceList=t),filterable:"",titles:["接口列表","已选接口"],data:e.interfaceList},null,8,["modelValue","data"])]),t.createVNode("div",G,[t.createVNode(i,{type:"primary",style:{width:"200px"},onClick:e.handleBing},{default:H((()=>[J])),_:1},8,["onClick"])])])}));A.render=Q,A.__scopeId="data-v-611538a3",A.__file="src/lib/OperationConfig/BindInterface.vue";var W=Object.assign,X=(e,t,a)=>new Promise(((o,r)=>{var l=e=>{try{n(a.next(e))}catch(e){r(e)}},d=e=>{try{n(a.throw(e))}catch(e){r(e)}},n=e=>e.done?o(e.value):Promise.resolve(e.value).then(l,d);n((a=a.apply(e,t)).next())})),Z=t.defineComponent({name:"ResourceAllocation",props:{httpBaseUrl:{type:String,default:""},headers:{type:Object,default:()=>{}}},components:{EditMenu:w,EditSource:L,BindInterface:A},setup(e){sessionStorage.setItem("http-url",e.httpBaseUrl),t.provide("headers",e.headers);const a=t.ref(),r=t.reactive({sourceList:[],dialogVisible:!1,effectVisible:!1,interFaceVisible:!1,platform:"",defaultProps:{children:"children",label:"name"},loading:!1,tableLoading:!1,addParms:{},editParms:{},editSourceParms:{},defaultChecked:[],editSourceType:"edit",treeData:[],tableData:[],interFaceId:"",interTitle:""}),l=t.computed((()=>Object.keys(r.editParms).length>0)),d=()=>X(this,null,(function*(){r.loading=!0;try{const o=yield(t={containOperation:!1,platform:r.platform},a=e.headers,i({url:"/auth/v1/menus",method:"get",headers:a,params:t}));r.treeData=o.data||[]}catch(e){console.log(e)}var t,a;r.loading=!1})),n=()=>X(this,null,(function*(){const t=yield(a=e.headers,i({url:"/auth/v1/dicts/platforms",method:"get",headers:a}));var a;r.sourceList=t.data||[],r.platform=r.sourceList[0]?r.sourceList[0].code:"",d()})),u=()=>X(this,null,(function*(){r.tableLoading=!0;try{const o=yield(t=r.editParms.id,a=e.headers,i({url:`/auth/v1/menus/${t}/operations`,headers:a,method:"get"}));r.tableData=o.data||[]}catch(e){console.log(e)}var t,a;r.tableLoading=!1})),p=(e,t)=>{if(0===t)return e.map((e=>e.id));for(let a=0;a<e.length;a++){let o=e[a];if(o.id===t){if(o.children)return o.children.map((e=>e.id))}else o.children&&p(o.children,t)}},m=t=>X(this,null,(function*(){for(let a=0;a<t.length;a++){const o=t[a],l={name:`${o.name}-查看`,code:`${o.url.replace("/","")}_view`,description:`${o.name}页面查看权限，禁用则页面无法在系统查看, 勿删！！！`,sortNum:1,status:1,type:"operation",parentId:o.id,platform:r.platform};"page"===o.type&&(yield s(l,e.headers)),o.children&&o.children.length>0&&m(o.children)}}));return t.onMounted((()=>{n()})),W(W({},t.toRefs(r)),{openEffect:e=>{r.editSourceType=e.id?"edit":"add",r.editSourceParms=W({parentId:r.editParms.id},e),r.effectVisible=!0},openEdit:e=>{r.dialogVisible=!0,r.addParms={parentId:e.id,parentName:e.name}},getMenuList:d,handleNodeClick:(e,t)=>{const{parent:o={}}=e,{name:l}=o.data;r.editParms=W(W({},t),{parentName:l}),a.value.setCheckedKeys([t.id]),u()},deleMenu:t=>{o.ElMessageBox.confirm(`你是否删除 [ ${t.name} ] 菜单及菜单下的相关资源？`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>X(this,null,(function*(){yield c(t.id,e.headers),o.ElMessage.success("删除成功"),t.id===r.editParms.id&&(r.editParms={}),d()}))))},nodeDrop:(t,a,o)=>X(this,null,(function*(){const l=t.data.id,n="inner"===o?a.data.id:a.data.parentId,s=p(r.treeData,n);var c,u;yield(c={id:l,parentId:n,sortedMenuIds:s},u=e.headers,i({url:`/auth/v1/menus/${c.id}/update-parent`,method:"PATCH",headers:u,data:c})),d()})),treeRef:a,showCar:l,getTableList:u,deteRow:t=>X(this,null,(function*(){o.ElMessageBox.confirm(`你是否删除 [ ${t.name} ] 资源？`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>X(this,null,(function*(){yield c(t.id,e.headers),o.ElMessage.success("删除成功"),u()}))))})),openInterFace:e=>X(this,null,(function*(){r.interFaceId=e.id.toString(),r.interTitle=e.name,r.interFaceVisible=!0})),createCheckView:m})}});const ee=t.withScopeId("data-v-65c1edf7");t.pushScopeId("data-v-65c1edf7");const te={class:"menu-set-bx"},ae=t.createVNode("p",null,"菜单及页面资源配置",-1),oe={class:"menu-set-content"},re={class:"content-left"},le={class:"back-stage"},de=t.createVNode("span",null,"后台管理",-1),ne=t.createVNode("span",{class:"text-midlle"},"(拖拽完成菜单位置调整)",-1),ie=t.createVNode("span",{class:"btn-add"},"+",-1),se={class:"tree-bx zg-scroll"},ce=t.createVNode("span",{class:"btn-add"},"+",-1),ue=t.createVNode("span",{class:"btn-add btn-jian"},"-",-1),pe={class:"content-right"},me={class:"tab-content zg-scroll"},fe={class:"tab-content zg-scroll tab-content-ot"},he={class:"table-title"},Ve=t.createTextVNode("新增功能"),ge=t.createTextVNode("编辑"),ve=t.createVNode("span",{style:{color:"red"}},"删除",-1),Ne=t.createVNode("span",{style:{color:"#666"}},"绑定接口",-1),ye={key:1,class:"no-data-bx"},be=t.createTextVNode("请点击要编辑的菜单"),Ce=t.createTextVNode("执行"),xe={class:"dialog-bx"};t.popScopeId();const ke=ee((function(e,a,o,r,l,d){const n=t.resolveComponent("el-option"),i=t.resolveComponent("el-select"),s=t.resolveComponent("el-button"),c=t.resolveComponent("el-tree"),u=t.resolveComponent("EditMenu"),p=t.resolveComponent("el-tab-pane"),m=t.resolveComponent("el-table-column"),f=t.resolveComponent("el-table"),h=t.resolveComponent("el-tabs"),V=t.resolveComponent("spam"),g=t.resolveComponent("el-dialog"),v=t.resolveComponent("EditSource"),N=t.resolveComponent("BindInterface"),y=t.resolveDirective("loading");return t.openBlock(),t.createBlock("div",te,[ae,t.createVNode("div",oe,[t.createVNode("div",re,[t.createVNode(i,{modelValue:e.platform,"onUpdate:modelValue":a[1]||(a[1]=t=>e.platform=t),placeholder:"请选择",style:{width:"100%"}},{default:ee((()=>[(t.openBlock(!0),t.createBlock(t.Fragment,null,t.renderList(e.sourceList,(e=>(t.openBlock(),t.createBlock(n,{key:e.code,label:e.name,value:e.code},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),t.createVNode("div",le,[de,ne,t.createVNode(s,{type:"primary",size:"mini",onClick:a[2]||(a[2]=t=>e.openEdit({}))},{default:ee((()=>[ie])),_:1})]),t.createVNode("div",se,[t.withDirectives(t.createVNode(c,{data:e.treeData,"node-key":"id","default-expand-all":"",draggable:"",ref:"treeRef",props:e.defaultProps,"onNode-drop":e.nodeDrop},{default:ee((({node:a,data:o})=>[t.createVNode("div",{class:"node-item",onClick:t=>e.handleNodeClick(a,o)},[t.createVNode("span",{class:{act:e.editParms.id===o.id}},t.toDisplayString("menu"===o.type?"[菜单]":"[页面]")+t.toDisplayString(o.name),3),t.createVNode("div",null,[t.createVNode(s,{type:"primary",size:"mini",onClick:t.withModifiers((t=>e.openEdit(o)),["stop"])},{default:ee((()=>[ce])),_:1},8,["onClick"]),t.createVNode(s,{onClick:t.withModifiers((t=>e.deleMenu(o)),["stop"]),size:"mini"},{default:ee((()=>[ue])),_:1},8,["onClick"])])],8,["onClick"])])),_:1},8,["data","props","onNode-drop"]),[[y,e.loading]])])]),t.createVNode("div",pe,[e.showCar?(t.openBlock(),t.createBlock(h,{key:0,type:"border-card"},{default:ee((()=>[t.createVNode(p,{label:"菜单/页面"},{default:ee((()=>[t.createVNode("div",me,[t.createVNode(u,{platform:e.platform,type:"edit",targetData:e.editParms,menuList:e.treeData,onSaveSuccess:a[3]||(a[3]=t=>e.getMenuList())},null,8,["platform","targetData","menuList"])])])),_:1}),t.createVNode(p,{label:"功能"},{default:ee((()=>[t.createVNode("div",fe,[t.createVNode("div",he,[t.createVNode("span",null,"当前页面："+t.toDisplayString(e.editParms.name),1),t.createVNode(s,{type:"primary",onClick:a[4]||(a[4]=t=>e.openEffect({}))},{default:ee((()=>[Ve])),_:1})]),t.withDirectives(t.createVNode(f,{data:e.tableData,border:"",style:{width:"100%"}},{default:ee((()=>[t.createVNode(m,{prop:"date",label:"序号",width:"50",type:"index"}),t.createVNode(m,{prop:"name",label:"功能名称"}),t.createVNode(m,{prop:"code",label:"功能编码"}),t.createVNode(m,{prop:"description",label:"说明"}),t.createVNode(m,{prop:"name",label:"启动状态",width:"100"},{default:ee((({row:e})=>[t.createTextVNode(t.toDisplayString(1===e.status?"启用":"禁用"),1)])),_:1}),t.createVNode(m,{prop:"address",label:"操作",width:"180"},{default:ee((({row:a})=>[t.createVNode(s,{type:"text",size:"mini",onClick:t=>e.openEffect(a)},{default:ee((()=>[ge])),_:1},8,["onClick"]),t.createVNode(s,{type:"text",size:"mini",onClick:t=>e.deteRow(a)},{default:ee((()=>[ve])),_:1},8,["onClick"]),t.createVNode(s,{type:"text",size:"mini",onClick:t=>e.openInterFace(a)},{default:ee((()=>[Ne])),_:1},8,["onClick"])])),_:1})])),_:1},8,["data"]),[[y,e.tableLoading]])])])),_:1})])),_:1})):(t.openBlock(),t.createBlock("div",ye,[be,t.withDirectives(t.createVNode(V,{onClick:a[5]||(a[5]=t=>e.createCheckView(e.treeData))},{default:ee((()=>[Ce])),_:1},512),[[t.vShow,!1]])]))])]),t.createCommentVNode(" 编辑菜单 "),t.createVNode(g,{title:"新增菜单",modelValue:e.dialogVisible,"onUpdate:modelValue":a[7]||(a[7]=t=>e.dialogVisible=t),width:"60%"},{default:ee((()=>[t.createVNode("div",xe,[t.createVNode(u,{type:"add",platform:e.platform,targetData:e.addParms,onSaveSuccess:a[6]||(a[6]=t=>(e.dialogVisible=!1,e.getMenuList()))},null,8,["platform","targetData"])])])),_:1},8,["modelValue"]),t.createCommentVNode(" 编辑菜单 end"),t.createCommentVNode(" 编辑新功能 "),t.createVNode(g,{title:"edit"===e.editSourceType?"编辑资源":"新增资源",modelValue:e.effectVisible,"onUpdate:modelValue":a[9]||(a[9]=t=>e.effectVisible=t),width:"60%"},{default:ee((()=>[e.effectVisible?(t.openBlock(),t.createBlock(v,{key:0,platform:e.platform,type:e.editSourceType,targetData:e.editSourceParms,onSaveSuccess:a[8]||(a[8]=t=>(e.effectVisible=!1,e.getTableList()))},null,8,["platform","type","targetData"])):t.createCommentVNode("v-if",!0)])),_:1},8,["title","modelValue"]),t.createCommentVNode(" 编辑新功能 end"),t.createCommentVNode(" 接口绑定 "),t.createVNode(g,{title:e.interTitle,modelValue:e.interFaceVisible,"onUpdate:modelValue":a[10]||(a[10]=t=>e.interFaceVisible=t),width:"70%"},{default:ee((()=>[t.createVNode(N,{id:e.interFaceId},null,8,["id"])])),_:1},8,["title","modelValue"]),t.createCommentVNode(" 接口绑定 end ")])}));Z.render=ke,Z.__scopeId="data-v-65c1edf7",Z.__file="src/lib/OperationConfig/ResourceAllocation.vue",e.InterFaceList=f,e.ResourceAllocation=Z,Object.defineProperty(e,"__esModule",{value:!0})}));
