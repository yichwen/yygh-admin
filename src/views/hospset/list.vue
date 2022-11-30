<template>
  <div class="app-container">
    医院设置列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
    <el-table :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="Date" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
          <el-button 
          v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id, 0)"
          >锁定</el-button>
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id, 1)"
          >解锁</el-button>
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page="current"
      :page-size="limit"
      @current-change="getList"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script>
// import api definition js file
import hospset from "@/api/hospset";

export default {
  // 定义变量和初始值
  data() {
    return {
      current: 1, // 当前页
      limit: 3, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelections: [],
    };
  },
  // 一般调用methods定义的方法
  created() {
    this.getList();
  },
  methods: {
    lockHospSet(id, status) {
      hospset.lockHospitalSet(id, status)
        .then(_ => {
          this.getList()
        })
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelections = selection;
    },
    // 批量删除
    removeRows() {
      if (this.multipleSelections.length > 0) {
        this.$confirm("此操作将永久删除医院设置信息, 是否继续？", "提示", {
         confirmButtonText: "确定",
         cancelButtonText: "取消",
          type: "warning",
        })
        .then(_ => {
          var idList = []
          for (var i = 0; i < this.multipleSelections.length; i++) {
            var obj = this.multipleSelections[i];
            var id = obj.id
            idList.push(id);
          }
          hospset.batchRemove(idList).then(_ => {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            // refresh page
            this.getList(1);
          });
        })
        .catch(_ => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      }
    },
    // 医院设置列表
    getList(page = 1) {
      this.current = page;
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then((response) => {
          // console.log(response);
          this.list = response.data.records;
          this.total = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetData() {
      this.searchObj = {};
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除医院设置信息, 是否继续？", "提示", {
         confirmButtonText: "确定",
         cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          hospset.removeHospSet(id).then(_ => {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            // refresh page
            this.getList(1);
          });
        })
        .catch(_ => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>