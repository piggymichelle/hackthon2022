<template>
    <div class="home">
        <div class="tab">
            <div @click="handleClick(1)" :class="{active: activeName == 1}">Tables</div>
            <div @click="handleClick(2)" :class="{active: activeName == 2}">Aggregations</div>
            <div @click="handleClick(3)" :class="{active: activeName == 3}">Filters</div>
            <!-- <div @click="handleClick(4)" :class="{active: activeName == 4}">ReportFields</div> -->
            <div @click="handleClick(5)" :class="{active: activeName == 5}">Joiners</div>
            <el-button @click = linkClick>View the results</el-button>
        </div>
        <div class="tab_con">
            <div style="background: #2c3e50" v-if="activeName == 1">
                <button class="addBtn" @click="OneAddTabOutside">Add</button>
                <div v-for="(item,index) in dataInfor.tables" style="margin: 10px 0">
                    <div v-show="false">{{item.tableId = index+1}}</div>
                    <button class="rulesBtn" @click="OneAddTabInner(index)">+rules</button>
                    <el-button type="danger" style="margin-left: 10px;" @click="oneOutsideDel(index)">Delete</el-button>
                    <div v-for="(smItem,smIndex) in item.columns" style="margin: 10px 0">
                        <div v-show="false">{{smItem.columnId = smIndex+1}}</div>
                        <span class="title">alias:</span>
                        <el-select v-model="smItem.alias" filterable placeholder="Please select a">
                            <el-option value="userID"></el-option>
                            <el-option value="userName"></el-option>
                        </el-select>
                        <el-input placeholder="Please enter the" style="width: 150px; margin: 0 10px;"
                                  class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-button type="danger" style="margin-left: 10px;" @click="oneInnerDel(index,smIndex)">Delete
                        </el-button>
                    </div>
                </div>
            </div>
            <div style="background: #2c3e50" v-if="activeName == 2">
                <button class="addBtn" @click="TwoAddTabOutside">Add</button>
                <div v-for="(item,index) in dataInfor.aggregations" style="display: flex;align-items: center;"
                     class="aggBox">
                    <div style="margin: 10px">
                        <span class="title">function:</span>
                        <el-select v-model="item.function" placeholder="Please select a">
                            <el-option value="GROUP_COUNT_DISTINCT"></el-option>
                            <el-option value="GROUP_COUNT_DISTINCT"></el-option>
                        </el-select>
                    </div>
                    <div style="margin: 10px;display: flex">
                        <span class="title">parameters:</span>
                        <el-checkbox-group v-model="item.parameters">
                            <el-checkbox label="userId" name="type" border></el-checkbox>
                            <el-checkbox label="roleId" name="type" border></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="margin: 10px">
                        <span class="title">alias:</span>
                        <el-select v-model="item.alias" placeholder="Please select a">
                            <el-option value="totalUsersPerRole"></el-option>
                        </el-select>
                    </div>
                    <el-button type="danger" style="margin-left: 10px;" @click="TwoDel(index)">Delete</el-button>
                </div>

            </div>
            <div style="background: #2c3e50" v-if="activeName == 3">
                <div>
                    <div>
                        <div style="display: flex;align-items: center">
                            <span class="title">type:</span>
                            <el-select v-model="dataInfor.filters.type" placeholder="Please select a">
                                <el-option value="GROUP"></el-option>
                                <el-option value="GROUP"></el-option>
                            </el-select>

                            <span class="title" style="margin-left: 20px;">operator:</span>
                            <el-select v-model="dataInfor.filters.operator" placeholder="Please select a">
                                <el-option value="OR"></el-option>
                                <el-option value="AND"></el-option>
                            </el-select>
                            <button class="rulesBtn" style="margin-left: 10px;" @click="filterAdd">+rules</button>
                        </div>
                        <div v-for="(item,index) in dataInfor.filters.conditions">
                            <el-row>
                                <el-col :span="5">
                                    <span class="title titles">type</span>
                                    <el-select v-model="item.type" placeholder="Please select a">
                                        <el-option value="CONDITION"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <span class="title titles" style="margin-left: 10px">operator</span>
                                    <el-select v-model="item.operator" placeholder="Please select a">
                                        <el-option value="END_WITH"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <span class="title titles" style="margin-left: 10px">leftType</span>
                                    <el-select v-model="item.leftType" placeholder="Please select a">
                                        <el-option value="ALIAS"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <span class="title titles" style="">leftValue</span>
                                    <el-select v-model="item.leftValue" placeholder="Please select a">
                                        <el-option value="username"></el-option>
                                    </el-select>
                                </el-col>
                                <br>
                                <el-col :span="5">
                                    <span class="title titles">rightType</span>
                                    <el-select v-model="item.rightType" placeholder="Please select a">
                                        <el-option value="PLAIN"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <span class="title titles" style="margin-left: 10px">rightValue</span>
                                    <el-select v-model="item.rightValue" placeholder="Please select a">
                                        <el-option value="iam"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <el-button type="danger" style="margin: 0px 10px" @click="filterDel(index)">Delete
                                    </el-button>
                                </el-col>
                            </el-row>
                            <br>

                        </div>
                    </div>
                </div>
            </div>
            <!-- <div style="background: #2c3e50" v-if="activeName == 4">
                <span class="title">reportFields</span>
                <el-checkbox-group v-model="dataInfor.reportFields">
                    <el-checkbox label="userName" name="type" border></el-checkbox>
                    <el-checkbox label="roleName" name="type" border></el-checkbox>
                    <el-checkbox label="totalUsersPerRole" name="type" border></el-checkbox>
                </el-checkbox-group>
            </div> -->
            <div style="background: #2c3e50" v-if="activeName == 5">
                <button class="addBtn" @click="joinersAdd">Add</button>
                <div v-for="(item,index) in dataInfor.joiners">
                    <el-row>
                        <el-col :span="5">
                            <span class="title titles">LEFT</span>
                            <el-input-number v-model="item.left" :min="1" :max="999" label="Left"></el-input-number>
                        </el-col>
                        <el-col :span="5">
                            <span class="title titles">RIGHT</span>
                            <el-input-number v-model="item.right" :min="1" :max="999" label="Right"></el-input-number>
                        </el-col>
                        <el-col :span="5">
                            <span class="title titles">TYPE</span>
                            <el-select v-model="item.type" placeholder="Please select a">
                                <el-option value="LEFT"></el-option>
                                <el-option value="RIGHT"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="24">
                            <span class="title">JOIN ON</span>
                        </el-col>
                        <el-col :span="5">
                            <span class="title titles">TYPE</span>
                            <el-select v-model="item.on.type" placeholder="Please select a">
                                <el-option value="CONDITION"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <span class="title titles">operator</span>
                            <el-select v-model="item.on.operator" placeholder="Please select a">
                                <el-option value="EQ"></el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="5">
                            <span class="title titles">leftType</span>
                            <el-select v-model="item.on.leftType" placeholder="Please select a">
                                <el-option value="COLUMN"></el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="5">
                            <span class="title titles">leftValue</span>
                            <el-input-number :min="0" :max="999" v-model="item.on.leftValue"></el-input-number>
                        </el-col>

                        <el-col :span="5">
                            <span class="title titles">rightType</span>
                            <el-select v-model="item.on.rightType" placeholder="Please select a">
                                <el-option value="COLUMN"></el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="5">
                            <span class="title titles">rightValue</span>
                            <el-input-number :min="0" :max="999" v-model="item.on.rightValue"></el-input-number>
                        </el-col>
                        <el-col :span="5">
                            <el-button @click="joinersDel(index)" type="danger">Delete</el-button>
                        </el-col>
                    </el-row>
                    <br>
                </div>
            </div>
        </div>
        <div class="block">
            <button @click="submit">SUBMIT</button>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    import ElButton from "element-ui/packages/button/src/button";

    export default {
        name: 'HomeView',
        components: {
            ElButton

        },
        data() {
            return {
                activeName: 1,
                dataInfor: {
                    tables: [],
                    aggregations: [],
                    filters: {
                        type: 'GROUP',
                        operator: 'OR',
                        conditions: []
                    },
                    // reportFields: [],
                    joiners: []
                }
            }
        },
        methods: {
            handleClick(index) {
                this.activeName = index
            },

            OneAddTabOutside() {
                let obj = {
                    tableId: '',
                    columns: []
                }
                this.dataInfor.tables.push(obj)
            },
            OneAddTabInner(index) {
                let obj = {
                    columnId: 0,
                    alias: ''
                }
                this.dataInfor.tables[index].columns.push(obj)
            },
            oneOutsideDel(index) {
                this.dataInfor.tables.splice(index, 1)
            },
            oneInnerDel(index1, index2) {
                this.dataInfor.tables[index1].columns.splice(index2, 1)
            },
            TwoAddTabOutside() {
                let obj = {
                    function: '',
                    parameters: [],
                    alias: ''
                }
                this.dataInfor.aggregations.push(obj)
            },
            TwoDel(index) {
                this.dataInfor.aggregations.splice(index, 1)
            },
            filterAdd() {
                let obj = {
                    type: '',
                    operator: '',
                    leftType: '',
                    leftValue: '',
                    rightType: '',
                    rightValue: '',
                }
                this.dataInfor.filters.conditions.push(obj)
            },
            filterDel(index) {
                this.dataInfor.filters.conditions.splice(index, 1)
            },
            joinersAdd() {
                let obj = {
                    left: '',
                    right: '',
                    type: '',
                    on: {
                        type: '',
                        operator: '',
                        leftType: '',
                        leftValue: '',
                        rightType: '',
                        rightValue: '',
                    }
                }
                this.dataInfor.joiners.push(obj)
            },
            joinersDel(index) {
                this.dataInfor.joiners.splice(index, 1)
            },
            submit() {
                console.log(this.dataInfor);
            },
            linkClick(type) {
                this.$router.push({
                    path: './results',
                    query: {
                        type: type
                    }
                })
            }
        }
    }
