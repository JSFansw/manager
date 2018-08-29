<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
			    :data="tableData"
			    @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="订单ID" >
			            <span>{{ props.row.id }}</span>
			          </el-form-item>
			          <el-form-item label="用户名称">
			            <span>{{ props.row.user_id }}</span>
			          </el-form-item>
			          <el-form-item label="收货地址">
			            <span>{{ props.row.address }}</span>
			          </el-form-item>
			          <el-form-item label="邮寄状态">
			            <span>{{ props.row.shipping_status }}</span>
			          </el-form-item>
			          <el-form-item label="支付状态">
			            <span>{{ props.row.pay_status }}</span>
			          </el-form-item>
                        <el-form-item label="联系电话" >
                            <span>{{ props.row.mobile }}</span>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <span>{{ props.row.goods_price }}</span>
                        </el-form-item>
                        <el-form-item label="下单时间">
                            <span>{{ props.row.add_time }}</span>
                        </el-form-item>
                        <el-form-item label="邮费">
                            <span>{{ props.row.shipping_fee }}</span>
                        </el-form-item>
                        <el-form-item label="支付流水号">
                            <span>{{ props.row.pay_id }}</span>
                        </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="订单 ID"
			      prop="id">
			    </el-table-column>
                <el-table-column
                    label="用户名称"
                    prop="user_id">
                </el-table-column>
			    <el-table-column
			      label="订单地址"
			      prop="address">
			    </el-table-column>
			    <el-table-column
			      label="订单状态"
			      prop="order_status">
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
    import {getOrderList, getOrderCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
               // restaurant_id: null,
                expendRow: [],
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        	//this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        mounted(){

        },
        methods: {
            async initData(){
                try{
                    //const countData = await getOrderCount({restaurant_id: this.restaurant_id});
                    const countData = await getOrderCount();

                    if (countData.errno == 0) {
                        this.count = countData.data;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getOrders();
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
                this.getOrders()
            },
            async getOrders(){
                const orderData = await getOrderList();
                this.tableData = [];
                const Orders = orderData.data;
                Orders.forEach((item, index) => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.order_sn = item.order_sn;
                    tableData.order_status = item.order_status;
                    tableData.shipping_status = item.shipping_status;
 					tableData.pay_status = item.pay_status;
 					tableData.address = item.country + item.province + item.city+item.district+item.address;
                    tableData.mobile = item.mobile;
                    tableData.postscript = item.postscript;
                    tableData.shipping_fee = item.shipping_fee;
                    tableData.pay_name = item.pay_name;
                    tableData.pay_id = item.pay_id;
                    tableData.actual_price = item.actual_price;
                    tableData.integral = item.integral;
                    tableData.integral_money = item.integral_money;
                    this.tableData.push(tableData);
                })
            },
            // async expand(row, status){
            // 	if (status) {
            // 		const restaurant = await getResturantDetail(row.restaurant_id);
	         //    	const userInfo = await getUserInfo(row.user_id);
	         //    	const addressInfo = await getAddressById(row.address_id);
            //
	         //        this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}});
            //         this.$nextTick(() => {
            //             this.expendRow.push(row.index);
            //         })
	         //    }else{
            //         const index = this.expendRow.indexOf(row.index);
            //         this.expendRow.splice(index, 1)
            //     }
            // },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
</style>
