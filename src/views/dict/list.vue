<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start">
        <a
          href="http://localhost:8202/admin/cmn/dict/exportData"
          target="_blank"
        >
          <el-button type="text"><i class="fa fa-plus" /> 导出</el-button>
        </a>
        <el-button type="text" @click="importData"
          ><i class="fa fa-plus" /> 导入</el-button
        >
      </div>
    </div>
    <!-- load event happen during expansion -->
    <el-table
      :data="list"
      style="width: 100%"
      :load="getChildrens"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
      border
      lazy
    >
      <el-table-column width="230" align="left" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="220" align="left" label="编码">
        <template slot-scope="{ row }">
          <span>{{ row.dictCode }}</span>
        </template>
      </el-table-column>
      <el-table-column width="230" align="left" label="值">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog -->
    <!-- if dialogImportVisible is true, show dialog -->
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-width="170px" label-position="right">
        <el-form-item label="文件">
          <!-- support multiple is false -->
          <el-upload
            :multiple="false"
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            :on-success="onUploadSuccess"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传excel文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dict from "@/api/dict";

export default {
  data() {
    return {
      dialogImportVisible: false,
      list: [],
    };
  },
  created() {
    this.getDictList(1);
  },
  methods: {
    getDictList(id) {
      dict.getDictList(id).then((response) => {
        this.list = response.data;
      });
    },
    // during expansion, this method is called
    getChildrens(tree, treeNode, resolve) {
      dict.getDictList(tree.id).then((response) => {
        // return the data back to element-ui
        resolve(response.data);
      });
    },
    exportData() {
      // invoke interface or use <a href=""></a>
      window.location.href = "http://localhost:8202/admin/cmn/dict/exportData";
    },
    // 导入数据字典
    importData() {
      this.dialogImportVisible = true;
    },
    // 上传成功
    onUploadSuccess() {
      this.dialogImportVisible = false;
      this.$message({
        type: "success",
        message: "上传成功！",
      });
      this.getDictList(1);
    },
  },
};
</script>