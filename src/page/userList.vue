<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                stripe="true"
                style="width: 100%">
                <el-table-column
                  type="index"
                  sortable
                  label="序号"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="registe_time"
                  sortable
                  label="注册日期"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="微信名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="phone"
                  label="手机号">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                  registe_time: '2016-05-02',
                  username: '王小虎',
                  phone: '18896735689'
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getUserCount();
                    if (countData !== null) {
                        this.count = countData.data.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                //const Users = await getUserList({offset: this.offset, limit: this.limit});
                const userList = await getUserList({page: this.offset, size: this.limit});
                //alert('users='+Users.data.data[0].id);
                const Users = userList.data.data;
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    const time = new Date(item.register_time);
                    let localTime = time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes();
                    tableData.username = item.nickname;
                    tableData.registe_time = localTime;
                    tableData.phone = item.mobile;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
