<template>
  <div class="app-container">
    医院设置添加

    <el-form ref="form" label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import api definition js file
import hospset from "@/api/hospset";

export default {
  data() {
    return {
      hospitalSet: {}
    }
  },
  created() {
    // get id from route
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHospSet(id)
    } else {
      this.hospitalSet = {};
    }
  },
  methods: {
    saveOrUpdate() {
      if (!this.hospitalSet.id) {
        this.save();
      } else {
        this.update();
      }
    },
    save() {
      hospset.saveHospitalSet(this.hospitalSet)
        .then(_ => {
          // prompt
          this.$message({
            type: "success",
            message: "添加成功！",
          });
          // redirect, router redirect
          this.$router.push({
            path: '/hospSet/list'
          });
        })
    },
    update() {
      hospset.updateHospSet(this.hospitalSet)
        .then(_ => {
          // prompt
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          // redirect, router redirect
          this.$router.push({
            path: '/hospSet/list'
          });
        })
    },
    getHospSet(id) {
      hospset.getHospSet(id)
        .then(response => {
          this.hospitalSet = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
};
</script>
