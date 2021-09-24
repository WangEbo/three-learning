/**
 * 分析从webApi获取到的仓库的数据信息
 * @constructor
 */
function DataAnalyze() {
    this.curStore=null;
    this.curGroup=null;
    this.curBin=null;
    this.Store3DData = JSON.parse(JSON.stringify(window.store.Store3DData))
}

/**
 * 根据仓库编码或者名称获取仓库信息
 */
DataAnalyze.prototype.getStore = function (noorname) {
    if (this.Store3DData != null) {
        for (let i = 0; i < this.Store3DData.Areas.length; i++) {
            let optionArea = this.Store3DData.Areas[i];
            let area = new StoreArea(optionArea);
            for (let j = 0; j < optionArea.Stores.length; j++) {
                let optionStore = optionArea.Stores[j];
                if (optionStore.No == noorname || optionStore.No == noorname) {
                    this.curStore=optionStore;
                    return optionStore;
                }
            }
        }
    }
    return null;
},
    /**
     * 根据组编号或者组名称获取组信息
     */
    DataAnalyze.prototype.getGroup = function (noorname) {
        if (this.Store3DData != null) {
            for (let i = 0; i < this.Store3DData.Areas.length; i++) {
                let optionArea = this.Store3DData.Areas[i];
                for (let j = 0; j < optionArea.Stores.length; j++) {
                    let optionStore = optionArea.Stores[j];
                    for (let k = 0; k < optionStore.Groups.length; k++) {
                        let optionGroup = optionStore.Groups[k];
                        if (optionGroup.No == noorname || optionGroup.Name == noorname)
                        {this.curGroup=optionGroup;
                            return optionGroup;}

                    }
                }
            }
        }
        return null;
    },
    /**
     * 根据库位编码或者库位名称获取库位信息
     */
    DataAnalyze.prototype.getBin=function(noorname)
    {
        if (this.Store3DData != null) {
            for (let i = 0; i < this.Store3DData.Areas.length; i++) {
                let optionArea = this.Store3DData.Areas[i];
                for (let j = 0; j < optionArea.Stores.length; j++) {
                    let optionStore = optionArea.Stores[j];
                    for (let k = 0; k < optionStore.Groups.length; k++) {
                        let optionGroup = optionStore.Groups[k];

                        for(let m=0;m<optionGroup.Bins.length;m++)
                        {
                            let optionBin=optionGroup.Bins[m];
                            if(optionBin.No==noorname||optionBin.Name==noorname)
                            {
                                this.curBin=optionBin;
                                return optionBin;
                            }
                        }}
                }
            }
        }
    },
    /**
     * 根据仓库的总库位数
     */
    DataAnalyze.prototype.getStoreTotalBin = function (noorname) {
        return this.curStore.TotalBinNum;
    },
    /**
     * 获取仓库的已占的库位数
     */
    DataAnalyze.prototype.getStoreOccurpyBin = function () {
        return this.curStore.OccurpyBinNum;
    },
    /**
     * 获取当前入库数量
     */
    DataAnalyze.prototype.getStoreInNum = function (noorname) {
        return this.curStore.InStoreNum;
    },
    /**
     * 获取当前出库数量
     */
    DataAnalyze.prototype.getStoreOutNum = function () {
        return this.curStore.OutStoreNum;
    },
    /**
     * 获取仓库超期数量
     */
    DataAnalyze.prototype.getStoreOutOfTimeNum = function () {
        return this.curStore.OutOfTimeNum;
    },
    /**
     *   获取仓库中过期货物的数量
     */
    DataAnalyze.prototype.getStorePreOutOfTimeNum = function () {
        return this.curStore.PreOutOfTimeNum;
    },
    /**
     *   获取仓库中不合格的数量
     */
    DataAnalyze.prototype.getStoreNgNum = function () {
        return this.curStore.NgNum;
    },
    /**
     * 获取仓库中报警数量
     */
    DataAnalyze.prototype.getStoreAlarmNum = function () {
        return this.curStore.AlarmNum;
    },
    /**
     * 获取仓库每排 的名称
     */
    DataAnalyze.prototype.getStoreDistributionName=function () {
        var GroupNos=new Array();
        for (let i=0;i<this.curStore.Groups.length;i++)
        {
            let group=this.curStore.Groups[i];
            GroupNos.push(group.No);
        }
        return GroupNos;
    },
    /**
     *  获取仓库每排的数量
     */
    DataAnalyze.prototype.getStoreDistributionNum=function () {

        var GroupNos=new Array();
        for (let i=0;i<this.curStore.Groups.length;i++)
        {
            let group=this.curStore.Groups[i];
            GroupNos.push(group.OccurpyBinNum);
        }
        return GroupNos;
    },
    /**
     * 根据排名和编号获取该排的总库位数量
     */
    DataAnalyze.prototype.getGroupTotalBin = function (noorname) {
        return this.curGroup.TotalBinNum;
    },
    /**
     * 获取排中已经占用的库位数量
     */
    DataAnalyze.prototype.getGroupOccurpyBin = function () {
        return this.curGroup.OccurpyBinNum;
    },
    /**
     * 获取当前排中入库数量
     */
    DataAnalyze.prototype.getGroupInNum = function (noorname) {
        return this.curGroup.InStoreNum;
    },
    /**
     * 获取当前排中出库的数量
     */
    DataAnalyze.prototype.getGroupOutNum = function () {
        return this.curGroup.OutStoreNum;
    },
    /**
     * 获取当前排中超时的数量
     */
    DataAnalyze.prototype.getGroupOutOfTimeNum = function () {
        return this.curGroup.OutOfTimeNum;
    },
    /**
     * 获取当前排预出库的数量
     */
    DataAnalyze.prototype.getGroupPreOutOfTimeNum = function () {
        return this.curGroup.PreOutOfTimeNum;
    },
    /**
     * 获取当前排不合格品数量
     */
    DataAnalyze.prototype.getGroupNgNum = function () {
        return this.curGroup.NgNum;
    },
    /**
     * 获取当前排中报警数量
     */
    DataAnalyze.prototype.getGroupAlarmNum = function () {
        return this.curGroup.AlarmNum;
    },
    /**
     * 获取每排所有的列的名称
     */
    DataAnalyze.prototype.getColDistributionNames=function () {
        var ColNames=new Array();
        if(this.curGroup.ColNames!=null) {

            for (let i = 0; i < this.curGroup.ColNames.length; i++) {
                let colname = this.curGroup.ColNames[i];
                ColNames.push(colname);
            }
            return ColNames;
        }
        return null;
    },
    /**
     * 获取每排中所有的列的数量
     */
    DataAnalyze.prototype.getColDistributionNums=function () {
        var ColNums=new Array();
        if(this.curGroup.ColNames!=null) {
            for (let i = 0; i < this.curGroup.ColNums.length; i++) {
                let colnum = this.curGroup.ColNums[i];
                ColNums.push(colnum);
            }
            return ColNums;
        }
        return null;
    }




