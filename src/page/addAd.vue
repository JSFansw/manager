<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
                <header class="form_header">添加首页广告</header>
                <el-form :model="adForm" :rules="adrules" ref="adForm" label-width="110px" class="form ad_form">
                    <el-form-item label="广告名称" prop="name">
                        <el-input v-model="adForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址" prop="link">
                        <el-input v-model="adForm.link"></el-input>
                    </el-form-item>
                    <el-form-item label="广告内容" prop="content">
                        <el-input v-model="adForm.content"></el-input>
                    </el-form-item>
                    <el-form-item id="img_data" label="广告图片" prop="image_url">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/admin/upload/ad'"
                            :show-file-list="false"
                            :auto-upload="true"
                            :on-success="uploadImg"
                            :before-upload="beforeImgUpload">
                            <img v-if="adForm.image_url" :src="adForm.image_url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="是否显示">
                        <el-radio-group v-model="adForm.enabled">
                            <el-radio class="radio" label=1 border>显示</el-radio>
                            <el-radio class="radio" label=0 border>不显示</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="显示时间" prop="end_time">
                        <el-date-picker
                            v-model="adForm.end_time"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                        </el-date-picker>
                <!--        <div>{{ adForm.end_time }}}</div>   -->
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addAd('adForm')">确认添加广告</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {storeAd} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                adForm: {
                    name: '',
                    link:'',
                    content: '',
                    image_url: '',
                    enabled: 1,
                    end_time: 0,

                },
                adrules: {
                    name: [
                        { required: true, message: '请输入广告名称', trigger: 'blur' },
                    ],
                    img: [
                        { required: true, message: '请选择广告图片', trigger: 'blur' },
                    ],
                },

            }
        },
        components: {

            headTop,
        },
        activated(){
            //当切换到本页面时
            adForm.name = '';
            adForm.link = '';
            adForm.image_url = '';
            adForm.content = '';
            adForm.enabled = 1;
            adForm.end_time = 0;
        },
        created(){
            this.initData();
        },
        computed: {
            selectValue: function (){
                return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
            }
        },
        methods: {
            async initData(){

            },
            uploadImg(res, file) {
                if (res.errno == 0) {
                    this.adForm.image_url = res.data.image_url;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeImgUpload(file) {
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
            addAd(adForm){
                this.$refs[adForm].validate(async (valid) => {
                    if(valid){
                        const params = {
                            ...this.adForm,
                        }
                        try{
                            const result = await storeAd(params);
                            if(result.errno == 0){
                                console.log(result)
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                //跳转到广告列表
                                //this.$router.go(-1);
                                this.$router.push({ path: 'adList', query: { isFlash: true }})
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                        }catch(err){
                            console.log(err)
                        }
                    }else{

                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .form{
        min-width: 400px;
        margin-bottom: 30px;
        &:hover{
            box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }
    .food_form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
    .form_header{
        text-align: center;
        margin-bottom: 10px;
    }
    .category_select{
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
    .add_category_row{
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }
    .showEdit{
        height: 185px;
    }
    .add_category{
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }
    .add_category_button{
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover{
            background: #f9fafc;
            span, .edit_icon{
                color: #20a0ff;
            }
        }
        span{
            .sc(14px, #999);
            transition: all 400ms;
        }
        .edit_icon{
            color: #ccc;
            transition: all 400ms;
        }
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
        width: 280px;
        height: 160px;
        line-height: 160px;
        text-align: center;
    }
    .avatar {
        width: 280px;
        height: 160px;
        display: block;
    }
    .cell{
        text-align: center;
    }
</style>