</script>
<style scoped lang="css">
    .block {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .block > button {
        margin: 10px 0;
        width: 200px;
        font-family: 'Hanalei Fill', cursive;
        font-size: 2vw;
        background: white;
        border-radius: 5px;
    }

    .tab {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tab > div {
        margin: 10px 10px;
        font-size: 3vw;
        font-family: 'Teko', sans-serif;
        cursor: pointer;
        user-select: none;
    }

    .tab > div:hover {
        color: #42b983;
    }

    .tab_con > div {
        width: 100%;
        min-height: calc(100vh - 200px);
        padding: 10px;
        box-sizing: border-box;
    }

    .active {
        color: #42b983;
    }

    .addBtn {
        color: white;
        background: rgba(0, 0, 0, 0);
        border: 2px solid white;
        font-size: 2vw;
        border-radius: 5px;
        margin-bottom: 10px;
        font-family: 'Teko', sans-serif;
        padding: 0 20px;
        transition: all 0.3s;
        cursor: pointer;
    }

    .addBtn:hover {
        background: white;
        color: #2c3e50;
    }

    .rulesBtn {
        color: white;
        background: rgba(0, 0, 0, 0);
        border: 2px solid white;
        font-size: 1.5vw;
        border-radius: 5px;
        margin-bottom: 10px;
        font-family: 'Teko', sans-serif;
        padding: 0 20px;
        transition: all 0.3s;
        cursor: pointer;
    }

    .rulesBtn:hover {
        background: white;
        color: #2c3e50;
    }

    .title {
        color: white;
        font-size: 1.5vw;
        margin-right: 10px;
        font-family: 'Teko', sans-serif;
        display: inline-block;
        text-align: left;
        text-transform: Uppercase;
    }

    .aggBox > div {
        margin-right: 20px;
    }

    .titles {
        width: 100px;
    }
</style>
<style>
    .is-checked {
        border-color: #2c3e50;
        color: #2c3e50 !important;
    }
</style>
