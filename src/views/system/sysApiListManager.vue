<template>
  <div class="app-container">
    <div class="actions-container">
      <el-button
        class="action-item"
        size="small"
        v-waves
        icon="el-icon-plus"
        @click="formOpen"
        v-permission="['sys:apiList:save']"
      >{{ $t('table.add') }}
      </el-button>
      <el-button
        class="action-item"
        size="small"
        v-waves
        icon="el-icon-edit"
        v-permission="['sys:apiList:save']"
        @click="handleSelected('edit')"
      >{{ $t('table.edit') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        :label="$t('views.system.sysApiListManager.formData.apiName')"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.apiName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('views.system.sysApiListManager.formData.apiUrl')"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.apiUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('views.system.sysApiListManager.formData.shiroCode')"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.shiroCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('views.system.sysApiListManager.formData.apiTag')"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.apiTag }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.remark')"
        align="center"
        :show-overflow-tooltip='true'
      >
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="createdTime"
        sortable
        :label="$t('table.createdTime')"
        width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.edit')"
            placement="top-start"
          >
            <el-button
              class="action-item"
              type="text"
              v-waves
              icon="el-icon-edit"
              v-permission="['sys:apiList:save']"
              @click="formOpen(scope.row, true)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('table.delete')"
            placement="top-start"
          >
            <el-button
              class="action-item"
              type="text"
              v-waves
              icon="el-icon-delete"
              v-permission="['sys:apiList:remove']"
              @click="handleRemove(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="handleQueryList"
    />
    <form-dialog
      :visible.sync='formVisible'
      :title="isEdit? $t('table.edit'):$t('table.add')"
      @onCancel="formClose"
      @onSubmit="handleFormSave"
    >
      <el-form
        ref="formData"
        :rules="rules"
        :model="formData"
        label-width="100px"
      >
        <el-form-item
          :label="$t('views.system.sysApiListManager.formData.shiroCode')"
          prop="shiroCode"
        >
          <el-input
            v-model="formData.shiroCode"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('views.system.sysApiListManager.formData.apiName')"
          prop="apiName"
        >
          <el-input
            v-model="formData.apiName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('views.system.sysApiListManager.formData.apiUrl')"
          prop="apiUrl"
        >
          <el-input
            v-model="formData.apiUrl"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('views.system.sysApiListManager.formData.apiTag')"
          prop="apiTag"
        >
          <el-input
            v-model="formData.apiTag"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('table.remark')"
        >
          <el-input
            type="textarea"
            v-model="formData.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </form-dialog>
  </div>
</template>

<script>
  import {
    sysApiListList,
    sysApiListSave,
    sysApiListRemove,
  } from '@/api/system'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SysCode from '@/components/SysCode'
  import DySelect from '@/components/DySelect'
  import DyFilterInput from '@/components/DyFilterInput'
  import FormDialog from '@/components/FormDialog'
  import {cacheData} from '@/utils/cache'
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数

  export default {
    name: 'sysApiListManager',
    components: {
      Pagination,
      SysCode,
      DySelect,
      FormDialog,
      DyFilterInput,
    },
    directives: {waves, permission},
    filters: {},
    data() {
      const validatorRequired = (rule, value, callback) => {
        if (!value) {
          callback(new Error(i18n.t(`views.system.sysApiListManager.formData.${rule.field}`) + i18n.t('action.required')))
        } else {
          callback()
        }
      };
      return {
        cacheData: {},
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNum: 0,
          pageSize: 10,
          orderBy: '',
          shiroCode: '',
          apiName: '',
        },
        multipleSelection: [],
        formVisible: false,
        isEdit: false,
        formData: {
          id: "",
          remark: "",
          apiName: "",
          apiTag: "",
          apiUrl: "",
          byOrder: 0,
          shiroCode: ""
        },
        rules: {
          shiroCode: [
            {
              required: true,
              trigger: 'blur',
              validator: validatorRequired
            }
          ],
          apiName: [
            {
              required: true,
              trigger: 'blur',
              validator: validatorRequired
            }
          ]
        }
      }
    },
    created() {
    },
    mounted() {
      cacheData(this.cacheData, '1000').then(() => {
        this.handleQueryList()
      })
    },
    methods: {
      checkPermission,
      cellStyle() {
        return 'padding: 5px 0px;'
      },
      /***********************Filter search************************* */
      handleFilter() {
        this.listQuery.pageNum = 0
        this.handleQueryList()
      },
      /***********************Remote query list************************* */
      handleQueryList() {
        this.listLoading = true
        let query = {
          pageSize: this.listQuery.pageSize,
          pageNum: this.listQuery.pageNum,
          'params[shiroCode]': this.listQuery.shiroCode,
          'params[apiName]': this.listQuery.apiName
        }
        sysApiListList(query)
          .then(response => {
            this.list = response.list
            this.total = response.total
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.listLoading = false
          })
      },
      /***********************Table actions************************* */
      // 打开Form表单
      formOpen(row, isEdit = false) {
        this.isEdit = isEdit
        this.formVisible = true
        if (isEdit) {
          this.formData = Object.assign({}, row)
        } else {
          this.formData = {}
        }
      },
      // 关闭Form表单
      formClose() {
        this.formVisible = false
        this.$refs['formData'].resetFields()
      },
      // 删除处理
      handleRemove(id) {
        this.$confirm(this.$t('views.commons.confirm.remove_text'), {
          type: 'warning'
        }).then(() => {
          sysApiListRemove(id).then(response => {
            this.handleQueryList()
          })
        })
      },
      // 表单提交处理
      handleFormSave() {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            sysApiListSave(this.formData)
              .then(data => {
                this.formVisible = false
                this.handleFilter()
              })
              .catch(err => {
                console.log(err)
              })
              .finally(() => {
              })
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      //处理单项选择
      handleSelected(type) {
        let multipleSelection = this.multipleSelection
        if (
          !multipleSelection.length ||
          multipleSelection.length === 0 ||
          multipleSelection.length > 1
        ) {
          this.$message({
            type: 'warning',
            message: this.$t('views.commons.message.single_selected')
          })
          return
        }

        if ('edit' === type) {
          this.formOpen(multipleSelection[0], true)
        }
      },
      // 处理多项选择
      handleMultiSelected() {
        let multipleSelection = this.multipleSelection
        if (!multipleSelection.length || multipleSelection.length === 0) {
          this.$message({
            type: 'warning',
            message: this.$t('views.commons.message.multi_selected')
          })
          return
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .custom-cell {
    padding: 2px 0px;
  }
</style>
