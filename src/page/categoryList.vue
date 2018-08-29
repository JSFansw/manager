<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="firstTableData"
                stripe="true"
                style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">

                        <!--<el-form label-position="left" inline class="demo-table-expand">-->
                            <!--<el-form-item label="分类ID">-->
                                <!--<span>{{ props.row.id }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="广告名称">-->
                                <!--<span>{{ props.row.name }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="链接地址">-->
                                <!--<span>{{ props.row.link }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="广告内容">-->
                                <!--<span>{{ props.row.content }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="过期时间">-->
                                <!--<span v-if="!props.row.endtime">无限制</span>-->
                                <!--<span v-else>{{ props.row.endtime }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="是否显示">-->
                                <!--<span v-if="props.row.enabled">显示</span>-->
                                <!--<span v-else>不显示</span>-->
                            <!--</el-form-item>-->
                        <!--</el-form>-->
                        <el-table
                            :data="secondTableData"
                            stripe="true">
                            <el-table-column
                                label="分类ID"
                                prop="id">
                            </el-table-column>
                            <el-table-column
                                label="分类名称"
                                prop="name">
                            </el-table-column>
                            <el-table-column
                                label="分类描述"
                                prop="front_name">
                            </el-table-column>
                            <el-table-column
                                label="级别"
                                prop="level">
                            </el-table-column>
                            <el-table-column label="操作" width="200">
                                <template scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                    <el-button
                                        size="mini"
                                        type="Success"
                                        @click="addAd(scope.$index, scope.row)">添加分类</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </template>
                </el-table-column>
                <el-table-column
                    label="分类ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="分类名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="分类描述"
                    prop="front_name">
                </el-table-column>
                <el-table-column
                    label="级别"
                    prop="level">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="addAd(scope.$index, scope.row)">添加分类</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    <el-button
                        size="mini"
                        type="Success"
                        @click="addAd(scope.$index, scope.row)">添加分类</el-button>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改广告信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="广告名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址" label-width="100px">
                        <el-input v-model="selectTable.link" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="广告内容" label-width="100px">
                        <el-input v-model="selectTable.content"></el-input>
                    </el-form-item>
                    <el-form-item label="过期时间" label-width="100px">

                        <el-input v-model="selectTable.endtime"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示" label-width="100px">
                        <el-radio-group v-model="selectTable.enabled">
                            <el-radio class="radio" :label=1>显示</el-radio>
                            <el-radio class="radio" :label=0>不显示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="广告图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/admin/upload/ad'"
                            :show-file-list="false"
                            :on-success="handleServiceAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <!-- <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar"> -->
                            <img v-if="selectTable.image_url" :src="selectTable.image_url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateAd">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getAdList, storeAd, getAdCount, deleteAd} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                templateData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
            }
        },
        created(){
            this.initData();
        },
        activated(){
            //当切换到本页面时
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData(){
                try{
                    const adData = await getAdCount();
                    if(adData.errno == 0){
                        this.count = adData.data;
                    }else{
                        throw new Error('获取广告条数失败');
                    }
                    this.getAds();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            enabledFormatter(row,column){
                switch(row.enabled){
                    case 0:
                        return '不显示';
                        break;
                    case 1:
                        return '显示';
                        break;
                }
            },
            async getAds(){
                const Data = await getAdList({offset:this.offset, limit:this.limit});
                this.tableData = [];
                const adData = Data.data;
                adData.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.name = item.name;
                    tableData.link = item.link;
                    tableData.content = item.content;
                    tableData.endtime = item.end_time;
                    tableData.enabled = item.enabled;
                    tableData.image_url = item.image_url;
                    this.tableData.push(tableData);
                    this.templateData.push(tableData);
                })

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getAds()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;
            },
            addAd(index, row){
                this.$router.push({ path: 'addAd'})
            },
            async handleDelete(index, row) {
                try{
                    const args = {ad_id:row.id};
                    const res = await deleteAd(args);
                    if (res.errno == 0) {
                        this.$message({
                            type: 'success',
                            message: '删除广告成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除广告失败')
                }
            },
            handleServiceAvatarScucess(res, file) {
                if (res.errno == 0) {
                    this.selectTable.image_url = res.data.image_url;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateAd(){
                this.dialogFormVisible = false;
                try{
                    Object.assign(this.selectTable);
                    const res = await storeAd(this.selectTable)
                    if (res.errno == 0) {
                        this.$message({
                            type: 'success',
                            message: '更新广告信息成功'
                        });
                        this.getAds();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新广告信息失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
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
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 140px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 140px;
        height: 80px;
        display: block;
    }
</style>
